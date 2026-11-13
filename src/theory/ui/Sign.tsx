/**
 * Ilustraciones de señales dibujadas en SVG (originales, estilizadas, sin
 * imágenes de terceros). Las formas y colores siguen el catálogo español.
 */
import type { ReactNode } from 'react';
import { SIGN_IDS, type SignId } from '../data/signIds';

const RED = '#d7261e';
const BLUE = '#1f5fbf';
const YEL = '#f4c20d';

const Circle = ({ fill, stroke = RED, children }: { fill: string; stroke?: string; children?: ReactNode }) => (
  <>
    <circle cx="50" cy="50" r="46" fill="#fff" />
    <circle cx="50" cy="50" r="42" fill={fill} stroke={stroke} strokeWidth="9" />
    {children}
  </>
);

const Warning = ({ children, inverted = false }: { children?: ReactNode; inverted?: boolean }) => (
  <>
    <path d={inverted ? 'M6 12 L94 12 L50 92 Z' : 'M50 6 L95 88 L5 88 Z'} fill="#fff" stroke={RED} strokeWidth="9" strokeLinejoin="round" />
    {children}
  </>
);

const Square = ({ children }: { children?: ReactNode }) => (
  <>
    <rect x="6" y="6" width="88" height="88" rx="8" fill={BLUE} stroke="#fff" strokeWidth="3" />
    {children}
  </>
);

const Car = ({ x, y, fill }: { x: number; y: number; fill: string }) => (
  <g transform={`translate(${x} ${y})`} fill={fill}>
    <rect x="0" y="8" width="22" height="10" rx="2" />
    <path d="M4 8 L7 2 H15 L18 8 Z" />
    <circle cx="5" cy="19" r="3" fill="#111" />
    <circle cx="17" cy="19" r="3" fill="#111" />
  </g>
);

const Walker = ({ x, y, s = 1, fill = '#111' }: { x: number; y: number; s?: number; fill?: string }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} fill="none" stroke={fill} strokeWidth="4" strokeLinecap="round">
    <circle cx="10" cy="0" r="4" fill={fill} stroke="none" />
    <path d="M10 6 L8 20 M8 20 L2 32 M8 20 L14 32 M9 10 L2 16 M9 10 L16 15" />
  </g>
);

