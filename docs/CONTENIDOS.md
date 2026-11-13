# Contenidos del módulo teórico

## Criterios
- **Redacción original.** Ninguna pregunta copia ni se presenta como pregunta oficial de la DGT.
- **`normativa`**: el contenido se apoya en una norma publicada, citada en `reference`. Siglas:
  - RGC — Reglamento General de Circulación (RD 1428/2003)
  - LSV — Texto refundido de la Ley sobre Tráfico, Circulación de Vehículos a Motor y Seguridad Vial (RDL 6/2015)
  - RGCond — Reglamento General de Conductores (RD 818/2009)
  - RD 920/2017 (ITV), RD 159/2021 (señal V-16), RD 970/2020 (velocidades urbanas y VMP), RDL 8/2004 (seguro), Código Penal
- **`didactica`**: técnica de conducción, primeros auxilios básicos y buenas prácticas, sin cita normativa.

## Mantenimiento
- Añadir preguntas en `src/theory/data/bank*.ts` con el helper `q()`: la **primera opción es la correcta**; el motor baraja el orden al mostrarla.
- `npm test` valida automáticamente el banco (ids, opciones, referencias, imágenes).
- Las normas cambian: revise periódicamente velocidades, tasas, puntos y señalización de emergencia (V-16 obligatoria desde el 1/1/2026).
