/**
 * Pequeños añadidos a los shaders estándar de Three.js (onBeforeCompile),
 * todos baratos: unas pocas consultas de textura por píxel.
 *
 * - Sombras horneadas (`uBake`) en suelo, asfalto, aceras y marcas.
 * - Variación de color a gran escala (`uMacro`) para que no se note la repetición.
 * - Asfalto: segunda muestra girada y a otra escala (anti-repetición), rodadas
 *   más oscuras y lisas en cada carril y arcén más claro y rugoso.
 * - Terreno: dos variantes de hierba + tierra y grava (splat), con relieve.
 * - Mapas PBR: oclusión ambiental y rugosidad empaquetadas, «detail texture»
 *   (grano fino a 8× cerca de la cámara), asfalto mojado y charcos con lluvia,
 *   y ladrillo en las fachadas (solo en el muro, no en las ventanas).
 */
import * as THREE from 'three';
import { BAKE_RECT } from './bake';
import { WORLD_HALF } from './map';
import { DETAIL_FRAG, PBR_FRAME, type PbrGlobals } from './pbr/shader';

export interface WorldUniforms {
  uBake: { value: THREE.Texture | null };
  uBakeRect: { value: THREE.Vector4 };
  uMacro: { value: THREE.Texture | null };
  uSplat: { value: THREE.Texture | null };
  uSplatRect: { value: THREE.Vector4 };
  uDirt: { value: THREE.Texture | null };
  /** Terreno: segunda hierba, grava y relieves de hierba y tierra. */
  uGrassB: { value: THREE.Texture | null };
  uGravel: { value: THREE.Texture | null };
  uGrassN: { value: THREE.Texture | null };
  uDirtN: { value: THREE.Texture | null };
}

export function createWorldUniforms(): WorldUniforms {
  return {
    uBake: { value: null },
    uBakeRect: { value: new THREE.Vector4(BAKE_RECT.x0, BAKE_RECT.z0, 1 / BAKE_RECT.size, 1 / BAKE_RECT.size) },
    uMacro: { value: null },
    uSplat: { value: null },
    uSplatRect: { value: new THREE.Vector4(-WORLD_HALF, -WORLD_HALF, 1 / (WORLD_HALF * 2), 1 / (WORLD_HALF * 2)) },
    uDirt: { value: null },
    uGrassB: { value: null },
    uGravel: { value: null },
    uGrassN: { value: null },
    uDirtN: { value: null },
  };
}

const COMMON_FRAG = /* glsl */ `
uniform sampler2D uBake;
uniform vec4 uBakeRect;
uniform sampler2D uMacro;
uniform float uWet;
varying vec2 vWXZ;
float bakeLight() {
  vec2 uv = (vWXZ - uBakeRect.xy) * uBakeRect.zw;
  if (uv.x < 0.0 || uv.y < 0.0 || uv.x > 1.0 || uv.y > 1.0) return 1.0;
  return texture2D(uBake, uv).r;
}
` + DETAIL_FRAG;

type Kind = 'asphalt' | 'ground' | 'baked' | 'facade';

/**
 * Las sombras horneadas oscurecen el albedo: en la sombra solo queda la luz
 * del cielo (hemisférica 1,45 frente a sol 2,9 → ≈ 0,4 de la luz total).
 */
const SHADE = '0.42';

export interface WorldPatchOpts {
  macro?: number;
  /** Intensidad de la detail texture (0 = sin ella). */
  detail?: number;
  /** Uniforms propios del material: `uPk` (AO+rugosidad) o los del muro de fachada. */
  extra?: Record<string, { value: unknown }>;
}

