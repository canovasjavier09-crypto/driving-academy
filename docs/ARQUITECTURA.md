# Driving Academy — Arquitectura (Fase 1)

## 1. Análisis del entorno

| Recurso | Valor detectado | Implicación |
|---|---|---|
| Equipo | iMac Apple M1, 8 núcleos | GPU integrada potente para WebGL2, pero memoria compartida con la CPU |
| RAM | 8 GB (unificada) | Presupuesto objetivo: < 400 MB de RAM y < 150 MB de VRAM en el simulador |
| SO | macOS 26 | Safari y Chrome modernos con WebGL2 estables |
| Node / npm | v24 / v11 | Toolchain moderno disponible, sin pnpm/bun (no hacen falta) |
| Disco libre | ~74 GB | Sin restricciones |

**Conclusión:** una aplicación web local (Vite + navegador) es la opción más ligera. Evitamos Electron (≈ 200 MB de RAM extra) y motores pesados (Unity/Unreal: no gratuitos de forma práctica para web, builds enormes). La app se sirve en `localhost` y funciona sin conexión.

## 2. Decisiones tecnológicas

| Área | Elección | Motivo | Alternativas descartadas |
|---|---|---|---|
| Lenguaje | TypeScript (modo estricto) | Mantenibilidad, errores en compilación | JS plano |
| Build | Vite | Arranque instantáneo, HMR, build optimizado | Webpack (más lento) |
| UI | React 19 | Ecosistema, componentes reutilizables | Vue/Svelte (válidos, menos familiar) |
| Estado global | Store propio con `useSyncExternalStore` | Cero dependencias, suficiente para el tamaño | Redux/Zustand (innecesarios) |
| Router | Router hash propio (~60 líneas) | Funciona abriendo archivos locales y en cualquier servidor | react-router (dependencia evitable) |
| 3D | Three.js | Ligero, estándar, WebGL2 en Safari | Babylon (más pesado), R3F (capa extra) |
| Física | **Modelo de vehículo propio** (bicicleta dinámica + tren motriz con embrague) + colisiones AABB/OBB | Control total sobre embrague, calado del motor y marchas; coste de CPU mínimo | Cannon-es / Rapier: buenos para cuerpos rígidos genéricos, pero el embrague y el calado hay que programarlos igualmente; Rapier añade ~1,5 MB de WASM |
| Persistencia | `localStorage` con esquema versionado + migraciones + exportar/importar JSON | Síncrono, robusto, sin WASM. Volumen de datos pequeño (< 1 MB) | SQLite-WASM (2 MB extra y OPFS no fiable en Safari); IndexedDB queda como mejora si el histórico crece |
| Tests | Vitest | Integrado con Vite, rápido | Jest |
| Estilos | CSS con variables (tokens) | Sin runtime, tema oscuro nativo | Tailwind (paso de build extra) |

Dependencias de ejecución: **react, react-dom, three**. Nada más.

## 3. Estructura de carpetas

```
src/
  app/            Shell: router, layout, navegación
  core/           Lógica sin UI (testable)
    storage/      Persistencia versionada
    progress/     Perfil, XP, niveles, logros, recomendaciones
    srs/          Repetición espaciada (Leitner/SM-2 simplificado)
  theory/         Módulo teórico
    data/         Banco de preguntas (JSON tipado) + imágenes SVG de señales
    engine/       Generación de exámenes, corrección, estadísticas
    ui/           Pantallas: aprendizaje, examen, temas, errores, simulacro
  sim/            Módulo práctico
    vehicle/      Motor, embrague, caja de cambios, dinámica
    world/        Ciudad, carreteras, señales, semáforos
    traffic/      IA de vehículos y peatones
    rules/        Detección de infracciones
    instructor/   Instructor virtual y guiones de lecciones
    input/        Teclado, ratón, táctil, Gamepad API (volantes)
    hud/          Instrumentación (React superpuesto al canvas)
  pages/          Pantallas de primer nivel
  ui/             Componentes visuales compartidos
  styles/         Tokens y estilos globales
docs/             Arquitectura, contenidos, decisiones
TAREAS.md         Estado de fases y tareas pendientes
```

## 4. Separación UI / simulación

