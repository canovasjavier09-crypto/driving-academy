/**
 * Dibujo del tráfico (coches de la IA, peatones), semáforos y señales.
 * Todo con InstancedMesh: unas pocas llamadas de dibujo para decenas de objetos.
 * Las señales son simplificaciones de las españolas (R-1, R-2, R-301), sin escala oficial.
 */
import * as THREE from 'three';
import type { PbrLibrary } from '../world/pbr/library';
import { patchProjected, type PbrGlobals } from '../world/pbr/shader';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { heightAt, PARKED_CARS } from '../world/map';
import { lightColor, type Signals } from '../world/signals';
import type { Traffic } from '../traffic/traffic';
import type { Pedestrians } from '../traffic/pedestrians';

type Disposable = { dispose(): void };

function signTexture(draw: (ctx: CanvasRenderingContext2D) => void): THREE.CanvasTexture {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const ctx = c.getContext('2d')!;
  draw(ctx);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  return t;
}

const octagon = (ctx: CanvasRenderingContext2D, r: number) => {
  ctx.beginPath();
  for (let i = 0; i < 8; i++) {
    const a = Math.PI / 8 + (i * Math.PI) / 4;
    ctx.lineTo(64 + r * Math.cos(a), 64 + r * Math.sin(a));
  }
  ctx.closePath();
};
const triangle = (ctx: CanvasRenderingContext2D, inset: number) => {
  ctx.beginPath();
  ctx.moveTo(6 + inset, 14 + inset * 0.6);
  ctx.lineTo(122 - inset, 14 + inset * 0.6);
  ctx.lineTo(64, 118 - inset * 1.2);
  ctx.closePath();
};

