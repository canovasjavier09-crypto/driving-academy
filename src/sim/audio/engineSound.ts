/**
 * Sonido de motor sintetizado con Web Audio (sin ficheros de audio).
 * Frecuencia de encendido de un 4 cilindros = rpm / 30 Hz.
 * Safari exige crear/reanudar el AudioContext tras un gesto del usuario: se
 * llama a `unlock()` desde el botón «Empezar».
 */
export class EngineSound {
  private ctx: AudioContext | null = null;
  private osc1: OscillatorNode | null = null;
  private osc2: OscillatorNode | null = null;
  private filter: BiquadFilterNode | null = null;
  private gain: GainNode | null = null;

  constructor(private enabled: boolean, private volume: number) {}

  unlock() {
    if (!this.enabled) return;
    try {
      const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!Ctor) return;
      if (!this.ctx) {
        const ctx = new Ctor();
        const gain = ctx.createGain();
        gain.gain.value = 0;
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 600;
        const o1 = ctx.createOscillator();
        o1.type = 'sawtooth';
        const o2 = ctx.createOscillator();
        o2.type = 'square';
        const g2 = ctx.createGain();
        g2.gain.value = 0.35;
        o1.connect(filter);
        o2.connect(g2).connect(filter);
        filter.connect(gain).connect(ctx.destination);
        o1.start();
        o2.start();
        this.ctx = ctx;
        this.osc1 = o1;
        this.osc2 = o2;
        this.filter = filter;
        this.gain = gain;
      }
      void this.ctx.resume();
    } catch {
      this.ctx = null;
    }
  }

  update(rpm: number, throttle: number, running: boolean) {
    if (!this.ctx || !this.osc1 || !this.osc2 || !this.filter || !this.gain) return;
    const t = this.ctx.currentTime;
    const f = Math.max(8, rpm / 30);
    this.osc1.frequency.setTargetAtTime(f, t, 0.03);
    this.osc2.frequency.setTargetAtTime(f / 2, t, 0.03);
    this.filter.frequency.setTargetAtTime(350 + throttle * 1400 + rpm * 0.12, t, 0.05);
    const level = running ? (0.05 + throttle * 0.07) * this.volume : 0;
    this.gain.gain.setTargetAtTime(level, t, 0.08);
  }

  /** Calado: golpe grave y corto mientras el motor se para. */
  stall() {
    if (!this.ctx || !this.enabled) return;
    try {
      const ctx = this.ctx, t = ctx.currentTime;
      const o = ctx.createOscillator();
      o.type = 'sawtooth';
      o.frequency.setValueAtTime(70, t);
      o.frequency.exponentialRampToValueAtTime(14, t + 0.45);
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.22 * this.volume + 0.0001, t + 0.03);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.5);
      const f = ctx.createBiquadFilter();
      f.type = 'lowpass';
      f.frequency.value = 260;
      o.connect(f).connect(g).connect(ctx.destination);
      o.start(t);
      o.stop(t + 0.55);
    } catch {
      /* sin audio */
    }
  }

  suspend() {
    void this.ctx?.suspend();
  }

  resume() {
    void this.ctx?.resume();
  }

  dispose() {
    try {
      this.osc1?.stop();
      this.osc2?.stop();
      void this.ctx?.close();
    } catch {
      /* ya cerrado */
    }
    this.ctx = null;
  }
}
