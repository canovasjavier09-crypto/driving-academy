/**
 * Orquestador del simulador: bucle de física a paso fijo (120 Hz, 2 subpasos),
 * render a la frecuencia de la pantalla, cámaras, retrovisores, colisiones,
 * sonido y mensajes del sistema. No conoce React: la UI lee `hud()`.
 */
import * as THREE from 'three';
import type { CameraMode, Settings } from '../core/progress/profile';
import { getWorldMap, heightAt, TUNNEL, WORLD_HALF, type WorldMap } from './world/map';
import { buildWorld, DETAIL_LAYER, type BuiltWorld } from './world/build';
import { buildCar, DRIVER_EYE, type CarModel } from './render/carModel';
import { Mirrors } from './render/mirrors';
import { InputManager, type Action } from './input/input';
import { EngineSound } from './audio/engineSound';
import { CAR, GEARS, type Gear } from './vehicle/specs';
import {
  createVehicle, cycleLights, ignition, shift, stepVehicle, toggleBlinker,
  type VehicleEvent, type VehicleState,
} from './vehicle/vehicle';
import { getSignals, lightColor, type Crosswalk, type Signals } from './world/signals';
import { getLaneGraph } from './traffic/lanes';
import { Traffic, type PlayerView } from './traffic/traffic';
import { approachingCrosswalk, Pedestrians } from './traffic/pedestrians';
import { RulesMonitor, type AheadInfo, type ExternalEvent, type RuleEvent } from './rules/monitor';
import { Instructor } from './instructor/instructor';
import { TrafficRenderer } from './render/trafficRender';
import { createClutchAssist, pressForShift, stepClutchAssist } from './vehicle/assist';
import { Evaluator } from './rules/evaluation';
import type { Session, SessionSetup, SessionView } from './lessons/session';
import { closestOnObb, PARKED_CARS, type Pose } from './world/map';
import { RPM_PER_RADS, totalRatio } from './vehicle/specs';
import { AdaptiveQuality, LEVEL_LABEL, LEVEL_SPEC, type QualityChange, type QualityLevel } from './render/quality';
import { makeEnvMap } from './render/envmap';
import { SUN_OFFSET } from './world/bake';
import { blobTexture } from './world/textures';
import { scenarioFrom, WEATHER_LABEL, type Scenario, type Weather } from './scenario';
import { zoneAt, zoneDef, type ZoneId } from './world/zones';
import { FAULTS, severityOf } from './rules/evaluation';
import type { AICar } from './traffic/traffic';

const STEP = 1 / 120;
const SUBSTEPS = 2;

export type MessageKind = 'info' | 'warn' | 'bad' | 'good';
export interface SimMessage {
  id: number;
  text: string;
  kind: MessageKind;
  until: number;
  /** Quién habla (se muestra con su etiqueta). */
  who?: 'instructor' | 'examinador';
}

export interface HudState {
  speedKmh: number;
  rpm: number;
  gear: Gear;
  engineOn: boolean;
  throttle: number;
  brake: number;
  clutch: number;
  slipping: boolean;
  handbrake: boolean;
  lights: VehicleState['lights'];
  blinker: VehicleState['blinker'];
  blinkOn: boolean;
  belt: boolean;
  fuelPct: number;
  odometerKm: number;
  roadName: string;
  limit: number | null;
  surface: string;
  camera: CameraMode;
  mirrors: boolean;
  messages: SimMessage[];
  paused: boolean;
  fps: number;
  /** Con F: detalles de rendimiento (pixel ratio y llamadas de dibujo). */
  showFps: boolean;
  quality: string;
  pixelRatio: number;
  drawCalls: number;
  gamepad: string | null;
  clutchAssist: boolean;
  ahead: AheadInfo | null;
  session: SessionView | null;
  trafficOn: boolean;
  instructorOn: boolean;
  /** Escenario de la partida (zona de salida, semilla, meteorología) y zona en la que se está. */
  scenario: { zone: string; seed: number; weather: string; manual: boolean } | null;
  zoneNow: string | null;
  weather: Weather;
}

/** Aspecto de cada tipo de tiempo (solo visual; la física no cambia). */
const WEATHER_LOOK: Record<Weather, { sun: number; hemi: number; fogNear: number; fogFar: number; color: number; tint: number; wet: number }> = {
  despejado: { sun: 2.9, hemi: 1.45, fogNear: Infinity, fogFar: Infinity, color: 0xdbe6ef, tint: 0xffffff, wet: 0 },
  nublado: { sun: 1.3, hemi: 1.75, fogNear: 180, fogFar: 600, color: 0xc4cbd2, tint: 0xc2c8ce, wet: 0 },
  lluvia: { sun: 0.9, hemi: 1.55, fogNear: 60, fogFar: 330, color: 0xa9b2ba, tint: 0x9aa3ab, wet: 1 },
  niebla: { sun: 0.8, hemi: 1.6, fogNear: 8, fogFar: 140, color: 0xc7cbcf, tint: 0xc7cbcf, wet: 0.4 },
};
/** Capacidad de la reserva de agentes y fracción activa según el nivel de calidad. */
const AGENTS = { cars: 48, highway: 12, peds: 54 };
const LEVEL_DENSITY: Record<QualityLevel, number> = { alto: 1, medio: 0.75, bajo: 0.5 };

const EVENT_TEXT: Partial<Record<VehicleEvent, [string, MessageKind]>> = {
  calado: ['Se ha calado el motor. Pisa el embrague, pon punto muerto y gira la llave (I).', 'bad'],
  arrancado: ['Motor en marcha.', 'info'],
  'motor-apagado': ['Motor apagado.', 'info'],
  'arranque-sin-embrague': ['Para arrancar con una marcha metida, pisa el embrague a fondo.', 'warn'],
  'cambio-sin-embrague': ['Pisa el embrague a fondo para cambiar de marcha.', 'warn'],
  'marcha-atras-en-movimiento': ['Detén el vehículo antes de engranar esa marcha.', 'warn'],
  'sin-combustible': ['Sin combustible.', 'bad'],
};

export interface SimCallbacks {
  /** Distancia (m) y tiempo (s) conducidos desde la última llamada. */
  onDriveStats?: (meters: number, seconds: number) => void;
  onPauseChange?: (paused: boolean) => void;
}

