/**
 * Calidad adaptativa: escalado dinámico de resolución y tres niveles de
 * calidad (Alto / Medio / Bajo) que se ajustan solos según los FPS medidos.
 * Lógica pura (sin Three.js) para poder probarla.
 *
 * - Cada segundo se mide el FPS.
 * - Si baja de 55, el pixel ratio se reduce un 10 % (mínimo 0,6).
 * - Si supera 62 durante 3 s seguidos, se sube un 10 % (máximo 1,5 o el de la pantalla).
 *   En una pantalla de 60 Hz nunca se superan 62 FPS, así que el umbral de
 *   subida se limita a «la frecuencia de la pantalla − 3» (medida como el
 *   mayor FPS observado).
 * - Si sigue por debajo de 55 de forma sostenida (3 s), se recortan las texturas:
 *   primero las lejanas pasan a 512 px y baja la anisotropía; 3 s después se
 *   apaga la «detail texture». Se recuperan en orden inverso cuando sobra rendimiento.
 * - Si con la resolución al mínimo sigue sin llegar a 55 (o cae por debajo
 *   de 40 dos segundos seguidos), baja un nivel de calidad.
 * - Si con la resolución al máximo sobra rendimiento durante 8 s, sube un
 *   nivel, salvo que ese nivel haya fallado en el último minuto.
 */
export type QualityLevel = 'alto' | 'medio' | 'bajo';

export const LEVELS: QualityLevel[] = ['bajo', 'medio', 'alto'];
export const LEVEL_LABEL: Record<QualityLevel, string> = { alto: 'Alto', medio: 'Medio', bajo: 'Bajo' };

/** Qué cambia cada nivel. */
export interface LevelSpec {
  /** Sombra real del coche (tamaño del mapa; 0 = sin sombra, se usa una sombra falsa). */
  shadowMap: number;
  /** Distancia de dibujado (m). */
  far: number;
  /** Distancia a la que se dejan de dibujar detalles (azoteas, sombras falsas, troncos). */
  detail: number;
  /** Factor de tamaño de las texturas (1 = 1024 px para el asfalto). */
  tex: number;
  /** Los retrovisores se vuelven a dibujar cada N fotogramas. */
  mirrorEvery: number;
}

export const LEVEL_SPEC: Record<QualityLevel, LevelSpec> = {
  alto: { shadowMap: 1024, far: 900, detail: 260, tex: 1, mirrorEvery: 1 },
  medio: { shadowMap: 512, far: 650, detail: 170, tex: 0.5, mirrorEvery: 1 },
  bajo: { shadowMap: 0, far: 420, detail: 100, tex: 0.25, mirrorEvery: 2 },
};

export const RATIO_MIN = 0.6;
export const RATIO_MAX = 1.5;
const LOW_FPS = 55;
const HIGH_FPS = 62;

export interface QualityChange {
  ratio?: number;
  level?: QualityLevel;
  /** Recorte de texturas: 0 = completas, 1 = lejanas a 512 px y menos anisotropía, 2 = además sin detail texture. */
  tex?: number;
}

/** Segundos seguidos por debajo de 55 FPS para cada paso de recorte de texturas. */
export const TEX_STEP_AFTER = 3;

export class AdaptiveQuality {
  ratio: number;
  level: QualityLevel;
  readonly maxRatio: number;
  fps = 0;
  /** Paso de recorte de texturas (0–2). */
  tex = 0;
  private highFor = 0;
  private lowStreak = 0;
  private terribleStreak = 0;
  private atMaxFor = 0;
  private peak = 0;
  private failedAt: Partial<Record<QualityLevel, number>> = {};
  private warmup = 2;

  constructor(devicePixelRatio: number, start: QualityLevel = 'medio', private allowAuto = true) {
    this.maxRatio = Math.max(RATIO_MIN, Math.min(devicePixelRatio || 1, RATIO_MAX));
    this.ratio = this.maxRatio;
    this.level = start;
  }

  /** Umbral para subir: 62 FPS, o la frecuencia de la pantalla − 3 si es menor. */
  get upThreshold() {
    return this.peak > 0 ? Math.min(HIGH_FPS, this.peak - 3) : HIGH_FPS;
  }

  /** Una medida por segundo. `now` en segundos. Devuelve lo que haya que cambiar. */
  sample(fps: number, now: number): QualityChange | null {
    this.fps = fps;
    if (this.warmup > 0) {
      // Los primeros segundos compilan shaders y suben texturas: no cuentan.
      this.warmup--;
      return null;
    }
    this.peak = Math.max(this.peak, Math.min(240, Math.round(fps)));
    const change: QualityChange = {};

    if (fps < LOW_FPS) {
      this.highFor = 0;
      this.atMaxFor = 0;
      this.lowStreak++;
      this.terribleStreak = fps < 40 ? this.terribleStreak + 1 : 0;
      // Caída sostenida: primero texturas lejanas y anisotropía, luego la detail texture.
      if (this.lowStreak % TEX_STEP_AFTER === 0 && this.tex < 2) {
        this.tex++;
        change.tex = this.tex;
      }
      const atMin = this.ratio <= RATIO_MIN + 1e-6;
      if (this.allowAuto && this.level !== 'bajo' && ((atMin && this.lowStreak >= 2) || this.terribleStreak >= 2)) {
        this.failedAt[this.level] = now;
        this.level = LEVELS[LEVELS.indexOf(this.level) - 1]!;
        change.level = this.level;
        // Al bajar de nivel se recupera algo de resolución.
        this.ratio = Math.max(RATIO_MIN, Math.min(this.maxRatio, 1));
        change.ratio = this.ratio;
        this.lowStreak = this.terribleStreak = 0;
        return change;
      }
      const r = Math.max(RATIO_MIN, round2(this.ratio * 0.9));
      if (r !== this.ratio) {
        this.ratio = r;
        change.ratio = r;
      }
      return change.ratio !== undefined || change.tex !== undefined ? change : null;
    }

    this.lowStreak = this.terribleStreak = 0;
    if (fps >= this.upThreshold) {
      this.highFor++;
      if (this.ratio >= this.maxRatio - 1e-6) this.atMaxFor++;
      else this.atMaxFor = 0;
      if (this.highFor >= 3 && this.ratio < this.maxRatio) {
        this.ratio = Math.min(this.maxRatio, round2(this.ratio * 1.1));
        this.highFor = 0;
        return { ratio: this.ratio };
      }
      if (this.atMaxFor >= 8 && this.tex > 0) {
        // Sobra rendimiento: se devuelven las texturas antes de subir de nivel.
        this.tex--;
        this.atMaxFor = 0;
        this.highFor = 0;
        return { tex: this.tex };
      }
      if (this.allowAuto && this.atMaxFor >= 8 && this.level !== 'alto') {
        const next = LEVELS[LEVELS.indexOf(this.level) + 1]!;
        const failed = this.failedAt[next];
        if (failed === undefined || now - failed > 60) {
          this.level = next;
          this.atMaxFor = 0;
          this.highFor = 0;
          return { level: next };
        }
      }
    } else {
      this.highFor = 0;
      this.atMaxFor = 0;
    }
    return null;
  }
}

const round2 = (x: number) => Math.round(x * 100) / 100;
