import { THEORY_CATEGORIES } from '../core/progress/curriculum';
import { QUESTIONS, countByCategory } from '../theory/data';
import { RouteCard, ProgressBar } from '../ui/components';
import { useProfile } from '../core/progress/store';
import { isDue, isFailed } from '../core/srs/leitner';

const MODES = [
  { route: '/teoria/examen', title: 'Modo examen', text: '30 preguntas · 30 minutos · máximo 3 fallos. Corrección al final.' },
  { route: '/teoria/aprendizaje', title: 'Modo aprendizaje', text: 'Sin límite. Explicación tras cada respuesta y repetición espaciada.' },
  { route: '/teoria/simulacro', title: 'Simulacro aleatorio', text: 'Preguntas mezcladas de todas las categorías.' },
  { route: '/teoria/errores', title: 'Modo errores', text: 'Repite solo las preguntas que has fallado.' },
];

export function TheoryHub() {
  const p = useProfile();
  const states = p.theory.questions;
  const failed = Object.values(states).filter((s) => isFailed(s)).length;
  const due = Object.values(states).filter((s) => isDue(s)).length;
  const seen = (cat: string) => QUESTIONS.filter((q) => q.category === cat && states[q.id]?.seen);
  const extra: Record<string, string> = {
    '/teoria/errores': failed ? `${failed} pendientes` : 'Sin errores pendientes',
    '/teoria/aprendizaje': due ? `${due} para repasar hoy` : `${QUESTIONS.length - Object.keys(states).length} sin ver`,
  };
  return (
    <>
      <header className="page-head">
        <div>
          <h1>Examen teórico · Permiso B</h1>
          <p className="muted">Formato habitual del examen en España. Banco actual: <span className="num">{QUESTIONS.length}</span> preguntas.</p>
        </div>
      </header>

      <div className="grid grid-2">
        {MODES.map((m) => (
          <RouteCard key={m.route} route={m.route}>
            <h3>{m.title}</h3>
            <p className="muted" style={{ marginTop: 4 }}>{m.text}</p>
            {extra[m.route] && <span className="badge blue" style={{ marginTop: 10 }}>{extra[m.route]}</span>}
          </RouteCard>
        ))}
      </div>

      <section className="section">
        <h2>Practicar por temas</h2>
        <div className="grid grid-4">
          {THEORY_CATEGORIES.map((c) => (
            <RouteCard key={c.id} route={`/teoria/tema/${c.id}`}>
              <div className="icon-tile" style={{ fontSize: 18, fontWeight: 700 }} aria-hidden="true">{c.icon}</div>
              <h3 style={{ marginTop: 10 }}>{c.name}</h3>
              <p className="dim num">{seen(c.id).length}/{countByCategory(c.id)} vistas</p>
              <div style={{ marginTop: 8 }}><ProgressBar value={seen(c.id).length / Math.max(1, countByCategory(c.id))} label={c.name} /></div>
            </RouteCard>
          ))}
        </div>
      </section>

      <p className="notice section">
        Las preguntas son de redacción original. Las marcadas como «normativa» citan el artículo en que se basan; ninguna se presenta como pregunta oficial de la DGT.
      </p>
    </>
  );
}