El simulador **no** se renderiza con React. React monta un `<canvas>` y un HUD; el bucle de juego (`requestAnimationFrame`, paso fijo de física a 120 Hz) vive en clases TS puras. El HUD lee una instantánea del estado del vehículo ~15 veces por segundo para no provocar renders de React a 60 Hz.

```
 Input ──► VehicleModel (física paso fijo) ──► World/Traffic ──► RulesEngine ──► Infracciones
                    │                                                   │
                    ▼                                                   ▼
              Three.js render                                  Instructor + Evaluación
                    │                                                   │
                    └──────────── HUD (React, 15 Hz) ◄──────────────────┘
                                         │
                                  core/progress (persistencia)
```

## 5. Modelo del vehículo (resumen)

- **Motor:** curva de par por RPM, ralentí 800 rpm, corte 6500 rpm, calado por debajo de ~500 rpm con embrague acoplado.
- **Embrague:** acoplamiento 0–1 con punto de fricción; el par transmitido se limita por la capacidad del embrague; deslizamiento = diferencia de velocidad motor/caja.
- **Caja:** 5 marchas + R, cambio solo permitido con embrague pisado (si no, rascado → infracción "uso incorrecto de marchas").
- **Dinámica:** modelo de bicicleta con fuerza lateral por deriva, resistencia aerodinámica y de rodadura, pendiente (componente gravitatoria), freno de mano en eje trasero.
- **Combustible:** consumo proporcional a la potencia entregada.

## 6. Rendimiento en M1 / 8 GB

- Geometrías instanciadas (`InstancedMesh`) para edificios, farolas, señales y vehículos IA.
- Materiales `MeshLambertMaterial`/`MeshStandardMaterial` sin texturas grandes; colores planos estilizados.
- Una luz direccional con sombras de 1024² limitadas al entorno del coche (desactivables).
- `renderer.setPixelRatio(min(devicePixelRatio, 1.5))` y ajuste dinámico de calidad si los FPS caen.
- Retrovisores mediante render a textura de baja resolución cada 2 fotogramas.
- Tráfico y peatones simulados solo en un radio alrededor del jugador.

## 7. Contenidos: verificado vs. didáctico

Cada pregunta y cada regla del simulador incluye un campo `fuente`:

- `"normativa"`: basada en el Reglamento General de Circulación (RD 1428/2003), la Ley de Tráfico (RDL 6/2015) u otra norma citada en `referencia`. El contenido de la norma es verificable; **la redacción de la pregunta es original**.
- `"didactica"`: contenido creado para el simulador (consejos de conducción, técnica).

Ninguna pregunta se presenta como "pregunta oficial de la DGT". La evaluación práctica está **inspirada** en los criterios de faltas eliminatorias / deficientes / leves, sin afirmar que reproduce la evaluación oficial.

## 8. Aviso legal visible en la app

> Driving Academy es una herramienta complementaria de aprendizaje. No sustituye a una autoescuela, al profesorado ni a la conducción supervisada legalmente.

## 9. Simulador 3D (Fase 4)

Todo vive en `src/sim/` y se carga bajo demanda (`React.lazy`): las páginas de teoría no descargan Three.js.

| Módulo | Qué hace |
| --- | --- |
| `vehicle/specs.ts` | Ficha del coche: curva de par, relaciones (5 + R), embrague, frenos, agarre |
| `vehicle/vehicle.ts` | Física pura y testeada: motor con ralentí de centralita, embrague que patina/bloquea, calado, frenos con fricción estática, pendiente, modelo de bicicleta con límite de agarre, consumo, intermitentes que se cancelan solos |
| `world/map.ts` | Mapa como datos: calles (1 y 2 sentidos, límites 30/50 según RD 970/2020), cruces, rotonda, cuesta (8 m), autovía 2+2 con mediana, túnel, ramales con carril de aceleración y deceleración, edificios, árboles y farolas. Índice espacial en rejilla de 40 m y consulta `query(x, z)` (calzada / arcén / acera / isleta / mediana / fuera) |
| `world/build.ts` | Mallas fusionadas e instanciadas (≈ 15 llamadas de dibujo para toda la ciudad) |
| `render/carModel.ts` | Coche de primitivas: ruedas que giran y viran, luces de freno, intermitentes, marcha atrás, salpicadero y volante |
| `render/mirrors.ts` | Retrovisor interior y exteriores (texturas de render a baja resolución; en calidad baja solo el interior y a mitad de frecuencia; en móvil solo el interior) |
| `input/input.ts` | Teclado (pedales con rampa; el embrague sube despacio en el punto de fricción), ratón para mirar, táctil, Gamepad API |
| `audio/engineSound.ts` | Motor sintetizado con Web Audio (sin ficheros) |
| `Simulation.ts` | Bucle: física a 120 Hz con 2 subpasos, render por `requestAnimationFrame`, cámaras 1.ª/3.ª persona, colisiones, mensajes, pausa automática al ocultar la pestaña, guardado de km y tiempo |

