'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ══════════════════════════════════════════════
   CONTADOR — número que sube al entrar en
   viewport. El valor se escribe directamente en
   textContent desde el tick de GSAP: el progreso
   nunca pasa por estado de React.
   ══════════════════════════════════════════════ */
export default function Contador({
  valor,
  prefijo = '',
  sufijo = '',
  etiqueta,
}: {
  valor: number
  prefijo?: string
  sufijo?: string
  etiqueta: string
}) {
  const raiz = useRef<HTMLDivElement>(null)
  const num = useRef<HTMLSpanElement>(null)

  useGSAP(
    () => {
      const nodo = num.current
      if (!nodo) return

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        nodo.textContent = String(valor)
        return
      }

      const obj = { n: 0 }
      gsap.to(obj, {
        n: valor,
        duration: 2.2,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: raiz.current,
          start: 'top 85%',
          once: true,
        },
        onUpdate: () => {
          nodo.textContent = String(Math.round(obj.n))
        },
      })
    },
    { scope: raiz }
  )

  return (
    <div ref={raiz}>
      <p className="font-display text-h2 uppercase leading-none text-yeso-50">
        <span className="text-forge">{prefijo}</span>
        <span ref={num}>0</span>
        <span className="text-forge">{sufijo}</span>
      </p>
      <div className="mt-4 h-px w-10 bg-forja-500/50" />
      <p className="font-mono text-tecnico mt-4 uppercase text-yeso-200/55">
        {etiqueta}
      </p>
    </div>
  )
}
