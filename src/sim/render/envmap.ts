/**
 * Mapa de entorno estático y pequeño para los reflejos de la carrocería:
 * se genera una sola vez al cargar a partir de una mini-escena (cielo con
 * degradado, sol, suelo y siluetas de edificios). Nunca se actualiza en tiempo real.
 */
import * as THREE from 'three';

export function makeEnvMap(renderer: THREE.WebGLRenderer): THREE.WebGLRenderTarget {
  const scene = new THREE.Scene();
  const disposables: { dispose(): void }[] = [];
  const sky = new THREE.SphereGeometry(50, 24, 12);
  const pos = sky.attributes.position!;
  const cols: number[] = [];
  const c = new THREE.Color();
  const horizon = new THREE.Color(0xdbe6ef), zenith = new THREE.Color(0x4f86d0), ground = new THREE.Color(0x4a4c4a);
  for (let i = 0; i < pos.count; i++) {
    const h = pos.getY(i) / 50;
    if (h >= 0) c.copy(horizon).lerp(zenith, Math.pow(h, 0.6));
    else c.copy(horizon).lerp(ground, Math.min(1, -h * 6));
    cols.push(c.r, c.g, c.b);
  }
  sky.setAttribute('color', new THREE.Float32BufferAttribute(cols, 3));
  const skyMat = new THREE.MeshBasicMaterial({ vertexColors: true, side: THREE.BackSide });
  scene.add(new THREE.Mesh(sky, skyMat));
  // Sol (en la misma dirección que la luz direccional)
  const sunGeo = new THREE.SphereGeometry(2.5, 12, 8);
  const sunMat = new THREE.MeshBasicMaterial({ color: new THREE.Color(6, 5.6, 5) });
  const sun = new THREE.Mesh(sunGeo, sunMat);
  sun.position.set(60, 110, 40).normalize().multiplyScalar(40);
  scene.add(sun);
  // Siluetas de edificios alrededor (dan reflejos verticales creíbles)
  const boxGeo = new THREE.BoxGeometry(1, 1, 1);
  const boxMat = new THREE.MeshBasicMaterial({ color: 0x8c8880 });
  for (let i = 0; i < 14; i++) {
    const a = (i / 14) * Math.PI * 2;
    const b = new THREE.Mesh(boxGeo, boxMat);
    const h = 6 + ((i * 37) % 10);
    b.scale.set(8 + (i % 3) * 3, h, 6);
    b.position.set(Math.cos(a) * 30, h / 2 - 1.5, Math.sin(a) * 30);
    b.lookAt(0, b.position.y, 0);
    scene.add(b);
  }
  disposables.push(sky, skyMat, sunGeo, sunMat, boxGeo, boxMat);
  const pmrem = new THREE.PMREMGenerator(renderer);
  const rt = pmrem.fromScene(scene, 0.02, 0.1, 100, { size: 128 });
  pmrem.dispose();
  for (const d of disposables) d.dispose();
  return rt;
}
