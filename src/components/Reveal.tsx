'use client'

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger, useGSAP)

/* ══════════════════════════════════════════════
   REVEAL — opacity + translateY + blur + stagger.
   Dispara al entrar en viewport, una sola vez.
   Anima los hijos directos: de ahí el escalonado.
   ══════════════════════════════════════════════ */
export default function Reveal({
  children,
  y = 44,
  blur = 12,
  stagger = 0.11,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode
  y?: number
  blur?: number
  stagger?: number
  delay?: number
  className?: string
}) {
  const raiz = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const hijos = raiz.current?.children
      if (!hijos?.length) return

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.set(hijos, { opacity: 1, y: 0, filter: 'none' })
        return
      }

      gsap.from(hijos, {
        opacity: 0,
        y,
        filter: `blur(${blur}px)`,
        duration: 1.35,
        delay,
        stagger,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: raiz.current,
          start: 'top 82%',
          once: true,
        },
      })
    },
    { scope: raiz }
  )

  return (
    <div ref={raiz} className={className}>
      {children}
    </div>
  )
}