/**
 * Retrovisores: tres cámaras que miran hacia atrás y se dibujan en texturas
 * de 256×128 px, a 20 FPS como máximo.
 *
 * - Vista interior: la imagen aparece en los propios espejos del coche
 *   (interior en el parabrisas y lunas de los exteriores).
 * - Vista exterior: se muestran en una capa ortográfica sobre la pantalla,
 *   invertidos horizontalmente como un espejo real.
 * - En calidad Baja se desactivan automáticamente (los espejos quedan oscuros).
 * - Forma real (interior muy redondeado, exteriores en «D»), marco y una capa con
 *   la luneta y los reposacabezas (interior), viñeteado y brillo del cristal.
 * - El espejo derecho es convexo (campo de visión más amplio), como en muchos coches.
 */
import * as THREE from 'three';
import type { Quality } from '../../core/progress/profile';
import { decorTexture, shapeTexture, type MirrorKind } from './mirrorLook';

export const MIRROR_RES = { w: 256, h: 128 };
/** Frecuencia máxima de actualización de los espejos. */
export const MIRROR_FPS = 20;

type Anchor = 'top' | 'left' | 'right';

interface Mirror {
  cam: THREE.PerspectiveCamera;
  target: THREE.WebGLRenderTarget;
  quad: THREE.Mesh;
  frame: THREE.Mesh;
  decor: THREE.Mesh;
  /** Posición y dirección de mirada en coordenadas locales del coche. */
  local: THREE.Vector3;
  look: THREE.Vector3;
  w: number;
  h: number;
  anchor: Anchor;
  /** Se ve en la capa de pantalla (vista exterior). */
  onScreen: boolean;
}

export class Mirrors {
  private overlay = new THREE.Scene();
  private ortho = new THREE.OrthographicCamera(0, 1, 1, 0, -1, 1);
  private mirrors: Mirror[] = [];
  private tmp = new THREE.Vector3();
  private acc = 1;
  private interior = false;
  private levelOn = true;
  private surfaces: Partial<Record<Anchor, THREE.Mesh>> = {};
  private unit = new THREE.PlaneGeometry(1, 1);
  private textures: THREE.Texture[] = [];
  /** Interruptor del usuario (tecla de retrovisores). */
  enabled = true;
  /** Veces que se han redibujado (para pruebas). */
  renders = 0;

  constructor(private quality: Quality) {
    const add = (anchor: Anchor, local: THREE.Vector3, look: THREE.Vector3, w: number, h: number, fov: number, near: number) => {
      // El plano cercano deja fuera el propio coche (en el interior) y la carcasa del espejo (en los laterales).
      const cam = new THREE.PerspectiveCamera(fov, w / h, near, 220);
      const target = new THREE.WebGLRenderTarget(MIRROR_RES.w, MIRROR_RES.h);
      target.texture.colorSpace = THREE.SRGBColorSpace;
      const kind: MirrorKind = anchor === 'top' ? 'interior' : 'lateral';
      // El cuadro va invertido (scale.x < 0); en el derecho se vuelven a girar las texturas
      // para que el lado redondeado quede hacia fuera en los dos.
      const flip = <T extends THREE.Texture>(t: T) => {
        if (anchor === 'right') {
          t.wrapS = THREE.RepeatWrapping;
          t.repeat.x = -1;
          t.offset.x = 1;
        }
        this.textures.push(t);
        return t;
      };
      const mat = new THREE.MeshBasicMaterial({ map: target.texture, alphaMap: flip(shapeTexture(kind, 3)), transparent: true, depthTest: false, toneMapped: false });
      const quad = new THREE.Mesh(this.unit, mat);
      quad.scale.x = -1; // espejo
      const frame = new THREE.Mesh(this.unit, new THREE.MeshBasicMaterial({ color: 0x0b0f19, alphaMap: flip(shapeTexture(kind, 0)), transparent: true, depthTest: false }));
      const decor = new THREE.Mesh(this.unit, new THREE.MeshBasicMaterial({ map: flip(decorTexture(kind)), transparent: true, depthTest: false, toneMapped: false }));
      frame.renderOrder = 0;
      quad.renderOrder = 1;
      decor.renderOrder = 2;
      this.overlay.add(frame, quad, decor);
      this.mirrors.push({ cam, target, quad, frame, decor, local, look, w, h, anchor, onScreen: true });
    };
    add('top', new THREE.Vector3(0, 1.3, 0.3), new THREE.Vector3(0, 1.12, -10), 300, 76, 26, 2.6);
    add('left', new THREE.Vector3(1.0, 1.0, 0.66), new THREE.Vector3(2.4, 0.85, -10), 150, 96, 32, 0.5);
    // Derecho convexo: más campo de visión (los objetos parecen más lejos).
    add('right', new THREE.Vector3(-1.0, 1.0, 0.66), new THREE.Vector3(-2.4, 0.85, -10), 150, 96, 40, 0.5);
  }

  /** Superficies de los espejos del coche (vista interior). */
  attachSurfaces(s: Record<Anchor, THREE.Mesh>) {
    this.surfaces = s;
    for (const m of this.mirrors) {
      const mesh = s[m.anchor];
      if (!mesh) continue;
      mesh.scale.x = -Math.abs(mesh.scale.x); // imagen invertida, como un espejo
      (mesh.material as THREE.MeshBasicMaterial).map = m.target.texture;
    }
    this.applySurfaces();
  }

