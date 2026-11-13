/** Evolución de fallos por examen (barras) con la línea de aprobado (3 fallos). */
import type { TheoryExamRecord } from '../core/progress/profile';

export function ExamChart({ exams, maxErrors = 3 }: { exams: TheoryExamRecord[]; maxErrors?: number }) {
  const data = exams.slice(-15);
  if (data.length === 0) return null;
  const W = 320, H = 140, pad = 22;
  const top = Math.max(maxErrors + 2, ...data.map((e) => e.errors));
  const bw = (W - pad * 2) / data.length;
  const y = (v: number) => H - pad - ((H - pad * 2) * v) / top;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img" aria-label={`Fallos en los últimos ${data.length} exámenes`} style={{ display: 'block', marginBottom: 8 }}>
      <line x1={pad} x2={W - pad} y1={y(0)} y2={y(0)} stroke="var(--line-2)" />
      <line x1={pad} x2={W - pad} y1={y(maxErrors) - 0.5} y2={y(maxErrors) - 0.5} stroke="var(--warn)" strokeDasharray="4 4" />
      <text x={W - pad} y={y(maxErrors) - 4} textAnchor="end" fontSize="9" fill="var(--warn)">límite apto ({maxErrors})</text>
      {data.map((e, i) => {
        const h = Math.max(2, y(0) - y(e.errors));
        return (
          <g key={e.id}>
            <rect x={pad + i * bw + bw * 0.18} y={y(0) - h} width={bw * 0.64} height={h} rx="3" fill={e.passed ? 'var(--ok)' : 'var(--bad)'} opacity="0.85">
              <title>{`${new Date(e.date).toLocaleDateString('es-ES')}: ${e.errors} fallos`}</title>
            </rect>
            <text x={pad + i * bw + bw / 2} y={y(0) - h - 3} textAnchor="middle" fontSize="9" fill="var(--text-2)">{e.errors}</text>
          </g>
        );
      })}
    </svg>
  );
}
