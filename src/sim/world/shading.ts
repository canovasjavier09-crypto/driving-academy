/**
 * Pequeños añadidos a los shaders estándar de Three.js (onBeforeCompile),
 * todos baratos: unas pocas consultas de textura por píxel.
 *
 * - Sombras horneadas (`uBake`) en suelo, asfalto, aceras y marcas.
 * - Variación de color a gran escala (`uMacro`) para que no se note la repetición.
 * - Asfalto: segunda muestra girada y a otra escala (anti-repetición), rodadas
 *   más oscuras y lisas en cada carril y arcén más claro y rugoso.
 * - Terreno: mezcla hierba/tierra (splat) con dos escalas y giros distintos.
 */
import * as THREE from 'three';
import { BAKE_RECT } from './bake';
import { WORLD_HALF } from './map';

export interface WorldUniforms {
  uBake: { value: THREE.Texture | null };
  uBakeRect: { value: THREE.Vector4 };
  uMacro: { value: THREE.Texture | null };
  uSplat: { value: THREE.Texture | null };
  uSplatRect: { value: THREE.Vector4 };
  uDirt: { value: THREE.Texture | null };
}

export function createWorldUniforms(): WorldUniforms {
  return {
    uBake: { value: null },
    uBakeRect: { value: new THREE.Vector4(BAKE_RECT.x0, BAKE_RECT.z0, 1 / BAKE_RECT.size, 1 / BAKE_RECT.size) },
    uMacro: { value: null },
    uSplat: { value: null },
    uSplatRect: { value: new THREE.Vector4(-WORLD_HALF, -WORLD_HALF, 1 / (WORLD_HALF * 2), 1 / (WORLD_HALF * 2)) },
    uDirt: { value: null },
  };
}

const COMMON_FRAG = /* glsl */ `
uniform sampler2D uBake;
uniform vec4 uBakeRect;
uniform sampler2D uMacro;
varying vec2 vWXZ;
float bakeLight() {
  vec2 uv = (vWXZ - uBakeRect.xy) * uBakeRect.zw;
  if (uv.x < 0.0 || uv.y < 0.0 || uv.x > 1.0 || uv.y > 1.0) return 1.0;
  return texture2D(uBake, uv).r;
}
`;

type Kind = 'asphalt' | 'ground' | 'baked';

/**
 * Las sombras horneadas oscurecen el albedo: en la sombra solo queda la luz
 * del cielo (hemisférica 1,45 frente a sol 2,9 → ≈ 0,4 de la luz total).
 */
const SHADE = '0.42';

