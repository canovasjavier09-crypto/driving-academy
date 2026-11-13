# Driving Academy — Tareas por fase

Leyenda: ✅ hecho y verificado · 🔄 en curso · ⏳ pendiente

## FASE 1 — Análisis y arquitectura ✅ (12/11/2026)
- ✅ Análisis de hardware: iMac M1, 8 GB, macOS 26, Node 24 / npm 11
- ✅ Selección tecnológica razonada → `docs/ARQUITECTURA.md`
- ✅ Proyecto Vite 8 + React 19 + TypeScript 5.9 (estricto) + Three.js 0.187 + Vitest
- ✅ Dependencias de ejecución mínimas: react, react-dom, three
- ✅ Persistencia versionada (`src/core/storage`): migraciones, copia del dato corrupto, exportar/importar
- ✅ Modelo de perfil con normalización de datos dañados (`src/core/progress/profile.ts`)
- ✅ Niveles, XP y 9 logros (`levels.ts`)
- ✅ Repetición espaciada Leitner (`src/core/srs`)
- ✅ Motor de recomendaciones (falladas, repaso, tema débil, siguiente lección, error frecuente)
- ✅ Temario: 16 categorías teóricas y 6 niveles / 20 lecciones prácticas (`curriculum.ts`)
- ✅ 15 tests unitarios en verde

## FASE 2 — Interfaz y navegación ✅ (12/11/2026)
- ✅ Tema oscuro con acentos azul eléctrico, tokens CSS, animaciones (respeta «reducir movimiento»)
- ✅ Router hash sin dependencias, página 404, ErrorBoundary con mensaje en español
- ✅ Barra lateral (escritorio/iPad) y barra inferior (móvil); sin scroll horizontal a 375 px
- ✅ Inicio: nivel, XP, «Continuar aprendiendo» (recomendaciones reales) y panel de 6 accesos
- ✅ Hub del simulador con los 6 niveles y progreso por nivel
- ✅ Hub teórico con 4 modos y 16 temas
- ✅ Estadísticas y Progreso leen datos reales (estados vacíos explicativos)
- ✅ Configuración funcional y persistente: nombre, calidad, sombras, cámara, sonido, volumen, accesibilidad
- ✅ Exportar / importar / reiniciar progreso (con confirmación)
- ✅ Registro `src/app/features.ts`: lo no construido aparece deshabilitado con la fase en que llega (sin botones falsos)
- ✅ Verificado en navegador: sin errores de consola, persistencia tras recargar, vista móvil

## FASE 3 — Módulo teórico ✅ (12/11/2026)
- ✅ Banco de **174 preguntas** de redacción original en las 16 categorías (9–22 por tema), cada una con 3 opciones, explicación, dificultad y fuente (`normativa` con artículo citado / `didáctica`) → `src/theory/data/bank*.ts`
- ✅ 18 ilustraciones SVG propias (señales R, P, S, semáforo, marcas viales) → `src/theory/ui/Sign.tsx`
- ✅ Motor puro y testeado (`src/theory/engine/engine.ts`): selección equilibrada por temas, barajado de opciones, corrección, temporizador, registro en el perfil
- ✅ Modo examen: 30 preguntas, 30 min, apto con ≤ 3 fallos (sin responder = fallo), navegación entre preguntas, sin explicaciones hasta el final, corrección automática al agotarse el tiempo, aviso al cerrar la pestaña
- ✅ Revisión final con explicaciones, filtro «solo fallos» y salto a cada pregunta
- ✅ Modo aprendizaje (infinito, ordenado por repetición espaciada, «repetir más tarde»)
- ✅ Modo por temas (16 rutas `/teoria/tema/:id`) y modo errores (solo falladas no corregidas)
- ✅ Simulacro aleatorio: 10/20/30 preguntas, con o sin límite de tiempo
- ✅ Estadísticas: aciertos, errores, aprobados/suspendidos, tiempo medio, rendimiento por tema, temas dominados/débiles, gráfico de evolución
- ✅ XP y logros conectados (primera pregunta, aprobado, examen perfecto…)
- ✅ 27 tests en verde, incluida la validación automática del banco (ids únicos, opciones distintas, referencia obligatoria en «normativa», imágenes existentes, 16 temas en cada examen)
- ✅ Verificado en navegador: aprendizaje, examen completo, simulacro con auto-corrección por tiempo, modo errores (22/22 detectadas), estadísticas; sin errores de consola

