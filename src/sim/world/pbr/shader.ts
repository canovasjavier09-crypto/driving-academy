/**
 * Añadidos de shader (onBeforeCompile) para usar los mapas PBR en objetos sin
 * coordenadas de textura (coche, farolas, barreras, túnel): proyección por el
 * eje dominante de la normal (una sola lectura por mapa, no triplanar).
 *
 * También define la «detail texture»: un grano fino que se mezcla a 8× la
 * escala base y solo cerca de la cámara, para dar nitidez sin subir el tamaño
 * de las texturas. Se apaga con un uniform (sin recompilar) si faltan FPS.
 */
import * as THREE from 'three';
import type { PbrSet } from './library';

/** Uniforms compartidos por todos los materiales (un solo objeto: cambiarlo aquí cambia todos). */
export interface PbrGlobals {
  uDetail: { value: THREE.Texture | null };
  /** 0 = detail texture apagada, 1 = encendida. */
  uDetailK: { value: number };
  /** 0 = seco, 1 = lluvia. */
  uWet: { value: number };
}

export function createPbrGlobals(detail: THREE.Texture | null): PbrGlobals {
  return { uDetail: { value: detail }, uDetailK: { value: 1 }, uWet: { value: 0 } };
}

/** GLSL: marco tangente a partir de derivadas (como el de Three.js, pero con las derivadas del UV ya calculadas). */
export const PBR_FRAME = /* glsl */ `
mat3 pbrFrame(vec3 eye_pos, vec3 surf_norm, vec2 st0, vec2 st1) {
  vec3 q0 = dFdx(eye_pos.xyz);
  vec3 q1 = dFdy(eye_pos.xyz);
  vec3 q1perp = cross(q1, surf_norm);
  vec3 q0perp = cross(surf_norm, q0);
  vec3 T = q1perp * st0.x + q0perp * st1.x;
  vec3 B = q1perp * st0.y + q0perp * st1.y;
  float det = max(dot(T, T), dot(B, B));
  float scale = (det == 0.0) ? 0.0 : inversesqrt(det);
  return mat3(T * scale, B * scale, surf_norm);
}
`;

/** GLSL: mezcla de la detail texture (grano fino cerca de la cámara). `uv` es el UV base; `dist`, la distancia a la cámara. */
export const DETAIL_FRAG = /* glsl */ `
uniform sampler2D uDetail;
uniform float uDetailK;
float pbrDetail(vec2 uv, float amount, float dist) {
  float fd = uDetailK * (1.0 - smoothstep(5.0, 24.0, dist));
  if (fd < 0.004) return 1.0;
  return 1.0 + (texture2D(uDetail, uv * 8.0).r - 0.5) * amount * fd;
}
`;

export interface ProjectedOpts {
  /** 'world' = coordenadas del mundo (objetos fijos, también instanciados); 'object' = del objeto (coche). */
  space: 'world' | 'object';
  /** Metros que ocupa una repetición de la textura. */
  tile: number;
  /** Multiplicador del albedo (los colores «relativos» rondan 0,8: 1,2 los deja neutros). 0 = no tocar el color. */
  albedo?: number;
  /** Intensidad del mapa de normales (0 = sin relieve). */
  normal?: number;
  /** Rugosidad = G × mul + add (solo materiales Standard/Physical). */
  roughMul?: number;
  roughAdd?: number;
  /** Peso de la oclusión ambiental. */
  ao?: number;
  /** Pintura del coche: G suma rugosidad a la capa de barniz (micro-rayones). */
  clearcoatScratch?: number;
  /** Intensidad de la detail texture (0 = sin ella). */
  detail?: number;
}

/** Texturas que usa un material proyectado (para cambiarlas de tamaño sin recompilar). */
export interface ProjectedHandle {
  set(s: PbrSet): void;
}

/**
 * Aplica un conjunto PBR a un material Lambert/Standard/Physical proyectándolo
 * por el eje dominante. No necesita UV en la geometría.
 */