  /** Vista interior: imagen en los espejos del coche, sin capa en pantalla. */
  setInterior(v: boolean) {
    this.interior = v;
  }

  /** En calidad Baja los espejos se desactivan. */
  setLevelEnabled(v: boolean) {
    if (this.levelOn === v) return;
    this.levelOn = v;
    this.acc = 1;
    this.applySurfaces();
  }

  get active() {
    return this.enabled && this.levelOn;
  }

  private applySurfaces() {
    for (const m of this.mirrors) {
      const mesh = this.surfaces[m.anchor];
      if (!mesh) continue;
      const mat = mesh.material as THREE.MeshBasicMaterial;
      const on = this.active;
      // También se comprueba el color: `attachSurfaces` pone la imagen pero no el color, y el
      // tono oscuro de «apagado» teñía toda la imagen del espejo.
      if ((mat.map !== null) !== on || (mat.color.getHex() === 0xffffff) !== on) {
        mat.map = on ? m.target.texture : null;
        mat.color.setHex(on ? 0xffffff : 0x334050);
        mat.needsUpdate = true;
      }
    }
  }

  /** Mantiene la firma anterior (la frecuencia ahora está limitada por tiempo). */
  setRefreshEvery(_n: number) {
    void this.quality;
  }

  /** Distancia de dibujado de los espejos. */
  setFar(far: number) {
    for (const m of this.mirrors) {
      m.cam.far = far;
      m.cam.updateProjectionMatrix();
    }
  }

  /** Coloca las capas según el tamaño del lienzo (px CSS). */
  layout(width: number, height: number) {
    // Pantallas pequeñas (móvil en cualquier orientación): solo el retrovisor interior.
    const compact = width < 700 || height < 500;
    const portrait = height > width;
    this.ortho.right = width;
    this.ortho.top = height;
    this.ortho.updateProjectionMatrix();
    const k = compact ? 0.65 : 1;
    for (const m of this.mirrors) {
      const w = m.w * k;
      const h = m.h * k;
      m.onScreen = (!compact || m.anchor === 'top') && !(this.quality === 'baja' && m.anchor !== 'top');
      let x = width / 2;
      // En vertical va bajo el cuadro de mandos; en horizontal, arriba en el centro.
      let y = compact && portrait ? height - 258 - h / 2 : height - h / 2 - 10;
      if (m.anchor === 'left') {
        x = w / 2 + 12;
        y = height * 0.62;
      } else if (m.anchor === 'right') {
        x = width - w / 2 - 12;
        y = height * 0.62;
      }
      m.quad.position.set(x, y, 0);
      m.quad.scale.set(-w, h, 1);
      m.frame.position.set(x, y, 0);
      m.frame.scale.set(-(w + 8), h + 8, 1);
      m.decor.position.set(x, y, 0);
      m.decor.scale.set(-w, h, 1);
    }
  }

  /** ¿Se ve en pantalla la superficie del espejo del coche (vista interior)? */
  private surfaceVisible(m: Mirror, camera: THREE.Camera): boolean {
    const mesh = this.surfaces[m.anchor];
    if (!mesh) return false;
    mesh.getWorldPosition(this.tmp).project(camera);
    return this.tmp.z < 1 && Math.abs(this.tmp.x) < 0.92 && Math.abs(this.tmp.y) < 0.92;
  }

  /**
   * `body`: carrocería del coche (con suspensión). `dt`: segundos desde el último fotograma.
   * `camera`: cámara principal; en vista interior, si un espejo del coche queda fuera de la
   * pantalla (pantallas estrechas), su imagen se muestra en el borde como en la vista exterior.
   */
  render(renderer: THREE.WebGLRenderer, scene: THREE.Scene, body: THREE.Object3D, dt: number, camera?: THREE.Camera) {
    this.applySurfaces();
    if (!this.active) return;
    this.acc += dt;
    if (this.acc >= 1 / MIRROR_FPS) {
      this.acc = Math.min(this.acc - 1 / MIRROR_FPS, 1 / MIRROR_FPS);
      for (const m of this.mirrors) {
        if (!this.interior && !m.onScreen) continue;
        m.cam.position.copy(m.local).applyMatrix4(body.matrixWorld);
        m.cam.lookAt(this.tmp.copy(m.look).applyMatrix4(body.matrixWorld));
        renderer.setRenderTarget(m.target);
        renderer.clear();
        renderer.render(scene, m.cam);
      }
      this.renders++;
      renderer.setRenderTarget(null);
    }
    let any = false;
    for (const m of this.mirrors) {
      const show = m.onScreen && (!this.interior || (camera ? !this.surfaceVisible(m, camera) : false));
      m.quad.visible = m.frame.visible = m.decor.visible = show;
      any ||= show;
    }
    if (!any) return;
    renderer.clearDepth();
    renderer.render(this.overlay, this.ortho);
  }

  dispose() {
    for (const m of this.mirrors) {
      m.target.dispose();
      for (const o of [m.quad, m.frame, m.decor]) (o.material as THREE.Material).dispose();
    }
    this.unit.dispose();
    for (const t of this.textures) t.dispose();
  }
}