export function patchWorldMaterial(mat: THREE.Material, kind: Kind, u: WorldUniforms, g: PbrGlobals, opts: WorldPatchOpts = {}) {
  const macro = (opts.macro ?? 0.3).toFixed(3);
  const det = (opts.detail ?? 0.35).toFixed(3);
  const hasPk = !!opts.extra?.uPk;
  mat.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, u, g, opts.extra ?? {});
    let vs = shader.vertexShader;
    let fs = shader.fragmentShader;
    let vHead = 'varying vec2 vWXZ;\n';
    let vBody = 'vWXZ = (modelMatrix * vec4(transformed, 1.0)).xz;\n';
    let fHead = COMMON_FRAG + (hasPk ? 'uniform sampler2D uPk;\n' : '');
    let afterMap = '';
    let afterRough = '';
    let afterNormal = '';
    if (kind === 'asphalt') {
      vHead += 'attribute vec2 laneUv;\nvarying vec2 vLane;\n';
      vBody += 'vLane = laneUv;\n';
      fHead += 'varying vec2 vLane;\nfloat gRut = 0.0;\nfloat gShoulder = 0.0;\nfloat gMacro = 0.5;\nfloat gPud = 0.0;\nvec4 gPk = vec4(1.0);\n';
      afterMap = /* glsl */ `
        {
          float m = texture2D(uMacro, vWXZ * 0.0061).r;
          float m2 = texture2D(uMacro, vWXZ * 0.021 + vec2(0.37, 0.11)).r;
          gMacro = m;
          #ifdef USE_MAP
            // Segunda muestra girada 37° y a otra escala: rompe el patrón de repetición.
            vec4 alt = texture2D(map, mat2(0.8, -0.6, 0.6, 0.8) * vMapUv * 0.63 + vec2(0.21, 0.47));
            diffuseColor.rgb = mix(diffuseColor.rgb, diffuse * alt.rgb, smoothstep(0.3, 0.7, m2));
            ${hasPk ? 'gPk = texture2D(uPk, vMapUv);' : ''}
            diffuseColor.rgb *= mix(1.0, gPk.r, 0.8) * pbrDetail(vMapUv, ${det}, length(vViewPosition));
          #endif
          diffuseColor.rgb *= 1.0 + (m - 0.5) * ${macro};
          float lanes = vLane.y;
          float lu = vLane.x;
          if (lanes > 0.0) {
            if (lu > 0.0 && lu < lanes) {
              float fu = fract(lu);
              gRut = exp(-pow((fu - 0.27) / 0.065, 2.0)) + exp(-pow((fu - 0.73) / 0.065, 2.0));
              gRut *= 0.65 + 0.35 * m2;
              // Goma y aceite en el centro de cada carril
              diffuseColor.rgb *= 1.0 - 0.07 * exp(-pow((fu - 0.5) / 0.09, 2.0)) * (0.4 + m);
            }
            gShoulder = clamp(max(-lu, lu - lanes) * 3.0, 0.0, 1.0);
          }
          diffuseColor.rgb *= 1.0 - 0.16 * gRut;
          diffuseColor.rgb = mix(diffuseColor.rgb, diffuseColor.rgb * 1.16 + vec3(0.025, 0.022, 0.015), gShoulder);
          // Lluvia: asfalto más oscuro y charcos en las zonas bajas (y algo más en las rodadas).
          gPud = uWet * smoothstep(0.42, 0.7, gPk.b * (0.45 + m2) + gRut * 0.12) * (1.0 - gShoulder);
          diffuseColor.rgb *= mix(1.0, 0.68, uWet) * mix(1.0, 0.55, gPud);
          diffuseColor.rgb *= mix(${SHADE}, 1.0, bakeLight());
        }
      `;
      afterRough = /* glsl */ `
        roughnessFactor = ${hasPk ? 'gPk.g' : 'roughnessFactor'};
        roughnessFactor = clamp(roughnessFactor - 0.2 * gRut + 0.06 * gShoulder + (gMacro - 0.5) * 0.12, 0.3, 1.0);
        roughnessFactor = mix(roughnessFactor, 0.36, uWet * 0.75);
        roughnessFactor = mix(roughnessFactor, 0.03, gPud);
      `;
      // En los charcos el agua es lisa: se quita el relieve del asfalto.
      afterNormal = 'normal = normalize(mix(normal, normalize(vNormal), gPud));\n';
    } else if (kind === 'ground') {
      vHead += 'attribute vec3 gtint;\nvarying vec3 vTint;\n';
      vBody += 'vTint = gtint;\n';
      fHead += 'uniform sampler2D uSplat;\nuniform vec4 uSplatRect;\nuniform sampler2D uDirt;\nuniform sampler2D uGrassB;\nuniform sampler2D uGravel;\nuniform sampler2D uGrassN;\nuniform sampler2D uDirtN;\nvarying vec3 vTint;\nfloat gW = 0.0;\nvec2 gUvA = vec2(0.0);\n';
      afterMap = /* glsl */ `
        {
          float m = texture2D(uMacro, vWXZ * 0.0042).r;
          float m2 = texture2D(uMacro, vWXZ * 0.017 + vec2(0.5, 0.23)).r;
          vec2 uvA = vWXZ / 9.0;
          vec2 uvB = mat2(0.866, -0.5, 0.5, 0.866) * vWXZ / 13.7 + vec2(0.31, 0.77);
          #ifdef USE_MAP
            // Dos variantes de hierba mezcladas por manchas grandes
            vec3 g = mix(texture2D(map, uvA).rgb, texture2D(uGrassB, uvB).rgb, smoothstep(0.3, 0.7, m2)) * 1.12;
          #else
            vec3 g = vec3(0.78);
          #endif
          // Tierra, con grava donde el ruido lo dice
          vec3 d = mix(texture2D(uDirt, uvA * 1.7).rgb, texture2D(uGravel, uvB * 2.3).rgb, smoothstep(0.5, 0.75, m) * 0.85);
          float s = texture2D(uSplat, (vWXZ - uSplatRect.xy) * uSplatRect.zw).r;
          // Calvas de tierra sueltas en el campo y borde irregular de los arcenes.
          float w = smoothstep(0.42, 0.62, s + (m2 - 0.5) * 0.55 + smoothstep(0.78, 0.92, m) * 0.6);
          gW = w;
          gUvA = uvA;
          diffuseColor.rgb = mix(g * vTint, d, w) * (1.0 + (m - 0.5) * ${macro}) * pbrDetail(uvA, ${det}, length(vViewPosition));
          diffuseColor.rgb *= mix(1.0, 0.8, uWet * w);
          diffuseColor.rgb *= mix(${SHADE}, 1.0, bakeLight());
        }
      `;
      // Relieve: el terreno es casi horizontal, así que el mapa de normales se aplica en ejes del mundo (x, z).
      afterNormal = /* glsl */ `
        {
          vec3 gn = mix(texture2D(uGrassN, gUvA).xyz, texture2D(uDirtN, gUvA * 1.7).xyz, gW) * 2.0 - 1.0;
          normal = normalize(normal + (viewMatrix * vec4(gn.x, 0.0, gn.y, 0.0)).xyz * 0.85);
        }
      `;
    } else if (kind === 'facade') {
      fHead += PBR_FRAME + 'uniform sampler2D uWallA;\nuniform sampler2D uWallN;\nuniform sampler2D uWallMask;\nuniform vec3 uWallK;\nfloat gWall = 0.0;\nvec2 gWuv = vec2(0.0);\n';
      afterMap = /* glsl */ `
        {
          #ifdef USE_MAP
            // Solo el muro (la máscara deja fuera ventanas, persianas y balcones)
            gWall = texture2D(uWallMask, vMapUv).r;
            gWuv = vMapUv * uWallK.xy;
            diffuseColor.rgb *= mix(vec3(1.0), texture2D(uWallA, gWuv).rgb * 1.8, gWall * uWallK.z);
            diffuseColor.rgb *= pbrDetail(gWuv, ${det} * gWall, length(vViewPosition));
          #endif
        }
      `;
      afterNormal = /* glsl */ `
        {
          vec3 wn = texture2D(uWallN, gWuv).xyz * 2.0 - 1.0;
          wn.xy *= gWall * 1.3;
          normal = normalize(pbrFrame(-vViewPosition, normal, dFdx(gWuv), dFdy(gWuv)) * wn);
        }
      `;
    } else {
      afterMap = /* glsl */ `
        {
          float m = texture2D(uMacro, vWXZ * 0.008).r;
          #ifdef USE_MAP
            ${hasPk ? 'diffuseColor.rgb *= mix(1.0, texture2D(uPk, vMapUv).r, 0.85);' : ''}
            ${Number(det) > 0 ? `diffuseColor.rgb *= pbrDetail(vMapUv, ${det}, length(vViewPosition));` : ''}
          #endif
          diffuseColor.rgb *= (1.0 + (m - 0.5) * ${macro}) * mix(${SHADE}, 1.0, bakeLight());
          diffuseColor.rgb *= mix(1.0, 0.82, uWet);
        }
      `;
    }
    vs = vHead + vs.replace('#include <begin_vertex>', '#include <begin_vertex>\n' + vBody);
    if (kind === 'ground') fs = fs.replace('#include <map_fragment>', '');
    fs = fHead + fs.replace('#include <color_fragment>', '#include <color_fragment>\n' + afterMap);
    if (afterRough) fs = fs.replace('#include <roughnessmap_fragment>', '#include <roughnessmap_fragment>\n' + afterRough);
    if (afterNormal) fs = fs.replace('#include <normal_fragment_maps>', '#include <normal_fragment_maps>\n' + afterNormal);
    shader.vertexShader = vs;
    shader.fragmentShader = fs;
  };
  mat.customProgramCacheKey = () => `world-${kind}-${macro}-${det}-${hasPk}`;
}
