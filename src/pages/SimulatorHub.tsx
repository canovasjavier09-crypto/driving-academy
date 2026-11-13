import { useProfile } from '../core/progress/store';
import { PRACTICE_LEVELS } from '../core/progress/curriculum';
import { Icon, ProgressBar, RouteCard } from '../ui/components';

export function SimulatorHub() {
  const p = useProfile();
  return (
    <>
      <header className="page-head">
        <div>
          <h1>Simulador práctico</h1>
          <p className="muted">Seis niveles progresivos, del primer contacto con los pedales al examen práctico.</p>
        </div>
      </header>

      <RouteCard route="/simulador/libre">
        <div className="card-row" style={{ justifyContent: 'flex-start' }}>
          <div className="icon-tile"><Icon name="wheel" /></div>
          <div>
            <h3>Conducción libre</h3>
            <p className="muted">Ciudad con tráfico, peatones y semáforos, rotonda, cuestas y autovía con túnel. Coche manual y un instructor que te corrige.</p>
          </div>
        </div>
      </RouteCard>

      <div style={{ marginTop: 16 }}>
        <RouteCard route="/simulador/examen">
          <div className="card-row" style={{ justifyContent: 'flex-start' }}>
            <div className="icon-tile"><Icon name="trophy" /></div>
            <div>
              <h3>Simulacro de examen práctico</h3>
              <p className="muted">Recorrido con examinador virtual y calificación orientativa de la DGT (eliminatorias, deficientes y leves).</p>
              {p.practice.exams.length > 0 && (
                <span className="badge" style={{ marginTop: 8 }}>{p.practice.exams.filter((e) => e.passed).length} APTO de {p.practice.exams.length}</span>
              )}
            </div>
          </div>
        </RouteCard>
      </div>

      {PRACTICE_LEVELS.map((lvl) => {
        const done = lvl.lessons.filter((l) => p.practice.lessons[l.id]?.completed).length;
        return (
          <section className="section" key={lvl.level}>
            <div className="card-row" style={{ marginBottom: 12 }}>
              <div>
                <h2>Nivel {lvl.level} · {lvl.title}</h2>
                <p className="dim">{lvl.description}</p>
              </div>
              <span className="badge num">{done}/{lvl.lessons.length}</span>
            </div>
            <ProgressBar value={done / lvl.lessons.length} label={`Progreso nivel ${lvl.level}`} />
            <div className="grid grid-3" style={{ marginTop: 14 }}>
              {lvl.lessons.map((ls) => {
                const rec = p.practice.lessons[ls.id];
                return (
                  <RouteCard key={ls.id} route={`/simulador/leccion/${ls.id}`}>
                    <div className="card-row">
                      <h3>{ls.title}</h3>
                      {rec?.completed && <span className="badge ok"><Icon name="check" /> {rec.bestScore}</span>}
                    </div>
                    <ul className="dim" style={{ margin: '8px 0 0', paddingLeft: 18 }}>
                      {ls.goals.map((g) => <li key={g}>{g}</li>)}
                    </ul>
                  </RouteCard>
                );
              })}
            </div>
          </section>
        );
      })}
    </>
  );
}
