export function AboutPage() {
  return (
    <>
      <header className="page-head">
        <div>
          <h1>Aviso y fuentes</h1>
          <p className="muted">Qué es y qué no es Driving Academy.</p>
        </div>
      </header>
      <div className="grid grid-2">
        <div className="card stack">
          <h3>Herramienta complementaria</h3>
          <p className="muted">
            Driving Academy es una herramienta de aprendizaje complementaria. No sustituye a una autoescuela, al profesorado ni a la conducción
            supervisada legalmente. Para obtener el permiso B es obligatorio superar las pruebas oficiales de la DGT.
          </p>
          <p className="muted">
            La evaluación del simulador está <strong>inspirada</strong> en los criterios habituales de las pruebas de control de aptitudes
            (faltas eliminatorias, deficientes y leves), pero no reproduce la evaluación oficial.
          </p>
        </div>
        <div className="card stack">
          <h3>Contenido verificado y didáctico</h3>
          <p className="muted">
            <span className="badge blue">Normativa</span> Contenido basado en normas publicadas, con la referencia citada: Reglamento General de
            Circulación (RD 1428/2003), Texto refundido de la Ley sobre Tráfico (RDL 6/2015) y Reglamento General de Conductores (RD 818/2009).
          </p>
          <p className="muted">
            <span className="badge">Didáctico</span> Consejos y explicaciones creados para la app (técnica de conducción, buenas prácticas).
          </p>
          <p className="muted">Todas las preguntas tienen redacción original y ninguna se presenta como pregunta oficial de examen.</p>
        </div>
        <div className="card stack">
          <h3>Qué está simplificado en el simulador</h3>
          <ul className="muted" style={{ margin: 0, paddingLeft: 18 }}>
            <li>Las señales son representaciones simplificadas de las españolas (R-1, R-2, R-301), sin escala oficial.</li>
            <li>La calificación del simulacro práctico aplica el criterio de APTO de la DGT (1 eliminatoria, 2 deficientes, 1 deficiente + 5 leves o 10 leves = NO APTO), pero qué falta corresponde a cada error es una aproximación de la app.</li>
            <li>El tráfico y los peatones siguen reglas sencillas; no adelantan ni usan los ramales de la autovía.</li>
            <li>El mapa no tiene carretera convencional de doble sentido; las curvas y la distancia se practican en la autovía.</li>
            <li>La física del coche es un modelo verosímil de un turismo compacto, no de un modelo comercial concreto.</li>
          </ul>
        </div>
      </div>
    </>
  );
}
