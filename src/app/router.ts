/** Router por hash (#/ruta). Funciona en cualquier servidor estático y sin configuración. */
import { useSyncExternalStore } from 'react';

function currentPath(): string {
  const h = globalThis.location?.hash ?? '';
  const p = h.startsWith('#') ? h.slice(1) : h;
  return p.startsWith('/') ? p : '/';
}

function subscribe(cb: () => void) {
  window.addEventListener('hashchange', cb);
  return () => window.removeEventListener('hashchange', cb);
}

export function usePath(): string {
  return useSyncExternalStore(subscribe, currentPath, () => '/');
}

export function navigate(path: string) {
  if (currentPath() !== path) window.location.hash = path;
  window.scrollTo({ top: 0 });
}

/** Coincidencia de patrones simples con parámetros: '/teoria/tema/:id'. */
export function match(pattern: string, path: string): Record<string, string> | null {
  const a = pattern.split('/').filter(Boolean);
  const b = path.split('/').filter(Boolean);
  if (a.length !== b.length) return null;
  const params: Record<string, string> = {};
  for (let i = 0; i < a.length; i++) {
    const seg = a[i]!;
    const val = b[i]!;
    if (seg.startsWith(':')) params[seg.slice(1)] = decodeURIComponent(val);
    else if (seg !== val) return null;
  }
  return params;
}