### Pendiente de la Fase 3 (mejoras, no bloqueantes)
- Ampliar el banco hacia 300+ preguntas y más ilustraciones de señales
- Revisión humana de las referencias normativas: las citas de artículo son orientativas; en alumbrado se cita el bloque «arts. 98-109»
- Guardar un examen en curso si se recarga la página (ahora se avisa antes de salir, pero se pierde)

## FASE 4 — Entorno 3D y vehículo ✅ (12/11/2026)
- ✅ Tren motriz: curva de par, acelerador progresivo, ralentí con centralita, embrague con punto de fricción (desliza / bloquea), calado, corte de inyección, 5 marchas + R → `src/sim/vehicle`
- ✅ Reglas de manejo: no se cambia sin embrague, no entra la R en movimiento, no arranca con marcha metida sin embrague
- ✅ Dinámica: frenos y freno de mano con fricción estática, pendientes, rodadura, aerodinámica, freno motor, dirección con límite de agarre, consumo, cuentakilómetros
- ✅ 22 tests de física (salida en 1.ª, calado al soltar de golpe o salir en 3.ª, frenada 50→0 < 20 m, 0–100 en 8–16 s, velocidad máxima 150–205 km/h, retención en cuesta, radio de giro, cancelación del intermitente)
- ✅ Mapa: 31 calles (sentido único a 50, doble sentido a 30), 19 cruces, rotonda, barrio en cuesta (~11 %), parque, autovía de circunvalación 2+2 (120) con mediana y barrera, túnel de 300 m, incorporación con carril de aceleración y salida con carril de deceleración → `src/sim/world`
- ✅ 8 tests del mapa (puntos de salida en su carril y sentido, ningún edificio sobre calzada o acera, pendientes, mediana/arcén, rotonda antihoraria, paredes del túnel)
- ✅ Render Three.js: geometrías fusionadas e instanciadas, sombras que siguen al coche, niebla, 3 calidades
- ✅ Cámaras 1.ª persona (salpicadero, volante que gira, mirar con el ratón) y 3.ª persona; retrovisor interior y exteriores
- ✅ HUD: velocímetro, cuentarrevoluciones con zona roja, marcha, pedales, combustible, testigos (motor, freno de mano, cinturón, luces, intermitentes, reserva), vía actual y límite genérico
- ✅ Entrada: teclado, ratón, táctil multitáctil (volante, 3 pedales, palanca), Gamepad API
- ✅ Colisiones con edificios, árboles, farolas, túnel, barrera de la mediana y límites del mundo
- ✅ Sonido de motor sintetizado; pausa automática al cambiar de pestaña; km y tiempo de práctica guardados en el perfil
- ✅ Three.js se descarga solo al entrar al simulador (fragmento aparte de 162 KB gzip)
- ✅ Verificado en navegador: arranque y salida por teclado sin calar, cambio a 2.ª, frenada, arranque en cuesta con freno de mano, colisión contra fachada, vista de rotonda/túnel/autovía/cuesta, diseño móvil con controles táctiles, guardado de km al salir; sin errores de consola

### Ampliación: volante por inclinación (12/11/2026) ✅
- ✅ `src/sim/input/tilt.ts`: DeviceOrientationEvent (gamma en vertical, beta en horizontal con signo según `screen.orientation`), zona muerta ±3°, suavizado exponencial, calibración del «recto», tope de dirección a 45° de inclinación; volante dibujado limitado a ±90°
- ✅ Botón «Activar volante» que pide `DeviceOrientationEvent.requestPermission()` desde el toque (iOS); mensajes claros si se deniega, si no hay sensor o si falta HTTPS
- ✅ Sin sensor: botones grandes ◀ ▶; en ordenador siguen las flechas (también con el volante activo)
- ✅ Botones grandes de Gas y Freno, y Embrague (mismas rampas que el teclado: el embrague sube despacio en el punto de fricción)
- ✅ Diseño horizontal para móvil (volante a la izquierda, pedales a la derecha, cuadro abajo en el centro); en vertical se pide girar el aparato (con opción de seguir); se intenta bloquear en horizontal donde el navegador lo permite (no en iOS)
- ✅ `npm run cert` + `npm run dev:movil`: servidor HTTPS en la red local para probar en iPhone
- ✅ 6 tests (ejes por orientación, zona muerta, tope, suavizado, calibración, límite de ±90°)
- ✅ Verificado en navegador con el sensor simulado: inclinar 20° a la derecha gira a la derecha, 1,5° de temblor no mueve nada, el volante dibujado copia el ángulo, conducción completa con los botones táctiles, aviso de girar a horizontal
- ⏳ **Sin probar en un iPhone/iPad real**: el permiso, el signo de los ejes en horizontal y la sensibilidad (45°) deben confirmarse en el aparato