export class Simulation {
  readonly map: WorldMap;
  readonly input: InputManager;
  private renderer: THREE.WebGLRenderer;
  private scene = new THREE.Scene();
  private camera: THREE.PerspectiveCamera;
  private world: BuiltWorld;
  private car: CarModel;
  private mirrors: Mirrors;
  private sound: EngineSound;
  private sun: THREE.DirectionalLight;
  private vehicle: VehicleState;
  private cameraMode: CameraMode;
  private chase = new THREE.Vector3();
  private chaseInit = false;
  private raf = 0;
  private last = 0;
  private acc = 0;
  private paused = true;
  private started = false;
  private messages: SimMessage[] = [];
  private msgId = 0;
  private clock = 0;
  private fps = 0;
  private fpsFrames = 0;
  private fpsStart = 0;
  private showFps = false;
  private aq: AdaptiveQuality;
  private level: QualityLevel;
  private shadowsAllowed: boolean;
  private envRT: THREE.WebGLRenderTarget;
  private blobTex: THREE.Texture;
  private drawCalls = 0;
  private prepTimer = 0;
  private frameDt = 1 / 60;
  /** Movimiento de cámara interior (cabeceo y vibración suavizados). */
  private shake = { pitch: 0, y: 0, lastY: 0, t: 0, dark: 0 };
  private frameN = 0;
  // Vectores reutilizados en cada fotograma (sin crear objetos al conducir)
  private tmpDir = new THREE.Vector3();
  private tmpTarget = new THREE.Vector3();
  private static CHASE_LOOK = new THREE.Vector3(0, 1.1, 2.5);
  private road = { name: '', limit: null as number | null, surface: 'fuera' };
  private pending = { meters: 0, seconds: 0 };
  private lastOdo = 0;
  private hbWarnAt = 0;
  private resizeObs: ResizeObserver;
  private disposed = false;
  readonly signals: Signals;
  private traffic: Traffic;
  private peds: Pedestrians;
  private monitor: RulesMonitor;
  private instructor: Instructor;
  private trafficRender: TrafficRenderer;
  /** Reloj del mundo (semáforos), que solo avanza sin pausa. */
  private worldT = 0;
  private pedsOn = true;
  private contacts = 0;
  private slowCar: AICar | null = null;
  private forcedCrossing: { cw: Crosswalk; done: boolean } | null = null;
  /** Faltas de la conducción libre (para las estadísticas). */
  readonly freeEval = new Evaluator();
  private assist = createClutchAssist();
  private assistOn = false;
  private slowAcc = 0;
  private external: ExternalEvent[] = [];
  /** Últimos eventos de normas (para la Fase 6 y para depurar). */
  readonly ruleLog: (RuleEvent & { t: number })[] = [];

  private hemi: THREE.HemisphereLight;
  private weather: Weather = 'despejado';
  scenario: Scenario | null = null;
  private zoneNow: ZoneId | null = null;
  /** Último instante (reloj del mundo) en que el alumno movió la vista hacia un retrovisor. */
  private mirrorGlanceT = -99;
  /** Voz del examinador (en el examen siempre habla si el sonido está activado). */
  private examinerVoice: Instructor | null = null;