Calidad gráfica (Configuración): `baja` (sin antialias, sin sombras, ratio 1, niebla a 450 m, 1 espejo), `media` (ratio 1,25, sombras 1024, 750 m), `alta` (ratio ≤ 2, sombras 2048, 1100 m).

## 10. Tráfico, peatones, normas e instructor (Fase 5)

| Módulo | Qué hace |
| --- | --- |
| `world/signals.ts` | Regulación de cada brazo de cruce, líneas de detención, pasos de peatones, señales y ciclo de semáforos |
| `traffic/lanes.ts` | Red de carriles (calles, conectores Bézier en cruces, anillo de rotonda, autovía) |
| `traffic/traffic.ts` | Coches de la IA con IDM y reglas de prioridad; consultas `clearToEnter` y `leaderOf` que reutiliza el detector |
| `traffic/pedestrians.ts` | Peatones por las aceras que cruzan cuando es seguro |
| `rules/monitor.ts` | Detector de normas del alumno: eventos «aviso», «falta» y «bien» (base de la evaluación de la Fase 6) |
| `instructor/instructor.ts` | Frases, prioridad, enfriamiento y voz opcional |
| `render/trafficRender.ts` | Coches, peatones, semáforos y señales con `InstancedMesh` |

El tráfico, los peatones y el detector corren a 30 Hz dentro del bucle fijo; el vehículo del alumno, a 240 Hz. Todo lo anterior es TypeScript puro y está cubierto por tests sin navegador.

## 11. Evaluación, lecciones y examen práctico (Fase 6)

| Módulo | Qué hace |
| --- | --- |
| `rules/evaluation.ts` | Categoría de cada falta (eliminatoria/deficiente/leve), veredicto con el criterio de la DGT, puntuación de lecciones |
| `lessons/session.ts` | Tipos comunes de sesión y ejecutor de lecciones por objetivos |
| `lessons/defs.ts` | Las 20 lecciones (punto de partida, estado del coche, objetivos) y comprobaciones de aparcamiento |
| `lessons/exam.ts` | Examinador virtual: indicaciones de recorrido, comprobación, veredicto |

La simulación recibe una `Session` opcional: aplica su configuración inicial (posición, velocidad, marcha, tráfico, coche lento, peatón que cruza) y le pasa en cada paso (30 Hz) el estado del coche y los eventos del detector de normas. La UI solo lee `hud().session` y guarda el resultado en el perfil.

## 12. Rendimiento y compatibilidad (Fase 8)

- Física del alumno a 240 Hz; tráfico, peatones, normas y sesión a 30 Hz; render por `requestAnimationFrame`.
- ~20 llamadas de dibujo para el mundo estático (geometrías fusionadas) y `InstancedMesh` para coches, peatones, señales y semáforos.
- Calidad baja: sin sombras ni antialias, un solo retrovisor a media frecuencia, menos coches y peatones.
- Pausa automática al ocultar la pestaña; los km y el tiempo se guardan también al cerrar la página.
- Compilación con objetivo `safari15`; WebGL 2 obligatorio (mensaje claro si no está disponible).

## 13. Trazado irregular y aspecto (mejora posterior)