### Pendiente de la Fase 4 (no bloqueante)
- **Medir FPS reales en el iMac M1 y en Safari**: en el entorno de pruebas el panel del navegador estaba oculto y limitaba los fotogramas; el coste medido por fotograma fue bajo (≈ 1 ms de CPU) pero falta confirmarlo en pantalla. Tecla **F** muestra los FPS.
- **Volantes reales**: el mapeo no estándar (eje 0 dirección, ejes 1–3 pedales) no se ha probado con hardware; falta una pantalla de calibración.
- En móvil vertical la vista en 1.ª persona queda estrecha; se recomienda horizontal o 3.ª persona.
- La autovía solo tiene una entrada (este) y una salida (oeste) por la calzada interior.
- Sin ciclo día/noche: las luces se registran (para la Fase 6) pero no iluminan la escena.

## FASE 5 — Tráfico, peatones e instructor ✅ (12/11/2026)
- ✅ Señalización como datos (`src/sim/world/signals.ts`): 5 cruces con semáforo (ciclo de 38 s, nunca verde en ambos ejes), STOP y ceda el paso alternos en las calles secundarias, prioridad en las principales, ceda el paso en la rotonda y a la salida de la autovía; líneas de detención, 62 pasos de peatones y señales de velocidad
- ✅ Render de semáforos (luces que cambian), señales R-1, R-2 y R-301 dibujadas en canvas (simplificadas, sin escala oficial) y líneas de detención continuas/discontinuas
- ✅ Red de carriles para la IA (`traffic/lanes.ts`): carriles de calle, conectores en cruces (recto/derecha/izquierda con elección de carril), anillo de la rotonda con entradas y salidas, 4 carriles de autovía en bucle
- ✅ Tráfico IA (`traffic/traffic.ts`): modelo IDM, respeta semáforos (ámbar solo si no puede parar), STOP con detención y espera, ceda el paso, prioridad, rotonda, giros a la izquierda que ceden al que viene de frente, incorporaciones, pasos de peatones ocupados y el coche del alumno; intermitentes y luces de freno; reubicación de coches atascados lejos del alumno
- ✅ Peatones (`traffic/pedestrians.ts`): pasean por las aceras y cruzan por los pasos cuando ningún vehículo se acerca deprisa
- ✅ Detector de normas del alumno (`rules/monitor.ts`): semáforo en rojo, STOP sin detenerse, no ceder el paso (vehículos y peatones), exceso de velocidad, sentido contrario, giro y salida de rotonda sin intermitente, cinturón, túnel sin luces, subir a la acera, distancia de seguridad, freno de mano, calado, colisión, atropello; avisos anticipados y refuerzos positivos
- ✅ Instructor virtual (`instructor/instructor.ts`): una indicación cada vez, priorizando lo grave y sin repetirse; voz opcional en español con la síntesis del navegador (Configuración › Voz del instructor)
- ✅ HUD: próxima regulación (semáforo con su color, STOP, ceda) y distancia; mensajes del instructor con etiqueta; opciones de pausa «Tráfico y peatones» e «Instructor»
- ✅ Colisiones con coches de la IA y atropellos
- ✅ 20 tests nuevos, 83 en total (señalización, red de carriles, 3 minutos de tráfico en 3 semillas sin saltarse rojos ni STOP y sin solaparse, peatones que no se cruzan con coches, detector de normas en 7 situaciones, instructor)
- ✅ Verificado en navegador: coches parados en rojo, semáforo, línea y paso de peatones visibles, peatones cruzando, el instructor avisa del rojo y marca la falta al saltárselo; tráfico ≈ 0,1 ms por paso y render ≈ 1,3 ms con 48 coches y 54 peatones; sin errores de consola

