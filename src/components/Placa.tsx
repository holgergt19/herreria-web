'use client'

import { useRef } from 'react'

/* ══════════════════════════════════════════════
   PLACA — chapa translúcida oscura con remaches.
   La traducción de taller del glassmorphism,
   ahora en negro: fondo casi transparente sobre
   antracita, borde de 1px que se lee por canto.

   La luz que sigue al cursor se escribe como
   custom property directamente en el nodo: sin
   estado de React, sin un solo re-render.
   ══════════════════════════════════════════════ */
export default function Placa({
  children,
  remaches = true,
  className = '',
}: {
  children: React.ReactNode
  remaches?: boolean
  className?: string
}) {
  const el = useRef<HTMLDivElement>(null)

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const n = el.current
    if (!n) return
    const r = n.getBoundingClientRect()
    n.style.setProperty('--mx', `${e.clientX - r.left}px`)
    n.style.setProperty('--my', `${e.clientY - r.top}px`)
  }

  return (
    <div
      ref={el}
      onPointerMove={onMove}
      className={`group relative overflow-hidden rounded-lg border border-yeso-200/10 bg-yeso-50/[0.035] backdrop-blur-xl transition-[transform,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-forja-500/45 ${className}`}
      style={{
        boxShadow: '0 24px 60px -30px oklch(0 0 0 / 0.7)',
        ['--mx' as string]: '50%',
        ['--my' as string]: '50%',
      }}
    >
      {/* Light reflection — sigue al cursor */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(340px circle at var(--mx) var(--my), oklch(0.78 0.16 62 / 0.13), transparent 68%)',
        }}
      />

      {/* Filete de brasa en el canto superior */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-forja-500/60 to-transparent opacity-40 transition-opacity duration-500 group-hover:opacity-100"
      />

      {/* Remaches */}
      {remaches &&
        ['left-3 top-3', 'right-3 top-3', 'left-3 bottom-3', 'right-3 bottom-3'].map(
          (p) => (
            <span
              key={p}
              aria-hidden
              className={`absolute ${p} h-1 w-1 rounded-full bg-yeso-200/15`}
            />
          )
        )}

      <div className="relative">{children}</div>
    </div>
  )
}
