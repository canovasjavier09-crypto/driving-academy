/**
 * Vista a pantalla completa del simulador (se carga bajo demanda para no
 * descargar Three.js en las páginas de teoría).
 */
import { useEffect, useRef, useState } from 'react';
import { profileStore, useProfile } from '../core/progress/store';
import { navigate } from '../app/router';
import { ALL_LESSONS } from '../core/progress/curriculum';
import { Simulation, type HudState } from './Simulation';
import type { Session, SessionView } from './lessons/session';
import { LessonSession } from './lessons/session';
import { lessonDef } from './lessons/defs';
import { ExamSession } from './lessons/exam';
import { getWorldMap } from './world/map';
import { getSignals } from './world/signals';
import { getLaneGraph } from './traffic/lanes';
import { ADVICE, type Severity } from './rules/evaluation';
import { loadRecent, MAX_SEED, pickRandom, saveRecent, scenarioFrom, type Scenario } from './scenario';
import { ZONES, type ZoneId } from './world/zones';
import { Hud } from './hud/Hud';
import { TouchControls } from './hud/TouchControls';
import { KEY_HELP } from './input/input';
import { loadPbr } from './world/pbr/library';

function webglAvailable(): boolean {
  try {
    const c = document.createElement('canvas');
    return !!c.getContext('webgl2');
  } catch {
    return false;
  }
}

const coarse = () => typeof matchMedia !== 'undefined' && matchMedia('(pointer: coarse)').matches;
const portraitQuery = () => (typeof matchMedia !== 'undefined' ? matchMedia('(orientation: portrait)') : null);

/** En móvil se conduce en horizontal, como un volante. */
function usePortrait() {
  const [portrait, setPortrait] = useState(() => !!portraitQuery()?.matches);
  useEffect(() => {
    const q = portraitQuery();
    if (!q) return;
    const h = () => setPortrait(q.matches);
    q.addEventListener('change', h);
    return () => q.removeEventListener('change', h);
  }, []);
  return portrait;
}

export type SimMode = { kind: 'libre' } | { kind: 'leccion'; id: string } | { kind: 'examen' };

function createSession(mode: SimMode): Session | null {
  if (mode.kind === 'libre') return null;
  const map = getWorldMap();
  const graph = getLaneGraph(map, getSignals(map));
  if (mode.kind === 'examen' || mode.id === 'l6-examen') return new ExamSession(graph, mode.kind === 'leccion' ? mode.id : 'examen');
  const def = lessonDef(mode.id);
  return def ? new LessonSession(def) : null;
}

const SEV_LABEL: Record<Severity, string> = { eliminatoria: 'Eliminatorias', deficiente: 'Deficientes', leve: 'Leves' };

function fmtTime(sec: number) {
  const m = Math.floor(sec / 60);
  return `${m}:${String(Math.floor(sec % 60)).padStart(2, '0')}`;
}

/** Panel de objetivos de la lección o del examen. */
function SessionPanel({ v }: { v: SessionView }) {
  return (
    <div className="sim-session" aria-live="polite">
      <div className="card-row"><b>{v.title}</b><span className="dim num">{fmtTime(v.elapsed)}</span></div>
      {v.hint && <div className="sim-session-hint">{v.hint}</div>}
      <ul>
        {v.objectives.map((o) => (
          <li key={o.text} className={o.state}><span aria-hidden="true">{o.state === 'hecho' ? '✓' : o.state === 'fallado' ? '✗' : '○'}</span> {o.text}</li>
        ))}
      </ul>
    </div>
  );
}

/** Guarda el resultado de una lección o del examen en el perfil (una sola vez). */
function saveResult(mode: SimMode, v: SessionView) {
  const r = v.result;
  if (!r) return;
  profileStore.update((p) => {
    const practice = { ...p.practice, lessons: { ...p.practice.lessons }, exams: [...p.practice.exams] };
    let xp = 0;
    const lessonId = mode.kind === 'leccion' ? mode.id : null;
    if (lessonId) {
      const prev = practice.lessons[lessonId];
      practice.lessons[lessonId] = {
        completed: (prev?.completed ?? false) || r.passed,
        attempts: (prev?.attempts ?? 0) + 1,
        bestScore: Math.max(prev?.bestScore ?? 0, r.score),
        lastAt: Date.now(),
      };
      xp += r.passed ? (prev?.completed ? 15 : 60) : 5;
    }
    if (v.kind === 'examen') {
      practice.exams.push({
        id: `px-${Date.now()}`, date: new Date().toISOString(), passed: r.passed,
        eliminatory: r.verdict?.eliminatory ?? 0, deficient: r.verdict?.deficient ?? 0, minor: r.verdict?.minor ?? 0,
        durationSec: Math.round(v.elapsed),
      });
      xp += r.passed ? 150 : 25;
    }
    return { ...p, practice, xp: p.xp + xp };
  });
}

