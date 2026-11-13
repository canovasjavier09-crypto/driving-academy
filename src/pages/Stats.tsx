import { useProfile } from '../core/progress/store';
import { categoryStats } from '../core/progress/recommend';
import { categoryOf } from '../theory/data';
import { ProgressBar, Stat, formatDuration } from '../ui/components';
import { ExamChart } from '../ui/ExamChart';
import { ALL_LESSONS } from '../core/progress/curriculum';

export function StatsPage() {
  const p = useProfile();
  const t = p.theory;
  const exams = t.exams.filter((e) => e.mode === 'examen');
  const passed = exams.filter((e) => e.passed).length;
  const acc = t.answered ? t.correct / t.answered : 0;
  const avgSec = t.answered ? t.answerTimeMs / t.answered / 1000 : 0;
  const cats = categoryStats(p, categoryOf).filter((c) => c.answered > 0);
  const strong = cats.filter((c) => c.answered >= 5 && c.accuracy >= 0.9);
  const weak = cats.filter((c) => c.answered >= 5 && c.accuracy < 0.8);
  const infractions = Object.entries(p.practice.infractions).sort((a, b) => b[1] - a[1]);
  const lessonRecs = Object.entries(p.practice.lessons).sort((a, b) => b[1].lastAt - a[1].lastAt);

  return (
    <>
      <header className="page-head">
        <div>
          <h1>Estadísticas</h1>
          <p className="muted">Datos reales registrados en este equipo.</p>
        </div>
      </header>

      <h2 style={{ marginBottom: 14 }}>Teoría</h2>
      <div className="grid grid-4">
        <Stat label="Aciertos" value={t.answered ? `${Math.round(acc * 100)} %` : '—'} hint={`${t.correct} de ${t.answered}`} />
        <Stat label="Errores" value={t.answered ? `${Math.round((1 - acc) * 100)} %` : '—'} hint={`${t.answered - t.correct} fallos`} />
        <Stat label="Exámenes aprobados" value={passed} hint={`${exams.length - passed} suspendidos · ${t.exams.length - exams.length} simulacros`} />
        <Stat label="Tiempo medio" value={t.answered ? `${avgSec.toFixed(1)} s` : '—'} hint="por pregunta" />
      </div>

      <section className="section grid grid-2">
        <div className="card">
          <h3 style={{ marginBottom: 12 }}>Rendimiento por categoría</h3>
          {cats.length === 0 ? (
            <div className="empty">Responde preguntas para ver tu rendimiento por tema.</div>
          ) : (
            <div className="stack">
              {cats.map((c) => (
                <div key={c.id}>
                  <div className="card-row dim"><span>{c.name}</span><span className="num">{Math.round(c.accuracy * 100)} %</span></div>
                  <ProgressBar value={c.accuracy} label={c.name} />
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="card">
          <h3 style={{ marginBottom: 12 }}>Evolución de exámenes</h3>
          {exams.length === 0 ? (
            <div className="empty">Aún no has hecho ningún examen completo.</div>
          ) : (
            <>
            <ExamChart exams={exams} />
            <div className="list">
              {exams.slice(-5).reverse().map((e) => (
                <div className="list-item" key={e.id}>
                  <span className="dim">{new Date(e.date).toLocaleDateString('es-ES')}</span>
                  <span className="num">{e.errors} fallos</span>
                  <span className={`badge ${e.passed ? 'ok' : 'warn'}`}>{e.passed ? 'Apto' : 'No apto'}</span>
                </div>
              ))}
            </div>
            </>
          )}
          {(strong.length > 0 || weak.length > 0) && (
            <p className="dim" style={{ marginTop: 12 }}>
              {strong.length > 0 && <>Dominadas: {strong.map((c) => c.name).join(', ')}. </>}
              {weak.length > 0 && <>A reforzar: {weak.map((c) => c.name).join(', ')}.</>}
            </p>
          )}
        </div>
      </section>

      <h2 className="section" style={{ marginBottom: 14 }}>Práctica</h2>
      <div className="grid grid-4">
        <Stat label="Kilómetros" value={p.practice.distanceKm.toFixed(1)} />
        <Stat label="Tiempo al volante" value={formatDuration(p.practice.timeSec)} />
        <Stat label="Lecciones completadas" value={Object.values(p.practice.lessons).filter((l) => l.completed).length} />
        <Stat label="Exámenes prácticos" value={p.practice.exams.length} hint={`${p.practice.exams.filter((e) => e.passed).length} aptos`} />
      </div>
      <section className="section grid grid-2">
        <div className="card">
          <h3 style={{ marginBottom: 12 }}>Simulacros de examen práctico</h3>
          {p.practice.exams.length === 0 ? (
            <div className="empty">Aún no has hecho ningún simulacro práctico.</div>
          ) : (
            <div className="list">
              {p.practice.exams.slice(-6).reverse().map((e) => (
                <div className="list-item" key={e.id}>
                  <span className="dim">{new Date(e.date).toLocaleDateString('es-ES')}</span>
                  <span className="num dim">{e.eliminatory} E · {e.deficient} D · {e.minor} L</span>
                  <span className={`badge ${e.passed ? 'ok' : 'warn'}`}>{e.passed ? 'Apto' : 'No apto'}</span>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="card">
          <h3 style={{ marginBottom: 12 }}>Lecciones</h3>
          {lessonRecs.length === 0 ? (
            <div className="empty">Aún no has hecho ninguna lección práctica.</div>
          ) : (
            <div className="list">
              {lessonRecs.slice(0, 8).map(([id, r]) => (
                <div className="list-item" key={id}>
                  <span>{ALL_LESSONS.find((l) => l.id === id)?.title ?? id}</span>
                  <span className="num dim">{r.attempts} intento{r.attempts === 1 ? '' : 's'}</span>
                  <span className={`badge ${r.completed ? 'ok' : 'warn'}`}>{r.completed ? `${r.bestScore}/100` : 'Pendiente'}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <div className="card section">
        <h3 style={{ marginBottom: 12 }}>Errores más frecuentes al volante</h3>
        {infractions.length === 0 ? (
          <div className="empty">Sin infracciones registradas todavía.</div>
        ) : (
          <div className="list">
            {infractions.slice(0, 8).map(([k, n]) => (
              <div className="list-item" key={k}><span>{k}</span><span className="num">{n}</span></div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
