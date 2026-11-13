import { useEffect, useState, type ReactNode } from 'react';
import { navigate } from '../app/router';
import { isAvailable, plannedPhase } from '../app/features';
import { profileStore } from '../core/progress/store';

const paths: Record<string, string> = {
  home: 'M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z',
  wheel: 'M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm0 3a7 7 0 0 1 6.9 6h-4.1a3 3 0 0 0-5.6 0H5.1A7 7 0 0 1 12 5zm-6.9 8h4.1a3 3 0 0 0 1.8 1.8v4.1A7 7 0 0 1 5.1 13zm7.9 5.9v-4.1a3 3 0 0 0 1.8-1.8h4.1a7 7 0 0 1-5.9 5.9z',
  book: 'M4 4.5A2.5 2.5 0 0 1 6.5 2H20v17H6.5A2.5 2.5 0 0 0 4 21.5zM4 21.5A2.5 2.5 0 0 1 6.5 19H20v3H6.5A2.5 2.5 0 0 1 4 21.5z',
  chart: 'M4 20V10m6 10V4m6 16v-7m4 7H2',
  trophy: 'M8 21h8m-4-4v4m-5-17h10v5a5 5 0 0 1-10 0zM7 6H4v2a3 3 0 0 0 3 3m10-5h3v2a3 3 0 0 1-3 3',
  gear: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm7.4-3a7.4 7.4 0 0 0-.1-1.3l2-1.6-2-3.4-2.4 1a7 7 0 0 0-2.2-1.3L14.4 3h-4l-.4 2.4a7 7 0 0 0-2.2 1.3l-2.4-1-2 3.4 2 1.6a7.4 7.4 0 0 0 0 2.6l-2 1.6 2 3.4 2.4-1a7 7 0 0 0 2.2 1.3l.4 2.4h4l.4-2.4a7 7 0 0 0 2.2-1.3l2.4 1 2-3.4-2-1.6c.1-.4.1-.9.1-1.3z',
  play: 'M7 4l13 8-13 8z',
  lock: 'M6 11h12v10H6zM8 11V7a4 4 0 0 1 8 0v4',
  check: 'M4 12l5 5L20 6',
  info: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zm0-14v.01M11 11h1v6h1',
};

export type IconName = keyof typeof paths;

export function Icon({ name }: { name: IconName }) {
  const fill = name === 'play';
  return (
    <svg viewBox="0 0 24 24" fill={fill ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={fill ? 0 : 1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={paths[name]} />
    </svg>
  );
}

export function ProgressBar({ value, label }: { value: number; label?: string }) {
  const pct = Math.round(Math.min(1, Math.max(0, value)) * 100);
  return (
    <div className="bar" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label={label}>
      <span style={{ width: `${pct}%` }} />
    </div>
  );
}

/**
 * Tarjeta navegable. Si la ruta aún no está construida, se muestra deshabilitada
 * con la fase en la que llegará (nunca un botón que no hace nada).
 */
export function RouteCard({ route, children, className = '' }: { route: string; children: ReactNode; className?: string }) {
  const ok = isAvailable(route);
  const phase = plannedPhase(route);
  if (!ok) {
    return (
      <div className={`card disabled ${className}`} aria-disabled="true">
        {children}
        <div style={{ marginTop: 12 }}>
          <span className="badge">
            <Icon name="lock" /> {phase ? `En desarrollo · Fase ${phase}` : 'No disponible'}
          </span>
        </div>
      </div>
    );
  }
  return (
    <div
      className={`card interactive ${className}`}
      role="link"
      tabIndex={0}
      onClick={() => navigate(route)}
      onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), navigate(route))}
    >
      {children}
    </div>
  );
}

export function Stat({ label, value, hint }: { label: string; value: ReactNode; hint?: string }) {
  return (
    <div className="card">
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
      {hint && <div className="dim">{hint}</div>}
    </div>
  );
}

export function Toasts() {
  const [items, setItems] = useState<{ id: number; msg: string }[]>([]);
  useEffect(() => {
    let n = 0;
    const err = profileStore.lastError();
    if (err) setItems([{ id: n++, msg: err }]);
    return profileStore.onToast((msg) => {
      const id = n++;
      setItems((xs) => [...xs, { id, msg }]);
      setTimeout(() => setItems((xs) => xs.filter((x) => x.id !== id)), 4500);
    });
  }, []);
  return (
    <div className="toasts" aria-live="polite">
      {items.map((t) => (
        <div className="toast" key={t.id}>
          {t.msg}
        </div>
      ))}
    </div>
  );
}

export function formatDuration(sec: number): string {
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  return h > 0 ? `${h} h ${m} min` : `${m} min`;
}
