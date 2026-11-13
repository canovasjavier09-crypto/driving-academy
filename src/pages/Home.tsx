import { useProfile } from '../core/progress/store';
import { levelInfo } from '../core/progress/levels';
import { nextLesson, recommendations } from '../core/progress/recommend';
import { categoryOf } from '../theory/data';
import { Icon, ProgressBar, RouteCard, type IconName } from '../ui/components';

const MENU: { route: string; title: string; text: string; icon: IconName }[] = [
  { route: '/simulador', title: 'Simulador práctico', text: 'Conduce un coche manual en una ciudad con tráfico.', icon: 'wheel' },
  { route: '/teoria', title: 'Examen teórico', text: 'Test tipo permiso B: 30 preguntas, 30 minutos.', icon: 'book' },
  { route: '/estadisticas', title: 'Estadísticas', text: 'Aciertos, errores y evolución.', icon: 'chart' },
  { route: '/progreso', title: 'Progreso', text: 'Nivel, logros y objetivos.', icon: 'trophy' },
  { route: '/configuracion', title: 'Configuración', text: 'Gráficos, sonido y copia de seguridad.', icon: 'gear' },
];

export function HomePage() {
  const p = useProfile();
  const lvl = levelInfo(p.xp);
  const recs = recommendations(p, categoryOf);
  const next = nextLesson(p);
  const top = recs[0];

  return (
    <>
      <section className="hero">
        <svg className="gauge" viewBox="0 0 200 200" aria-hidden="true">
          <circle cx="100" cy="100" r="80" fill="none" stroke="#1f2a40" strokeWidth="10" strokeDasharray="377 503" transform="rotate(135 100 100)" />
          <circle cx="100" cy="100" r="80" fill="none" stroke="url(#g)" strokeWidth="10" strokeLinecap="round" strokeDasharray={`${377 * lvl.progress} 503`} transform="rotate(135 100 100)" />
          <defs>
            <linearGradient id="g">
              <stop offset="0" stopColor="#3b82f6" />
              <stop offset="1" stopColor="#22d3ee" />
            </linearGradient>
          </defs>
        </svg>
        <span className="badge blue">Nivel {lvl.level} · {lvl.title}</span>
        <h1 style={{ marginTop: 14 }}>Hola, {p.name}. Aprende a conducir desde cero.</h1>
        <p className="muted" style={{ marginTop: 8, maxWidth: '52ch' }}>
          {next ? `Tu siguiente lección práctica: Nivel ${next.level} · ${next.title}.` : 'Has completado todo el temario práctico.'}
        </p>
        <div style={{ maxWidth: 360, marginTop: 18 }}>
          <div className="card-row dim" style={{ marginBottom: 6 }}>
            <span>Experiencia</span>
            <span className="num">{lvl.xp} / {lvl.next} XP</span>
          </div>
          <ProgressBar value={lvl.progress} label="Progreso de nivel" />
        </div>
      </section>

      <section className="section">
        <h2>Continuar aprendiendo</h2>
        {top ? (
          <RouteCard route={top.route}>
            <div className="card-row" style={{ justifyContent: 'flex-start' }}>
              <div className="icon-tile"><Icon name="play" /></div>
              <div>
                <h3>{top.title}</h3>
                <p className="muted">{top.reason}</p>
              </div>
            </div>
          </RouteCard>
        ) : (
          <div className="empty">No hay recomendaciones pendientes. ¡Buen trabajo!</div>
        )}
        {recs.length > 1 && (
          <div className="grid grid-3" style={{ marginTop: 16 }}>
            {recs.slice(1, 4).map((r) => (
              <RouteCard key={r.title} route={r.route}>
                <span className="badge">{r.kind}</span>
                <h3 style={{ marginTop: 10 }}>{r.title}</h3>
                <p className="dim" style={{ marginTop: 4 }}>{r.reason}</p>
              </RouteCard>
            ))}
          </div>
        )}
      </section>

      <section className="section">
        <h2>Panel principal</h2>
        <div className="grid grid-3">
          {MENU.map((m, i) => (
            <RouteCard key={m.route} route={m.route}>
              <div style={{ animationDelay: `${i * 40}ms` }}>
                <div className="icon-tile"><Icon name={m.icon} /></div>
                <h3 style={{ marginTop: 14 }}>{m.title}</h3>
                <p className="muted" style={{ marginTop: 4 }}>{m.text}</p>
              </div>
            </RouteCard>
          ))}
        </div>
      </section>

      <p className="notice section">
        Driving Academy es una herramienta complementaria de aprendizaje. No sustituye a una autoescuela, al profesorado ni a la conducción supervisada legalmente. <a href="#/aviso">Más información</a>
      </p>
    </>
  );
}