const DRAW: Record<SignId, () => ReactNode> = {
  'R-1': () => <Warning inverted />,
  'R-2': () => (
    <>
      <path d="M30 4 H70 L96 30 V70 L70 96 H30 L4 70 V30 Z" fill={RED} stroke="#fff" strokeWidth="4" />
      <text x="50" y="60" textAnchor="middle" fontSize="28" fontWeight="800" fill="#fff" fontFamily="Arial, Helvetica, sans-serif">STOP</text>
    </>
  ),
  'R-3': () => (
    <>
      <path d="M50 4 L96 50 L50 96 L4 50 Z" fill="#fff" stroke="#222" strokeWidth="1.5" />
      <path d="M50 20 L80 50 L50 80 L20 50 Z" fill={YEL} />
    </>
  ),
  'R-4': () => (
    <>
      <path d="M50 4 L96 50 L50 96 L4 50 Z" fill="#fff" stroke="#222" strokeWidth="1.5" />
      <path d="M50 20 L80 50 L50 80 L20 50 Z" fill={YEL} />
      <path d="M30 76 L76 30" stroke="#222" strokeWidth="7" />
      <path d="M22 66 L66 22 M36 80 L80 36" stroke="#222" strokeWidth="3" />
    </>
  ),
  'R-100': () => <Circle fill="#fff" />,
  'R-101': () => (
    <>
      <circle cx="50" cy="50" r="46" fill={RED} stroke="#fff" strokeWidth="3" />
      <rect x="18" y="42" width="64" height="16" fill="#fff" />
    </>
  ),
  'R-301-50': () => (
    <Circle fill="#fff">
      <text x="50" y="63" textAnchor="middle" fontSize="38" fontWeight="800" fill="#111" fontFamily="Arial, Helvetica, sans-serif">50</text>
    </Circle>
  ),
  'R-305': () => (
    <Circle fill="#fff">
      <Car x={22} y={36} fill={RED} />
      <Car x={54} y={36} fill="#111" />
    </Circle>
  ),
  'R-307': () => (
    <Circle fill={BLUE}>
      <path d="M22 22 L78 78 M78 22 L22 78" stroke={RED} strokeWidth="9" />
    </Circle>
  ),
  'R-308': () => (
    <Circle fill={BLUE}>
      <path d="M22 22 L78 78" stroke={RED} strokeWidth="9" />
    </Circle>
  ),
  'R-400a': () => (
    <>
      <circle cx="50" cy="50" r="46" fill={BLUE} stroke="#fff" strokeWidth="3" />
      <path d="M26 50 H66 M54 34 L72 50 L54 66" stroke="#fff" strokeWidth="9" fill="none" strokeLinejoin="round" />
    </>
  ),
  'R-500': () => (
    <>
      <circle cx="50" cy="50" r="46" fill="#fff" stroke="#555" strokeWidth="2" />
      <path d="M22 70 L70 22 M30 78 L78 30 M16 60 L60 16 M38 84 L84 38" stroke="#555" strokeWidth="4" />
    </>
  ),
  'P-4': () => (
    <Warning>
      <g fill="none" stroke="#111" strokeWidth="5">
        <path d="M50 46 A12 12 0 1 1 38 58" />
        <path d="M62 58 A12 12 0 0 1 44 69" />
      </g>
      <path d="M33 52 L38 60 L43 52 Z M48 74 L42 69 L49 64 Z" fill="#111" />
    </Warning>
  ),
  'P-20': () => (
    <Warning>
      <Walker x={40} y={44} s={1.05} />
    </Warning>
  ),
  'S-13': () => (
    <Square>
      <path d="M50 16 L86 80 H14 Z" fill="#fff" />
      <g stroke="#111" strokeWidth="4">
        <path d="M30 76 H70" strokeDasharray="5 4" />
      </g>
      <Walker x={40} y={42} s={0.95} />
    </Square>
  ),
  'semaforo:ambar': () => (
    <>
      <rect x="32" y="4" width="36" height="92" rx="8" fill="#1d1f24" stroke="#444" strokeWidth="2" />
      <circle cx="50" cy="22" r="11" fill="#3a1110" />
      <circle cx="50" cy="50" r="11" fill="#ffb300" />
      <circle cx="50" cy="50" r="16" fill="#ffb300" opacity="0.25" />
      <circle cx="50" cy="78" r="11" fill="#0f2a16" />
    </>
  ),
  'marca:amarilla-continua': () => (
    <>
      <rect x="0" y="0" width="100" height="100" fill="#3b3f46" />
      <rect x="0" y="0" width="22" height="100" fill="#9aa0a6" />
      <rect x="22" y="0" width="5" height="100" fill="#c8ccd0" />
      <rect x="30" y="0" width="6" height="100" fill={YEL} />
    </>
  ),
  'marca:doble': () => (
    <>
      <rect x="0" y="0" width="100" height="100" fill="#3b3f46" />
      <rect x="44" y="0" width="4" height="100" fill="#fff" />
      <path d="M54 4 V24 M54 40 V60 M54 76 V96" stroke="#fff" strokeWidth="4" />
      <path d="M24 70 V44 M18 50 L24 42 L30 50" stroke="#60a5fa" strokeWidth="3" fill="none" />
      <path d="M76 30 V56 M70 50 L76 58 L82 50" stroke="#60a5fa" strokeWidth="3" fill="none" />
    </>
  ),
};

const LABELS: Partial<Record<SignId, string>> = {
  'marca:amarilla-continua': 'Línea amarilla continua junto al bordillo',
  'marca:doble': 'Línea doble: continua a la izquierda, discontinua a la derecha',
  'semaforo:ambar': 'Semáforo en ámbar fijo',
};

export function Sign({ id, size = 150 }: { id: string; size?: number }) {
  if (!(SIGN_IDS as readonly string[]).includes(id)) return null;
  const sid = id as SignId;
  return (
    <figure style={{ margin: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
      <svg viewBox="0 0 100 100" width={size} height={size} role="img" aria-label={LABELS[sid] ?? `Señal ${sid}`} style={{ filter: 'drop-shadow(0 6px 16px rgba(0,0,0,.45))' }}>
        {DRAW[sid]()}
      </svg>
      {LABELS[sid] && <figcaption className="dim">{LABELS[sid]}</figcaption>}
    </figure>
  );
}