### Pendiente de la Fase 5 (no bloqueante)
- Los coches de la IA no usan los ramales de la autovía ni cambian de carril (no adelantan)
- Los peatones son figuras simples (sin animación de piernas) y solo cruzan en cruces normales, no en la rotonda
- Las lecciones guiadas pasan a la Fase 6: necesitan la evaluación para poder darse por superadas
- Revisar con un profesor de autoescuela los criterios del detector (umbrales de distancia, tolerancia de velocidad de +3 km/h, etc.)

### Corrección del manejo en iPad / móvil (12/11/2026) ✅
- ✅ **Volante:** antes se leía un solo eje del sensor (gamma/beta) y, si el navegador informaba mal de la orientación, el coche respondía a inclinar hacia delante/atrás. Ahora se calcula la gravedad y se mide su giro en el plano de la pantalla: gira como un volante en cualquier orientación y con el aparato más o menos inclinado; si la orientación informada no cuadra con la ventana, se deduce de la gravedad. Botón ⇄ para invertir el sentido por si algún aparato lo da al revés; con el aparato en plano el volante vuelve al centro
- ✅ **Embrague:** deslizador vertical que se queda donde lo sueltas (franja del punto de fricción marcada), en lugar de un botón que había que mantener con otro dedo
- ✅ **Embrague asistido** (activado por defecto en táctil, desactivable en la pausa): pisa al cambiar, suelta progresivamente al salir y pisa al detenerse; tú eliges la marcha
- ✅ **Marchas:** palanca en orden R N 1 2 3 4 5 con la marcha actual resaltada; los botones actúan al tocar (funcionan aunque otro dedo esté pisando gas o freno)
- ✅ Otros fallos: la voz del instructor no sonaba en iOS (ahora se activa con «Empezar»); zoom con dos dedos y menú de pulsación larga bloqueados en el simulador
- ✅ 14 tests nuevos (10 de volante, 4 de embrague asistido), 91 en total; verificado en navegador con tamaño de iPad horizontal
- ⏳ Falta confirmarlo en un iPad real (sensor, permiso y comodidad de la sensibilidad)

## FASE 6 — Infracciones, evaluación y lecciones ✅ (12/11/2026)
- ✅ Calificación de faltas (`rules/evaluation.ts`): eliminatorias, deficientes y leves; criterio de NO APTO de la DGT (1 E, 2 D, 1 D + 5 L o 10 L); la gravedad del exceso de velocidad y de las colisiones depende de la magnitud. La asignación de cada error a una categoría es una aproximación didáctica (se avisa en la app)
- ✅ Detector ampliado: giros y salidas de rotonda bien señalizados, detención en rojo, semáforo respetado, ceder al peatón, cambios de carril con/sin intermitente, incorporación a la autovía (velocidad y señalización), reducción de marcha
- ✅ Zona de maniobras: explanada con aparcamiento en línea, batería y oblicuo, coches aparcados, bordillos y calle estrecha para el cambio de sentido
- ✅ Motor de lecciones (`lessons/session.ts`): objetivos que se comprueban en vivo, objetivos secuenciales, objetivos «a evitar», límite de tiempo, puntuación 0–100 y fin anticipado por falta eliminatoria
- ✅ **Las 20 lecciones** del temario (`lessons/defs.ts`), cada una con su punto de partida, estado del coche y objetivos; nivel 6 = simulacro de examen
- ✅ Simulacro de examen práctico (`lessons/exam.ts`): examinador virtual con 8 indicaciones (giros y salidas de rotonda), comprobación de que se siguen, petición de detención final, fin por falta eliminatoria, veredicto APTO/NO APTO con desglose; sin consejos del instructor durante la prueba
- ✅ Interfaz: explicación previa, panel de objetivos con cronómetro, resultado con faltas por gravedad, «Repetir» y «Siguiente lección»; guardado de lecciones (intentos, mejor nota), exámenes prácticos y errores frecuentes
- ✅ 14 tests nuevos (calificación, lecciones, examen, zona de maniobras)
- ✅ Verificado en navegador: lección «Conoce los mandos» superada con 100/100 y guardada; aparcamiento en línea superado con la maniobra correcta y suspendido al rozar un coche; el examinador da indicaciones y comprueba que se siguen

