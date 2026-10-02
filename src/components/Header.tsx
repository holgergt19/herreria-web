'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* Anclas con «/» delante: funcionan también desde
   las subpáginas de proyecto. */
const ENLACES = [
  { href: '/#hero', texto: 'Inicio' },
  { href: '/#nosotros', texto: 'Nosotros' },
  { href: '/#proyectos', texto: 'Proyectos' },
  { href: '/#servicios', texto: 'Servicios' },
  { href: '/#contacto', texto: 'Contacto' },
]

export default function Header() {
  const raiz = useRef<HTMLElement>(null)
  const fondo = useRef<HTMLDivElement>(null)
  const barra = useRef<HTMLDivElement>(null)

  /* Solo la portada tiene hero a pantalla completa.
     En las subpáginas el header arranca ya sólido. */
  const enPortada = usePathname() === '/'

  useGSAP(
    () => {
      /* ══════════════════════════════════════════
         TRANSPARENTE → CRISTAL SÓLIDO
         Se anima la opacidad de una capa de fondo,
         no clases de React: cero re-renders y la
         transición es continua, no un salto.
         ══════════════════════════════════════════ */
      if (enPortada) {
        gsap.to(fondo.current, {
          opacity: 1,
          duration: 0.45,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: document.documentElement,
            /* dispara a los 80 px de scroll */
            start: 'top -80',
            toggleActions: 'play none none reverse',
          },
        })
      }

      /* Barra de progreso de lectura */
      gsap.fromTo(
        barra.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          transformOrigin: 'left center',
          scrollTrigger: {
            trigger: document.documentElement,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 0.4,
          },
        }
      )
    },
    { scope: raiz, dependencies: [enPortada] }
  )

  return (
    <header ref={raiz} className="fixed inset-x-0 top-0 z-40">
      {/* ══════════════════════════════════════════
          CAPA A — cristal sólido.
          Invisible sobre el hero, aparece al hacer
          scroll. Va detrás del contenido, por eso
          es una capa aparte y no el fondo del
          propio <header>.
          ══════════════════════════════════════════ */}
      {/* La opacidad inicial se declara en el markup, no en un
          gsap.set: así el servidor ya envía el header
          transparente y no hay parpadeo antes de hidratar. */}
      <div
        ref={fondo}
        aria-hidden
        style={{ opacity: enPortada ? 0 : 1 }}
        className="absolute inset-0 border-b border-yeso-200/8 bg-hierro-950/72 backdrop-blur-xl"
      />

      {/* ══════════════════════════════════════════
          CAPA B — degradado permanente.
          El seguro de legibilidad mientras el
          header es transparente: sobre una foto
          clara el menú se seguiría leyendo.
          Sobre fondo sólido es imperceptible.
          ══════════════════════════════════════════ */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-32"
        style={{
          background:
            'linear-gradient(to bottom, oklch(0.13 0.006 60 / 0.55) 0%, transparent 100%)',
        }}
      />

      <div className="relative flex items-center justify-between px-12 py-5">
        <Link href="/#hero" className="flex items-baseline gap-4">
          <span className="font-display text-3xl uppercase leading-none tracking-tight text-yeso-50">
            Forja<span className="text-forja-500">·</span>Sabadell
          </span>
          <span className="font-mono text-tecnico uppercase text-yeso-200/50">
            Herrería y estructuras
          </span>
        </Link>

        <nav className="flex items-center gap-9">
          {ENLACES.map((e) => (
            <Link
              key={e.href}
              href={e.href}
              className="link-forja font-mono text-tecnico uppercase text-yeso-200/70 transition-colors hover:text-yeso-50"
            >
              {e.texto}
            </Link>
          ))}

          <Link
            href="/#contacto"
            className="rounded-md bg-forja-600 px-5 py-2.5 font-mono text-tecnico uppercase text-yeso-50 transition-all duration-300 hover:-translate-y-0.5 hover:bg-forja-500 hover:shadow-[0_12px_30px_-10px_oklch(0.585_0.19_38/0.55)]"
          >
            Pedir cotización
          </Link>
        </nav>
      </div>

      {/* Progreso de lectura */}
      <div
        ref={barra}
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px origin-left bg-forja-500"
      />
    </header>
  )
}
