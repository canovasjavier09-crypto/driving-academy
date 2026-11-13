/** Store global del perfil: única fuente de verdad, persistida automáticamente. */
import { useSyncExternalStore } from 'react';
import { detectBackend, VersionedStore } from '../storage/storage';
import { createDefaultProfile, normalizeProfile, type Profile } from './profile';
import { ACHIEVEMENTS, newlyUnlocked } from './levels';

export const SCHEMA_VERSION = 1;
const { backend, persistent } = detectBackend();

const persistence = new VersionedStore<Profile>(backend, 'driving-academy.profile', SCHEMA_VERSION, {}, createDefaultProfile, normalizeProfile);

let state: Profile = persistence.load();
const listeners = new Set<() => void>();
const toastListeners = new Set<(msg: string) => void>();

function emit() {
  for (const l of listeners) l();
}

export const profileStore = {
  persistent,
  get: () => state,
  lastError: () => persistence.lastError,
  subscribe(l: () => void) {
    listeners.add(l);
    return () => {
      listeners.delete(l);
    };
  },
  onToast(l: (msg: string) => void) {
    toastListeners.add(l);
    return () => {
      toastListeners.delete(l);
    };
  },
  /** Aplica un cambio inmutable, comprueba logros y guarda. */
  update(fn: (draft: Profile) => Profile) {
    let next = fn(state);
    const unlocked = newlyUnlocked(next);
    if (unlocked.length) {
      const now = new Date().toISOString();
      next = { ...next, achievements: { ...next.achievements, ...Object.fromEntries(unlocked.map((id) => [id, now])) }, xp: next.xp + 50 * unlocked.length };
    }
    state = next;
    if (!persistence.save(state)) for (const t of toastListeners) t(persistence.lastError ?? 'Error al guardar');
    for (const id of unlocked) for (const t of toastListeners) t(`🏆 Logro desbloqueado: ${ACHIEVEMENTS.find((a) => a.id === id)?.title ?? id}`);
    emit();
  },
  addXp(amount: number) {
    this.update((p) => ({ ...p, xp: p.xp + Math.max(0, Math.round(amount)) }));
  },
  exportJson: () => persistence.exportJson(state),
  importJson(json: string) {
    const imported = persistence.importJson(json); // lanza Error si no es válido
    state = imported;
    persistence.save(state);
    emit();
  },
  reset() {
    state = createDefaultProfile();
    persistence.save(state);
    emit();
  },
};

export function useProfile(): Profile {
  return useSyncExternalStore(profileStore.subscribe, profileStore.get, profileStore.get);
}
