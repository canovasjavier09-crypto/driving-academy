/**
 * Persistencia versionada sobre localStorage.
 * - Tolera entornos sin almacenamiento (Safari privado, cuota llena).
 * - Aplica migraciones secuenciales al cargar.
 * - Permite exportar / importar el progreso como JSON.
 */

export interface KeyValueBackend {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
}

/** Backend en memoria para tests o cuando localStorage no está disponible. */
export class MemoryBackend implements KeyValueBackend {
  private map = new Map<string, string>();
  getItem(key: string) {
    return this.map.get(key) ?? null;
  }
  setItem(key: string, value: string) {
    this.map.set(key, value);
  }
  removeItem(key: string) {
    this.map.delete(key);
  }
}

export function detectBackend(): { backend: KeyValueBackend; persistent: boolean } {
  try {
    const ls = globalThis.localStorage;
    const probe = '__da_probe__';
    ls.setItem(probe, '1');
    ls.removeItem(probe);
    return { backend: ls, persistent: true };
  } catch {
    return { backend: new MemoryBackend(), persistent: false };
  }
}

export type Migration = (data: Record<string, unknown>) => Record<string, unknown>;

export interface Envelope<T> {
  version: number;
  savedAt: string;
  data: T;
}

export class VersionedStore<T> {
  lastError: string | null = null;

  constructor(
    private readonly backend: KeyValueBackend,
    private readonly key: string,
    private readonly version: number,
    private readonly migrations: Record<number, Migration>,
    private readonly createDefault: () => T,
    private readonly normalize: (raw: unknown) => T,
  ) {}

  load(): T {
    let raw: string | null = null;
    try {
      raw = this.backend.getItem(this.key);
    } catch (e) {
      this.lastError = `No se pudo leer el progreso: ${String(e)}`;
      return this.createDefault();
    }
    if (!raw) return this.createDefault();
    try {
      return this.fromEnvelope(JSON.parse(raw));
    } catch (e) {
      // Copia de seguridad del dato corrupto: nunca se borra información sin avisar.
      try {
        this.backend.setItem(`${this.key}.corrupt.${Date.now()}`, raw);
      } catch {
        /* sin espacio: se ignora */
      }
      this.lastError = `El progreso guardado estaba dañado y se ha reiniciado (copia conservada). ${String(e)}`;
      return this.createDefault();
    }
  }

  save(data: T): boolean {
    const env: Envelope<T> = { version: this.version, savedAt: new Date().toISOString(), data };
    try {
      this.backend.setItem(this.key, JSON.stringify(env));
      this.lastError = null;
      return true;
    } catch (e) {
      this.lastError = `No se pudo guardar el progreso: ${String(e)}`;
      return false;
    }
  }

  exportJson(data: T): string {
    return JSON.stringify({ app: 'driving-academy', version: this.version, savedAt: new Date().toISOString(), data }, null, 2);
  }

  /** Lanza un Error con mensaje en español si el JSON no es válido. */
  importJson(json: string): T {
    let parsed: unknown;
    try {
      parsed = JSON.parse(json);
    } catch {
      throw new Error('El archivo no contiene JSON válido.');
    }
    if (!parsed || typeof parsed !== 'object' || (parsed as { app?: unknown }).app !== 'driving-academy') {
      throw new Error('El archivo no es una copia de seguridad de Driving Academy.');
    }
    return this.fromEnvelope(parsed);
  }

  private fromEnvelope(parsed: unknown): T {
    if (!parsed || typeof parsed !== 'object') throw new Error('Formato desconocido');
    const env = parsed as Partial<Envelope<unknown>>;
    let v = typeof env.version === 'number' ? env.version : 0;
    if (v > this.version) throw new Error(`Versión ${v} más reciente que la app (${this.version})`);
    let data = (env.data ?? {}) as Record<string, unknown>;
    while (v < this.version) {
      const m = this.migrations[v];
      if (m) data = m(data);
      v++;
    }
    return this.normalize(data);
  }
}
