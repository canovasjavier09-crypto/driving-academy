import { THEORY_CATEGORIES } from '../../core/progress/curriculum';
import { profileStore } from '../../core/progress/store';
import { isFailed } from '../../core/srs/leitner';
import { LearnSession } from './LearnSession';

export function LearningPage() {
  return (
    <LearnSession
      title="Modo aprendizaje"
      subtitle="Explicación tras cada respuesta. Primero verás las preguntas que más necesitas repasar."
      filter={() => true}
      endless
      emptyText="El banco de preguntas está vacío."
    />
  );
}

export function TopicPage({ id }: { id: string }) {
  const cat = THEORY_CATEGORIES.find((c) => c.id === id);
  if (!cat) return <div className="empty">Ese tema no existe. <a href="#/teoria">Volver al módulo teórico</a></div>;
  return (
    <LearnSession
      key={cat.id}
      title={cat.name}
      subtitle="Practica solo las preguntas de este tema."
      filter={(q) => q.category === cat.id}
      endless={false}
      emptyText="Este tema todavía no tiene preguntas."
    />
  );
}

export function ErrorsPage() {
  return (
    <LearnSession
      title="Modo errores"
      subtitle="Solo las preguntas que has fallado y aún no has corregido."
      filter={(q) => isFailed(profileStore.get().theory.questions[q.id])}
      endless={false}
      emptyText="No tienes preguntas falladas pendientes. ¡Bien hecho!"
    />
  );
}
