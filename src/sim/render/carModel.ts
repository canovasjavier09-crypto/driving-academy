/**
 * Coche del alumno: un compacto de 5 puertas (tipo hatchback actual)
 * modelado por código, sin modelos externos.
 *
 * - Carrocería por secciones (loft de superelipses) con curvas suaves,
 *   pasos de rueda, capó con pliegues, juntas y guardabarros marcados.
 * - Habitáculo acristalado con montantes A, B y C y techo en color carrocería.
 * - Faros y pilotos con forma, cristal y lámpara emisiva; haz de luz en el
 *   suelo cuando hay poca luz (túnel).
 * - Ruedas con neumático y llanta de 5 radios que giran con la velocidad y
 *   pivotan con la dirección.
 * - Suspensión simulada: la carrocería cabecea al frenar/acelerar y balancea
 *   en curva (muelle amortiguado, solo visual).
 * - Interior para la vista en primera persona: salpicadero, cuadro de
 *   instrumentos en canvas (se redibuja solo si cambian los valores),
 *   volante, montantes A, techo, retrovisores con la imagen de los espejos y
 *   reflejo falso del salpicadero en el parabrisas.
 *
 * Origen: suelo, centro entre ejes. Frente hacia +Z local. Volante a la izquierda (+X local).
 * Presupuesto: < 30.000 triángulos (ver `triangles`).
 */
import * as THREE from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { CAR } from '../vehicle/specs';
import type { VehicleState } from '../vehicle/vehicle';
import { decorTexture, shapeTexture } from './mirrorLook';

export const DRIVER_EYE = new THREE.Vector3(0.37, 1.17, -0.12);
/** Capa que solo dibuja la cámara principal (la misma que los detalles del mundo). */
export const INTERIOR_LAYER = 1;

export interface CarModel {
  root: THREE.Group;
  /** Carrocería suspendida (cabecea y balancea); la cámara interior y los espejos van con ella. */
  body: THREE.Group;
  /** Superficies de los retrovisores en la vista interior (reciben la textura de los espejos). */
  mirrorSurfaces: { top: THREE.Mesh; left: THREE.Mesh; right: THREE.Mesh };
  /** Triángulos de todo el coche (para comprobar el presupuesto). */
  triangles: number;
  update(s: VehicleState, blinkOn: boolean, dt?: number): void;
  setInteriorVisible(v: boolean): void;
  /** Sombra falsa bajo el coche (cuando no hay sombra real). */
  setBlob(v: boolean): void;
  /** 0 = pleno día, 1 = oscuridad (túnel): intensidad del haz de los faros en el suelo. */
  setDarkness(k: number): void;
  dispose(): void;
}

// ---------------------------------------------------------------- perfiles
const HALF_L = CAR.length / 2; // 2,1 m
const AXLE = CAR.wheelbase / 2; // 1,3 m
const ARCH_R = 0.42;

/** Bulto suave centrado en c con anchura w. */
const bump = (x: number, c: number, w: number) => Math.exp(-(((x - c) / w) ** 2));

/** Semianchura de la carrocería inferior. */
function bodyW(z: number) {
  let w = 0.885;
  if (z > 1.65) w -= 0.22 * ((z - 1.65) / 0.45) ** 2; // morro
  if (z < -1.8) w -= 0.1 * ((-1.8 - z) / 0.3) ** 2; // trasera
  // Guardabarros ensanchados sobre las ruedas
  w += 0.02 * (bump(z, AXLE, 0.35) + bump(z, -AXLE, 0.35));
  return w;
}

/** Altura superior de la carrocería inferior (capó delante, línea de cintura detrás). */
function bodyTop(z: number) {
  if (z > 0.95) return 0.885 - 0.13 * ((z - 0.95) / (HALF_L - 0.95)) ** 1.6; // capó inclinado
  if (z < -1.78) return 0.985 - 0.16 * ((-1.78 - z) / 0.32) ** 1.5; // portón
  return 0.9 + 0.08 * ((0.95 - z) / 2.73); // cintura ascendente
}

function bodyBottom(z: number) {
  let y = 0.22;
  if (z > 1.8) y += 0.2 * ((z - 1.8) / 0.3) ** 2;
  if (z < -1.85) y += 0.16 * ((-1.85 - z) / 0.25) ** 2;
  // Pasos de rueda
  for (const zw of [AXLE, -AXLE]) {
    const d = (z - zw) / ARCH_R;
    if (Math.abs(d) < 1) y = Math.max(y, 0.13 + 0.56 * Math.sqrt(1 - d * d));
  }
  return y;
}

/** Borde superior del parabrisas (z local). */
const WS_TOP = 0.36;

/** Altura del techo del habitáculo (parabrisas, techo, luneta). */
function cabinTop(z: number) {
  if (z > WS_TOP) return 1.44 - (1.44 - bodyTop(0.98)) * ((z - WS_TOP) / (0.98 - WS_TOP)) ** 1.15; // parabrisas
  if (z < -1.28) return 1.45 - (1.45 - 1.0) * ((-1.28 - z) / 0.66) ** 1.4; // luneta
  return 1.44 + 0.012 * Math.cos(((z + 0.6) / 0.7) * 1.2); // techo con ligera curva
}

const sgnPow = (v: number, p: number) => Math.sign(v) * Math.abs(v) ** p;

interface Section {
  z: number;
  yb: number;
  yt: number;
  /** Semianchura abajo y arriba (trapecio redondeado). */
  wb: number;
  wt: number;
}

/**
 * Superficie por secciones: cada sección es una superelipse (exponente `n`)
 * en un trapecio. `deform` permite pliegues. Devuelve una geometría indexada
 * con normales suaves y, si se da `classify`, grupos de material por cara.
 */
