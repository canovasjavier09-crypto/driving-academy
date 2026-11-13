/**
 * Controles táctiles (iPad / móvil), pensados para usar el aparato en horizontal:
 * - Volante por inclinación (botón «Activar volante», obligatorio en iOS) con
 *   botón «Calibrar». Sin sensor, dos botones grandes ◀ ▶.
 * - Botones grandes de Gas y Freno, más Embrague (al soltarlo sube despacio
 *   en el punto de fricción, igual que con el teclado).
 * - Palanca de cambios y botones de llave, freno de mano, intermitentes, etc.
 * Los botones de mantener pulsado equivalen a teclas (mismas rampas que el teclado).
 */
import { useEffect, useRef, useState, type PointerEvent as RPE, type ReactNode } from 'react';
import type { InputManager, Action } from '../input/input';
import { TiltSteering, type TiltResult } from '../input/tilt';
import { CAR, type Gear } from '../vehicle/specs';

/** Botón que se mantiene pulsado (multitáctil con Pointer Events). */
function HoldButton({ input, code, label, className }: { input: InputManager; code: string; label: string; className: string }) {
  const [down, setDown] = useState(false);
  const set = (v: boolean) => {
    setDown(v);
    input.setVirtual(code, v);
  };
  return (
    <button
      type="button"
      className={`t-hold ${className} ${down ? 'down' : ''}`}
      onPointerDown={(e) => {
        e.preventDefault();
        try {
          e.currentTarget.setPointerCapture(e.pointerId);
        } catch {
          /* sin captura el botón sigue funcionando hasta pointerup */
        }
        set(true);
      }}
      onPointerUp={() => set(false)}
      onPointerCancel={() => set(false)}
      onLostPointerCapture={() => set(false)}
      onContextMenu={(e) => e.preventDefault()}
      aria-label={label}
      aria-pressed={down}
    >
      {label}
    </button>
  );
}