### Pendiente de la Fase 6
- No hay carretera convencional de doble sentido: «Curvas y distancia de seguridad» se practica en la autovía
- Revisión por un profesor de autoescuela de la categoría asignada a cada falta y de las tolerancias

## FASE 7 — Integración ✅ (12/11/2026)
- ✅ Todas las rutas del simulador disponibles (libre, 20 lecciones, simulacro); ningún botón deshabilitado
- ✅ 4 logros nuevos de práctica (primera lección, maniobras, temario completo, examen sin faltas) — 13 en total
- ✅ Estadísticas: simulacros prácticos (E/D/L y veredicto), lecciones (intentos y mejor nota) y errores más frecuentes al volante (se registran también en conducción libre)
- ✅ Recomendaciones: siguiente lección del temario y simulacro práctico tras superar 12 lecciones
- ✅ Progreso: las lecciones pendientes enlazan a la lección
- ✅ «Aviso y fuentes»: qué está simplificado en el simulador
- ✅ 3 tests de integración (logros, recomendación, migración de perfiles antiguos)

## FASE 8 — Pruebas, rendimiento y Safari ✅ (12/11/2026)
- ✅ 108 tests unitarios en verde (física, mapa, señalización, tráfico, peatones, normas, calificación, lecciones, examen, volante por inclinación, embrague asistido, núcleo y teoría)
- ✅ `npm run build` (tipos estrictos + build de producción) sin errores; el build servido con `vite preview` funciona: hub con 22 accesos activos, lección cargada, sin errores de consola
- ✅ Rendimiento medido: tráfico + peatones ≈ 0,1 ms por paso; render ≈ 1,3 ms por fotograma con 48 coches, 54 peatones y 3 retrovisores (calidad alta); Three.js en un fragmento aparte (192 KB gzip) que solo se descarga al entrar al simulador
- ✅ Compatibilidad Safari: objetivo de compilación `safari15`, WebGL 2, Pointer Events, Web Audio con prefijo `webkit`, permiso de orientación de iOS, sin APIs recientes no soportadas (revisado), gestos de zoom bloqueados en el simulador
- ✅ Acceso de depuración (`window.__sim`) solo en desarrollo
- ⏳ **Pendiente de comprobar en tus dispositivos**: FPS reales en el iMac M1 con Safari (tecla F) y el volante por inclinación en un iPad/iPhone real

## Mejora: ciudad irregular y aspecto más realista ✅ (12/11/2026)
- ✅ Trazado irregular: los cruces se desplazan hasta ±11 m de la cuadrícula (de forma determinista) y las calles se curvan (flecha de hasta 7 m); la rotonda y los dos cruces de los ramales quedan fijos
- ✅ Cruces redondeados (radio 7 m) con acera y bordillo entre las bocas de las calles, en lugar de esquinas en ángulo recto
- ✅ Edificios orientados a lo largo de cada fachada (rectángulos girados con colisión orientada), hileras con callejones, edificios bajos en el interior de la manzana y patios ajardinados; 111 edificios
- ✅ Todo lo que dependía de la cuadrícula se ha generalizado: señales y fases de semáforo (por eje de calle), red de carriles, peatones (recorren las aceras reales y cruzan por los pasos), lecciones y puntos de salida (sobre la calle, no en coordenadas fijas)
- ✅ Tráfico IA ajustado a cruces más grandes: comprueba a quien viene a 48 m y cuenta como «dentro del cruce» al coche que ya ha decidido entrar (0 solapes en 8 semillas de 3 minutos)
- ✅ Realismo visual sin coste apreciable: texturas generadas de asfalto (grano, parches, grietas), baldosa de acera y césped; 4 estilos de fachada (residencial con balcones, casco antiguo con contraventanas y tejado, oficinas acristaladas, moderno), planta baja de locales con toldos y portales, instalaciones en las azoteas; cielo con degradado, sierra en el horizonte con perspectiva aérea, árboles caducifolios de dos copas y coníferas en el campo, luz más cálida y sombras suaves en calidad alta
- ✅ Rendimiento: dibujado ≈ 1,7 ms por fotograma (antes ≈ 1,3 ms) con tráfico, peatones y retrovisores; 25 texturas pequeñas con mipmaps
- ✅ 2 tests nuevos (edificios sin solapes ni invadir aceras; trazado irregular), 109 en total