export function patchWorldMaterial(mat: THREE.Material, kind: Kind, u: WorldUniforms, opts: { macro?: number } = {}) {
  const macro = (opts.macro ?? 0.3).toFixed(3);
  mat.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, u);
    let vs = shader.vertexShader;
    let fs = shader.fragmentShader;
    let vHead = 'varying vec2 vWXZ;\n';
    let vBody = 'vWXZ = (modelMatrix * vec4(transformed, 1.0)).xz;\n';
    let fHead = COMMON_FRAG;
    let afterMap = '';
    let afterRough = '';
    if (kind === 'asphalt') {
      vHead += 'attribute vec2 laneUv;\nvarying vec2 vLane;\n';
      vBody += 'vLane = laneUv;\n';
      fHead += 'varying vec2 vLane;\nfloat gRut = 0.0;\nfloat gShoulder = 0.0;\nfloat gMacro = 0.5;\n';
      afterMap = /* glsl */ `
        {
          float m = texture2D(uMacro, vWXZ * 0.0061).r;
          float m2 = texture2D(uMacro, vWXZ * 0.021 + vec2(0.37, 0.11)).r;
          gMacro = m;
          #ifdef USE_MAP
            // Segunda muestra girada 37° y a otra escala: rompe el patrón de repetición.
            vec4 alt = texture2D(map, mat2(0.8, -0.6, 0.6, 0.8) * vMapUv * 0.63 + vec2(0.21, 0.47));
            diffuseColor.rgb = mix(diffuseColor.rgb, diffuse * alt.rgb, smoothstep(0.3, 0.7, m2));
          #endif
          diffuseColor.rgb *= 1.0 + (m - 0.5) * ${macro};
          float lanes = vLane.y;
          float lu = vLane.x;
          if (lanes > 0.0) {
            if (lu > 0.0 && lu < lanes) {
              float fu = fract(lu);
              gRut = exp(-pow((fu - 0.27) / 0.065, 2.0)) + exp(-pow((fu - 0.73) / 0.065, 2.0));
              gRut *= 0.65 + 0.35 * m2;
            }
            gShoulder = clamp(max(-lu, lu - lanes) * 3.0, 0.0, 1.0);
          }
          diffuseColor.rgb *= 1.0 - 0.16 * gRut;
          diffuseColor.rgb = mix(diffuseColor.rgb, diffuseColor.rgb * 1.16 + vec3(0.025, 0.022, 0.015), gShoulder);
          diffuseColor.rgb *= mix(${SHADE}, 1.0, bakeLight());
        }
      `;
      afterRough = /* glsl */ `
        roughnessFactor = clamp(roughnessFactor - 0.2 * gRut + 0.06 * gShoulder + (gMacro - 0.5) * 0.12, 0.3, 1.0);
      `;
    } else if (kind === 'ground') {
      vHead += 'attribute vec3 gtint;\nvarying vec3 vTint;\n';
      vBody += 'vTint = gtint;\n';
      fHead += 'uniform sampler2D uSplat;\nuniform vec4 uSplatRect;\nuniform sampler2D uDirt;\nvarying vec3 vTint;\n';
      afterMap = /* glsl */ `
        {
          float m = texture2D(uMacro, vWXZ * 0.0042).r;
          float m2 = texture2D(uMacro, vWXZ * 0.017 + vec2(0.5, 0.23)).r;
          vec2 uvA = vWXZ / 9.0;
          vec2 uvB = mat2(0.866, -0.5, 0.5, 0.866) * vWXZ / 13.7 + vec2(0.31, 0.77);
          #ifdef USE_MAP
            vec3 g = mix(texture2D(map, uvA).rgb, texture2D(map, uvB).rgb, smoothstep(0.3, 0.7, m2));
          #else
            vec3 g = vec3(0.78);
          #endif
          vec3 d = mix(texture2D(uDirt, uvA * 1.7).rgb, texture2D(uDirt, uvB * 2.3).rgb, 0.5);
          float s = texture2D(uSplat, (vWXZ - uSplatRect.xy) * uSplatRect.zw).r;
          // Calvas de tierra sueltas en el campo y borde irregular de los arcenes.
          float w = smoothstep(0.42, 0.62, s + (m2 - 0.5) * 0.55 + smoothstep(0.78, 0.92, m) * 0.6);
          diffuseColor.rgb = mix(g * vTint, d, w) * (1.0 + (m - 0.5) * ${macro});
          diffuseColor.rgb *= mix(${SHADE}, 1.0, bakeLight());
        }
      `;
    } else {
      afterMap = /* glsl */ `
        {
          float m = texture2D(uMacro, vWXZ * 0.008).r;
          diffuseColor.rgb *= (1.0 + (m - 0.5) * ${macro}) * mix(${SHADE}, 1.0, bakeLight());
        }
      `;
    }
    vs = vHead + vs.replace('#include <begin_vertex>', '#include <begin_vertex>\n' + vBody);
    if (kind === 'ground') fs = fs.replace('#include <map_fragment>', '');
    fs = fHead + fs.replace('#include <color_fragment>', '#include <color_fragment>\n' + afterMap);
    if (afterRough) fs = fs.replace('#include <roughnessmap_fragment>', '#include <roughnessmap_fragment>\n' + afterRough);
    shader.vertexShader = vs;
    shader.fragmentShader = fs;
  };
  mat.customProgramCacheKey = () => `world-${kind}-${macro}`;
}