/** Volante dibujado: gira con la inclinación (±90°) o con los botones. */
function WheelGraphic({ input }: { input: InputManager }) {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    let raf = 0;
    const tick = () => {
      // Con el sensor activo el volante copia la inclinación real (±90°); si no, la dirección de los botones.
      const deg = input.tilt.active ? input.tilt.visualAngle() : input.last.steer * 90;
      if (ref.current) ref.current.style.transform = `rotate(${deg.toFixed(1)}deg)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [input]);
  return (
    <svg ref={ref} viewBox="-50 -50 100 100" className="t-wheel" aria-hidden="true">
      <circle r="44" className="t-wheel-rim" />
      <circle r="9" className="t-wheel-hub" />
      <path d="M -42 -4 L -9 -2 M 42 -4 L 9 -2 M 0 9 L 0 42" className="t-wheel-spoke" />
      <rect x="-3" y="-47" width="6" height="9" rx="2" className="t-wheel-mark" />
    </svg>
  );
}

const TILT_ERRORS: Record<Exclude<TiltResult, 'ok'>, string> = {
  denied: 'Permiso de movimiento denegado. Actívalo en Ajustes › Safari › Movimiento y orientación, o usa los botones ◀ ▶.',
  unsupported: 'Este navegador no ofrece el sensor de inclinación. Usa los botones ◀ ▶ o las flechas.',
  insecure: 'El sensor solo funciona con conexión segura (HTTPS). Abre la app con «npm run dev:movil» (ver README) o usa los botones ◀ ▶.',
  'no-data': 'Este dispositivo no tiene sensor de inclinación. Usa los botones ◀ ▶ o las flechas del teclado.',
};

/** Orden natural de la palanca. */
const GEARS_ROW: Gear[] = ['R', 'N', 1, 2, 3, 4, 5];

/**
 * Botón de toque inmediato: actúa en pointerdown (no espera al «click»), así
 * funciona aunque otro dedo esté pisando el gas o el freno.
 */
function TapButton({ onTap, className = '', label, children, active }: { onTap: () => void; className?: string; label?: string; children: ReactNode; active?: boolean }) {
  return (
    <button
      type="button"
      className={`t-btn ${className} ${active ? 'on' : ''}`}
      aria-label={label}
      aria-pressed={active}
      onPointerDown={(e) => {
        e.preventDefault();
        onTap();
      }}
      onContextMenu={(e) => e.preventDefault()}
    >
      {children}
    </button>
  );
}

/**
 * Pedal de embrague táctil: un deslizador vertical que se queda donde lo sueltas
 * (arriba = pisado a fondo). La franja marca el punto de fricción.
 */
function ClutchSlider({ input, assist }: { input: InputManager; assist: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(input.touchClutch);
  const set = (x: number) => {
    const c = Math.min(1, Math.max(0, x));
    input.touchClutch = c;
    setV(c);
  };
  const fromEvent = (e: RPE) => {
    const r = ref.current!.getBoundingClientRect();
    return (r.bottom - e.clientY) / r.height;
  };
  const top = (1 - CAR.clutchBiteStart) * 100;
  const height = (CAR.clutchBiteStart - CAR.clutchBiteEnd) * 100;
  return (
    <div
      ref={ref}
      className="t-clutch"
      role="slider"
      aria-label="Embrague: desliza hacia arriba para pisarlo; se queda donde lo sueltas"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(v * 100)}
      onPointerDown={(e) => {
        e.preventDefault();
        try {
          e.currentTarget.setPointerCapture(e.pointerId);
        } catch {
          /* sin captura */
        }
        set(fromEvent(e));
      }}
      onPointerMove={(e) => {
        if (e.buttons || e.pointerType !== 'mouse') set(fromEvent(e));
      }}
    >
      <div className="t-clutch-bite" style={{ top: `${top}%`, height: `${height}%` }} />
      <div className="t-clutch-fill" style={{ height: `${Math.round(v * 100)}%` }} />
      <span className="t-clutch-label">Embrague{assist ? ' (auto)' : ''}</span>
      <span className="t-clutch-hint">{v > 0.85 ? 'pisado' : v > CAR.clutchBiteEnd ? 'fricción' : 'suelto'}</span>
    </div>
  );
}

export function TouchControls({ input, onMessage, gear, assist }: { input: InputManager; onMessage: (text: string, kind: 'info' | 'warn') => void; gear: Gear; assist: boolean }) {
  const [tiltOn, setTiltOn] = useState(input.tilt.active);
  const [busy, setBusy] = useState(false);
  const [noSensor, setNoSensor] = useState(!TiltSteering.supported());
  const [, force] = useState(0);
  const act = (a: Action) => () => input.push(a);

  // Al ocultarse (pausa), ningún botón debe quedarse «pulsado».
  useEffect(() => () => input.clearVirtual(), [input]);

  const enableTilt = () => {
    // Sin await previo: iOS exige que la petición de permiso salga del propio toque.
    setBusy(true);
    void input.tilt.enable().then((r) => {
      setBusy(false);
      if (r === 'ok') {
        setTiltOn(true);
        onMessage('Volante activado: gira el aparato como un volante. Pulsa «Calibrar» con él recto.', 'info');
      } else {
        if (r === 'no-data' || r === 'unsupported') setNoSensor(true);
        onMessage(TILT_ERRORS[r], 'warn');
      }
    });
  };

  return (
    <div className="touch-layer">
      <div className="t-left">
        <div className="t-buttons">
          <TapButton onTap={act({ type: 'ignition' })}>Llave</TapButton>
          <TapButton onTap={act({ type: 'handbrake' })}>(P)</TapButton>
          <TapButton onTap={act({ type: 'belt' })}>Cint.</TapButton>
          <TapButton onTap={act({ type: 'blinker', side: 'izquierda' })} label="Intermitente izquierdo">◂ Int</TapButton>
          <TapButton onTap={act({ type: 'blinker', side: 'derecha' })} label="Intermitente derecho">Int ▸</TapButton>
          <TapButton onTap={act({ type: 'lights' })}>Luces</TapButton>
        </div>
        <div className="t-steer-area">
          {!tiltOn && <HoldButton input={input} code="ArrowLeft" label="◀" className="steer" />}
          <div className="t-wheel-box">
            <WheelGraphic input={input} />
            {tiltOn ? (
              <div className="t-wheel-actions">
                <TapButton className="small" onTap={() => { input.tilt.calibrate(); onMessage('Posición actual fijada como «recto».', 'info'); }}>Calibrar</TapButton>
                <TapButton className="small" active={input.tilt.invert} label="Invertir el sentido del volante" onTap={() => { input.tilt.invert = !input.tilt.invert; force((n) => n + 1); }}>⇄</TapButton>
                <TapButton className="small" onTap={() => { input.tilt.disable(); setTiltOn(false); }}>Botones</TapButton>
              </div>
            ) : (
              !noSensor && (
                <button type="button" className="t-btn small accent" onClick={enableTilt} disabled={busy}>{busy ? 'Activando…' : 'Activar volante'}</button>
              )
            )}
          </div>
          {!tiltOn && <HoldButton input={input} code="ArrowRight" label="▶" className="steer" />}
        </div>
      </div>
      <div className="t-right">
        <div className="t-gears" aria-label="Palanca de cambios">
          {GEARS_ROW.map((g) => (
            <TapButton key={String(g)} className="gear" active={gear === g} label={`Marcha ${g}`} onTap={act({ type: 'gear', gear: g })}>{g}</TapButton>
          ))}
        </div>
        <div className="t-pedals">
          <ClutchSlider input={input} assist={assist} />
          <HoldButton input={input} code="KeyS" label="Freno" className="brake" />
          <HoldButton input={input} code="KeyW" label="Gas" className="gas" />
        </div>
      </div>
    </div>
  );
}
