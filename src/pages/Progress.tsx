import { useProfile } from '../core/progress/store';
import { ACHIEVEMENTS, levelInfo } from '../core/progress/levels';
import { ALL_LESSONS } from '../core/progress/curriculum';
import { Icon, ProgressBar, Stat, formatDuration } from '../ui/components';

export function ProgressPage() {
  const p = useProfile();
  const lvl = levelInfo(p.xp);
  const pending = ALL_LESSONS.filter((l) => !p.practice.lessons[l.id]?.completed);
  const done = ALL_LESSONS.length - pending.length;
  const unlocked = ACHIEVEMENTS.filter((a) => p.achievements[a.id]).length;
  const theoryExams = p.theory.exams.length + p.practice.exams.length;

  return (
    <>
      <header className="page-head">
        <div>
          <h1>Progreso de {p.name}</h1>
          <p className="muted">Estudiante desde {new Date(p.createdAt).toLocaleDateString('es-ES')}</p>
        </div>
      </header>

      <div className="card">
        <div className="card-row">
          <div>
            <div className="stat-label">Nivel {lvl.level}</div>
            <div className="stat-value">{lvl.title}</div>
          </div>
          <span className="num muted">{lvl.xp} XP</span>
        </div>
        <div style={{ marginTop: 14 }}><ProgressBar value={lvl.progress} label="Progreso de nivel" /></div>
        <p className="dim" style={{ marginTop: 6 }}>
          {lvl.next > lvl.current ? `${lvl.next - lvl.xp} XP para el siguiente nivel` : 'Nivel máximo alcanzado'}
        </p>
      </div>

      <div className="grid grid-4 section">
        <Stat label="Temario práctico" value={`${done}/${ALL_LESSONS.length}`} hint="lecciones" />
        <Stat label="Horas de práctica" value={formatDuration(p.practice.timeSec)} />
        <Stat label="Kilómetros" value={p.practice.distanceKm.toFixed(1)} />
        <Stat label="Exámenes realizados" value={theoryExams} />
      </div>

      <section className="section grid grid-2">
        <div className="card">
          <h3 style={{ marginBottom: 8 }}>Objetivos pendientes</h3>
          <div className="list">
            {pending.slice(0, 6).map((l) => (
              <a className="list-item" key={l.id} href={`#/simulador/leccion/${l.id}`}>
                <span>{l.title}</span>
                <span className="badge">Nivel {l.level}</span>
              </a>
            ))}
            {pending.length === 0 && <div className="empty">¡Temario práctico completado!</div>}
          </div>
        </div>
        <div className="card">
          <div className="card-row" style={{ marginBottom: 8 }}>
            <h3>Logros</h3>
            <span className="badge num">{unlocked}/{ACHIEVEMENTS.length}</span>
          </div>
          <div className="list">
            {ACHIEVEMENTS.map((a) => {
              const at = p.achievements[a.id];
              return (
                <div className="list-item" key={a.id} style={{ opacity: at ? 1 : 0.5 }}>
                  <div>
                    <div style={{ fontWeight: 600 }}>{a.title}</div>
                    <div className="dim">{a.description}</div>
                  </div>
                  <span className={`icon-tile`} style={{ width: 32, height: 32 }}>
                    <Icon name={at ? 'trophy' : 'lock'} />
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
