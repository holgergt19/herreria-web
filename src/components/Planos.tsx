/* ══════════════════════════════════════════════
   PLANOS — dibujos técnicos en SVG.
   Cero assets, cero descargas. Sustituyen a la
   fotografía hasta que haya piezas reales.
   currentColor: heredan el color del contenedor.
   ══════════════════════════════════════════════ */

type Clave =
  | 'reja'
  | 'barandilla'
  | 'porton'
  | 'cancela'
  | 'mesa'
  | 'cerramiento'

/* Voluta reutilizable: espiral aproximada con arcos */
const Voluta = ({ x, y, r = 9, giro = 0 }: { x: number; y: number; r?: number; giro?: number }) => (
  <path
    d={`M${x} ${y} a${r} ${r} 0 1 1 ${r * 0.9} ${r * 0.55} a${r * 0.55} ${r * 0.55} 0 1 1 ${-r * 0.5} ${-r * 0.3}`}
    transform={`rotate(${giro} ${x} ${y})`}
  />
)

const DIBUJOS: Record<Clave, React.ReactNode> = {
  reja: (
    <>
      <rect x="16" y="12" width="88" height="116" />
      {[34, 52, 70, 88].map((x) => (
        <line key={x} x1={x} y1="12" x2={x} y2="128" />
      ))}
      <line x1="16" y1="48" x2="104" y2="48" />
      <line x1="16" y1="92" x2="104" y2="92" />
      <Voluta x={43} y={62} />
      <Voluta x={79} y={62} giro={180} />
    </>
  ),
  barandilla: (
    <>
      <line x1="10" y1="34" x2="110" y2="20" />
      <line x1="10" y1="124" x2="110" y2="110" />
      {[24, 44, 64, 84, 104].map((x, i) => (
        <line key={x} x1={x} y1={31 - i * 2.6} x2={x} y2={121 - i * 2.6} />
      ))}
      <Voluta x={54} y={70} r={7} />
    </>
  ),
  porton: (
    <>
      <rect x="12" y="24" width="46" height="104" />
      <rect x="62" y="24" width="46" height="104" />
      <line x1="12" y1="60" x2="108" y2="60" />
      {[24, 36, 48, 74, 86, 98].map((x) => (
        <line key={x} x1={x} y1="60" x2={x} y2="128" />
      ))}
      <Voluta x={30} y={40} r={7} />
      <Voluta x={90} y={40} r={7} giro={180} />
      <circle cx="58" cy="94" r="2.5" />
      <circle cx="62" cy="94" r="2.5" />
    </>
  ),
  cancela: (
    <>
      <path d="M20 128 L20 44 Q60 14 100 44 L100 128" />
      {[34, 48, 60, 72, 86].map((x) => (
        <line key={x} x1={x} y1="128" x2={x} y2={x === 60 ? 22 : 34} />
      ))}
      <line x1="20" y1="82" x2="100" y2="82" />
      <Voluta x={44} y={60} r={7} />
      <Voluta x={76} y={60} r={7} giro={180} />
    </>
  ),
  mesa: (
    <>
      <rect x="10" y="46" width="100" height="9" />
      <line x1="24" y1="55" x2="24" y2="122" />
      <line x1="96" y1="55" x2="96" y2="122" />
      <line x1="24" y1="122" x2="96" y2="122" />
      <line x1="24" y1="98" x2="96" y2="98" />
      <Voluta x={46} y={80} r={8} />
      <Voluta x={74} y={80} r={8} giro={180} />
    </>
  ),
  cerramiento: (
    <>
      <line x1="6" y1="112" x2="114" y2="112" />
      {[14, 30, 46, 62, 78, 94, 110].map((x) => (
        <line key={x} x1={x} y1="112" x2={x} y2="40" />
      ))}
      <line x1="6" y1="52" x2="114" y2="52" />
      <line x1="6" y1="88" x2="114" y2="88" />
      {[14, 30, 46, 62, 78, 94, 110].map((x) => (
        <path key={`p${x}`} d={`M${x - 4} 40 L${x} 30 L${x + 4} 40`} />
      ))}
    </>
  ),
}
export default function Plano({
  clave,
  className = '',
}: {
  clave: Clave
  className?: string
}) {
  return (
    <svg
      viewBox="0 0 120 140"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="round"
      aria-hidden
    >
      {DIBUJOS[clave]}

      {/* Línea de cota */}
      <g opacity="0.45" strokeWidth="0.6">
        <line x1="6" y1="136" x2="114" y2="136" />
        <line x1="6" y1="133" x2="6" y2="139" />
        <line x1="114" y1="133" x2="114" y2="139" />
      </g>
    </svg>
  )
}