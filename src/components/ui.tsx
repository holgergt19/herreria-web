'use client'

import { useCallback, useId, useSyncExternalStore } from 'react'

/* ══════════════════════════════════════════════
   GRANO — hollín. Última capa de toda la web.
   Sobre fondo oscuro se mezcla en `screen` para
   que las motas claras aporten textura sin
   ensuciar los negros.
   ══════════════════════════════════════════════ */
export function Grano() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-50 opacity-[0.05] mix-blend-screen"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)'/%3E%3C/svg%3E\")",
      }}
    />
  )
}

/* ══════════════════════════════════════════════
   DIENTE DE SIERRA — el motivo de Sabadell.
   Cubiertas de los vapores textiles.
   ══════════════════════════════════════════════ */
export function DienteSierra({
  relleno = 'var(--color-hierro-900)',
  filete = 'var(--color-hierro-700)',
  alto = 18,
  paso = 32,
}: {
  relleno?: string
  filete?: string
  alto?: number
  paso?: number
}) {
  const id = useId()
  return (
    <div aria-hidden className="block w-full leading-none">
      <svg width="100%" height={alto} className="block">
        <defs>
          <pattern
            id={id}
            width={paso}
            height={alto}
            patternUnits="userSpaceOnUse"
          >
            <path
              d={`M0 ${alto} L${paso / 2} 1 L${paso} ${alto} Z`}
              fill={relleno}
              stroke={filete}
              strokeWidth="1"
              strokeLinejoin="miter"
            />
          </pattern>
        </defs>
        <rect width="100%" height={alto} fill={`url(#${id})`} />
      </svg>
    </div>
  )
}

/* ══════════════════════════════════════════════
   COTA — numeración de plano + filete
   ══════════════════════════════════════════════ */
export function Cota({ numero }: { numero: string }) {
  return (
    <div className="pt-3">
      <span className="font-mono text-tecnico uppercase text-forja-500">
        {numero}
      </span>
      <div className="mt-4 h-px w-10 bg-yeso-200/25" />
    </div>
  )
}

/* ══════════════════════════════════════════════
   SECTION — retícula asimétrica base, oscura.
   La tercera columna vacía ES la asimetría.
   `tono` alterna entre las dos profundidades
   de negro (950 base / 900 panel).
   ══════════════════════════════════════════════ */
export function Section({
  id,
  numero,
  titulo,
  intro,
  children,
  tono = '950',
  className = '',
}: {
  id: string
  numero: string
  titulo: string
  intro?: string
  children?: React.ReactNode
  tono?: '950' | '900'
  className?: string
}) {
  return (
    <section
      id={id}
      className={`relative grid grid-cols-[7rem_minmax(0,1fr)_14rem] gap-x-12 px-12 py-32 ${
        tono === '900' ? 'bg-hierro-900' : 'bg-hierro-950'
      } ${className}`}
    >
      <Cota numero={numero} />

      <div>
        <h2 className="font-display text-h2 uppercase text-yeso-50">
          {titulo}
        </h2>

        {intro && (
          <p className="text-lead mt-7 max-w-2xl text-yeso-200/70">{intro}</p>
        )}

        <div className="mt-20">{children}</div>
      </div>

      <div aria-hidden />
    </section>
  )
}

/* ══════════════════════════════════════════════
   MESH FRAGUA — gradiente animado de orbes.
   Solo transform: GPU, sin tocar el hilo
   principal. Recalibrado para fondo oscuro:
   menos alpha, más blur.
   ══════════════════════════════════════════════ */
export function MeshFragua({ intensidad = 1 }: { intensidad?: number }) {
  const orbes = [
    {
      color: 'oklch(0.685 0.185 48 / 0.13)',
      w: '46vw',
      h: '46vw',
      top: '-12%',
      left: '52%',
      anim: 'deriva-a 26s ease-in-out infinite',
    },
    {
      color: 'oklch(0.78 0.16 62 / 0.10)',
      w: '38vw',
      h: '38vw',
      top: '38%',
      left: '-8%',
      anim: 'deriva-b 34s ease-in-out infinite',
    },
    {
      color: 'oklch(0.56 0.11 32 / 0.10)',
      w: '42vw',
      h: '42vw',
      top: '52%',
      left: '58%',
      anim: 'deriva-c 30s ease-in-out infinite',
    },
    {
      color: 'oklch(0.585 0.19 38 / 0.08)',
      w: '30vw',
      h: '30vw',
      top: '8%',
      left: '18%',
      anim: 'deriva-d 40s ease-in-out infinite',
    },
  ]

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {orbes.map((o, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: o.w,
            height: o.h,
            top: o.top,
            left: o.left,
            background: `radial-gradient(closest-side, ${o.color}, transparent 72%)`,
            filter: `blur(${80 * intensidad}px)`,
            opacity: intensidad,
            animation: o.anim,
            willChange: 'transform',
          }}
        />
      ))}

      <style>{`
        @keyframes deriva-a {
          0%,100% { transform: translate3d(0,0,0) scale(1); }
          33%     { transform: translate3d(-7vw, 5vh, 0) scale(1.12); }
          66%     { transform: translate3d(4vw, -4vh, 0) scale(0.94); }
        }
        @keyframes deriva-b {
          0%,100% { transform: translate3d(0,0,0) scale(1); }
          40%     { transform: translate3d(8vw, -6vh, 0) scale(1.08); }
          70%     { transform: translate3d(-3vw, 4vh, 0) scale(0.96); }
        }
        @keyframes deriva-c {
          0%,100% { transform: translate3d(0,0,0) scale(1); }
          45%     { transform: translate3d(-6vw, -7vh, 0) scale(1.1); }
          75%     { transform: translate3d(5vw, 3vh, 0) scale(0.92); }
        }
        @keyframes deriva-d {
          0%,100% { transform: translate3d(0,0,0) scale(1); }
          50%     { transform: translate3d(6vw, 8vh, 0) scale(1.15); }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes deriva-a { 0%,100% { transform: none; } }
          @keyframes deriva-b { 0%,100% { transform: none; } }
          @keyframes deriva-c { 0%,100% { transform: none; } }
          @keyframes deriva-d { 0%,100% { transform: none; } }
        }
      `}</style>
    </div>
  )
}