  constructor(canvas: HTMLCanvasElement, private container: HTMLElement, settings: Settings, private cb: SimCallbacks = {}, spawnId = 'centro', readonly session: Session | null = null, scenario: Scenario | null = null) {
    this.map = getWorldMap();
    const q = settings.quality;
    // La calidad elegida en Configuración es el nivel de partida (por defecto, Medio); luego se adapta sola.
    const startLevel: QualityLevel = q === 'alta' ? 'alto' : q === 'baja' ? 'bajo' : 'medio';
    this.level = startLevel;
    this.aq = new AdaptiveQuality(window.devicePixelRatio, startLevel);
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: q !== 'baja', powerPreference: 'high-performance' });
    this.renderer.setPixelRatio(this.aq.ratio);
    this.renderer.autoClear = false;
    this.renderer.info.autoReset = false;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1;
    // Sombra real solo del coche del alumno (mapa pequeño y de corto alcance).
    this.shadowsAllowed = settings.shadows;
    this.renderer.shadowMap.enabled = settings.shadows;
    this.renderer.shadowMap.type = THREE.PCFShadowMap;
    // La sombra se calcula una vez por fotograma (no otra vez para cada retrovisor).
    this.renderer.shadowMap.autoUpdate = false;

    const spec = LEVEL_SPEC[startLevel];
    // Color del horizonte: la niebla se funde con la parte baja de la cúpula de cielo.
    const horizon = new THREE.Color(0xdbe6ef);
    this.scene.background = horizon;
    this.scene.fog = new THREE.Fog(horizon, spec.far * 0.3, spec.far * 0.98);
    this.camera = new THREE.PerspectiveCamera(70, 1, 0.1, spec.far);
    this.camera.layers.enable(DETAIL_LAYER);

    this.hemi = new THREE.HemisphereLight(0xd6e6ff, 0x6a6150, 1.45);
    this.scene.add(this.hemi);
    this.sun = new THREE.DirectionalLight(0xffeccc, 2.9);
    this.sun.castShadow = this.shadowsAllowed && spec.shadowMap > 0;
    this.sun.shadow.mapSize.set(spec.shadowMap || 512, spec.shadowMap || 512);
    const sc = this.sun.shadow.camera;
    sc.left = sc.bottom = -6.5;
    sc.right = sc.top = 6.5;
    const sunDist = SUN_OFFSET.length();
    sc.near = sunDist - 20;
    sc.far = sunDist + 20;
    this.sun.shadow.bias = -0.0006;
    this.sun.shadow.normalBias = 0.02;
    this.scene.add(this.sun, this.sun.target);

    this.world = buildWorld(this.map, startLevel);
    this.scene.add(this.world.group);
    this.envRT = makeEnvMap(this.renderer);
    this.blobTex = blobTexture();
    this.car = buildCar(this.shadowsAllowed, this.envRT.texture, this.blobTex);
    this.scene.add(this.car.root);
    this.mirrors = new Mirrors(q);
    this.mirrors.attachSurfaces(this.car.mirrorSurfaces);
    this.sound = new EngineSound(settings.sound, settings.volume);
    this.input = new InputManager(canvas);
    this.cameraMode = settings.defaultCamera;
    this.vehicle = createVehicle();

    // Tráfico, peatones, señales, normas e instructor (Fase 5)
    this.signals = getSignals(this.map);
    const graph = getLaneGraph(this.map, this.signals);
    const env = { map: this.map, signals: this.signals, graph };
    this.scenario = scenario;
    if (scenario && session?.setScenario) session.setScenario(scenario);
    const spawn: Pose = session ? session.setup.pose(env) : scenario ? scenario.spawn : (this.map.spawns.find((p) => p.id === spawnId) ?? this.map.spawns[0]!);
    // Reserva fija de agentes (pooling): la calidad decide cuántos circulan.
    const counts = [AGENTS.cars - AGENTS.highway, AGENTS.highway, AGENTS.peds];
    this.traffic = new Traffic(graph, this.signals, { city: counts[0]!, highway: counts[1]!, seed: scenario?.trafficSeed ?? (Date.now() % 9973) + 1, avoid: spawn });
    this.peds = new Pedestrians(this.signals, counts[2]!, scenario?.pedSeed ?? (Date.now() % 7919) + 3);
    if (session?.kind === 'examen' && settings.sound) this.examinerVoice = new Instructor(true);
    this.monitor = new RulesMonitor(this.signals);
    this.instructor = new Instructor(settings.instructorVoice);
    this.instructor.enabled = settings.instructorText;
    this.trafficRender = new TrafficRenderer(this.signals, counts[0]! + counts[1]!, counts[2]!, this.envRT.texture, this.blobTex);
    this.scene.add(this.trafficRender.group);
    if (session) this.applySetup(session.setup, spawn);
    else if (scenario) this.teleportPose(spawn);
    else this.teleport(spawnId);

    this.applyWeather(scenario?.weather ?? 'despejado');
    this.applyLevel(startLevel);
    this.precompile();
    // Mientras se lee la pantalla de inicio, se preparan las texturas de los otros niveles (de una en una).
    const others = (['medio', 'bajo', 'alto'] as QualityLevel[]).filter((l) => l !== startLevel);
    const prep = () => {
      const l = others.shift();
      if (!l || this.disposed) return;
      this.world.prepare(l);
      this.prepTimer = window.setTimeout(prep, 150);
    };
    this.prepTimer = window.setTimeout(prep, 400);

    this.resizeObs = new ResizeObserver(() => this.resize());
    this.resizeObs.observe(container);
    this.resize();
    document.addEventListener('visibilitychange', this.onVisibility);
    window.addEventListener('pagehide', this.flushStats);
    if (session) this.say(session.kind === 'examen' ? 'Examen práctico: el examinador te dará las indicaciones.' : `Lección: ${session.title}. Mira los objetivos a la derecha.`, 'info', 8);
    else if (this.instructor.enabled) this.instructorSay(Instructor.GREETING, 'info', 9);
    else this.say('Pon el cinturón (B), comprueba punto muerto y gira la llave (I) para arrancar.', 'info', 9);
    this.raf = requestAnimationFrame(this.frame);
  }

  // ------------------------------------------------------------------ ciclo
  /** Primer gesto del usuario: desbloquea el audio y empieza a contar tiempo. */
  begin() {
    this.started = true;
    this.sound.unlock();
    if (this.instructor.enabled && !this.session) this.instructor.greet();
    this.setPaused(false);
  }

  setPaused(p: boolean) {
    if (!this.started && !p) this.started = true;
    if (this.paused === p) return;
    this.paused = p;
    if (p) this.sound.suspend();
    else {
      this.sound.resume();
      this.last = performance.now();
    }
    this.cb.onPauseChange?.(p);
  }

  isPaused() {
    return this.paused;
  }

  private onVisibility = () => {
    if (document.hidden) {
      this.setPaused(true);
      this.flushStats();
    }
  };

  private resize() {
    const w = Math.max(1, this.container.clientWidth);
    const h = Math.max(1, this.container.clientHeight);
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.mirrors.layout(w, h);
  }

  private frame = (now: number) => {
    if (this.disposed) return;
    this.raf = requestAnimationFrame(this.frame);
    const raw = (now - (this.last || now)) / 1000;
    // Delta time limitado a 50 ms: tras un tirón, el mundo no da un salto.
    const dt = Math.min(0.05, raw);
    this.frameDt = dt;
    this.last = now;
    this.measure(now, raw);
    for (const a of this.input.drain()) this.handle(a);
    if (!this.paused) {
      this.acc += dt;
      let n = 0;
      while (this.acc >= STEP && n++ < 12) {
        this.fixed(STEP);
        this.acc -= STEP;
      }
      this.clock += dt;
      this.pending.seconds += dt;
      const odo = this.vehicle.odometerM;
      this.pending.meters += odo - this.lastOdo;
      this.lastOdo = odo;
      if (this.pending.seconds > 15) this.flushStats();
    }
    this.messages = this.messages.filter((m) => m.until > this.clock);
    this.sound.update(this.vehicle.rpm, this.vehicle.throttle, this.vehicle.engineOn && !this.paused);
    this.render();
  };

  /** FPS reales cada segundo y calidad adaptativa. Una pausa larga (pestaña oculta) no cuenta. */
  private measure(now: number, raw: number) {
    if (!this.fpsStart || raw > 0.25) {
      this.fpsStart = now;
      this.fpsFrames = 0;
      return;
    }
    this.fpsFrames++;
    const span = now - this.fpsStart;
    if (span >= 1000) {
      this.fps = Math.round((this.fpsFrames * 1000) / span);
      this.fpsStart = now;
      this.fpsFrames = 0;
      const change = this.aq.sample(this.fps, now / 1000);
      if (change) this.applyQuality(change);
    }
  }

  private applyQuality(c: QualityChange) {
    if (c.level && c.level !== this.level) this.applyLevel(c.level);
    if (c.ratio !== undefined) {
      this.renderer.setPixelRatio(c.ratio);
      this.resize();
    }
  }

  /** Ajusta sombras, distancia de dibujado, detalle y texturas al nivel de calidad. */
  private applyLevel(level: QualityLevel) {
    this.level = level;
    const spec = LEVEL_SPEC[level];
    this.camera.far = spec.far;
    this.camera.updateProjectionMatrix();
    this.applyFog();
    const real = this.shadowsAllowed && spec.shadowMap > 0;
    this.sun.castShadow = real;
    if (real && this.sun.shadow.mapSize.x !== spec.shadowMap) {
      this.sun.shadow.mapSize.set(spec.shadowMap, spec.shadowMap);
      this.sun.shadow.map?.dispose();
      this.sun.shadow.map = null;
    }
    this.car.setBlob(!real);
    this.world.setLevel(level);
    this.mirrors.setRefreshEvery(spec.mirrorEvery);
    // En calidad Baja los retrovisores se desactivan.
    this.mirrors.setLevelEnabled(level !== 'bajo');
    this.mirrors.setFar(Math.min(220, spec.far));
    this.applyDensity();
  }

  /** Niebla: la de la distancia de dibujado o la del tiempo, la más cercana. */
  private applyFog() {
    const spec = LEVEL_SPEC[this.level];
    const w = WEATHER_LOOK[this.weather];
    const fog = this.scene.fog as THREE.Fog;
    fog.near = Math.min(spec.far * 0.3, w.fogNear);
    fog.far = Math.min(spec.far * 0.98, w.fogFar);
  }

  /** Meteorología de la partida (solo aspecto: luz, niebla, cielo y asfalto mojado). */
  applyWeather(w: Weather) {
    this.weather = w;
    const look = WEATHER_LOOK[w];
    this.sun.intensity = look.sun;
    this.hemi.intensity = look.hemi;
    (this.scene.background as THREE.Color).setHex(look.color);
    (this.scene.fog as THREE.Fog).color.setHex(look.color);
    this.world.setWeather(look.tint, look.wet);
    this.applyFog();
  }

  /** Tráfico y peatones: pocos agentes, según el nivel de calidad (y menos aún en el examen). */
  private applyDensity() {
    const f = LEVEL_DENSITY[this.level] * (this.session?.kind === 'examen' ? 0.7 : 1);
    const v = this.vehicle;
    this.traffic.setActive(AGENTS.cars * f, v ? { x: v.x, z: v.z } : null);
    this.peds.setActive(AGENTS.peds * f);
  }

  /**
   * Cambia el escenario antes de empezar (zona, semilla, tiempo): recoloca el
   * coche y vuelve a sortear tráfico y peatones con la semilla. Durante la
   * conducción no se usa (no se crean objetos al conducir).
   */
  setScenario(sc: Scenario) {
    if (this.started) return;
    this.scenario = sc;
    const graph = this.traffic.graph;
    const enabled = this.traffic.enabled;
    this.traffic = new Traffic(graph, this.signals, { city: AGENTS.cars - AGENTS.highway, highway: AGENTS.highway, seed: sc.trafficSeed, avoid: sc.spawn });
    this.traffic.enabled = enabled;
    this.peds = new Pedestrians(this.signals, AGENTS.peds, sc.pedSeed);
    if (this.session?.setScenario) {
      this.session.setScenario(sc);
      const env = { map: this.map, signals: this.signals, graph };
      this.applySetup(this.session.setup, this.session.setup.pose(env));
    } else this.teleportPose(sc.spawn);
    this.applyWeather(sc.weather);
    this.applyDensity();
  }

  /** Escenario a partir de una semilla (y zona opcional). */
  scenarioFor(seed: number, zone?: ZoneId): Scenario {
    return scenarioFrom(this.map, this.signals, seed, zone);
  }

  /** Compila de antemano los shaders con y sin sombra real para que cambiar de nivel no dé tirones. */
  private precompile() {
    if (!this.shadowsAllowed) {
      this.renderer.compile(this.scene, this.camera);
      return;
    }
    const was = this.sun.castShadow;
    for (const on of [true, false]) {
      this.sun.castShadow = on;
      this.renderer.compile(this.scene, this.camera);
    }
    this.sun.castShadow = was;
  }

  private fixed(dt: number) {
    const v = this.vehicle;
    const controls = { ...this.input.sample(dt) };
    if (this.assistOn) controls.clutch = Math.max(controls.clutch, stepClutchAssist(this.assist, v, controls.throttle, controls.brake, dt));
    const L = CAR.wheelbase / 2;
    const fx = v.x + Math.sin(v.heading) * L, fz = v.z + Math.cos(v.heading) * L;
    const rx = v.x - Math.sin(v.heading) * L, rz = v.z - Math.cos(v.heading) * L;
    const info = this.map.query(v.x, v.z);
    const offroad = info.surface === 'fuera' || info.surface === 'isleta' || info.surface === 'mediana';
    const curb = info.surface === 'acera' || info.surface === 'isleta' ? 0.15 : 0;
    const hf = heightAt(fx, fz), hr = heightAt(rx, rz);
    const grade = (hf - hr) / CAR.wheelbase;
    const sub = dt / SUBSTEPS;
    for (let i = 0; i < SUBSTEPS; i++) {
      for (const e of stepVehicle(v, controls, { grade, offroad }, sub)) this.onVehicleEvent(e);
    }
    v.pitch = Math.atan(grade);
    v.y += ((hf + hr) / 2 + curb - v.y) * Math.min(1, dt * 12);
    this.road = { name: info.area === 'maniobras' ? 'Zona de maniobras' : info.road?.name ?? (info.junction ? (info.junction.kind === 'rotonda' ? 'Glorieta de la Constitución' : 'Intersección') : 'Fuera de la vía'), limit: info.surface === 'fuera' ? null : info.limit, surface: info.surface };
    this.collide();
    this.worldT += dt;

    // Tráfico, peatones y normas a 30 Hz
    this.slowAcc += dt;
    if (this.slowAcc >= 1 / 30) {
      const sdt = this.slowAcc;
      this.slowAcc = 0;
      this.stepWorld(sdt);
    }

    if (!this.instructor.enabled && v.handbrake && Math.abs(v.v) > 2 && this.clock > this.hbWarnAt) {
      this.hbWarnAt = this.clock + 6;
      this.say('Llevas el freno de mano puesto (Espacio para quitarlo).', 'warn');
    }
  }

  private playerView(): PlayerView {
    const v = this.vehicle;
    return { x: v.x, z: v.z, heading: v.heading, v: Math.abs(v.v) };
  }

  private stepWorld(dt: number) {
    const v = this.vehicle;
    const player = this.playerView();
    const cws = this.signals.crosswalks;
    if (this.pedsOn) {
      const vehicles = this.traffic.enabled ? [...this.traffic.cars, player] : [player];
      this.peds.step(dt, { vehicleApproaching: (id) => approachingCrosswalk(cws.find((c) => c.id === id)!, vehicles) });
    }
    if (this.traffic.enabled) this.traffic.step(dt, { t: this.worldT, player, crosswalkBusy: (id) => this.pedsOn && this.peds.busy(id) });
    // Lección de peatones: provocar un cruce cuando el alumno se acerca al paso.
    if (this.forcedCrossing && !this.forcedCrossing.done) {
      const c = this.forcedCrossing.cw;
      if (Math.hypot(c.center.x - v.x, c.center.z - v.z) < 42) {
        this.peds.forceCrossing(c);
        this.forcedCrossing.done = true;
      }
    }
    const info = this.map.query(v.x, v.z);
    const zone = zoneAt(this.map, info);
    if (zone) this.zoneNow = zone;
    // Mirar un retrovisor = girar la vista (lateral) o levantarla hacia el espejo interior. Solo en vista interior.
    const first = this.cameraMode === 'primera';
    if (first && (Math.abs(this.input.look.yaw) > 0.3 || this.input.look.pitch > 0.1)) this.mirrorGlanceT = this.worldT;
    if (this.session) this.session.evaluator.zone = this.zoneNow ? zoneDef(this.zoneNow).name : undefined;
    const events = this.monitor.step({
      t: this.worldT, dt, v, info,
      light: (arm) => lightColor(arm.junction.id, arm.axis, this.worldT),
      clearToEnter: this.traffic.enabled ? (arm) => this.traffic.clearToEnter(arm, null) : null,
      leader: this.traffic.enabled ? this.traffic.leaderOf(player) : null,
      crosswalkBusy: (id) => this.pedsOn && this.peds.busy(id),
      external: this.external.splice(0),
      mirrorGlanceT: first ? this.mirrorGlanceT : undefined,
    });
    for (const e of events) {
      this.ruleLog.push({ ...e, t: this.worldT });
      if (this.ruleLog.length > 200) this.ruleLog.shift();
    }
    if (!this.session) this.freeEval.add(events, this.worldT, false);
    // El sistema ya informa de calados y choques; el instructor no lo repite. En el examen no hay consejos.
    // Conducción libre: aviso en pantalla de cada infracción, con su gravedad.
    if (!this.session) {
      for (const e of events) {
        if (e.kind !== 'falta' || e.code === 'calado' || e.code === 'colision') continue;
        const sev = severityOf(e);
        if (sev) this.say(`Infracción ${sev}: ${FAULTS[e.code]!.label}${e.detail ? ` (${e.detail})` : ''}`, 'bad', 5);
      }
    }
    if (!this.session || this.session.coaching) {
      const line = this.instructor.handle(events.filter((e) => e.code !== 'calado' && e.code !== 'colision' && (this.session || e.kind !== 'falta')), this.worldT);
      if (line) this.instructorSay(line.text, line.tone === 'good' ? 'good' : line.tone, 6);
    }
    if (this.session) {
      const lines = this.session.step({
        t: this.worldT, dt, v, info, events, contacts: this.contacts, monitor: this.monitor,
        slowCar: this.slowCar ? { x: this.slowCar.x, z: this.slowCar.z, heading: this.slowCar.heading } : null,
      });
      for (const l of lines) {
        const exam = this.session.kind === 'examen';
        const stripped = exam ? l.replace(/^Examinador: /, '') : l;
        const text = stripped.charAt(0).toUpperCase() + stripped.slice(1);
        this.say(text, l.startsWith('✓') ? 'good' : l.startsWith('Objetivo no') ? 'bad' : 'info', 7);
        const m = this.messages.find((x) => x.text === text);
        if (m && (exam || !l.startsWith('✓'))) m.who = exam ? 'examinador' : 'instructor';
        if (exam) (this.examinerVoice ?? (this.instructor.enabled ? this.instructor : null))?.speakRaw(text);
      }
    }
  }

  /** Coloca el coche y el entorno como pide una lección o el examen. */
  private applySetup(setup: SessionSetup, pose: Pose) {
    this.teleportPose(pose);
    const v = this.vehicle;
    v.belt = setup.belt ?? false;
    v.handbrake = setup.handbrake ?? true;
    v.lights = setup.lights ?? 'apagadas';
    v.gear = setup.gear ?? 'N';
    v.engineOn = setup.engineOn ?? false;
    v.v = (setup.speedKmh ?? 0) / 3.6;
    const G = totalRatio(v.gear);
    v.rpm = v.engineOn ? Math.max(850, Math.abs((v.v * G) / 0.31) * RPM_PER_RADS) : 0;
    this.traffic.enabled = setup.traffic;
    if (setup.slowCar) {
      const lane = this.traffic.graph.get(setup.slowCar.laneId);
      let best = 0;
      lane.pts.forEach((p, i) => {
        if (Math.hypot(p.x - pose.x, p.z - pose.z) < Math.hypot(lane.pts[best]!.x - pose.x, lane.pts[best]!.z - pose.z)) best = i;
      });
      this.traffic.clearAround(pose.x, pose.z, setup.slowCar.aheadM + 60);
      this.slowCar = this.traffic.spawnAt(lane.id, (lane.cum[best]! + setup.slowCar.aheadM) % lane.length, setup.slowCar.kmh);
    }
    if (setup.forceCrossing) {
      const fx = Math.sin(pose.heading), fz = Math.cos(pose.heading);
      let best: { cw: Crosswalk; d: number } | null = null;
      for (const cw of this.signals.crosswalks) {
        const dx = cw.center.x - pose.x, dz = cw.center.z - pose.z;
        const along = dx * fx + dz * fz;
        const lat = Math.abs(-dx * fz + dz * fx);
        if (along > 20 && lat < 3 && (!best || along < best.d)) best = { cw, d: along };
      }
      if (best) this.forcedCrossing = { cw: best.cw, done: false };
    }
  }

  private instructorSay(text: string, kind: MessageKind, seconds: number) {
    this.say(text, kind, seconds);
    const m = this.messages.find((x) => x.text === text);
    if (m) m.who = 'instructor';
  }

  /** Colisiones con edificios, paredes, árboles y la barrera de la mediana. */
  private collide() {
    const v = this.vehicle;
    const sin = Math.sin(v.heading), cos = Math.cos(v.heading);
    const r = CAR.width / 2;
    let hit = 0;
    for (const off of [-1.45, 0, 1.45]) {
      const cx = v.x + sin * off, cz = v.z + cos * off;
      for (const b of this.map.obstaclesNear(cx, cz)) {
        if (cx < b.minX - r || cx > b.maxX + r || cz < b.minZ - r || cz > b.maxZ + r) continue;
        const cp = b.obb ? closestOnObb(b.obb, cx, cz) : { x: Math.max(b.minX, Math.min(cx, b.maxX)), z: Math.max(b.minZ, Math.min(cz, b.maxZ)) };
        const dx = cx - cp.x, dz = cz - cp.z;
        const d = Math.hypot(dx, dz);
        if (d >= r) continue;
        let nx = dx, nz = dz, push = r - d;
        if (d < 1e-4) {
          // Centro dentro del obstáculo: sacar por la cara más cercana.
          if (b.obb) {
            const o = b.obb;
            const lx = (cx - o.cx) * o.ux + (cz - o.cz) * o.uz;
            const lz = -(cx - o.cx) * o.uz + (cz - o.cz) * o.ux;
            if (o.hu - Math.abs(lx) < o.hv - Math.abs(lz)) {
              nx = o.ux * Math.sign(lx || 1); nz = o.uz * Math.sign(lx || 1); push = o.hu - Math.abs(lx) + r;
            } else {
              nx = -o.uz * Math.sign(lz || 1); nz = o.ux * Math.sign(lz || 1); push = o.hv - Math.abs(lz) + r;
            }
          } else {
            const opts = [[cx - b.minX, -1, 0], [b.maxX - cx, 1, 0], [cz - b.minZ, 0, -1], [b.maxZ - cz, 0, 1]] as const;
            const best = opts.reduce((a, o) => (o[0] < a[0] ? o : a));
            nx = best[1];
            nz = best[2];
            push = best[0] + r;
          }
        } else {
          nx /= d;
          nz /= d;
        }
        v.x += nx * push;
        v.z += nz * push;
        this.contact();
        const into = (sin * nx + cos * nz) * v.v;
        if (into < 0) hit = Math.max(hit, -into);
      }
    }
    // Barrera de la mediana de la autovía
    const q = this.map.query(v.x, v.z);
    if (q.road?.median && Math.abs(q.lateral) < q.road.median / 2 + r) {
      const side = q.lateral >= 0 ? 1 : -1;
      const need = q.road.median / 2 + r - Math.abs(q.lateral);
      const rxv = -Math.cos(q.heading), rzv = Math.sin(q.heading);
      v.x += rxv * side * need;
      v.z += rzv * side * need;
      const into = -(sin * rxv + cos * rzv) * side * v.v;
      if (into > 0) hit = Math.max(hit, into);
    }
    // Coches de la IA y peatones
    if (this.traffic.enabled) {
      for (const c of this.traffic.cars) {
        if (Math.abs(c.x - v.x) > 8 || Math.abs(c.z - v.z) > 8) continue;
        const cs = Math.sin(c.heading), cc = Math.cos(c.heading);
        for (const a of [-1.45, 0, 1.45]) {
          for (const b of [-1.45, 0, 1.45]) {
            const px = v.x + sin * a, pz = v.z + cos * a;
            const qx = c.x + cs * b, qz = c.z + cc * b;
            const dx = px - qx, dz = pz - qz;
            const d = Math.hypot(dx, dz);
            if (d >= r * 2 || d < 1e-4) continue;
            const push = r * 2 - d;
            v.x += (dx / d) * push;
            v.z += (dz / d) * push;
            this.contact();
            const rel = (sin * v.v - cs * c.v) * (dx / d) + (cos * v.v - cc * c.v) * (dz / d);
            if (rel < 0) hit = Math.max(hit, -rel);
            c.v = 0;
          }
        }
      }
      for (const p of this.peds.peds) {
        if (Math.abs(p.x - v.x) > 4 || Math.abs(p.z - v.z) > 4) continue;
        for (const a of [-1.45, 0, 1.45]) {
          const px = v.x + sin * a, pz = v.z + cos * a;
          const d = Math.hypot(px - p.x, pz - p.z);
          if (d < r + 0.35) {
            if (Math.abs(v.v) > 0.6 && p.pauseT <= 0) {
              this.external.push('atropello');
              this.say('¡Has atropellado a un peatón!', 'bad', 6);
            }
            this.peds.startle(p, 4);
            v.v = 0;
          }
        }
      }
    }
    // Coches aparcados (zona de maniobras)
    for (const c of PARKED_CARS) {
      if (Math.abs(c.x - v.x) > 7 || Math.abs(c.z - v.z) > 7) continue;
      const cs = Math.sin(c.heading), cc = Math.cos(c.heading);
      for (const a of [-1.45, 0, 1.45]) {
        for (const b of [-1.45, 0, 1.45]) {
          const px = v.x + sin * a, pz = v.z + cos * a;
          const qx = c.x + cs * b, qz = c.z + cc * b;
          const dx = px - qx, dz = pz - qz;
          const d = Math.hypot(dx, dz);
          if (d >= r * 2 || d < 1e-4) continue;
          v.x += (dx / d) * (r * 2 - d);
          v.z += (dz / d) * (r * 2 - d);
          this.contact();
          const rel = sin * v.v * (dx / d) + cos * v.v * (dz / d);
          if (rel < 0) hit = Math.max(hit, -rel);
        }
      }
    }
    // Límites del mundo
    const lim = WORLD_HALF - 5;
    if (Math.abs(v.x) > lim || Math.abs(v.z) > lim) {
      v.x = Math.max(-lim, Math.min(lim, v.x));
      v.z = Math.max(-lim, Math.min(lim, v.z));
      hit = Math.max(hit, Math.abs(v.v));
    }
    if (hit > 0.3) {
      v.v *= -0.15;
      if (hit > 1) {
        this.say(`Colisión a ${Math.round(hit * 3.6)} km/h.`, 'bad');
        this.external.push({ code: 'colision', kmh: hit * 3.6 });
      }
    }
  }

  private onVehicleEvent(e: VehicleEvent) {
    if (e === 'calado') this.external.push('calado');
    const t = EVENT_TEXT[e];
    if (t) this.say(t[0], t[1]);
  }

  private handle(a: Action) {
    const v = this.vehicle;
    if (a.type === 'pause') return this.setPaused(!this.paused);
    if (a.type === 'fps') {
      this.showFps = !this.showFps;
      return;
    }
    if (this.paused) return;
    switch (a.type) {
      case 'gear':
      case 'gearUp':
      case 'gearDown': {
        let g: Gear = a.type === 'gear' ? a.gear : v.gear;
        if (a.type !== 'gear') {
          const order: Gear[] = ['R', 'N', 1, 2, 3, 4, 5];
          const i = order.indexOf(v.gear) + (a.type === 'gearUp' ? 1 : -1);
          g = order[Math.max(0, Math.min(order.length - 1, i))]!;
        }
        if (this.assistOn && g !== v.gear) pressForShift(this.assist, v);
        const ev = shift(v, g);
        if (ev && ev !== 'cambio') this.onVehicleEvent(ev);
        break;
      }
      case 'ignition':
        this.onVehicleEvent(ignition(v));
        break;
      case 'handbrake':
        v.handbrake = !v.handbrake;
        break;
      case 'blinker':
        toggleBlinker(v, a.side);
        break;
      case 'lights':
        cycleLights(v);
        this.say(`Luces: ${v.lights === 'posicion' ? 'de posición' : v.lights}.`, 'info', 2);
        break;
      case 'belt':
        v.belt = !v.belt;
        this.say(v.belt ? 'Cinturón abrochado.' : 'Cinturón desabrochado.', v.belt ? 'info' : 'warn', 2);
        break;
      case 'camera':
        this.setCamera(this.cameraMode === 'primera' ? 'tercera' : 'primera');
        break;
      case 'mirrors':
        this.mirrors.enabled = !this.mirrors.enabled;
        break;
    }
  }

  /** Embrague asistido (para pantallas táctiles). */
  setClutchAssist(on: boolean) {
    this.assistOn = on;
    this.assist = createClutchAssist();
  }

  setTrafficEnabled(on: boolean) {
    this.traffic.enabled = on;
    this.pedsOn = on;
  }

  /** Cuenta roces (con un margen para no contar el mismo golpe en cada paso). */
  private lastContactT = -1;
  private contact() {
    if (this.clock - this.lastContactT > 0.5) this.contacts++;
    this.lastContactT = this.clock;
  }

  setInstructorEnabled(on: boolean) {
    this.instructor.enabled = on;
  }

  setCamera(m: CameraMode) {
    this.cameraMode = m;
    this.chaseInit = false;
  }

  teleport(id: string) {
    const s = this.map.spawns.find((p) => p.id === id) ?? this.map.spawns[0]!;
    this.teleportPose(s);
  }

  teleportPose(s: Pose) {
    const keep = this.vehicle;
    const v = createVehicle(s.x, s.z, s.heading);
    // Conserva los hábitos del alumno pero detiene el coche.
    v.belt = keep.belt;
    v.lights = keep.lights;
    v.fuelL = keep.fuelL;
    v.odometerM = keep.odometerM;
    v.y = heightAt(s.x, s.z);
    this.vehicle = v;
    this.lastOdo = v.odometerM;
    this.traffic?.clearAround(s.x, s.z, 40);
    if (this.signals) this.monitor = new RulesMonitor(this.signals);
    this.chaseInit = false;
    this.input.look.yaw = 0;
    this.input.look.pitch = 0;
  }

  say(text: string, kind: MessageKind = 'info', seconds = 4.5) {
    // Evita repetir el mismo mensaje en cascada.
    const same = this.messages.find((m) => m.text === text);
    if (same) {
      same.until = this.clock + seconds;
      return;
    }
    this.messages = [...this.messages.slice(-2), { id: ++this.msgId, text, kind, until: this.clock + seconds }];
  }

  // ------------------------------------------------------------------ render
  private render() {
    const v = this.vehicle;
    const blinkOn = Math.floor(this.clock * 3) % 2 === 0;
    const fdt = this.frameDt;
    // Faros: el haz en el suelo solo se nota con poca luz (dentro del túnel).
    const inTunnel = v.x > TUNNEL.x0 && v.x < TUNNEL.x1 && Math.abs(v.z - TUNNEL.z) < TUNNEL.halfWidth;
    this.shake.dark += ((inTunnel ? 1 : 0) - this.shake.dark) * Math.min(1, fdt * 3);
    this.car.setDarkness(this.shake.dark);
    this.car.update(v, blinkOn, this.paused ? 0.001 : fdt);
    this.trafficRender.update(this.traffic, this.traffic.enabled ? this.peds : null, this.worldT, blinkOn);
    this.car.root.updateMatrixWorld();
    const first = this.cameraMode === 'primera';
    this.car.setInteriorVisible(first);
    this.mirrors.setInterior(first);
    const cam = this.camera;
    const look = this.input.look;
    if (first) {
      // Movimiento sutil: vibración según velocidad y baches (cambios de altura), suavizado.
      const sh = this.shake;
      const speed = Math.abs(v.v);
      if (!this.paused) sh.t += fdt;
      const bumpV = (v.y - sh.lastY) / Math.max(fdt, 1e-3);
      sh.lastY = v.y;
      const targetY = Math.max(-0.03, Math.min(0.03, -bumpV * 0.004)) + Math.sin(sh.t * 23) * 0.0012 * Math.min(1, speed / 25) * (v.engineOn ? 1 : 0);
      sh.y += (targetY - sh.y) * Math.min(1, fdt * 10);
      const targetPitch = Math.sin(sh.t * 1.7) * 0.0015 * Math.min(1, speed / 20) + Math.max(-0.02, Math.min(0.02, bumpV * 0.003));
      sh.pitch += (targetPitch - sh.pitch) * Math.min(1, fdt * 6);
      const m = this.car.body.matrixWorld;
      cam.position.copy(DRIVER_EYE).applyMatrix4(m);
      cam.position.y += sh.y;
      const pitch = look.pitch - 0.08 + sh.pitch;
      const dir = this.tmpDir.set(Math.sin(look.yaw) * Math.cos(pitch), Math.sin(pitch), Math.cos(look.yaw) * Math.cos(pitch));
      const target = this.tmpTarget.copy(DRIVER_EYE).add(dir).applyMatrix4(m);
      target.y += sh.y;
      cam.up.set(0, 1, 0);
      cam.lookAt(target);
      cam.fov = 72;
      cam.near = 0.05;
    } else {
      const desired = this.tmpDir.set(Math.sin(look.yaw) * -6.8, 2.7, Math.cos(look.yaw) * -6.8).applyMatrix4(this.car.root.matrixWorld);
      if (!this.chaseInit) {
        this.chase.copy(desired);
        this.chaseInit = true;
      }
      this.chase.lerp(desired, 0.12);
      const ground = heightAt(this.chase.x, this.chase.z) + 1;
      if (this.chase.y < ground) this.chase.y = ground;
      cam.position.copy(this.chase);
      cam.lookAt(this.tmpTarget.copy(Simulation.CHASE_LOOK).applyMatrix4(this.car.root.matrixWorld));
      cam.fov = 60;
      cam.near = 0.1;
    }
    cam.updateProjectionMatrix();

    this.world.sky.position.copy(cam.position);
    // Culling por distancia y LOD de los trozos de ciudad (no hace falta en cada fotograma).
    if (this.frameN++ % 4 === 0) this.world.cull(cam.position);
    // La sombra (solo la del coche) sigue al coche.
    this.sun.position.set(v.x + SUN_OFFSET.x, v.y + SUN_OFFSET.y, v.z + SUN_OFFSET.z);
    this.sun.target.position.set(v.x, v.y, v.z);

    this.renderer.info.reset();
    this.renderer.shadowMap.needsUpdate = true;
    this.renderer.setRenderTarget(null);
    this.renderer.clear();
    this.renderer.render(this.scene, cam);
    this.mirrors.render(this.renderer, this.scene, this.car.body, this.frameDt, this.camera);
    this.drawCalls = this.renderer.info.render.calls;
  }

  // ------------------------------------------------------------------ HUD
  hud(): HudState {
    const v = this.vehicle;
    return {
      speedKmh: Math.abs(v.v) * 3.6,
      rpm: v.rpm,
      gear: v.gear,
      engineOn: v.engineOn,
      throttle: v.throttle,
      brake: v.brake,
      clutch: v.clutch,
      slipping: v.clutchSlipping,
      handbrake: v.handbrake,
      lights: v.lights,
      blinker: v.blinker,
      blinkOn: Math.floor(this.clock * 3) % 2 === 0,
      belt: v.belt,
      fuelPct: v.fuelL / CAR.tankLiters,
      odometerKm: v.odometerM / 1000,
      roadName: this.road.name,
      limit: this.road.limit,
      surface: this.road.surface,
      camera: this.cameraMode,
      mirrors: this.mirrors.enabled,
      messages: this.messages,
      paused: this.paused,
      fps: this.fps,
      showFps: this.showFps,
      quality: LEVEL_LABEL[this.level],
      pixelRatio: this.aq.ratio,
      drawCalls: this.drawCalls,
      gamepad: this.input.gamepadName,
      clutchAssist: this.assistOn,
      session: this.session?.view() ?? null,
      ahead: this.monitor.ahead,
      trafficOn: this.traffic.enabled,
      instructorOn: this.instructor.enabled,
      scenario: this.scenario ? { zone: zoneDef(this.scenario.zone).name, seed: this.scenario.seed, weather: WEATHER_LABEL[this.scenario.weather], manual: this.scenario.manualZone } : null,
      zoneNow: this.zoneNow ? zoneDef(this.zoneNow).name : null,
      weather: this.weather,
    };
  }

  /** Cambia entre vista interior y exterior (botón de la pantalla). */
  toggleCamera() {
    this.setCamera(this.cameraMode === 'primera' ? 'tercera' : 'primera');
  }

  /** Triángulos del coche del alumno (presupuesto: 30.000). */
  carTriangles() {
    return this.car.triangles;
  }

  /** Rendimiento (para depurar desde la consola). */
  perf() {
    const i = this.renderer.info;
    return { fps: this.fps, level: this.level, ratio: this.aq.ratio, calls: i.render.calls, triangles: i.render.triangles, textures: i.memory.textures, geometries: i.memory.geometries, chunks: this.world.visibleChunks() };
  }

  /** Fuerza un nivel de calidad (pruebas). */
  debugSetLevel(level: QualityLevel) {
    this.aq.level = level;
    this.applyLevel(level);
  }

  /** Para pruebas y depuración desde la consola. */
  debugState(): Readonly<VehicleState> {
    return this.vehicle;
  }

  private flushStats = () => {
    if (this.pending.meters > 0 || this.pending.seconds > 0) this.cb.onDriveStats?.(this.pending.meters, this.pending.seconds);
    this.pending = { meters: 0, seconds: 0 };
  };

  dispose() {
    this.flushStats();
    this.disposed = true;
    cancelAnimationFrame(this.raf);
    clearTimeout(this.prepTimer);
    document.removeEventListener('visibilitychange', this.onVisibility);
    window.removeEventListener('pagehide', this.flushStats);
    this.resizeObs.disconnect();
    this.input.dispose();
    this.sound.dispose();
    this.mirrors.dispose();
    this.car.dispose();
    this.trafficRender.dispose();
    this.instructor.dispose();
    this.examinerVoice?.dispose();
    this.world.dispose();
    this.envRT.dispose();
    this.blobTex.dispose();
    this.renderer.dispose();
  }
}

export { GEARS };
