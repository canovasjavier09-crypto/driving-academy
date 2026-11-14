# Driving Academy

Autoescuela virtual local para el permiso B (España): simulador de conducción 3D y preparación del examen teórico.

> Herramienta complementaria de aprendizaje. No sustituye a una autoescuela, al profesorado ni a la conducción supervisada legalmente.

## Requisitos
Node.js 20 o superior. Funciona sin conexión y sin servicios de pago.

## Uso
```bash
npm install
npm run dev        # http://127.0.0.1:5173
npm test           # tests unitarios
npm run build      # comprobación de tipos + build de producción en dist/
npm run preview    # sirve el build
```

## Probar en iPhone / iPad (volante por inclinación)
Safari solo deja leer el sensor de inclinación con conexión segura (HTTPS), así que hay un servidor aparte con un certificado local:

```bash
npm run cert        # una sola vez: crea un certificado autofirmado en .cert/
npm run dev:movil   # muestra una dirección «Network: https://192.168.x.x:5180»
```

1. Con el iPhone en la misma wifi, abre esa dirección en Safari. Avisará de que el certificado no es de confianza: «Mostrar detalles › visitar este sitio web».
2. Entra en Simulador práctico › Conducción libre › Empezar y pon el iPhone en horizontal.
3. Pulsa **Activar volante** y acepta el permiso de movimiento. Sujeta el iPhone como un volante y pulsa **Calibrar** para fijar el «recto».

`dev:movil` abre el servidor a la red local; ciérralo (Ctrl+C) al terminar.

## Qué incluye
- **Teoría (permiso B):** 174 preguntas de redacción propia en 16 temas, examen de 30 preguntas / 30 min / máx. 3 fallos, modos aprendizaje, por temas, errores y simulacro, repetición espaciada y estadísticas.
- **Simulador 3D:** turismo manual con embrague real, ciudad con tráfico, peatones, semáforos, STOP, ceda el paso, rotonda, cuestas, autovía con túnel y zona de maniobras; instructor virtual (texto y voz opcional). Texturas PBR generadas por código al entrar (pantalla de carga de unos segundos), lluvia con charcos, calado realista con tres dificultades y opción de cambio automático (en Configuración), y calidad automática: el contador de arriba a la derecha muestra los FPS y el nivel (Alto / Medio / Bajo), que se ajusta solo para mantener la fluidez.
- **20 lecciones prácticas** en 5 niveles y **simulacro de examen práctico** con examinador y calificación orientativa de la DGT.
- **Progreso:** niveles, XP, 13 logros, recomendaciones y estadísticas guardadas en el navegador (exportables desde Configuración).
- **Dispositivos:** teclado y ratón, mando, iPad/iPhone con volante por inclinación y pedales táctiles.

## Documentación
- `docs/ARQUITECTURA.md` — decisiones técnicas y estructura
- `TAREAS.md` — estado de cada fase y problemas pendientes