- `world/map.ts` genera los cruces desplazados de una retícula base (`XS`, `ZS` siguen definiendo la topología: columna/fila de cada cruce) y calles curvas recortadas al radio de cada cruce (`JUNCTION_R`). Cada cruce guarda sus brazos (`arms`), las manzanas (`blocks`) sus esquinas y lados.
- Los edificios son rectángulos orientados (`Obb`) colocados en hilera a lo largo de cada calle y validados contra la consulta de superficie y entre sí; la colisión usa el punto más cercano del rectángulo orientado.
- `world/textures.ts` crea en canvas las texturas de asfalto, acera, césped, fachadas y locales; las geometrías de suelo usan proyección en planta para las UV.

## 14. Texturas y calidad adaptativa (mejora posterior)

- `world/textures.ts`: ruido de valor en mosaico (fbm), máscaras dibujadas en canvas (grietas, parches, juntas) y mapas derivados (normales por diferencias finitas, rugosidad). `f` = factor de tamaño del nivel (1 / 0,5 / 0,25).
- `world/bake.ts`: al cargar se hornean (1) las sombras de edificios y árboles en una textura de 1024 px que cubre la ciudad (600 m) y (2) la mezcla hierba/tierra de todo el terreno. `SUN_OFFSET` es la misma dirección que la luz direccional.
- `world/shading.ts`: añadidos a los shaders estándar con `onBeforeCompile` (posición en planta, sombra horneada, variación de color, rodadas/arcén por la coordenada de carril `laneUv`, splat del terreno). Los uniformes son compartidos: cambiar una textura afecta a todos los materiales.
- `world/build.ts` devuelve `setLevel`, `prepare` y `cull`. La ciudad está en trozos (`Chunk`: lejano, árboles o detalle); los detalles van en la capa 1, que solo dibuja la cámara principal.
- `render/quality.ts`: `AdaptiveQuality` (lógica pura y probada) recibe una medida de FPS por segundo y devuelve cambios de pixel ratio o de nivel; `LEVEL_SPEC` define qué cambia cada nivel. `Simulation.applyLevel` lo aplica (cámara, niebla, sombra, texturas, retrovisores); los shaders con y sin sombra se compilan al cargar.
- `render/envmap.ts`: mapa de entorno PMREM de 128 px generado una vez a partir de una mini-escena; solo lo usan las carrocerías y las lunas.

## 15. Coche, vista interior y banco del examen (mejora posterior)

- `render/carModel.ts`: `loft()` genera superficies por secciones (superelipses en trapecio) con pliegues (`deform`) y grupos de material por cuadrilátero (`classify`: luna, techo/montantes, junquillos). El coche tiene `root` (posición y rumbo) y `body` (carrocería suspendida: cabeceo y balanceo); ruedas, sombra falsa y haz de faros cuelgan de `root`.
- El interior y las lunas de los espejos están en la capa 1 (`INTERIOR_LAYER`): solo la dibuja la cámara principal, así los retrovisores no se ven a sí mismos.
- `render/mirrors.ts`: tres cámaras con destino 256×128, limitadas a 20 FPS por tiempo; en vista interior la imagen va a `car.mirrorSurfaces`, en exterior a la capa de pantalla. `setLevelEnabled(false)` en calidad Baja.
- `theory/data/bank5.ts`: preguntas de estilo examen; `Question.verify` guarda la nota «VERIFICAR». `EXAM_POOL` (solo preguntas con `reference`) alimenta el examen oficial; el simulacro usa todo el banco.

## 16. Zonas, semilla y examen práctico (mejora posterior)

- `world/zones.ts`: `ZONES` (tramos y cruces de cada zona), `zoneAt(map, info)` y `spawnPoints()` con `spawnIsSafe()` (calzada, carril y sentido, esquinas sobre la vía, lejos de cruces, pasos, obstáculos y coches aparcados).
- `world/map.ts`: carretera `cv-sierra` (Catmull-Rom entre los cruces j-240_-180 y j-120_-180) con `sections` de velocidad y `rural`; `limitAt()`; manzana `INDUSTRIAL`; `SCHOOL_ROADS` a 20 km/h.
- `scenario.ts`: `scenarioFrom(seed, zona?)` es determinista; `pickRandom()` busca una semilla cuya zona no esté entre las 2 últimas; historial en `localStorage` con try/catch.
- `lessons/exam.ts`: `distTo(zona)` = Dijkstra inverso sobre `graph.feeders` (en caché); `plan(arm, zona)` elige el giro o la salida de rotonda de menor coste; caso especial para el ramal de la autovía (cruce j240_-60) y la salida 3.
- `Simulation`: `setScenario()` (solo antes de empezar), `applyWeather()`, `applyDensity()` (pooling con `Traffic.setActive` / `Pedestrians.setActive`), `mirrorGlanceT` para la falta de retrovisores y voz propia del examinador.

