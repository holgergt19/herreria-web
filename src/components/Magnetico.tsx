'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

/* ══════════════════════════════════════════════
   MAGNÉTICO — el elemento se inclina hacia el
   cursor y vuelve con inercia al salir.
   quickTo interpola: nunca hay salto.
   ══════════════════════════════════════════════ */
export default function Magnetico({
  children,
  fuerza = 14,
  className = '',
}: {
  children: React.ReactNode
  fuerza?: number
  className?: string
}) {
  const el = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const nodo = el.current
      if (!nodo) return
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      const x = gsap.quickTo(nodo, 'x', { duration: 0.75, ease: 'power3.out' })
      const y = gsap.quickTo(nodo, 'y', { duration: 0.75, ease: 'power3.out' })

      const onMove = (e: PointerEvent) => {
        const r = nodo.getBoundingClientRect()
        x(((e.clientX - r.left) / r.width - 0.5) * fuerza * 2)
        y(((e.clientY - r.top) / r.height - 0.5) * fuerza * 2)
      }
      const onLeave = () => {
        x(0)
        y(0)
      }

      nodo.addEventListener('pointermove', onMove)
      nodo.addEventListener('pointerleave', onLeave)
      return () => {
        nodo.removeEventListener('pointermove', onMove)
        nodo.removeEventListener('pointerleave', onLeave)
      }
    },
    { scope: el }
  )

  return (
    <div ref={el} className={className}>
      {children}
    </div>
  )
}