## Mejora: texturas realistas y rendimiento adaptativo ✅ (12/11/2026)
- ✅ Texturas generadas por código (sin imágenes): asfalto con árido, manchas, parches, grietas y aceite, con **mapa de normales** y **mapa de rugosidad**; tierra/grava, césped, baldosa con juntas y losetas de distinto tono, desgaste de la pintura vial
- ✅ Asfalto: rodadas más oscuras y lisas en cada carril, arcén más claro y rugoso, segunda muestra girada y a otra escala y variación de color a gran escala (no se nota la repetición); cada tramo con su propio giro y escala de textura
- ✅ Terreno con mezcla hierba/tierra (splat): arcenes de tierra junto a autovía y ramales, explanada de maniobras, caminos del parque y calvas sueltas; dos escalas y giros distintos
- ✅ Fachadas con 4 ventanas × 2 plantas por módulo (cortinas, persianas, luz interior, marcos, alféizares, churretes) y planta baja de 4 locales distintos (rótulos, escaparates con género, persianas metálicas, toldos, portales)
- ✅ Tamaño máximo 1024 px (asfalto en Alto), 512 o menos para el resto; mipmaps y anisotropía 4 en todas
- ✅ Iluminación: 1 luz direccional + hemisférica. Sombra real **solo del coche del alumno** (1024 px en Alto, 512 en Medio, ±6,5 m alrededor del coche; una vez por fotograma, no por retrovisor). Sombras horneadas de edificios y árboles (proyectadas según el sol en una textura al cargar) y manchas de sombra bajo coches, peatones y árboles del campo
- ✅ Reflejos de la carrocería (alumno y tráfico) con un mapa de entorno estático de 128 px generado al cargar
- ✅ Niebla suave, tone mapping ACESFilmic y salida sRGB; sin bloom, SSAO ni DOF
- ✅ Pixel ratio ≤ 1,5 y escalado dinámico de resolución: cada segundo se mide el FPS; < 55 → −10 % (mínimo 0,6); > 62 durante 3 s → +10 %. En pantallas de 60 Hz el umbral de subida es «frecuencia − 3» (57), porque allí nunca se superan 62 FPS
- ✅ Calidad automática en 3 niveles (Alto / Medio / Bajo): sombras, distancia de dibujado (900 / 650 / 420 m), distancia de detalle, tamaño de textura y refresco de los retrovisores. Empieza en el nivel de Configuración (por defecto, Medio) y se adapta sola; no vuelve en 60 s a un nivel que no ha aguantado
- ✅ Culling por distancia y LOD simple: la ciudad está en trozos de 150 m (300 m en el campo) que se muestran u ocultan según la distancia; azoteas, troncos y sombras falsas solo de cerca, y los retrovisores no los dibujan
- ✅ Sin crear objetos al conducir: todo se construye al cargar y los trozos se muestran u ocultan (el mapa es finito, no hay tramos que reciclar); el tráfico ya no crea arrays por fotograma; las texturas de los otros niveles se preparan mientras se muestra la pantalla de inicio (cambiar de nivel tarda ≈ 1 ms)
- ✅ Delta time limitado a 50 ms
- ✅ Contador «FPS · nivel» siempre visible arriba a la derecha (F añade pixel ratio y llamadas de dibujo)
- ✅ 7 tests nuevos de la calidad adaptativa, 116 en total; build sin errores
- ✅ Medido en el panel del navegador de la app: 60 FPS en Alto con resolución ×1,5 durante un simulacro de examen
- ⏳ Pendiente de comprobar: FPS en Safari del iMac y en iPhone/iPad

