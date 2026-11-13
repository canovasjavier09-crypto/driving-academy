import { lazy, Suspense, useEffect, type ReactNode } from 'react';
import { match, navigate, usePath } from './router';
import { Icon, Toasts, type IconName } from '../ui/components';
import { useProfile } from '../core/progress/store';
import { HomePage } from '../pages/Home';
import { SimulatorHub } from '../pages/SimulatorHub';
import { TheoryHub } from '../pages/TheoryHub';
import { StatsPage } from '../pages/Stats';
import { ProgressPage } from '../pages/Progress';
import { SettingsPage } from '../pages/Settings';
import { AboutPage } from '../pages/About';
import { ExamPage } from '../theory/ui/ExamSession';
import { ErrorsPage, LearningPage, TopicPage } from '../theory/ui/TheoryPages';

// El simulador (Three.js) se descarga solo al entrar en él.
const SimView = lazy(() => import('../sim/SimView'));

function SimLoading() {
  return <div className="empty">Cargando simulador 3D…</div>;
}

const NAV: { route: string; label: string; short: string; icon: IconName }[] = [
  { route: '/', label: 'Inicio', short: 'Inicio', icon: 'home' },
  { route: '/simulador', label: 'Simulador práctico', short: 'Práctica', icon: 'wheel' },
  { route: '/teoria', label: 'Examen teórico', short: 'Teoría', icon: 'book' },
  { route: '/estadisticas', label: 'Estadísticas', short: 'Datos', icon: 'chart' },
  { route: '/progreso', label: 'Progreso', short: 'Progreso', icon: 'trophy' },
  { route: '/configuracion', label: 'Configuración', short: 'Ajustes', icon: 'gear' },
];

const ROUTES: { pattern: string; render: (p: Record<string, string>) => ReactNode }[] = [
  { pattern: '/', render: () => <HomePage /> },
  { pattern: '/simulador', render: () => <SimulatorHub /> },
  { pattern: '/simulador/libre', render: () => <Suspense fallback={<SimLoading />}><SimView mode={{ kind: 'libre' }} /></Suspense> },
  { pattern: '/simulador/examen', render: () => <Suspense fallback={<SimLoading />}><SimView key="examen" mode={{ kind: 'examen' }} /></Suspense> },
  { pattern: '/simulador/leccion/:id', render: (p) => <Suspense fallback={<SimLoading />}><SimView key={p.id} mode={{ kind: 'leccion', id: p.id ?? '' }} /></Suspense> },
  { pattern: '/teoria', render: () => <TheoryHub /> },
  { pattern: '/teoria/examen', render: () => <ExamPage mode="examen" /> },
  { pattern: '/teoria/simulacro', render: () => <ExamPage mode="simulacro" /> },
  { pattern: '/teoria/aprendizaje', render: () => <LearningPage /> },
  { pattern: '/teoria/errores', render: () => <ErrorsPage /> },
  { pattern: '/teoria/tema/:id', render: (p) => <TopicPage id={p.id ?? ''} /> },
  { pattern: '/estadisticas', render: () => <StatsPage /> },
  { pattern: '/progreso', render: () => <ProgressPage /> },
  { pattern: '/configuracion', render: () => <SettingsPage /> },
  { pattern: '/aviso', render: () => <AboutPage /> },
];

function NavLinks() {
  const path = usePath();
  const section = '/' + (path.split('/')[1] ?? '');
  return (
    <>
      {NAV.map((n) => (
        <a key={n.route} href={`#${n.route}`} className={`nav-link ${section === n.route ? 'active' : ''}`} aria-current={section === n.route ? 'page' : undefined}>
          <Icon name={n.icon} />
          <span className="label-long">{n.label}</span>
          <span className="label-short">{n.short}</span>
        </a>
      ))}
    </>
  );
}

function NotFound() {
  return (
    <div className="empty">
      <h2>Página no encontrada</h2>
      <p className="muted" style={{ margin: '8px 0 16px' }}>Esta sección no existe o todavía no se ha construido.</p>
      <button className="btn primary" onClick={() => navigate('/')}>Volver al inicio</button>
    </div>
  );
}

export function App() {
  const path = usePath();
  const { settings } = useProfile();
  useEffect(() => {
    document.documentElement.classList.toggle('reduced-motion', settings.reducedMotion);
  }, [settings.reducedMotion]);

  let content: ReactNode = <NotFound />;
  for (const r of ROUTES) {
    const params = match(r.pattern, path);
    if (params) {
      content = r.render(params);
      break;
    }
  }

  return (
    <div className="shell">
      <nav className="sidebar" aria-label="Navegación principal">
        <div className="brand">
          <div className="brand-mark" />
          <div>
            DRIVING ACADEMY<small>AUTOESCUELA VIRTUAL · B</small>
          </div>
        </div>
        <NavLinks />
        <div className="sidebar-foot">
          <a href="#/aviso">Aviso y fuentes</a>
          <div>v1.0</div>
        </div>
      </nav>
      <main className="main" key={path}>
        {content}
      </main>
      <nav className="tabbar" aria-label="Navegación">
        <NavLinks />
      </nav>
      <Toasts />
    </div>
  );
}