## 17. Texturas PBR generadas por código (mejora posterior)

- **Dónde:** `src/sim/world/pbr/` — `noise.ts` (fBm, Voronoi, grietas ramificadas, Sobel, AO), `recipes.ts` (16 materiales, detail texture y atlas de decals), `jobs.ts` (plan de tamaños), `worker.ts`, `library.ts` (carga, caché y texturas de Three.js) y `shader.ts` (proyección sin UV y detail texture). Sin DOM: se prueba en Node.
- **Mapas por material:** albedo (sRGB), normal (Sobel sobre un mapa de alturas, intensidad por material) y un mapa empaquetado lineal: R = oclusión ambiental, G = rugosidad, B = máscara extra (charcos en el asfalto, suciedad en el cristal).
- **Tamaños:** 1024 px los materiales del mundo; 2048 solo el asfalto y solo si la calidad de partida no es Baja, no es pantalla táctil y hay workers; 512 px los materiales del coche y objetos pequeños, la calidad Baja y lo lejano. Las versiones de 512 salen de reducir la de 1024 (no se vuelven a generar).
- **Carga:** `SimView` muestra una barra de progreso mientras `loadPbr` reparte los trabajos entre hasta 4 workers (reserva: por bloques en el hilo principal). Luego `PbrLibrary.upload` sube todas las texturas a la GPU. Al conducir no se crea ni se sube ninguna: cambiar de nivel solo cambia referencias.
- **Shaders:** `shading.ts` (asfalto, terreno, acera/pintura/decals y fachadas) y `pbr/shader.ts` (`patchProjected`: proyección por el eje dominante para coche, farolas, barreras y túnel). La detail texture es un grano de 256 px mezclado a 8× solo cerca de la cámara; se apaga con un uniform.
- **Lluvia:** `uWet` oscurece el albedo, baja la rugosidad y forma charcos donde lo dice el canal B; el reflejo es el mapa de entorno estático (nunca en tiempo real).
- **Decals:** planos fusionados por trozo con un único atlas (frenadas, parches, manchas, grietas selladas, tapas…), en la capa de detalle.
- **Recorte por FPS** (`AdaptiveQuality.tex`): 3 s seguidos por debajo de 55 FPS → texturas lejanas a 512 px y anisotropía 2; 3 s más → sin detail texture; después sigue el descenso de nivel de siempre. La anisotropía se cambia con un parámetro del muestreador, sin volver a subir la textura.

## 18. Calado realista y cambio automático (mejora posterior)

- **Física** (`vehicle/vehicle.ts`): el motor se cala solo si el régimen pasa 0,5 s seguidos por debajo del umbral (o se hunde por debajo de la mitad). Con el embrague pisado o en punto muerto el motor no está unido a las ruedas, así que no puede calarse. Sin gas, la ayuda del ralentí desaparece al caer de vueltas; con un poco de gas el motor aguanta el tirón.
- **Umbral por dificultad** (`specs.ts`, `STALL`): Fácil 400 rpm (más ayuda al ralentí), Normal 500, Realista 600. Se elige en Configuración.
- **Causa** (`stallCauseOf`): embrague brusco, frenar sin embrague, marcha larga, pendiente o poco gas. Se muestra al alumno y se apunta en la falta.
- **Efectos:** `lug` (motor ahogado) y `jerk` (tirón) mueven la cámara y el volante; al calarse hay cabeceo, sonido, testigos rojos en el cuadro y aviso «Motor calado» hasta volver a arrancar.
- **Cambio automático** (`assist.ts`, `stepAutoBox` + `noStall`): marchas y embrague solos, sin calado. La palanca pasa a R / N / D.
- **Examen:** cada calado es una falta con zona, momento y causa. Leve si es puntual; deficiente si ocurre en un cruce (o a menos de 10 m de su línea) con algún vehículo acercándose a menos de 45 m.
