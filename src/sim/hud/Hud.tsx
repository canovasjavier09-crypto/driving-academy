/** Cuadro de instrumentos y testigos. Se actualiza ~15 veces por segundo. */
import type { HudState } from '../Simulation';
import { CAR } from '../vehicle/specs';

function Gauge({ value, max, red, label, unit, big }: { value: number; max: number; red?: number; label: string; unit: string; big: string }) {
  // Arco de 240° (de −210° a 30°).
  const a0 = (-210 * Math.PI) / 180;
  const span = (240 * Math.PI) / 180;
  const R = 46;
  const pt = (f: number) => {
    const a = a0 + span * Math.min(1, Math.max(0, f));
    return `${50 + R * Math.cos(a)} ${55 + R * Math.sin(a)}`;
  };
  const arc = (f0: number, f1: number) => `M ${pt(f0)} A ${R} ${R} 0 ${(f1 - f0) * 240 > 180 ? 1 : 0} 1 ${pt(f1)}`;
  const f = value / max;
  return (
    <svg viewBox="0 0 100 92" className="hud-gauge" role="img" aria-label={`${label}: ${big} ${unit}`}>
      <path d={arc(0, 1)} className="hud-gauge-track" />
      {red !== undefined && <path d={arc(red / max, 1)} className="hud-gauge-red" />}
      {f > 0.002 && <path d={arc(0, Math.min(1, f))} className="hud-gauge-fill" />}
      <text x="50" y="58" className="hud-gauge-big">{big}</text>
      <text x="50" y="74" className="hud-gauge-unit">{unit}</text>
    </svg>
  );
}

function Pedal({ v, label, cls }: { v: number; label: string; cls: string }) {
  return (
    <div className="pedal-bar" title={label}>
      <div className={`pedal-fill ${cls}`} style={{ height: `${Math.round(v * 100)}%` }} />
      <span>{label[0]}</span>
    </div>
  );
}

/** Próxima regulación: semáforo (con su color), STOP, ceda el paso o rotonda, y la distancia. */
function AheadChip({ a }: { a: NonNullable<HudState['ahead']> }) {
  const label = a.control === 'semaforo' ? `Semáforo ${a.light ?? ''}` : a.control === 'stop' ? 'STOP' : a.control === 'rotonda' ? 'Rotonda: ceda el paso' : 'Ceda el paso';
  return (
    <div className="hud-ahead" aria-label={`${label} a ${Math.round(a.dist)} metros`}>
      {a.control === 'semaforo' ? (
        <span className={`ahead-light ${a.light ?? ''}`} aria-hidden="true"><i /><i /><i /></span>
      ) : a.control === 'stop' ? (
        <span className="ahead-stop" aria-hidden="true">STOP</span>
      ) : (
        <span className="ahead-ceda" aria-hidden="true" />
      )}
      <span><b>{label}</b><br /><span className="num">{Math.round(a.dist)} m</span></span>
    </div>
  );
}

const LIGHT_LABEL: Record<HudState['lights'], string> = { apagadas: '', posicion: 'Posición', cortas: 'Cortas', largas: 'Largas' };

export function Hud({ h }: { h: HudState }) {
  const blinkL = h.blinkOn && (h.blinker === 'izquierda' || h.blinker === 'emergencia');
  const blinkR = h.blinkOn && (h.blinker === 'derecha' || h.blinker === 'emergencia');
  const over = h.limit !== null && h.speedKmh > h.limit + 1;
  return (
    <>
      <div className="hud-road">
        {h.limit !== null && <div className={`limit-sign ${over ? 'over' : ''}`} aria-label={`Límite genérico ${h.limit} km/h`}>{h.limit}</div>}
        <div>
          <div className="hud-road-name">{h.roadName}</div>
          <div className="hud-road-sub">{h.surface === 'calzada' ? 'Calzada' : h.surface === 'arcen' ? 'Arcén' : h.surface === 'acera' ? 'Sobre la acera' : h.surface === 'fuera' ? 'Fuera de la vía' : h.surface}</div>
        </div>
      </div>

      {h.ahead && <AheadChip a={h.ahead} />}

      <div className="hud-msgs" aria-live="polite">
        {h.messages.map((m) => (
          <div key={m.id} className={`hud-msg ${m.kind} ${m.who ? 'instr' : ''}`}>
            {m.who && <span className={`instr-tag ${m.who}`}>{m.who === 'examinador' ? 'Examinador' : 'Instructor'}</span>}
            {m.text}
          </div>
        ))}
      </div>

      <div className="hud-fps num" title="FPS y nivel de calidad (se ajusta solo). F: más detalles">
        {h.fps} FPS · {h.quality}
        {h.showFps && <span> · ×{h.pixelRatio.toFixed(2)} · {h.drawCalls} dibujos</span>}
      </div>

      <div className="hud-dash">
        <div className="hud-tells" aria-label="Testigos">
          <span className={`tell arrow ${blinkL ? 'on green' : ''}`} title="Intermitente izquierdo">◀</span>
          <span className={`tell ${!h.engineOn ? 'on red' : ''}`} title="Motor apagado">⚡</span>
          <span className={`tell ${h.handbrake ? 'on red' : ''}`} title="Freno de mano">(P)</span>
          <span className={`tell ${!h.belt ? 'on red' : ''}`} title="Cinturón sin abrochar">⛑</span>
          <span className={`tell ${h.lights !== 'apagadas' ? (h.lights === 'largas' ? 'on blue' : 'on green') : ''}`} title={`Luces ${LIGHT_LABEL[h.lights]}`}>☀</span>
          <span className={`tell ${h.fuelPct < 0.12 ? 'on amber' : ''}`} title="Reserva de combustible">⛽</span>
          <span className={`tell arrow ${blinkR ? 'on green' : ''}`} title="Intermitente derecho">▶</span>
        </div>
        <div className="hud-gauges">
          <Gauge value={h.rpm} max={7000} red={CAR.redlineRpm} label="Revoluciones" unit="× 1000 rpm" big={(h.rpm / 1000).toFixed(1)} />
          <div className="hud-gear" aria-label={`Marcha ${h.gear}`}>
            <div className="gear-big">{h.gear}</div>
            <div className="gear-sub">{h.slipping ? 'patinando' : 'marcha'}</div>
          </div>
          <Gauge value={h.speedKmh} max={200} label="Velocidad" unit="km/h" big={String(Math.round(h.speedKmh))} />
        </div>
        <div className="hud-bottom">
          <div className="pedals" aria-label="Pedales">
            <Pedal v={h.clutch} label="Embrague" cls="c" />
            <Pedal v={h.brake} label="Freno" cls="b" />
            <Pedal v={h.throttle} label="Acelerador" cls="t" />
          </div>
          <div className="hud-info">
            <div className="fuel"><span>⛽</span><div className="bar"><span style={{ width: `${Math.round(h.fuelPct * 100)}%` }} /></div></div>
            <div className="dim num">{h.odometerKm.toFixed(2)} km {LIGHT_LABEL[h.lights] && `· ${LIGHT_LABEL[h.lights]}`}</div>
          </div>
        </div>
      </div>
    </>
  );
}