/** Siguiente lección del temario tras `id`. */
function nextLessonId(id: string): string | null {
  const i = ALL_LESSONS.findIndex((l) => l.id === id);
  return i >= 0 && i < ALL_LESSONS.length - 1 ? ALL_LESSONS[i + 1]!.id : null;
}

/** Envoltorio que permite repetir la sesión (vuelve a montar el simulador). */
export default function SimRoute({ mode = { kind: 'libre' } }: { mode?: SimMode }) {
  const [run, setRun] = useState(0);
  return <SimView key={run} mode={mode} onRestart={() => setRun((n) => n + 1)} />;
}

function SimView({ mode, onRestart }: { mode: SimMode; onRestart: () => void }) {
  const { settings } = useProfile();
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const [sim, setSim] = useState<Simulation | null>(null);
  const [hud, setHud] = useState<HudState | null>(null);
  const [started, setStarted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  /** Progreso de la generación de texturas (0–1) o null cuando ya está todo cargado. */
  const [load, setLoad] = useState<number | null>(0);
  const [touch, setTouch] = useState(coarse);
  const [showHelp, setShowHelp] = useState(false);
  const [portraitOk, setPortraitOk] = useState(false);
  const portrait = usePortrait();
  // La simulación se crea con los ajustes del momento; cambiarlos exige volver a entrar.
  const initial = useRef(settings);
  const [session] = useState(() => createSession(mode));
  const saved = useRef(false);
  // Escenario (zona de salida + semilla) para la conducción libre y el examen; las lecciones tienen el suyo.
  const usesScenario = mode.kind === 'libre' || mode.kind === 'examen';
  const [scenario, setScenario] = useState<Scenario | null>(() => {
    if (!usesScenario) return null;
    const map = getWorldMap();
    return pickRandom(map, getSignals(map), loadRecent());
  });
  const [zoneChoice, setZoneChoice] = useState<ZoneId | 'aleatorio'>('aleatorio');
  const [seedText, setSeedText] = useState(() => (scenario ? String(scenario.seed) : ''));

  useEffect(() => {
    if (!canvas.current || !wrap.current) return;
    if (!webglAvailable()) {
      setError('Este navegador no tiene WebGL 2 activado. Actualiza Safari (15 o posterior) o activa la aceleración por hardware.');
      return;
    }
    let s: Simulation | null = null;
    let cancelled = false;
    let id = 0;
    // iOS: impedir el zoom con dos dedos sobre el simulador (touch-action no basta en Safari).
    const noGesture = (e: Event) => e.preventDefault();
    document.addEventListener('gesturestart', noGesture);
    // Pantalla de carga: las texturas se generan por código (en workers) antes de crear la escena.
    setLoad(0);
    loadPbr(initial.current.quality, { touch: coarse() }, (p) => !cancelled && setLoad(p))
      .then((lib) => {
        if (cancelled || !canvas.current || !wrap.current) {
          lib.dispose();
          return;
        }
        try {
          s = new Simulation(canvas.current, wrap.current, initial.current, lib, {
            onDriveStats: (m, sec) =>
              profileStore.update((p) => ({ ...p, practice: { ...p.practice, distanceKm: p.practice.distanceKm + m / 1000, timeSec: p.practice.timeSec + sec } })),
          }, 'centro', session, scenario);
        } catch (e) {
          setError(`No se pudo iniciar el simulador 3D: ${e instanceof Error ? e.message : String(e)}`);
          return;
        }
        const sim = s;
        setSim(sim);
        setLoad(null);
        // Acceso de depuración solo en desarrollo.
        if (import.meta.env.DEV) (window as unknown as { __sim?: Simulation }).__sim = sim;
        id = window.setInterval(() => setHud(sim.hud()), 66);
      })
      .catch((e) => setError(`No se pudieron generar las texturas: ${e instanceof Error ? e.message : String(e)}`));
    return () => {
      cancelled = true;
      window.clearInterval(id);
      document.removeEventListener('gesturestart', noGesture);
      delete (window as unknown as { __sim?: Simulation }).__sim;
      if (!s) return;
      // Errores cometidos en esta sesión → «Errores más frecuentes al volante».
      const byLabel = (session?.evaluator ?? s.freeEval).byLabel();
      if (Object.keys(byLabel).length) {
        profileStore.update((p) => {
          const inf = { ...p.practice.infractions };
          for (const [k, n] of Object.entries(byLabel)) inf[k] = (inf[k] ?? 0) + n;
          return { ...p, practice: { ...p.practice, infractions: inf } };
        });
      }
      s.dispose();
    };
  }, []);

  /** Aplica un escenario nuevo antes de empezar. */
  const applyScenario = (sc: Scenario) => {
    setScenario(sc);
    setSeedText(String(sc.seed));
    sim?.setScenario(sc);
    if (sim) setHud(sim.hud());
  };
  const chooseZone = (z: ZoneId | 'aleatorio') => {
    setZoneChoice(z);
    const map = getWorldMap();
    const sg = getSignals(map);
    if (z === 'aleatorio') applyScenario(pickRandom(map, sg, loadRecent()));
    else applyScenario(scenarioFrom(map, sg, 1 + Math.floor(Math.random() * MAX_SEED), z));
  };
  const applySeed = () => {
    const n = Math.floor(Number(seedText));
    if (!Number.isFinite(n) || n < 1 || n > MAX_SEED) return;
    const map = getWorldMap();
    applyScenario(scenarioFrom(map, getSignals(map), n, zoneChoice === 'aleatorio' ? undefined : zoneChoice));
  };

  const start = () => {
    if (scenario) saveRecent(scenario.zone);
    // En pantallas táctiles no hay pie para el embrague: se activa la asistencia (desactivable en la pausa).
    sim?.setClutchAssist(touch);
    sim?.begin();
    setStarted(true);
    canvas.current?.focus();
    // Bloquear en horizontal solo funciona en algunos navegadores (Android a pantalla completa); en iOS se ignora.
    const o = screen.orientation as ScreenOrientation & { lock?: (o: string) => Promise<void> };
    if (touch && o?.lock) o.lock('landscape').catch(() => undefined);
  };
  const exit = () => navigate('/simulador');

  // Fin de la lección o del examen: guardar una vez y pausar.
  const sv = hud?.session ?? null;
  useEffect(() => {
    if (!sv || sv.status === 'activa' || saved.current) return;
    saved.current = true;
    saveResult(mode, sv);
    window.setTimeout(() => sim?.setPaused(true), 2500);
  }, [sv?.status]); // eslint-disable-line react-hooks/exhaustive-deps

  if (error) {
    return (
      <div className="sim-error card">
        <h2>Simulador no disponible</h2>
        <p className="muted" style={{ margin: '8px 0 16px' }}>{error}</p>
        <button className="btn primary" onClick={exit}>Volver</button>
      </div>
    );
  }

  const paused = hud?.paused ?? true;
  return (
    <div className="sim-root" ref={wrap}>
      <canvas ref={canvas} className="sim-canvas" tabIndex={0} aria-label="Vista del simulador de conducción" />
      {load !== null && (
        <div className="sim-loading" role="status" aria-live="polite">
          <div className="sim-loading-box">
            <b>Generando texturas…</b>
            <div className="sim-loading-bar" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(load * 100)}><span style={{ width: `${Math.round(load * 100)}%` }} /></div>
            <span className="dim num">{Math.round(load * 100)} %</span>
          </div>
        </div>
      )}
      {hud && started && <Hud h={hud} />}
      {hud && started && hud.scenario && (
        <div className="sim-scenario" aria-label="Escenario">
          {hud.zoneNow ?? hud.scenario.zone} · semilla <b className="num">{hud.scenario.seed}</b> · {hud.scenario.weather}
        </div>
      )}
      {started && hud?.weather === 'lluvia' && <div className="sim-rain" aria-hidden="true" />}
      {sv && started && sv.status === 'activa' && <SessionPanel v={sv} />}
      {sim && started && touch && !paused && <TouchControls input={sim.input} gear={hud?.gear ?? 'N'} assist={hud?.clutchAssist ?? false} automatic={hud?.automatic ?? false} engineOn={hud?.engineOn ?? false} stalled={!!hud?.stalled} onMessage={(t, k) => sim.say(t, k, 6)} />}
      {started && touch && portrait && !portraitOk && !paused && (
        <div className="sim-rotate" role="dialog" aria-label="Gira el dispositivo">
          <div className="sim-rotate-icon" aria-hidden="true">⟲</div>
          <p>Gira el dispositivo a horizontal: se conduce como un volante.</p>
          <button className="btn small" onClick={() => setPortraitOk(true)}>Seguir en vertical</button>
        </div>
      )}

      {started && !paused && (
        <>
          <button className="sim-pause-btn" onClick={() => sim?.setPaused(true)} aria-label="Pausa">❚❚</button>
          <button className="sim-cam-btn" onClick={() => sim?.toggleCamera()} aria-label={hud?.camera === 'primera' ? 'Cambiar a vista exterior' : 'Cambiar a vista interior'} title="Vista interior / exterior (V)">
            {hud?.camera === 'primera' ? 'Exterior' : 'Interior'}
          </button>
        </>
      )}

      {sv && sv.result && paused && (
        <div className="sim-overlay">
          <div className="sim-panel card" role="dialog" aria-label="Resultado">
            <div className={`result-hero ${sv.result.passed ? 'pass' : 'fail'}`} style={{ padding: 0 }}>
              <div className="big">{sv.kind === 'examen' ? (sv.result.passed ? 'APTO' : 'NO APTO') : sv.result.passed ? '¡Superada!' : 'No superada'}</div>
            </div>
            <p className="muted" style={{ marginTop: 8 }}>{sv.result.summary}</p>
            {sv.kind === 'leccion' && <p style={{ marginTop: 8 }}>Puntuación: <b className="num">{sv.result.score}</b>/100</p>}
            <ul className="sim-result-obj">
              {sv.objectives.map((o) => (
                <li key={o.text} className={o.state}>{o.state === 'hecho' ? '✓' : o.state === 'fallado' ? '✗' : '○'} {o.text}</li>
              ))}
            </ul>
            {(['eliminatoria', 'deficiente', 'leve'] as Severity[]).map((sev) => {
              const list = sv.result!.faults.filter((f) => f.sev === sev);
              if (!list.length) return null;
              return (
                <div key={sev} className="sim-faults">
                  <h3>{SEV_LABEL[sev]} ({list.length})</h3>
                  <ul>{list.map((f, i) => (
                    <li key={i}>
                      <b>{f.label}</b>{f.detail ? ` · ${f.detail}` : ''}
                      <span className="dim">{sv.kind === 'examen' ? ` · ${fmtTime(f.t)}` : ''}{f.zone ? ` · ${f.zone}` : ''}</span>
                      {ADVICE[f.code] && <div className="dim sim-advice">Cómo corregirlo: {ADVICE[f.code]}</div>}
                    </li>
                  ))}</ul>
                </div>
              );
            })}
            {sv.result.faults.length === 0 && <p className="dim" style={{ marginTop: 8 }}>Sin faltas registradas.</p>}
            {sv.result.scenario && (
              <p className="dim" style={{ marginTop: 10 }}>
                Salida: {sv.result.scenario.zone} · semilla <b className="num">{sv.result.scenario.seed}</b> · {sv.result.scenario.weather}. Zonas recorridas: {sv.result.scenario.visited.join(', ')}.
                Para repetir este escenario, introduce la semilla antes de empezar.
              </p>
            )}
            {sv.kind === 'examen' && <p className="dim" style={{ marginTop: 10 }}>Calificación orientativa basada en el sistema de la DGT. No sustituye a una autoescuela ni al examen oficial.</p>}
            <div className="session-actions" style={{ marginTop: 16 }}>
              <button className="btn primary" onClick={onRestart}>Repetir</button>
              {mode.kind === 'leccion' && sv.result.passed && nextLessonId(mode.id) && (
                <button className="btn" onClick={() => navigate(`/simulador/leccion/${nextLessonId(mode.id)}`)}>Siguiente lección</button>
              )}
              <button className="btn" onClick={exit}>Volver</button>
            </div>
          </div>
        </div>
      )}

      {(!started || paused) && !(sv && sv.result && paused) && (
        <div className="sim-overlay">
          <div className="sim-panel card">
            <h2>{started ? 'Pausa' : session ? session.title : 'Conducción libre'}</h2>
            {!started && session && (
              <>
                {session.briefing.map((b) => <p key={b} className="muted" style={{ marginTop: 6 }}>{b}</p>)}
                <ul className="sim-result-obj">{session.objectiveTexts().map((o) => <li key={o}>○ {o}</li>)}</ul>
              </>
            )}
            {!started && !session && (
              <p className="muted" style={{ marginTop: 6 }}>
                Ciudad con calles de uno y dos sentidos, rotonda, barrio en cuesta y autovía con túnel. Turismo manual de 5 marchas.
                Con tráfico, peatones, semáforos y un instructor que te corrige en tiempo real.
              </p>
            )}
            {hud?.gamepad && <p className="dim" style={{ marginTop: 8 }}>Mando detectado: {hud.gamepad}</p>}
            {!started && usesScenario && scenario && (
              <div className="sim-scenario-pick">
                <label>
                  <span className="dim">Zona de salida</span>
                  <select value={zoneChoice} onChange={(e) => chooseZone(e.target.value as ZoneId | 'aleatorio')} aria-label="Zona de salida">
                    <option value="aleatorio">Aleatorio</option>
                    {ZONES.map((z) => <option key={z.id} value={z.id}>{z.name}</option>)}
                  </select>
                </label>
                <label>
                  <span className="dim">Semilla</span>
                  <input className="num" inputMode="numeric" value={seedText} onChange={(e) => setSeedText(e.target.value.replace(/\D/g, '').slice(0, 6))} onKeyDown={(e) => e.key === 'Enter' && applySeed()} aria-label="Semilla" />
                </label>
                <button className="btn small" onClick={applySeed} disabled={!sim}>Usar semilla</button>
                <p className="dim" style={{ gridColumn: '1 / -1' }}>
                  Empiezas en: <b>{ZONES.find((z) => z.id === scenario.zone)!.name}</b> — {ZONES.find((z) => z.id === scenario.zone)!.desc} Tiempo: {hud?.scenario?.weather ?? ''}.
                  {zoneChoice === 'aleatorio' ? ' La zona sale al azar sin repetir las dos últimas.' : ' Zona elegida a mano: para repetir, usa la misma zona y semilla.'}
                </p>
              </div>
            )}
            <div className="session-actions" style={{ marginTop: 16 }}>
              <button className="btn primary" onClick={started ? () => sim?.setPaused(false) : start} disabled={!sim}>
                {started ? 'Continuar' : sim ? 'Empezar' : 'Cargando…'}
              </button>
              <button className="btn" onClick={() => setShowHelp((v) => !v)}>{showHelp ? 'Ocultar controles' : 'Controles'}</button>
              <button className="btn" onClick={exit}>Salir</button>
            </div>
            {started && sim && !session && (
              <div className="sim-options">
                <span className="dim">Ir a:</span>
                {sim.map.spawns.map((s) => (
                  <button key={s.id} className="btn small" onClick={() => { sim.teleport(s.id); sim.setPaused(false); }}>{s.name}</button>
                ))}
              </div>
            )}
            <label className="sim-check">
              <input type="checkbox" checked={touch} onChange={(e) => setTouch(e.target.checked)} /> Mostrar controles táctiles
            </label>
            {sim && (
              <>
                <label className="sim-check">
                  <input type="checkbox" checked={hud?.clutchAssist ?? false} onChange={(e) => { sim.setClutchAssist(e.target.checked); setHud(sim.hud()); }} /> Embrague asistido (pisa y suelta el embrague por ti; tú eliges la marcha)
                </label>
                {!session && (
                  <label className="sim-check">
                    <input type="checkbox" checked={hud?.trafficOn ?? true} onChange={(e) => { sim.setTrafficEnabled(e.target.checked); setHud(sim.hud()); }} /> Tráfico y peatones
                  </label>
                )}
                <label className="sim-check">
                  <input type="checkbox" checked={hud?.instructorOn ?? true} onChange={(e) => { sim.setInstructorEnabled(e.target.checked); setHud(sim.hud()); }} /> Instructor (indicaciones en pantalla{initial.current.instructorVoice ? ' y voz' : ''})
                </label>
              </>
            )}
            {showHelp && (
              <div className="keys">
                {KEY_HELP.map((k) => (
                  <div key={k.keys} className="key-row"><span className="kbd">{k.keys}</span><span>{k.label}</span></div>
                ))}
                <p className="dim" style={{ marginTop: 8 }}>
                  Mando: stick izquierdo dirige, gatillos frenan y aceleran, LB embrague, RB/X suben/bajan marcha, A llave, B freno de mano.
                  Los volantes se detectan con un mapeo genérico (sin probar con hardware real).
                </p>
              </div>
            )}
            <p className="dim" style={{ marginTop: 12 }}>
              Calidad gráfica inicial: {initial.current.quality}{initial.current.shadows ? ', con sombras' : ''}; después se ajusta sola según los FPS. Se cambia en Configuración.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