const SIGN_DRAW: Record<string, (ctx: CanvasRenderingContext2D, back: boolean) => void> = {
  stop: (ctx, back) => {
    octagon(ctx, 62);
    ctx.fillStyle = back ? '#8a8f98' : '#ffffff';
    ctx.fill();
    if (back) return;
    octagon(ctx, 56);
    ctx.fillStyle = '#c8102e';
    ctx.fill();
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 40px Helvetica, Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('STOP', 64, 66);
  },
  ceda: (ctx, back) => {
    triangle(ctx, 0);
    ctx.fillStyle = back ? '#8a8f98' : '#c8102e';
    ctx.fill();
    if (back) return;
    triangle(ctx, 16);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
  },
  limite: () => undefined,
  // P-21 «Niños»: triángulo de peligro con dos siluetas
  escolar: (ctx, back) => {
    ctx.beginPath();
    ctx.moveTo(64, 6);
    ctx.lineTo(124, 116);
    ctx.lineTo(4, 116);
    ctx.closePath();
    ctx.fillStyle = back ? '#8a8f98' : '#c8102e';
    ctx.fill();
    if (back) return;
    ctx.beginPath();
    ctx.moveTo(64, 26);
    ctx.lineTo(110, 108);
    ctx.lineTo(18, 108);
    ctx.closePath();
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.fillStyle = '#111111';
    for (const [x, s] of [[54, 1], [76, 0.8]] as const) {
      ctx.beginPath();
      ctx.arc(x, 58 + (1 - s) * 10, 6 * s, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillRect(x - 5 * s, 66 + (1 - s) * 10, 10 * s, 18 * s);
      ctx.fillRect(x - 5 * s, 84 + (1 - s) * 6, 4 * s, 14 * s);
      ctx.fillRect(x + 1 * s, 84 + (1 - s) * 6, 4 * s, 14 * s);
    }
  },
};

function limitDraw(value: number) {
  return (ctx: CanvasRenderingContext2D, back: boolean) => {
    ctx.beginPath();
    ctx.arc(64, 64, 62, 0, Math.PI * 2);
    ctx.fillStyle = back ? '#8a8f98' : '#c8102e';
    ctx.fill();
    if (back) return;
    ctx.beginPath();
    ctx.arc(64, 64, 50, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.fillStyle = '#111111';
    ctx.font = `bold ${value >= 100 ? 44 : 54}px Helvetica, Arial, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(String(value), 64, 68);
  };
}

const EMPTY: Traffic['cars'] = [];
const EMPTY_PEDS: Pedestrians['peds'] = [];

const RED_ON = new THREE.Color(0xff2a1a), RED_OFF = new THREE.Color(0x3a0b08);
const AMB_ON = new THREE.Color(0xffb020), AMB_OFF = new THREE.Color(0x3a2a08);
const GRN_ON = new THREE.Color(0x2cff6a), GRN_OFF = new THREE.Color(0x08301a);

export class TrafficRenderer {
  readonly group = new THREE.Group();
  private disposables: Disposable[] = [];
  private bodies: THREE.InstancedMesh;
  private darks: THREE.InstancedMesh;
  private brakes: THREE.InstancedMesh;
  private blinkL: THREE.InstancedMesh;
  private blinkR: THREE.InstancedMesh;
  private pedBodies: THREE.InstancedMesh;
  private pedHeads: THREE.InstancedMesh;
  private lamps: THREE.InstancedMesh;
  private carBlobs: THREE.InstancedMesh;
  private pedBlobs: THREE.InstancedMesh;
  private m = new THREE.Matrix4();
  private q = new THREE.Quaternion();
  private p = new THREE.Vector3();
  private s = new THREE.Vector3(1, 1, 1);
  private up = new THREE.Vector3(0, 1, 0);
  private c = new THREE.Color();
  private parked = PARKED_CARS.map((p, i) => ({ x: p.x, z: p.z, heading: p.heading, color: [0x8f969e, 0xb3261e, 0xe8e3d3, 0x1d3f8a, 0x40464f][i % 5]!, braking: false, blinker: null as null | 'izquierda' | 'derecha' }));

  constructor(private signals: Signals, maxCars: number, maxPeds: number, envMap: THREE.Texture | null = null, blobMap: THREE.Texture | null = null, pbr: { lib: PbrLibrary; globals: PbrGlobals } | null = null) {
    // Metal de postes de semáforo y de señal: arañazos, cepillado y puntos de óxido.
    const metal = <T extends THREE.Material>(m: T) => {
      if (pbr) patchProjected(m, pbr.lib.get('metal'), pbr.globals, { space: 'world', tile: 0.8, albedo: 1.15, detail: 0 });
      return m;
    };
    const G = <T extends THREE.BufferGeometry>(g: T) => (this.disposables.push(g), g);
    const M = <T extends THREE.Material>(m: T) => (this.disposables.push(m), m);

    // --- Coches de la IA (frente hacia +Z, origen en el suelo)
    const body = new THREE.BoxGeometry(1.76, 0.62, 4.25);
    body.translate(0, 0.6, 0);
    const hood = new THREE.BoxGeometry(1.6, 0.5, 2.1);
    hood.translate(0, 1.15, -0.3);
    maxCars += PARKED_CARS.length;
    // Carrocería con reflejos del mapa de entorno estático (sin reflejos en tiempo real).
    this.bodies = new THREE.InstancedMesh(G(mergeGeometries([body, hood])!), M(new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.4, roughness: 0.38, envMap, envMapIntensity: 1 })), maxCars);
    body.dispose();
    hood.dispose();
    const parts: THREE.BufferGeometry[] = [];
    const glass = new THREE.BoxGeometry(1.62, 0.42, 2.0);
    glass.translate(0, 1.16, -0.3);
    parts.push(glass);
    for (const [x, z] of [[0.78, 1.3], [-0.78, 1.3], [0.78, -1.3], [-0.78, -1.3]] as const) {
      const w = new THREE.CylinderGeometry(0.31, 0.31, 0.22, 10);
      w.rotateZ(Math.PI / 2);
      w.translate(x, 0.31, z);
      parts.push(w);
    }
    this.darks = new THREE.InstancedMesh(G(mergeGeometries(parts)!), M(new THREE.MeshLambertMaterial({ color: 0x1a1f27 })), maxCars);
    parts.forEach((g) => g.dispose());
    const brake = mergeGeometries([0.55, -0.55].map((x) => new THREE.BoxGeometry(0.36, 0.14, 0.05).translate(x, 0.76, -2.15)))!;
    this.brakes = new THREE.InstancedMesh(G(brake), M(new THREE.MeshBasicMaterial({ color: 0xffffff })), maxCars);
    const blink = (x: number) => mergeGeometries([2.15, -2.15].map((z) => new THREE.BoxGeometry(0.14, 0.1, 0.05).translate(x, 0.74, z)))!;
    this.blinkL = new THREE.InstancedMesh(G(blink(0.8)), M(new THREE.MeshBasicMaterial({ color: 0xffa21a })), maxCars);
    this.blinkR = new THREE.InstancedMesh(G(blink(-0.8)), M(new THREE.MeshBasicMaterial({ color: 0xffa21a })), maxCars);
    // Sombras falsas (solo el coche del alumno tiene sombra real)
    const blobMat = M(new THREE.MeshBasicMaterial({ color: 0x000000, alphaMap: blobMap, transparent: true, opacity: 0.55, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -1 }));
    this.carBlobs = new THREE.InstancedMesh(G(new THREE.PlaneGeometry(2.5, 5.1).rotateX(-Math.PI / 2).translate(0, 0.04, 0)), blobMat, maxCars);
    this.carBlobs.renderOrder = 1;
    for (const im of [this.bodies, this.darks, this.brakes, this.blinkL, this.blinkR, this.carBlobs]) {
      im.frustumCulled = false;
      im.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
      this.group.add(im);
    }

    // --- Peatones
    const torso = new THREE.CylinderGeometry(0.2, 0.17, 1.35, 8);
    torso.translate(0, 0.68, 0);
    this.pedBodies = new THREE.InstancedMesh(G(torso), M(new THREE.MeshLambertMaterial({ color: 0xffffff })), maxPeds);
    const head = new THREE.SphereGeometry(0.13, 10, 8);
    head.translate(0, 1.52, 0);
    this.pedHeads = new THREE.InstancedMesh(G(head), M(new THREE.MeshLambertMaterial({ color: 0xd9a77f })), maxPeds);
    this.pedBlobs = new THREE.InstancedMesh(G(new THREE.PlaneGeometry(0.9, 0.9).rotateX(-Math.PI / 2).translate(0, 0.03, 0)), blobMat, maxPeds);
    this.pedBlobs.renderOrder = 1;
    for (const im of [this.pedBodies, this.pedHeads, this.pedBlobs]) {
      im.frustumCulled = false;
      im.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
      this.group.add(im);
    }

    // --- Semáforos: báculo, carcasa y tres lámparas por cabeza
    const heads = signals.lights;
    const poleG = G(new THREE.CylinderGeometry(0.07, 0.08, 3.4, 6).translate(0, 1.7, 0));
    const housingG = G(new THREE.BoxGeometry(0.34, 0.95, 0.24).translate(0, 3.0, 0));
    const poles = new THREE.InstancedMesh(poleG, metal(M(new THREE.MeshLambertMaterial({ color: 0x454c5c }))), heads.length);
    const housings = new THREE.InstancedMesh(housingG, M(new THREE.MeshLambertMaterial({ color: 0x1b1e24 })), heads.length);
    this.lamps = new THREE.InstancedMesh(G(new THREE.SphereGeometry(0.1, 10, 8)), M(new THREE.MeshBasicMaterial({ color: 0xffffff })), heads.length * 3);
    heads.forEach((h, i) => {
      this.q.setFromAxisAngle(this.up, h.facing);
      this.m.compose(this.p.set(h.x, heightAt(h.x, h.z) + 0.15, h.z), this.q, this.s.set(1, 1, 1));
      poles.setMatrixAt(i, this.m);
      housings.setMatrixAt(i, this.m);
      for (let k = 0; k < 3; k++) {
        const local = new THREE.Vector3(0, 3.3 - k * 0.3, 0.13).applyQuaternion(this.q);
        this.m.compose(this.p.set(h.x + local.x, heightAt(h.x, h.z) + 0.15 + local.y, h.z + local.z), this.q, this.s);
        this.lamps.setMatrixAt(i * 3 + k, this.m);
        this.lamps.setColorAt(i * 3 + k, RED_OFF);
      }
    });
    this.group.add(poles, housings, this.lamps);

    // --- Señales verticales
    const kinds = new Map<string, typeof signals.signs>();
    for (const sg of signals.signs) {
      const k = sg.kind === 'limite' ? `limite-${sg.value}` : sg.kind;
      const list = kinds.get(k);
      if (list) list.push(sg);
      else kinds.set(k, [sg]);
    }
    const signPoles = new THREE.InstancedMesh(G(new THREE.CylinderGeometry(0.04, 0.04, 2.1, 6).translate(0, 1.05, 0)), metal(M(new THREE.MeshLambertMaterial({ color: 0xa6adb9 }))), signals.signs.length);
    let pi = 0;
    const plane = G(new THREE.PlaneGeometry(0.8, 0.8));
    for (const [k, list] of kinds) {
      const draw = k.startsWith('limite-') ? limitDraw(Number(k.slice(7))) : SIGN_DRAW[k]!;
      const front = signTexture((ctx) => draw(ctx, false));
      const back = signTexture((ctx) => draw(ctx, true));
      this.disposables.push(front, back);
      const fm = new THREE.InstancedMesh(plane, M(new THREE.MeshLambertMaterial({ map: front, transparent: true, alphaTest: 0.5 })), list.length);
      const bm = new THREE.InstancedMesh(plane, M(new THREE.MeshLambertMaterial({ map: back, transparent: true, alphaTest: 0.5 })), list.length);
      list.forEach((sg, i) => {
        const y = heightAt(sg.x, sg.z) + 0.15;
        this.q.setFromAxisAngle(this.up, sg.facing);
        this.m.compose(this.p.set(sg.x, y, sg.z), this.q, this.s.set(1, 1, 1));
        signPoles.setMatrixAt(pi++, this.m);
        const off = new THREE.Vector3(0, 2.15, 0.05).applyQuaternion(this.q);
        this.m.compose(this.p.set(sg.x + off.x, y + off.y, sg.z + off.z), this.q, this.s);
        fm.setMatrixAt(i, this.m);
        const qb = this.q.clone().multiply(new THREE.Quaternion().setFromAxisAngle(this.up, Math.PI));
        const offB = new THREE.Vector3(0, 2.15, 0.03).applyQuaternion(this.q);
        this.m.compose(this.p.set(sg.x + offB.x, y + offB.y, sg.z + offB.z), qb, this.s);
        bm.setMatrixAt(i, this.m);
      });
      this.group.add(fm, bm);
    }
    this.group.add(signPoles);

    // --- Líneas de detención (continuas en STOP/semáforo, discontinuas en ceda el paso)
    const pos: number[] = [];
    for (const l of signals.stopLines) {
      const len = Math.hypot(l.b.x - l.a.x, l.b.z - l.a.z);
      const ux = (l.b.x - l.a.x) / len, uz = (l.b.z - l.a.z) / len;
      const nx = -uz * 0.2, nz = ux * 0.2;
      const pieces: [number, number][] = l.dashed ? Array.from({ length: Math.floor(len / 0.9) }, (_, i) => [i * 0.9, i * 0.9 + 0.5] as [number, number]) : [[0, len]];
      for (const [t0, t1] of pieces) {
        const a = { x: l.a.x + ux * t0, z: l.a.z + uz * t0 };
        const b = { x: l.a.x + ux * t1, z: l.a.z + uz * t1 };
        const y = (x: number, z: number) => heightAt(x, z) + 0.035;
        const P = [[a.x - nx, a.z - nz], [b.x - nx, b.z - nz], [b.x + nx, b.z + nz], [a.x + nx, a.z + nz]] as const;
        const tri = (i: number, j: number, k: number) => {
          for (const idx of [i, j, k]) pos.push(P[idx]![0], y(P[idx]![0], P[idx]![1]), P[idx]![1]);
        };
        // Orientación hacia arriba
        const cross = (P[1]![0] - P[0]![0]) * (P[2]![1] - P[0]![1]) - (P[1]![1] - P[0]![1]) * (P[2]![0] - P[0]![0]);
        if (cross < 0) {
          tri(0, 1, 2);
          tri(0, 2, 3);
        } else {
          tri(0, 2, 1);
          tri(0, 3, 2);
        }
      }
    }
    const lineGeo = G(new THREE.BufferGeometry());
    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
    lineGeo.computeVertexNormals();
    const lines = new THREE.Mesh(lineGeo, M(new THREE.MeshLambertMaterial({ color: 0xf2f2ee, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 })));
    lines.renderOrder = 1;
    this.group.add(lines);

    // Crear los buffers de color desde el principio (el shader debe compilarse con color por instancia).
    const white = new THREE.Color(0xffffff);
    for (const im of [this.bodies, this.brakes, this.pedBodies]) for (let i = 0; i < im.count; i++) im.setColorAt(i, white);
    for (const o of this.group.children) {
      if (o instanceof THREE.InstancedMesh) this.disposables.push(o);
    }
  }

  update(traffic: Traffic | null, peds: Pedestrians | null, t: number, blinkOn: boolean) {
    // Coches (tráfico + aparcados en la zona de maniobras)
    // Sin crear arrays ni objetos por fotograma: se recorren las dos listas.
    const moving = traffic?.enabled ? traffic.cars : EMPTY;
    // Nunca más instancias que las reservadas en los buffers (evita errores de WebGL).
    const total = Math.min(moving.length + this.parked.length, this.bodies.instanceMatrix.count);
    let nl = 0, nr = 0;
    for (let i = 0; i < total; i++) {
      const c = i < moving.length ? moving[i]! : this.parked[i - moving.length]!;
      this.q.setFromAxisAngle(this.up, c.heading);
      this.m.compose(this.p.set(c.x, heightAt(c.x, c.z), c.z), this.q, this.s.set(1, 1, 1));
      this.bodies.setMatrixAt(i, this.m);
      this.darks.setMatrixAt(i, this.m);
      this.brakes.setMatrixAt(i, this.m);
      this.carBlobs.setMatrixAt(i, this.m);
      this.bodies.setColorAt(i, this.c.setHex(c.color));
      this.brakes.setColorAt(i, this.c.setHex(c.braking ? 0xff2a1a : 0x4a0d0d));
      if (blinkOn && c.blinker === 'izquierda') this.blinkL.setMatrixAt(nl++, this.m);
      if (blinkOn && c.blinker === 'derecha') this.blinkR.setMatrixAt(nr++, this.m);
    }
    for (const im of [this.bodies, this.darks, this.brakes, this.carBlobs]) {
      im.count = total;
      im.instanceMatrix.needsUpdate = true;
      if (im.instanceColor) im.instanceColor.needsUpdate = true;
    }
    this.blinkL.count = nl;
    this.blinkR.count = nr;
    this.blinkL.instanceMatrix.needsUpdate = this.blinkR.instanceMatrix.needsUpdate = true;

    // Peatones (con un leve balanceo al andar)
    const list = peds?.peds ?? EMPTY_PEDS;
    const nPeds = Math.min(list.length, this.pedBodies.instanceMatrix.count);
    for (let i = 0; i < nPeds; i++) {
      const p = list[i]!;
      const moving = p.state !== 'wait' && p.pauseT <= 0;
      const bob = moving ? Math.abs(Math.sin(p.phase)) * 0.05 : 0;
      this.q.setFromAxisAngle(this.up, p.heading);
      this.m.compose(this.p.set(p.x, p.y, p.z), this.q, this.s.set(1, 1, 1));
      this.pedBlobs.setMatrixAt(i, this.m);
      this.m.compose(this.p.set(p.x, p.y + bob, p.z), this.q, this.s);
      this.pedBodies.setMatrixAt(i, this.m);
      this.pedHeads.setMatrixAt(i, this.m);
      this.pedBodies.setColorAt(i, this.c.setHex(p.color));
    }
    for (const im of [this.pedBodies, this.pedHeads, this.pedBlobs]) {
      im.count = nPeds;
      im.instanceMatrix.needsUpdate = true;
      if (im.instanceColor) im.instanceColor.needsUpdate = true;
    }

    // Semáforos
    const lights = this.signals.lights;
    for (let i = 0; i < lights.length; i++) {
      const h = lights[i]!;
      const col = lightColor(h.junctionId, h.axis, t);
      this.lamps.setColorAt(i * 3, col === 'rojo' ? RED_ON : RED_OFF);
      this.lamps.setColorAt(i * 3 + 1, col === 'ambar' ? AMB_ON : AMB_OFF);
      this.lamps.setColorAt(i * 3 + 2, col === 'verde' ? GRN_ON : GRN_OFF);
    }
    if (this.lamps.instanceColor) this.lamps.instanceColor.needsUpdate = true;
  }

  dispose() {
    for (const d of this.disposables) d.dispose();
  }
}
