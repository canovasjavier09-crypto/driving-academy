/**
 * Aspecto de los retrovisores (texturas pequeñas hechas en canvas, una vez):
 * - forma del cristal (máscara: rectángulo muy redondeado en el interior,
 *   «D» redondeada en los exteriores);
 * - capa decorativa: en el interior, la luneta con el techo, los montantes C,
 *   la bandeja y los reposacabezas traseros; en todos, viñeteado del borde y
 *   un brillo suave del cristal.
 */
import * as THREE from 'three';

export type MirrorKind = 'interior' | 'lateral';

function canvas(w: number, h: number) {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  return { c, ctx: c.getContext('2d')! };
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/** Contorno del cristal en un lienzo de w×h (con margen `inset`). */
function outline(ctx: CanvasRenderingContext2D, kind: MirrorKind, w: number, h: number, inset: number) {
  if (kind === 'interior') {
    roundRect(ctx, inset, inset, w - 2 * inset, h - 2 * inset, (h - 2 * inset) * 0.42);
    return;
  }
  // Exterior: lado exterior más alto y redondeado, lado interior recto (forma de «D»)
  const x0 = inset, x1 = w - inset, y0 = inset, y1 = h - inset;
  ctx.beginPath();
  ctx.moveTo(x0 + (x1 - x0) * 0.08, y0 + (y1 - y0) * 0.12);
  ctx.lineTo(x0 + (x1 - x0) * 0.55, y0);
  ctx.quadraticCurveTo(x1, y0, x1, y0 + (y1 - y0) * 0.42);
  ctx.quadraticCurveTo(x1, y1, x0 + (x1 - x0) * 0.6, y1);
  ctx.lineTo(x0 + (x1 - x0) * 0.1, y1);
  ctx.quadraticCurveTo(x0, y1, x0, y1 - (y1 - y0) * 0.2);
  ctx.lineTo(x0, y0 + (y1 - y0) * 0.25);
  ctx.quadraticCurveTo(x0, y0 + (y1 - y0) * 0.14, x0 + (x1 - x0) * 0.08, y0 + (y1 - y0) * 0.12);
  ctx.closePath();
}

function tex(c: HTMLCanvasElement, srgb: boolean) {
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace;
  return t;
}

/** Máscara de forma (canal verde = visible). `inset` en píxeles: 0 = cristal; negativo = marco más grande. */
export function shapeTexture(kind: MirrorKind, inset = 3): THREE.CanvasTexture {
  const [w, h] = kind === 'interior' ? [256, 72] : [160, 100];
  const { c, ctx } = canvas(w, h);
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, w, h);
  ctx.fillStyle = '#fff';
  outline(ctx, kind, w, h, inset);
  ctx.fill();
  return tex(c, false);
}

/** Capa decorativa (con transparencia) que se dibuja sobre la imagen del espejo. */
export function decorTexture(kind: MirrorKind): THREE.CanvasTexture {
  const [w, h] = kind === 'interior' ? [512, 144] : [160, 100];
  const { c, ctx } = canvas(w, h);
  ctx.clearRect(0, 0, w, h);
  if (kind === 'interior') {
    // Luneta vista desde dentro: techo arriba, montantes C a los lados, bandeja abajo.
    const dark = 'rgba(14,16,20,0.86)';
    ctx.fillStyle = dark;
    // Techo (borde inferior curvo)
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(w, 0);
    ctx.lineTo(w, h * 0.13);
    ctx.quadraticCurveTo(w / 2, h * 0.2, 0, h * 0.13);
    ctx.closePath();
    ctx.fill();
    // Montantes C
    for (const side of [0, 1]) {
      ctx.beginPath();
      if (side === 0) {
        ctx.moveTo(0, 0);
        ctx.lineTo(w * 0.09, 0);
        ctx.lineTo(w * 0.04, h);
        ctx.lineTo(0, h);
      } else {
        ctx.moveTo(w, 0);
        ctx.lineTo(w * 0.91, 0);
        ctx.lineTo(w * 0.96, h);
        ctx.lineTo(w, h);
      }
      ctx.closePath();
      ctx.fill();
    }
    // Bandeja trasera
    ctx.fillRect(0, h * 0.9, w, h * 0.1);
    // Reposacabezas traseros
    ctx.fillStyle = 'rgba(28,30,34,0.9)';
    for (const x of [0.28, 0.72]) {
      roundRect(ctx, w * x - w * 0.055, h * 0.68, w * 0.11, h * 0.26, h * 0.08);
      ctx.fill();
    }
    // Línea de la luneta térmica (resistencias)
    ctx.strokeStyle = 'rgba(120,70,40,0.16)';
    ctx.lineWidth = 1;
    for (let y = h * 0.34; y < h * 0.8; y += h * 0.07) {
      ctx.beginPath();
      ctx.moveTo(w * 0.12, y);
      ctx.lineTo(w * 0.88, y);
      ctx.stroke();
    }
  }
  // Viñeteado solo en el borde (no oscurece el centro aunque el espejo sea muy alargado)
  const edge = Math.min(w, h) * 0.22;
  for (const [x0, y0, x1, y1] of [[0, 0, edge, 0], [w, 0, w - edge, 0], [0, 0, 0, edge], [0, h, 0, h - edge]] as const) {
    const v = ctx.createLinearGradient(x0, y0, x1, y1);
    v.addColorStop(0, 'rgba(0,0,0,0.35)');
    v.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = v;
    ctx.fillRect(0, 0, w, h);
  }
  const g = ctx.createLinearGradient(0, 0, w, h);
  g.addColorStop(0, 'rgba(255,255,255,0.14)');
  g.addColorStop(0.35, 'rgba(255,255,255,0.02)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
  // Recortar a la forma del cristal
  ctx.globalCompositeOperation = 'destination-in';
  ctx.fillStyle = '#fff';
  outline(ctx, kind, w, h, kind === 'interior' ? 6 : 3);
  ctx.fill();
  ctx.globalCompositeOperation = 'source-over';
  // Borde fino del cristal
  ctx.strokeStyle = 'rgba(200,210,220,0.35)';
  ctx.lineWidth = 2;
  outline(ctx, kind, w, h, kind === 'interior' ? 6 : 3);
  ctx.stroke();
  return tex(c, true);
}