## Mejora: coche realista, vista interior y examen test verificado ✅ (13/11/2026)
- ✅ Coche nuevo (compacto de 5 puertas) modelado por código: carrocería por secciones con curvas suaves, pasos de rueda, capó con nervios y juntas, aletas marcadas, juntas de puertas, tiradores, retrovisores con brazo, calandra y paragolpes. **20.406 triángulos** (presupuesto: 30.000), materiales reutilizados y geometría fusionada
- ✅ Pintura metalizada con barniz (MeshPhysicalMaterial con clearcoat, solo la carrocería) y el mapa de entorno estático existente; resto, MeshStandardMaterial
- ✅ Faros y pilotos con forma, cristal y lámpara emisiva (cortas, largas, posición, freno, intermitentes y marcha atrás). El simulador no tiene ciclo de noche: el haz de los faros en el suelo se ve cuando hay poca luz (dentro del túnel)
- ✅ Ruedas con neumático (perfil de revolución), llanta de 5 radios y disco; giran con la velocidad y pivotan con la dirección
- ✅ Suspensión visual (muelle amortiguado): ≈0,7° de cabeceo en una frenada fuerte y ≈1,4° de balanceo en curva; vuelve a 0 en reposo
- ✅ Vista interior: ojos del conductor, FOV 72°, near 0,05; capó y guardabarros visibles, parabrisas con montantes A, salpicadero, cuadro de instrumentos en canvas (se redibuja solo si cambian velocidad, rpm, marcha o testigos), volante que gira con la dirección (incluida la inclinación del dispositivo), retrovisor interior y laterales con imagen
- ✅ Retrovisores: texturas de 256×128, 20 actualizaciones por segundo como máximo (medido: 21 en el primer segundo), desactivados automáticamente en calidad Baja; el interior y las lunas de los espejos están en una capa que los espejos no dibujan
- ✅ Movimiento de cámara sutil y suavizado (vibración según velocidad y baches) y reflejo falso del salpicadero en el parabrisas (textura)
- ✅ Botón «Interior / Exterior» junto a la pausa (además de la tecla V)
- ✅ Examen test: formato comprobado — 30 preguntas con 3 opciones (Revista DGT, octubre de 2025); 30 minutos y máximo 3 fallos según el suplemento de test de la revista y autoescuelas (marcado VERIFICAR en la pantalla). La DGT prevé una pregunta con vídeo de percepción del riesgo
- ✅ 32 preguntas nuevas de estilo examen con respuestas trampa (EXA-01…32); el examen solo usa preguntas con norma citada (152); 17 preguntas llevan la marca «VERIFICAR» donde el artículo o la cifra no son seguros
- ✅ Resultado: aciertos, fallos, sin responder; en cada fallo, tu respuesta, la correcta, la explicación, la norma y el aviso VERIFICAR si lo hay
- ✅ 4 tests nuevos del banco del examen, 120 en total; build sin errores
- ⏳ Pendiente: revisar los «VERIFICAR» contra el BOE y medir FPS de la vista interior en el iPhone/iPad

## Mejora: examen práctico con examinador y salida en zona distinta cada vez ✅ (13/11/2026)
- ✅ 8 zonas con carácter propio:
  - centro con semáforos y peatones; zona residencial (30); zona escolar (20, señal de niños P-21);
  - polígono industrial (naves bajas de chapa con portones); rotonda; autovía con incorporación, túnel y salida;
  - **nueva carretera de la Sierra (CV-12, 754 m)**: tramo de montaña (curvas cerradas, bajada de la meseta, línea continua, 40 km/h) y carretera convencional (70 km/h, arcén de tierra, líneas de borde).
