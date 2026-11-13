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