export function patchProjected(mat: THREE.Material, set: PbrSet, g: PbrGlobals, o: ProjectedOpts): ProjectedHandle {
  const u = { uPbrA: { value: set.albedo as THREE.Texture }, uPbrN: { value: set.normal as THREE.Texture }, uPbrP: { value: set.packed as THREE.Texture } };
  const f = (n: number) => n.toFixed(4);
  const alb = o.albedo ?? 1.2, nk = o.normal ?? 1, ao = o.ao ?? 0.7, det = o.detail ?? 0.35;
  const world = o.space === 'world';
  mat.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, u, g);
    const vHead = 'varying vec3 vPbrP;\nvarying vec3 vPbrN;\n';
    const vBody = world
      ? /* glsl */ `
        vec4 pbrW = vec4(transformed, 1.0);
        vec3 pbrNn = objectNormal;
        #ifdef USE_INSTANCING
          pbrW = instanceMatrix * pbrW;
          pbrNn = mat3(instanceMatrix) * pbrNn;
        #endif
        vPbrP = (modelMatrix * pbrW).xyz;
        vPbrN = mat3(modelMatrix) * pbrNn;
      `
      : 'vPbrP = transformed;\nvPbrN = objectNormal;\n';
    const fHead = /* glsl */ `
      uniform sampler2D uPbrA;
      uniform sampler2D uPbrN;
      uniform sampler2D uPbrP;
      varying vec3 vPbrP;
      varying vec3 vPbrN;
      vec2 gUv; vec2 gDx; vec2 gDy; vec4 gPk;
      ${PBR_FRAME}
      ${DETAIL_FRAG}
    `;
    const afterColor = /* glsl */ `
      {
        // Proyección por el eje dominante. Las derivadas salen de la posición (continua),
        // así no aparecen líneas en el cambio de eje.
        vec3 an = abs(vPbrN);
        vec3 p = vPbrP * ${f(1 / o.tile)};
        vec3 px = dFdx(p), py = dFdy(p);
        if (an.y >= an.x && an.y >= an.z) { gUv = p.xz; gDx = px.xz; gDy = py.xz; }
        else if (an.x > an.z) { gUv = p.zy; gDx = px.zy; gDy = py.zy; }
        else { gUv = p.xy; gDx = px.xy; gDy = py.xy; }
        gPk = textureGrad(uPbrP, gUv, gDx, gDy);
        ${alb > 0 ? `diffuseColor.rgb *= textureGrad(uPbrA, gUv, gDx, gDy).rgb * ${f(alb)};` : ''}
        diffuseColor.rgb *= mix(1.0, gPk.r, ${f(ao)});
        ${det > 0 ? `diffuseColor.rgb *= pbrDetail(gUv, ${f(det)}, length(vViewPosition));` : ''}
      }
    `;
    const afterRough = `roughnessFactor = clamp(${o.clearcoatScratch ? 'roughnessFactor + ' : ''}gPk.g * ${f(o.roughMul ?? 1)} + ${f(o.roughAdd ?? 0)}, 0.04, 1.0);\n`;
    const afterNormal = nk > 0 ? /* glsl */ `
      {
        vec3 pn = textureGrad(uPbrN, gUv, gDx, gDy).xyz * 2.0 - 1.0;
        pn.xy *= ${f(nk)};
        normal = normalize(pbrFrame(-vViewPosition, normal, gDx, gDy) * pn);
      }
    ` : '';
    shader.vertexShader = vHead + shader.vertexShader.replace('#include <begin_vertex>', '#include <begin_vertex>\n' + vBody);
    let fs = fHead + shader.fragmentShader.replace('#include <color_fragment>', '#include <color_fragment>\n' + afterColor);
    fs = fs.replace('#include <roughnessmap_fragment>', '#include <roughnessmap_fragment>\n' + afterRough);
    if (afterNormal) fs = fs.replace('#include <normal_fragment_maps>', '#include <normal_fragment_maps>\n' + afterNormal);
    if (o.clearcoatScratch) fs = fs.replace('#include <lights_physical_fragment>', `#include <lights_physical_fragment>\nmaterial.clearcoatRoughness = clamp(material.clearcoatRoughness + gPk.g * ${f(o.clearcoatScratch)}, 0.0525, 1.0);\n`);
    shader.fragmentShader = fs;
  };
  mat.customProgramCacheKey = () => `pbr-${o.space}-${o.tile}-${alb}-${nk}-${ao}-${det}-${o.roughMul ?? 1}-${o.roughAdd ?? 0}-${o.clearcoatScratch ?? 0}`;
  mat.needsUpdate = true;
  return {
    set(s) {
      u.uPbrA.value = s.albedo;
      u.uPbrN.value = s.normal;
      u.uPbrP.value = s.packed;
    },
  };
}