- ✅ Salida aleatoria en cada partida: zona y punto sorteados entre 18–109 salidas válidas por zona; excluye las 2 últimas zonas (guardadas en localStorage con try/catch)
- ✅ Semilla por partida (1–999.999): decide la zona, el punto de salida, el tráfico, los peatones, la meteorología y el orden de zonas del examen. Se muestra en pantalla y se puede escribir para repetir el escenario
- ✅ Selector «Aleatorio» (por defecto) o zona elegida a mano
- ✅ Meteorología visual: despejado, nublado, lluvia (asfalto mojado y lluvia por CSS) y niebla (visibilidad de 140 m). La física no cambia
- ✅ Examen práctico de ≈ 25 min con ruta por 5 zonas encadenadas (camino más corto sobre la red de carriles hacia la siguiente zona); indicaciones por voz (speechSynthesis en español) y en pantalla, ≈ 7 s antes del cruce (mínimo 55 m) y recordatorio a 25 m; se pueden fallar
- ✅ Faltas nuevas: no mirar los retrovisores antes de maniobrar (leve, solo en vista interior: hay que girar la vista hacia el espejo) y posición incorrecta (pisar el eje, leve). Registro con momento y zona de cada falta
- ✅ Resultado: APTO / NO APTO, faltas con explicación de cómo corregirlas, zona de salida, semilla, tiempo y zonas recorridas
- ✅ Tráfico y peatones con reserva fija (pooling): 48 coches y 54 peatones creados una vez; circulan 100 / 75 / 50 % según el nivel de calidad (70 % de eso en el examen)
- ✅ Conducción libre: mismo sorteo y semilla, sin examinador, con aviso en pantalla de cada infracción y su gravedad
- ✅ Comprobado: 300 escenarios aleatorios sin salir en contradirección, sin subirse a la acera y sin coche de la IA a menos de 12 m; todas las salidas, en calzada, en su carril y fuera de obstáculos; tráfico IA sin solapes en 13 semillas de 3 minutos
- ✅ 11 tests nuevos (131 en total); build sin errores
- ⏳ Pendiente: «la semilla genera el trazado» se ha interpretado como punto de salida y ruta. La ciudad y sus calles son las mismas en todas las partidas, porque regenerar el mapa al empezar costaría tiempo de carga y rompería las lecciones

## Corrección: retrovisores y errores (13/11/2026)
- ✅ Retrovisor interior más pequeño, orientado a los ojos del conductor y con brazo al techo; ya no refleja el propio coche (plano cercano de su cámara a 2,6 m)
- ✅ Lunas de los retrovisores exteriores fuera de la carcasa (antes quedaban dentro y se veían negras) y orientadas al conductor; cámaras con plano cercano a 0,5 m para no ver la carcasa
- ✅ Vista interior: si un espejo del coche queda fuera de la pantalla (pantallas estrechas), su imagen aparece en el borde como en la vista exterior
- ✅ Error de WebGL «Vertex buffer is not big enough»: el coche lento de las lecciones superaba la reserva de instancias; ahora reutiliza un coche de la reserva y el dibujo nunca supera la capacidad
- ✅ Avisos `toNonIndexed()` al construir el coche eliminados
- ✅ Examen: la primera indicación ya no se da con el coche parado junto a «inicie la marcha»
- ✅ Revisadas todas las pantallas (inicio, teoría, examen, simulacro, aprendizaje, errores, temas, simulador, progreso, estadísticas, configuración, aviso): sin errores en consola; 131 tests y build en verde

## Problemas / riesgos identificados
- El banco de preguntas debe redactarse con cuidado: contenido normativo verificable, redacción original, sin presentar nada como oficial de la DGT.
- Safari: comprobar `localStorage` en modo privado (ya cubierto con backend en memoria + aviso) y rendimiento WebGL.

## Mejora: retrovisores

- [x] Forma real del cristal: interior muy redondeado, exteriores en «D» con el lado exterior redondeado (máscara con `alphaTest`, sin transparencia en el coche).
- [x] Marco redondeado oscuro alrededor de cada cristal (coche y capa de pantalla).
- [x] Retrovisor interior: silueta de la luneta (techo, montantes C, bandeja, reposacabezas traseros y resistencias térmicas), en `render/mirrorLook.ts`.
- [x] Viñeteado solo en el borde y brillo suave del cristal.
- [x] Espejo derecho convexo (FOV 40° en vez de 32°).
- [x] Corregido: la imagen de los espejos del coche salía teñida de gris azulado (el color de «apagado» no se quitaba al asignar la imagen).
- [x] Sin cambio de coste: siguen a 256×128 px, ≤ 20 FPS y desactivados en calidad Baja. Las texturas nuevas se dibujan una sola vez. Comprobado en el navegador (vista interior y exterior), 131 tests y build.