function loft(sections: Section[], ring: number, n: number, opts: { deform?: (x: number, y: number, s: Section, top: boolean) => number; classify?: (c: THREE.Vector3, nrm: THREE.Vector3, s: Section) => number; caps?: boolean } = {}) {
  const pos: number[] = [];
  const e = 2 / n;
  for (const s of sections) {
    const yc = (s.yb + s.yt) / 2, h = (s.yt - s.yb) / 2;
    for (let k = 0; k < ring; k++) {
      const t = (k / ring) * Math.PI * 2;
      const uy = sgnPow(Math.sin(t), e);
      const ux = sgnPow(Math.cos(t), e);
      const f = (uy + 1) / 2;
      const x = ux * (s.wb + (s.wt - s.wb) * f);
      let y = yc + uy * h;
      if (opts.deform) y += opts.deform(x, y, s, uy > 0.2);
      pos.push(x, y, s.z);
    }
  }
  const groups: number[][] = [[], [], []];
  const tmpC = new THREE.Vector3(), tmpN = new THREE.Vector3(), a = new THREE.Vector3(), b = new THREE.Vector3(), c = new THREE.Vector3();
  const P = (i: number, v: THREE.Vector3) => v.set(pos[i * 3]!, pos[i * 3 + 1]!, pos[i * 3 + 2]!);
  const d = new THREE.Vector3();
  const classOf = (i0: number, i1: number, i2: number, i3: number, s: Section) => {
    if (!opts.classify) return 0;
    P(i0, a); P(i1, b); P(i2, c); P(i3, d);
    tmpC.copy(a).add(b).add(c).add(d).multiplyScalar(0.25);
    tmpN.subVectors(c, a).cross(d.clone().sub(b)).normalize();
    return opts.classify(tmpC, tmpN, s);
  };
  const push = (i0: number, i1: number, i2: number, s: Section, g = -1) => {
    if (g < 0) {
      g = 0;
      if (opts.classify) {
        P(i0, a); P(i1, b); P(i2, c);
        tmpC.copy(a).add(b).add(c).multiplyScalar(1 / 3);
        tmpN.subVectors(b, a).cross(c.clone().sub(a)).normalize();
        g = opts.classify(tmpC, tmpN, s);
      }
    }
    groups[g]!.push(i0, i1, i2);
  };
  for (let i = 0; i < sections.length - 1; i++) {
    for (let k = 0; k < ring; k++) {
      const k1 = (k + 1) % ring;
      const p0 = i * ring + k, p1 = i * ring + k1, p2 = (i + 1) * ring + k1, p3 = (i + 1) * ring + k;
      // Orientación: normales hacia fuera (secciones de −z a +z, anillo en sentido antihorario visto desde +z)
      // Misma clase para los dos triángulos del cuadrilátero (bordes limpios entre luna y montante)
      const g = classOf(p0, p1, p2, p3, sections[i]!);
      push(p0, p1, p2, sections[i]!, g);
      push(p0, p2, p3, sections[i]!, g);
    }
  }
  if (opts.caps !== false) {
    for (const [si, flip] of [[0, true], [sections.length - 1, false]] as const) {
      const s = sections[si]!;
      const ci = pos.length / 3;
      let sx = 0, sy = 0;
      for (let k = 0; k < ring; k++) {
        sx += pos[(si * ring + k) * 3]!;
        sy += pos[(si * ring + k) * 3 + 1]!;
      }
      pos.push(sx / ring, sy / ring, s.z + (flip ? -0.02 : 0.02));
      for (let k = 0; k < ring; k++) {
        const k1 = (k + 1) % ring;
        if (flip) push(ci, si * ring + k1, si * ring + k, s);
        else push(ci, si * ring + k, si * ring + k1, s);
      }
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  const all: number[] = [];
  let start = 0;
  groups.forEach((list, gi) => {
    if (!list.length) return;
    all.push(...list);
    g.addGroup(start, list.length, gi);
    start += list.length;
  });
  g.setIndex(all);
  g.computeVertexNormals();
  return g;
}

/** Forma redondeada para faros/pilotos/calandra. */
function roundedShape(pts: [number, number][], r: number) {
  const s = new THREE.Shape();
  const n = pts.length;
  for (let i = 0; i < n; i++) {
    const p = pts[i]!, prev = pts[(i - 1 + n) % n]!, next = pts[(i + 1) % n]!;
    const d0 = Math.hypot(p[0] - prev[0], p[1] - prev[1]), d1 = Math.hypot(next[0] - p[0], next[1] - p[1]);
    const rr = Math.min(r, d0 / 2, d1 / 2);
    const a: [number, number] = [p[0] + ((prev[0] - p[0]) / d0) * rr, p[1] + ((prev[1] - p[1]) / d0) * rr];
    const b: [number, number] = [p[0] + ((next[0] - p[0]) / d1) * rr, p[1] + ((next[1] - p[1]) / d1) * rr];
    if (i === 0) s.moveTo(a[0], a[1]);
    else s.lineTo(a[0], a[1]);
    s.quadraticCurveTo(p[0], p[1], b[0], b[1]);
  }
  s.closePath();
  return s;
}

/** Copia no indexada (sin aviso si ya lo es). */
const ni = (g: THREE.BufferGeometry): THREE.BufferGeometry => (g.index ? g.toNonIndexed() : g);

const stripUv = (g: THREE.BufferGeometry) => {
  g.deleteAttribute('uv');
  return g;
};

// ---------------------------------------------------------------- cuadro de instrumentos
function drawCluster(ctx: CanvasRenderingContext2D, kmh: number, rpm: number, gear: string, lights: { blinkL: boolean; blinkR: boolean; brake: boolean; engine: boolean; beam: boolean }) {
  const W = 256, H = 128;
  ctx.fillStyle = '#05070b';
  ctx.fillRect(0, 0, W, H);
  const dial = (cx: number, value: number, max: number, red: number, label: string, major: number) => {
    const R = 54, a0 = Math.PI * 0.75, span = Math.PI * 1.5;
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#2a3a55';
    ctx.beginPath();
    ctx.arc(cx, 64, R, a0, a0 + span);
    ctx.stroke();
    if (red < max) {
      ctx.strokeStyle = '#b3261e';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(cx, 64, R - 2, a0 + span * (red / max), a0 + span);
      ctx.stroke();
    }
    ctx.fillStyle = '#9fb3d1';
    ctx.font = '9px Helvetica, Arial, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    for (let v = 0; v <= max; v += major) {
      const a = a0 + span * (v / max);
      ctx.strokeStyle = '#cfe0ff';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(a) * (R - 7), 64 + Math.sin(a) * (R - 7));
      ctx.lineTo(cx + Math.cos(a) * R, 64 + Math.sin(a) * R);
      ctx.stroke();
      ctx.fillText(String(label === 'x1000' ? v / 1000 : v), cx + Math.cos(a) * (R - 16), 64 + Math.sin(a) * (R - 16));
    }
    const a = a0 + span * Math.min(1, value / max);
    ctx.strokeStyle = '#ff5a3c';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(cx, 64);
    ctx.lineTo(cx + Math.cos(a) * (R - 6), 64 + Math.sin(a) * (R - 6));
    ctx.stroke();
    ctx.fillStyle = '#1d2a40';
    ctx.beginPath();
    ctx.arc(cx, 64, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#6f84a6';
    ctx.font = '8px Helvetica, Arial, sans-serif';
    ctx.fillText(label === 'x1000' ? 'rpm ×1000' : 'km/h', cx, 96);
  };
  dial(64, rpm, 7000, 6000, 'x1000', 1000);
  dial(192, kmh, 200, 999, 'kmh', 20);
  ctx.fillStyle = '#e8f0ff';
  ctx.font = 'bold 16px Helvetica, Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(String(Math.round(kmh)), 192, 80);
  ctx.fillStyle = '#7cc4ff';
  ctx.font = 'bold 15px Helvetica, Arial, sans-serif';
  ctx.fillText(gear, 128, 64);
  const tell = (x: number, on: boolean, col: string, txt: string) => {
    ctx.fillStyle = on ? col : '#1a2232';
    ctx.font = 'bold 10px Helvetica, Arial, sans-serif';
    ctx.fillText(txt, x, 12);
  };
  tell(110, lights.blinkL, '#2cff6a', '◀');
  tell(146, lights.blinkR, '#2cff6a', '▶');
  tell(128, lights.beam, '#3aa0ff', '≡');
  tell(128, false, '#000', '');
  ctx.fillStyle = lights.brake ? '#ff3b30' : '#1a2232';
  ctx.fillText('(P)', 128, 112);
  ctx.fillStyle = !lights.engine ? '#ffb020' : '#1a2232';
  ctx.fillText('⚡', 128, 30);
}

// ---------------------------------------------------------------- coche
export function buildCar(shadows: boolean, envMap: THREE.Texture | null = null, blobMap: THREE.Texture | null = null): CarModel {
  const root = new THREE.Group();
  const body = new THREE.Group();
  root.add(body);
  const disposables: { dispose(): void }[] = [];
  const M = <T extends THREE.Material>(m: T) => (disposables.push(m), m);
  const G = <T extends THREE.BufferGeometry>(g: T) => (disposables.push(g), g);
  let triangles = 0;
  const mesh = (g: THREE.BufferGeometry, m: THREE.Material | THREE.Material[], parent: THREE.Object3D = body, cast = true) => {
    const o = new THREE.Mesh(g, m);
    o.castShadow = cast && shadows;
    parent.add(o);
    triangles += (g.index ? g.index.count : g.attributes.position!.count) / 3;
    return o;
  };

  // --- Materiales (reutilizados)
  // Pintura metalizada con barniz (clearcoat): única MeshPhysicalMaterial del coche.
  const paint = M(new THREE.MeshPhysicalMaterial({ color: 0x2456c8, metalness: 0.55, roughness: 0.38, clearcoat: 1, clearcoatRoughness: 0.06, envMap, envMapIntensity: 1 }));
  const glass = M(new THREE.MeshStandardMaterial({ color: 0x1a2531, metalness: 0.2, roughness: 0.04, envMap, envMapIntensity: 1.6 }));
  const trim = M(new THREE.MeshStandardMaterial({ color: 0x15171b, metalness: 0.1, roughness: 0.65 }));
  const chrome = M(new THREE.MeshStandardMaterial({ color: 0xc9ced6, metalness: 0.85, roughness: 0.28, envMap }));
  const tyre = M(new THREE.MeshStandardMaterial({ color: 0x18181a, roughness: 0.92 }));
  const lampGlass = M(new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0, roughness: 0.03, transparent: true, opacity: 0.28, envMap, envMapIntensity: 1.5, depthWrite: false }));
  const headLamp = M(new THREE.MeshStandardMaterial({ color: 0xd8dde4, metalness: 0.6, roughness: 0.25, envMap, emissive: 0xfff3dc, emissiveIntensity: 0 }));
  const tailLamp = M(new THREE.MeshStandardMaterial({ color: 0x3a0000, roughness: 0.3, emissive: 0xff0000, emissiveIntensity: 0.2, toneMapped: false }));
  const blinkMatL = M(new THREE.MeshStandardMaterial({ color: 0x7a4a0a, roughness: 0.3, emissive: 0xffa21a, emissiveIntensity: 0 }));
  const blinkMatR = blinkMatL.clone();
  disposables.push(blinkMatR);
  const reverse = M(new THREE.MeshStandardMaterial({ color: 0x9a9a9a, roughness: 0.3, emissive: 0xffffff, emissiveIntensity: 0 }));
  const cabinDark = M(new THREE.MeshStandardMaterial({ color: 0x26292e, roughness: 0.85 }));
  const wheelRim = M(new THREE.MeshStandardMaterial({ color: 0x1c1e22, roughness: 0.6 }));
  const liner = M(new THREE.MeshStandardMaterial({ color: 0xb8b5ad, roughness: 0.95, emissive: 0x2a2926 }));
  const pillarMat = M(new THREE.MeshStandardMaterial({ color: 0x3a3c40, roughness: 0.9 }));

  // --- Carrocería inferior (capó, aletas, puertas, portón)
  const bodySecs: Section[] = [];
  const NB = 64;
  for (let i = 0; i <= NB; i++) {
    const z = -HALF_L + 0.01 + ((CAR.length - 0.02) * i) / NB;
    const w = bodyW(z);
    bodySecs.push({ z, yb: bodyBottom(z), yt: bodyTop(z), wb: w * 0.97, wt: w });
  }
  const crease = (x: number, _y: number, sec: Section, top: boolean) => {
    if (!top) return 0;
    let d = 0;
    // Pliegues del capó (dos nervios) y cresta de las aletas
    if (sec.z > 0.95) d += 0.018 * bump(Math.abs(x), 0.42, 0.06) + 0.025 * bump(Math.abs(x), 0.78, 0.07);
    // Línea de hombro en los costados
    d += 0.012 * bump(Math.abs(x), 0.86, 0.04);
    return d;
  };
  const bodyParts = [
    loft(bodySecs, 36, 4.5, { deform: crease }),
    // Carcasas de los retrovisores exteriores, fusionadas con la carrocería
    ...[1, -1].map((sx) => stripUv(new THREE.SphereGeometry(0.11, 12, 8)).scale(1.0, 0.62, 0.75).translate(sx * 0.99, 1.0, 0.78)),
  ];
  const bodyMesh = mesh(G(mergeGeometries(bodyParts, false)!), paint);
  bodyParts.forEach((g) => g.dispose());
  bodyMesh.receiveShadow = false;

  // --- Habitáculo: lunas con montantes y techo en color carrocería
  const cabSecs: Section[] = [];
  const NC = 44;
  const z0 = -1.94, z1 = 0.97;
  for (let i = 0; i <= NC; i++) {
    const z = z0 + ((z1 - z0) * i) / NC;
    const yb = bodyTop(z) - 0.03;
    const yt = Math.max(yb + 0.005, cabinTop(z));
    cabSecs.push({ z, yb, yt, wb: bodyW(z) - 0.03, wt: 0.66 });
  }
  const cabGeo = G(loft(cabSecs, 28, 5, {
    classify: (c, n, s) => {
      const halfW = s.wb + (s.wt - s.wb) * Math.min(1, Math.max(0, (c.y - s.yb) / Math.max(0.01, s.yt - s.yb)));
      const rel = Math.abs(c.x) / halfW;
      if (n.y > 0.75 && c.z < WS_TOP - 0.03 && c.z > -1.3) return 0; // techo
      if (c.z > WS_TOP - 0.05 && rel > 0.84 && c.y > s.yb + 0.04) return 0; // montante A
      if (Math.abs(c.z + 0.42) < 0.06 && Math.abs(n.x) > 0.5) return 2; // montante B (negro)
      if (c.z < -1.15 && rel > 0.72 && Math.abs(n.x) > 0.35) return 0; // montante C
      if (c.y < s.yb + 0.035) return 2; // junquillo inferior
      return 1; // luna
    },
  }));
  mesh(cabGeo, [paint, glass, trim]);

  // --- Paragolpes, calandra, taloneras y juntas del capó (plástico negro, una sola geometría)
  const trimParts: THREE.BufferGeometry[] = [];
  const grille = new THREE.ExtrudeGeometry(roundedShape([[-0.42, -0.1], [0.42, -0.1], [0.36, 0.1], [-0.36, 0.1]], 0.05), { depth: 0.06, bevelEnabled: false, curveSegments: 4 });
  grille.translate(0, 0.52, HALF_L - 0.045);
  trimParts.push(grille);
  const lowerLip = new THREE.BoxGeometry(1.1, 0.06, 0.1).translate(0, 0.42, HALF_L - 0.03);
  trimParts.push(lowerLip);
  const rearDiff = new THREE.BoxGeometry(1.2, 0.1, 0.08).translate(0, 0.45, -HALF_L - 0.0);
  trimParts.push(rearDiff);
  for (const sx of [1, -1]) {
    // Taloneras entre ruedas
    trimParts.push(new THREE.BoxGeometry(0.05, 0.07, 2 * AXLE - 2 * ARCH_R - 0.1).translate(sx * 0.815, 0.27, 0));
    // Brazo del retrovisor exterior
    trimParts.push(new THREE.BoxGeometry(0.16, 0.04, 0.08).translate(sx * 0.9, 0.97, 0.76));
    // Junta capó-aleta (línea fina sobre el capó)
    const gap = new THREE.BoxGeometry(0.012, 0.01, 1.05);
    gap.rotateX(0.05);
    gap.translate(sx * 0.66, bodyTop(1.5) + 0.03 * bump(0.66, 0.78, 0.07) + 0.018 * bump(0.66, 0.42, 0.06) + 0.002, 1.5);
    trimParts.push(gap);
    // Tiradores de puerta
    trimParts.push(new THREE.BoxGeometry(0.03, 0.025, 0.16).translate(sx * 0.9, 0.86, 0.15));
    trimParts.push(new THREE.BoxGeometry(0.03, 0.025, 0.16).translate(sx * 0.9, 0.88, -0.85));
    // Juntas de las puertas (verticales)
    for (const zj of [0.92, -0.4, -1.42]) trimParts.push(new THREE.BoxGeometry(0.012, bodyTop(zj) - bodyBottom(zj) - 0.08, 0.008).translate(sx * (bodyW(zj) + 0.002), (bodyTop(zj) + bodyBottom(zj)) / 2, zj));
  }
  // Junta delantera del capó
  trimParts.push(new THREE.BoxGeometry(1.2, 0.01, 0.012).translate(0, bodyTop(2.0) - 0.005, 1.98));
  trimParts.forEach(stripUv);
  const trimGeo = G(mergeGeometries(trimParts.map((g) => ni(g)), false)!);
  trimParts.forEach((g) => g.dispose());
  mesh(trimGeo, trim);

  // --- Faros y pilotos: carcasa cromada, lámpara emisiva y cristal
  // Formas de faro y piloto; el lado derecho es la forma reflejada (no se escala la geometría, que invertiría las caras)
  const HEAD_PTS: [number, number][] = [[-0.2, -0.05], [0.18, -0.07], [0.22, 0.06], [-0.16, 0.07]];
  const TAIL_PTS: [number, number][] = [[-0.2, -0.05], [0.17, -0.06], [0.2, 0.05], [-0.18, 0.06]];
  const shapeFor = (pts: [number, number][], sx: number, r: number) => roundedShape(sx > 0 ? pts : pts.map(([x, y]) => [-x, y] as [number, number]).reverse(), r);
  const lamp = (front: boolean, sx: number, kind: 'inner' | 'cover') => {
    const shape = shapeFor(front ? HEAD_PTS : TAIL_PTS, sx, front ? 0.04 : 0.03);
    const g = kind === 'inner'
      ? new THREE.ExtrudeGeometry(shape, { depth: 0.05, bevelEnabled: false, curveSegments: 4 })
      : new THREE.ExtrudeGeometry(shape, { depth: 0.02, bevelEnabled: true, bevelThickness: 0.02, bevelSize: 0.01, bevelSegments: 2, curveSegments: 4 });
    if (!front) g.rotateY(Math.PI);
    g.rotateY(front ? sx * 0.28 : -sx * 0.2);
    const push = kind === 'cover' ? 0.02 : 0;
    const z = front ? HALF_L - 0.035 + push : -HALF_L + 0.035 - push;
    g.translate(sx * (front ? 0.47 : 0.55), front ? 0.64 : 0.76, z);
    return g;
  };
  const heads = [1, -1].map((sx) => lamp(true, sx, 'inner'));
  const covers = [1, -1].map((sx) => lamp(true, sx, 'cover'));
  const tails = [1, -1].map((sx) => lamp(false, sx, 'inner'));
  [...heads, ...covers, ...tails].forEach(stripUv);
  mesh(G(mergeGeometries(heads.map((g) => ni(g)))!), headLamp, body, false);
  mesh(G(mergeGeometries(covers.map((g) => ni(g)))!), lampGlass, body, false).renderOrder = 2;
  mesh(G(mergeGeometries(tails.map((g) => ni(g)))!), tailLamp, body, false);
  [...heads, ...covers, ...tails].forEach((g) => g.dispose());
  // Intermitentes (delante, en el faro; detrás, en el piloto) y luz de marcha atrás
  const blinkGeo = (sx: number) => mergeGeometries([
    new THREE.BoxGeometry(0.08, 0.035, 0.03).translate(sx * 0.6, 0.58, HALF_L + 0.005),
    new THREE.BoxGeometry(0.1, 0.04, 0.03).translate(sx * 0.6, 0.68, -HALF_L - 0.005),
  ].map((g) => ni(stripUv(g))))!;
  mesh(G(blinkGeo(1)), blinkMatL, body, false);
  mesh(G(blinkGeo(-1)), blinkMatR, body, false);
  mesh(G(stripUv(new THREE.BoxGeometry(0.12, 0.04, 0.03)).translate(-0.3, 0.68, -HALF_L - 0.005)), reverse, body, false);

  // --- Ruedas: neumático (perfil de revolución) + llanta de 5 radios + disco de freno
  const R = CAR.wheelRadius;
  const prof: THREE.Vector2[] = [];
  const tw = 0.2;
  for (let i = 0; i <= 10; i++) {
    const a = -Math.PI / 2 + (Math.PI * i) / 10;
    prof.push(new THREE.Vector2(R - 0.035 + Math.cos(a) * 0.035, (Math.sin(a) * tw) / 2));
  }
  prof.unshift(new THREE.Vector2(R * 0.66, -tw / 2 + 0.01));
  prof.push(new THREE.Vector2(R * 0.66, tw / 2 - 0.01));
  const tyreGeo = new THREE.LatheGeometry(prof, 28);
  tyreGeo.rotateZ(Math.PI / 2); // eje Y → eje X
  const rimShape = new THREE.Shape();
  rimShape.absarc(0, 0, R * 0.68, 0, Math.PI * 2, false);
  for (let k = 0; k < 5; k++) {
    const hole = new THREE.Path();
    const a0 = (k / 5) * Math.PI * 2 + 0.22, a1 = a0 + (Math.PI * 2) / 5 - 0.44;
    hole.absarc(0, 0, R * 0.58, a0, a1, false);
    hole.absarc(0, 0, R * 0.22, a1, a0, true);
    rimShape.holes.push(hole);
  }
  const rimGeo = new THREE.ExtrudeGeometry(rimShape, { depth: 0.035, bevelEnabled: true, bevelThickness: 0.01, bevelSize: 0.008, bevelSegments: 1, curveSegments: 10 });
  rimGeo.rotateY(Math.PI / 2);
  rimGeo.translate(tw / 2 - 0.045, 0, 0);
  const hubGeo = new THREE.CylinderGeometry(0.05, 0.05, 0.04, 12).rotateZ(Math.PI / 2).translate(tw / 2 - 0.02, 0, 0);
  const discGeo = new THREE.CylinderGeometry(R * 0.6, R * 0.6, 0.03, 20).rotateZ(Math.PI / 2).translate(-0.01, 0, 0);
  [tyreGeo, rimGeo, hubGeo, discGeo].forEach(stripUv);
  const wheelGeo = G(mergeGeometries([ni(tyreGeo), ni(discGeo), ni(rimGeo), ni(hubGeo)], true)!);
  // Grupos: 0 neumático, 1 disco, 2 llanta, 3 buje
  [tyreGeo, rimGeo, hubGeo, discGeo].forEach((g) => g.dispose());
  const wheelMats = [tyre, trim, chrome, chrome];
  const wheels: { spin: THREE.Object3D; steer?: THREE.Object3D }[] = [];
  for (const [wx, wz, front] of [[CAR.track / 2 + 0.03, AXLE, true], [-CAR.track / 2 - 0.03, AXLE, true], [CAR.track / 2 + 0.03, -AXLE, false], [-CAR.track / 2 - 0.03, -AXLE, false]] as const) {
    const pivot = new THREE.Group();
    pivot.position.set(wx, R, wz);
    root.add(pivot);
    const spin = new THREE.Group();
    if (wx < 0) spin.scale.x = -1; // llanta hacia fuera en los dos lados
    pivot.add(spin);
    mesh(wheelGeo, wheelMats, spin);
    wheels.push({ spin, steer: front ? pivot : undefined });
  }

  // --- Sombra falsa (cuando no hay sombra real)
  const blob = new THREE.Mesh(G(new THREE.PlaneGeometry(CAR.width + 1.2, CAR.length + 1.6).rotateX(-Math.PI / 2)), M(new THREE.MeshBasicMaterial({ color: 0x000000, alphaMap: blobMap, transparent: true, opacity: 0.75, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -1, polygonOffsetUnits: -1 })));
  blob.position.y = 0.04;
  blob.renderOrder = 1;
  blob.visible = false;
  root.add(blob);

  // --- Haz de los faros en el suelo (solo se ve con poca luz: túnel)
  const beamTex = (() => {
    const c = document.createElement('canvas');
    c.width = 64;
    c.height = 128;
    const ctx = c.getContext('2d')!;
    const g = ctx.createRadialGradient(32, 128, 4, 32, 110, 120);
    g.addColorStop(0, 'rgba(255,240,215,1)');
    g.addColorStop(0.5, 'rgba(255,235,200,0.45)');
    g.addColorStop(1, 'rgba(255,235,200,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 64, 128);
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  })();
  disposables.push(beamTex);
  const beamMat = M(new THREE.MeshBasicMaterial({ map: beamTex, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 }));
  const beam = new THREE.Mesh(G(new THREE.PlaneGeometry(7, 16).rotateX(-Math.PI / 2).translate(0, 0.05, HALF_L + 8)), beamMat);
  beam.renderOrder = 2;
  beam.visible = false;
  root.add(beam);
  let darkness = 0;

  // ------------------------------------------------------------ interior
  const interior = new THREE.Group();
  body.add(interior);
  // Salpicadero: volumen curvo a todo lo ancho
  const dashSecs: Section[] = [];
  for (let i = 0; i <= 8; i++) {
    // Desde las rodillas (z = 0,1) hasta la base del parabrisas
    const z = 0.1 + (0.86 * i) / 8;
    const top = z < 0.5 ? 0.9 + 0.05 * ((z - 0.1) / 0.4) : 0.95 - 0.06 * ((z - 0.5) / 0.46) ** 2;
    dashSecs.push({ z, yb: 0.6, yt: top, wb: 0.8, wt: 0.78 });
  }
  const dashGeo = G(loft(dashSecs, 20, 6));
  const dash = mesh(dashGeo, cabinDark, interior, false);
  // Pantalla del cuadro sobre el salpicadero (marco)
  mesh(G(stripUv(new THREE.BoxGeometry(0.27, 0.13, 0.03)).rotateX(-0.3).translate(DRIVER_EYE.x, 0.995, 0.615)), cabinDark, interior, false);
  // Cuadro de instrumentos (canvas, se redibuja solo si cambian los valores)
  const clusterCanvas = document.createElement('canvas');
  clusterCanvas.width = 256;
  clusterCanvas.height = 128;
  const clusterCtx = clusterCanvas.getContext('2d')!;
  const clusterTex = new THREE.CanvasTexture(clusterCanvas);
  clusterTex.colorSpace = THREE.SRGBColorSpace;
  disposables.push(clusterTex);
  const cluster = new THREE.Mesh(G(new THREE.PlaneGeometry(0.25, 0.115)), M(new THREE.MeshBasicMaterial({ map: clusterTex, toneMapped: false })));
  cluster.position.set(DRIVER_EYE.x, 0.997, 0.598);
  cluster.rotation.order = 'YXZ';
  cluster.rotation.set(0.3, Math.PI, 0);
  interior.add(cluster);
  let clusterKey = '';

  // Volante (rota con la dirección: teclado, mando o inclinación del dispositivo)
  const wheelPivot = new THREE.Group();
  wheelPivot.position.set(DRIVER_EYE.x, 0.83, 0.38);
  wheelPivot.rotation.x = -0.38;
  interior.add(wheelPivot);
  const sw = new THREE.Group();
  wheelPivot.add(sw);
  const swGeo = G(mergeGeometries([
    stripUv(new THREE.TorusGeometry(0.18, 0.022, 8, 32)),
    stripUv(new THREE.BoxGeometry(0.3, 0.035, 0.025)),
    stripUv(new THREE.BoxGeometry(0.035, 0.16, 0.025).translate(0, -0.08, 0)),
    stripUv(new THREE.CylinderGeometry(0.055, 0.055, 0.04, 16).rotateX(Math.PI / 2)),
  ].map((g) => ni(g)))!);
  mesh(swGeo, wheelRim, sw, false);
  // Columna de dirección
  mesh(G(stripUv(new THREE.CylinderGeometry(0.035, 0.045, 0.3, 8)).rotateX(Math.PI / 2 - 0.38).translate(DRIVER_EYE.x, 0.78, 0.52)), cabinDark, interior, false);

  // Montantes A, techo interior y consola
  const pillarGeo = (sx: number) => {
    const a = new THREE.Vector3(sx * (bodyW(0.95) - 0.06), bodyTop(0.95) + 0.02, 0.93);
    const b = new THREE.Vector3(sx * 0.67, cabinTop(WS_TOP + 0.02) - 0.03, WS_TOP + 0.02);
    const len = a.distanceTo(b);
    const g = stripUv(new THREE.BoxGeometry(0.05, len, 0.07));
    const m4 = new THREE.Matrix4().lookAt(a, b, new THREE.Vector3(0, 1, 0));
    g.rotateX(Math.PI / 2);
    g.applyMatrix4(m4);
    g.translate((a.x + b.x) / 2, (a.y + b.y) / 2, (a.z + b.z) / 2);
    return g;
  };
  const roofIn = stripUv(new THREE.PlaneGeometry(1.32, 1.6).rotateX(Math.PI / 2).translate(0, cabinTop(-0.5) - 0.04, -0.45));
  mesh(G(roofIn), liner, interior, false);
  mesh(G(mergeGeometries([ni(pillarGeo(1)), ni(pillarGeo(-1))])!), pillarMat, interior, false);
  // Suelo/asientos que siguen la línea de cintura (de la luneta al salpicadero)
  function floorGeo() {
    const g = stripUv(new THREE.PlaneGeometry(1.62, 2.15, 1, 8).rotateX(-Math.PI / 2).translate(0, 0, -0.8));
    const p = g.attributes.position!;
    for (let i = 0; i < p.count; i++) p.setY(i, bodyTop(p.getZ(i)) + 0.015);
    g.computeVertexNormals();
    return g;
  }
  // Paneles de puerta y suelo (tapan la carrocería vista desde dentro)
  const doorGeo = G(mergeGeometries([
    ...[1, -1].map((sx) => ni(stripUv(new THREE.BoxGeometry(0.06, 0.36, 2.0)).translate(sx * 0.8, bodyTop(-0.4) - 0.14, -0.4))),
    // Suelo/asientos: tapa la carrocería vista desde dentro
    ni(floorGeo()),
  ])!);
  mesh(doorGeo, cabinDark, interior, false);

  // Retrovisores: interior (en el parabrisas) y lunas de los exteriores
  // Forma del cristal (máscara con alphaTest: sin transparencia ni coste extra), marco
  // redondeado y una capa con la luneta, viñeteado y brillo del cristal.
  const shapeTop = shapeTexture('interior', 3), rimTop = shapeTexture('interior', 0);
  const shapeSide = shapeTexture('lateral', 3), rimSide = shapeTexture('lateral', 0);
  const decorTop = decorTexture('interior'), decorSide = decorTexture('lateral');
  disposables.push(shapeTop, rimTop, shapeSide, rimSide, decorTop, decorSide);
  const unit = G(new THREE.PlaneGeometry(1, 1));
  const mirrorMat = (alpha: THREE.Texture) => M(new THREE.MeshBasicMaterial({ color: 0x334050, toneMapped: false, alphaMap: alpha, alphaTest: 0.5 }));
  const rimMat = (alpha: THREE.Texture) => M(new THREE.MeshBasicMaterial({ color: 0x14171c, alphaMap: alpha, alphaTest: 0.5 }));
  const decorMat = (map: THREE.Texture) => M(new THREE.MeshBasicMaterial({ map, transparent: true, depthWrite: false, toneMapped: false }));
  /** Cristal + marco (detrás) + capa decorativa (delante), todos hijos del cristal. */
  const mirrorGlass = (alpha: THREE.Texture, rim: THREE.Texture, decor: THREE.Texture, rimScale: number) => {
    const g = new THREE.Mesh(unit, mirrorMat(alpha));
    const r = new THREE.Mesh(unit, rimMat(rim));
    r.scale.set(rimScale, rimScale * 1.12, 1);
    r.position.z = -0.004;
    const d = new THREE.Mesh(unit, decorMat(decor));
    d.position.z = 0.002;
    d.renderOrder = 2;
    g.add(r, d);
    return g;
  };
  // Interior: arriba en el centro del parabrisas y orientado hacia los ojos del conductor
  const topMirror = mirrorGlass(shapeTop, rimTop, decorTop, 1.06);
  topMirror.scale.set(0.24, 0.068, 1);
  topMirror.position.set(0.12, cabinTop(WS_TOP - 0.02) - 0.12, WS_TOP - 0.03);
  topMirror.lookAt(DRIVER_EYE);
  // Carcasa trasera (más pequeña que el marco para que no asome por los bordes redondeados)
  const topFrame = new THREE.Mesh(G(stripUv(new THREE.BoxGeometry(0.22, 0.06, 0.025))), cabinDark);
  topFrame.quaternion.copy(topMirror.quaternion);
  topFrame.position.copy(topMirror.position).add(new THREE.Vector3(0, 0, -0.016).applyQuaternion(topMirror.quaternion));
  // Brazo del retrovisor interior hasta el techo
  const stem = new THREE.Mesh(G(stripUv(new THREE.CylinderGeometry(0.008, 0.008, 0.08, 6))), cabinDark);
  stem.position.copy(topFrame.position).add(new THREE.Vector3(0, 0.07, 0.01));
  interior.add(topMirror, topFrame, stem);
  // Exteriores: la luna va en la cara trasera de la carcasa (fuera de ella) y mira al conductor
  const sideMirror = (sx: number) => {
    const m = mirrorGlass(shapeSide, rimSide, decorSide, 1.08);
    m.scale.set(0.2, 0.125, 1);
    m.position.set(sx * 0.99, 1.0, 0.692);
    m.lookAt(DRIVER_EYE);
    body.add(m);
    return m;
  };
  const leftMirror = sideMirror(1);
  const rightMirror = sideMirror(-1);
  triangles += 3 * 6;

  // Reflejo falso del salpicadero en el parabrisas (textura, nunca en tiempo real)
  const reflTex = (() => {
    const c = document.createElement('canvas');
    c.width = 256;
    c.height = 64;
    const ctx = c.getContext('2d')!;
    const g = ctx.createLinearGradient(0, 64, 0, 0);
    g.addColorStop(0, 'rgba(200,210,225,0.9)');
    g.addColorStop(0.5, 'rgba(160,170,185,0.35)');
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 256, 64);
    // Silueta del cuadro y de la rejilla de aireación
    ctx.fillStyle = 'rgba(0,0,0,0.55)';
    ctx.fillRect(150, 30, 70, 34);
    for (let x = 30; x < 110; x += 8) ctx.fillRect(x, 50, 4, 14);
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  })();
  disposables.push(reflTex);
  const wsBase = new THREE.Vector3(0, bodyTop(0.95) + 0.02, 0.9);
  const wsTop = new THREE.Vector3(0, cabinTop(WS_TOP + 0.03) - 0.02, WS_TOP + 0.03);
  const wsLen = wsBase.distanceTo(wsTop);
  const refl = new THREE.Mesh(G(new THREE.PlaneGeometry(1.35, wsLen * 0.45)), M(new THREE.MeshBasicMaterial({ map: reflTex, transparent: true, opacity: 0.07, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide })));
  const wsMid = wsBase.clone().lerp(wsTop, 0.22);
  refl.position.copy(wsMid);
  refl.lookAt(wsMid.clone().add(new THREE.Vector3(0, wsTop.z - wsBase.z, -(wsTop.y - wsBase.y)).normalize().multiplyScalar(-1)));
  refl.renderOrder = 3;
  interior.add(refl);
  interior.visible = false;
  void dash;
  // El interior y las lunas de los espejos solo los ve la cámara principal (capa 1):
  // así los retrovisores nunca se dibujan a sí mismos.
  interior.traverse((o) => o.layers.set(INTERIOR_LAYER));
  leftMirror.traverse((o) => o.layers.set(INTERIOR_LAYER));
  rightMirror.traverse((o) => o.layers.set(INTERIOR_LAYER));

  // ------------------------------------------------------------ actualización
  const ON_HEAD = 2.2;
  const susp = { pitch: 0, pitchV: 0, roll: 0, rollV: 0, lastV: 0, acc: 0 };
  return {
    root,
    body,
    mirrorSurfaces: { top: topMirror, left: leftMirror, right: rightMirror },
    triangles: Math.round(triangles),
    update(s, blinkOn, dt = 1 / 60) {
      root.position.set(s.x, s.y, s.z);
      root.rotation.set(0, 0, 0);
      root.rotateY(s.heading);
      root.rotateX(-s.pitch);
      // Suspensión: muelle amortiguado hacia el cabeceo/balanceo objetivo
      const h = Math.min(0.05, Math.max(1e-3, dt));
      const a = (s.v - susp.lastV) / h;
      susp.lastV = s.v;
      susp.acc += (Math.max(-9, Math.min(9, a)) - susp.acc) * Math.min(1, h * 8);
      const yawRate = (s.v * Math.tan(s.steerAngle)) / CAR.wheelbase;
      const lat = Math.max(-8, Math.min(8, s.v * yawRate));
      const targetPitch = -susp.acc * 0.0035; // frenar → morro abajo
      const targetRoll = lat * 0.003; // curva a la izquierda → balancea a la derecha
      const k = 90, c = 13;
      susp.pitchV += ((targetPitch - susp.pitch) * k - susp.pitchV * c) * h;
      susp.pitch += susp.pitchV * h;
      susp.rollV += ((targetRoll - susp.roll) * k - susp.rollV * c) * h;
      susp.roll += susp.rollV * h;
      body.rotation.set(susp.pitch, 0, susp.roll);
      body.position.y = -Math.abs(susp.pitch) * 0.6;

      for (const w of wheels) {
        w.spin.rotation.x = s.wheelSpin;
        if (w.steer) w.steer.rotation.y = s.steerAngle;
      }
      sw.rotation.z = -s.steerAngle * 14 * 0.5; // desmultiplicación de dirección (~14:1, mostrada a la mitad)
      const on = s.lights === 'cortas' || s.lights === 'largas';
      headLamp.emissiveIntensity = on ? (s.lights === 'largas' ? ON_HEAD * 1.3 : ON_HEAD) : s.lights === 'posicion' ? 0.25 : 0;
      tailLamp.emissiveIntensity = s.brake > 0.05 ? 1 : s.lights === 'apagadas' ? 0.08 : 0.45;
      const lOn = blinkOn && (s.blinker === 'izquierda' || s.blinker === 'emergencia');
      const rOn = blinkOn && (s.blinker === 'derecha' || s.blinker === 'emergencia');
      blinkMatL.emissiveIntensity = lOn ? 2.5 : 0;
      blinkMatR.emissiveIntensity = rOn ? 2.5 : 0;
      reverse.emissiveIntensity = s.gear === 'R' ? 1.5 : 0;
      beam.visible = on && darkness > 0.05;
      beamMat.opacity = (s.lights === 'largas' ? 0.75 : 0.55) * darkness;

      // Cuadro: solo se redibuja si cambia algo visible
      if (interior.visible) {
        const kmh = Math.round(Math.abs(s.v) * 3.6);
        const rpm = Math.round(s.rpm / 50) * 50;
        const key = `${kmh}|${rpm}|${s.gear}|${lOn}|${rOn}|${s.handbrake}|${s.engineOn}|${s.lights}`;
        if (key !== clusterKey) {
          clusterKey = key;
          drawCluster(clusterCtx, kmh, rpm, String(s.gear), { blinkL: lOn, blinkR: rOn, brake: s.handbrake, engine: s.engineOn, beam: s.lights === 'largas' });
          clusterTex.needsUpdate = true;
        }
      }
    },
    setInteriorVisible(v) {
      interior.visible = v;
    },
    setBlob(v) {
      blob.visible = v;
    },
    setDarkness(k) {
      darkness = Math.max(0, Math.min(1, k));
    },
    dispose() {
      for (const d of disposables) d.dispose();
    },
  };
}