/* ══════════════════════════════════════════════
   ESTRELLAS — valoración de cliente.

   Dos capas: abajo las cinco estrellas vacías,
   encima las llenas recortadas por ancho. Admite
   decimales (4,5) sin dibujar media estrella a
   mano — y el corte cae justo en el centro del
   icono porque el ancho se calcula descontando
   los huecos, no como porcentaje del total.
   ══════════════════════════════════════════════ */
const TRAZO_ESTRELLA =
  'M12 2 L14.53 8.52 L21.51 8.91 L16.09 13.33 L17.88 20.09 L12 16.3 L6.12 20.09 L7.91 13.33 L2.49 8.91 L9.47 8.52 Z'

const ANCHO_ESTRELLA = 17 // px
const HUECO_ESTRELLA = 6 // px

function FilaEstrellas({
  total,
  clase,
  relleno,
}: {
  total: number
  clase: string
  relleno: boolean
}) {
  return (
    <div
      className="flex w-max"
      style={{ gap: `${HUECO_ESTRELLA}px` }}
    >
      {Array.from({ length: total }, (_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className={`shrink-0 ${clase}`}
          style={{ width: ANCHO_ESTRELLA, height: ANCHO_ESTRELLA }}
          fill={relleno ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth={relleno ? 0 : 1.4}
          strokeLinejoin="round"
          aria-hidden
        >
          <path d={TRAZO_ESTRELLA} />
        </svg>
      ))}
    </div>
  )
}

export function Estrellas({
  valor = 5,
  total = 5,
  nota = true,
  className = '',
}: {
  valor?: number
  total?: number
  nota?: boolean
  className?: string
}) {
  const v = Math.max(0, Math.min(total, valor))
  const enteras = Math.floor(v)
  const resto = v - enteras

  /* Ancho del recorte: estrellas completas con su hueco
     + la fracción de la siguiente. */
  const ancho =
    enteras * (ANCHO_ESTRELLA + HUECO_ESTRELLA) + resto * ANCHO_ESTRELLA

  /* Coma decimal: es una web en español */
  const texto = v.toLocaleString('es-ES')

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div
        role="img"
        aria-label={`Valoración: ${texto} de ${total}`}
        className="relative"
      >
        <FilaEstrellas total={total} clase="text-yeso-200/18" relleno={false} />

        <div
          aria-hidden
          className="absolute left-0 top-0 overflow-hidden"
          style={{ width: `${ancho}px` }}
        >
          <FilaEstrellas total={total} clase="text-forja-500" relleno />
        </div>
      </div>

      {nota && (
        <span className="font-mono text-tecnico uppercase text-hierro-400">
          {texto} / {total}
        </span>
      )}
    </div>
  )
}

/* ══════════════════════════════════════════════
   ICONO WHATSAPP — trazo, hereda currentColor
   ══════════════════════════════════════════════ */
export function IconoWhatsApp({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 3a9 9 0 0 0-7.8 13.5L3 21l4.7-1.2A9 9 0 1 0 12 3Z" />
      <path d="M8.7 8.6c.2-.5.4-.5.7-.5h.6c.2 0 .4 0 .5.4l.7 1.7c.1.2 0 .4-.1.5l-.5.6c-.1.2-.1.3 0 .5.3.6 1.4 1.7 2.3 2.1.2.1.4.1.5-.1l.5-.6c.2-.2.3-.2.5-.1l1.7.8c.3.1.4.3.4.5-.1.7-.7 1.4-1.4 1.5-.6.1-1.4.2-3.3-.8-2.3-1.2-3.6-3.6-3.7-3.8-.1-.2-.7-1.2-.4-2.7Z" />
    </svg>
  )
}

/* ══════════════════════════════════════════════
   useIsMobile — suscripción a matchMedia.
   Con useSyncExternalStore: sin efecto, sin
   estado, sin renders en cascada.
   ══════════════════════════════════════════════ */
export function useIsMobile(breakpoint = 768) {
  const consulta = `(max-width: ${breakpoint - 1}px)`

  const suscribir = useCallback(
    (avisar: () => void) => {
      const mq = window.matchMedia(consulta)
      mq.addEventListener('change', avisar)
      return () => mq.removeEventListener('change', avisar)
    },
    [consulta]
  )

  return useSyncExternalStore(
    suscribir,
    () => window.matchMedia(consulta).matches,
    () => false
  )
}
