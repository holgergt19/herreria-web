'use client'

import { useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { IconoWhatsApp } from '@/components/ui'
import { enlaceWhatsApp } from '@/lib/datos'

gsap.registerPlugin(ScrollTrigger)

const FICHA = [
  { etiqueta: 'Taller propio', valor: 'Can Roqueta · Sabadell' },
  { etiqueta: 'Técnica', valor: 'Forjado en caliente' },
  { etiqueta: 'Desde', valor: '1978 · Tres generaciones' },
]

export default function Hero() {
  const raiz = useRef<HTMLElement>(null)
  const imagen = useRef<HTMLDivElement>(null)
  const contenido = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const reducido = window.matchMedia('(prefers-reduced-motion: reduce)')
        .matches
      if (reducido) return

      /* ── Entrada escalonada ── */
      gsap
        .timeline({ defaults: { ease: 'expo.out', duration: 1.5 } })
        .from(imagen.current, {
          opacity: 0,
          scale: 1.16,
          duration: 2.4,
          ease: 'expo.out',
        })
        .from(
          '[data-e="txt"]',
          {
            opacity: 0,
            y: 48,
            filter: 'blur(12px)',
            stagger: 0.12,
            duration: 1.4,
          },
          0.5
        )
        .from(
          '[data-e="linea"]',
          { scaleX: 0, transformOrigin: 'left center', duration: 1.2 },
          0.7
        )
        .from(
          '[data-e="celda"]',
          { opacity: 0, y: 24, stagger: 0.09, duration: 1.2 },
          1.05
        )
        .from(
          '[data-e="regla"]',
          { scaleX: 0, transformOrigin: 'left center', duration: 1.6 },
          1
        )

      /* ══════════════════════════════════════════
         PARALLAX DE PROFUNDIDAD
         La foto se desplaza menos que el contenido
         → sensación de profundidad. El contenedor
         va a scale-110, así el desplazamiento del
         4 % nunca descubre un borde.
         ══════════════════════════════════════════ */
      const trayecto = {
        trigger: raiz.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      }

      gsap.fromTo(
        imagen.current,
        { yPercent: -3 },
        { yPercent: 4, ease: 'none', scrollTrigger: trayecto }
      )

      gsap.to(contenido.current, {
        y: -90,
        opacity: 0.1,
        ease: 'none',
        scrollTrigger: trayecto,
      })

      /* ── Mouse parallax del contenido ── */
      const mx = gsap.quickTo(contenido.current, 'x', {
        duration: 1.1,
        ease: 'power3.out',
      })
      const onMove = (e: PointerEvent) =>
        mx((e.clientX / window.innerWidth - 0.5) * -14)

      window.addEventListener('pointermove', onMove)
      return () => window.removeEventListener('pointermove', onMove)
    },
    { scope: raiz }
  )

  return (
    /* h-screen y el header fijo por encima: la foto
       se mete por debajo del menú, no lo esquiva. */
    <section
      ref={raiz}
      id="hero"
      className="relative isolate h-screen overflow-hidden bg-hierro-950"
    >
      {/* ══════════════════════════════════════════
          CAPA 1 — la fotografía.
          `fill` + `object-cover` es el equivalente
          de background-size: cover, pero con la
          optimización de next/image.
          `priority`: es el LCP de la página.
          ══════════════════════════════════════════ */}
      <div ref={imagen} className="absolute inset-0 z-0 scale-110">
        {/* WebP: 144 KB frente a 1,8 MB del PNG original,
            sin diferencia visible en una foto oscura. */}
        <Image
          src="/herreria1.png"
          alt="Portón de herrería de lamas de acero iluminado de noche"
          fill
          priority
          sizes="100vw"
          quality={90}
          className="object-cover object-center"
        />
      </div>

      {/* ══════════════════════════════════════════
          CAPA 2 — oscurecimiento base (45 %).
          Sin esto, cualquier zona clara de la foto
          (brillo del metal, cielo, focos) se come
          el texto blanco.
          ══════════════════════════════════════════ */}
      <div aria-hidden className="absolute inset-0 z-10 bg-hierro-950/45" />

      {/* ══════════════════════════════════════════
          CAPA 3 — velo lateral. Refuerza solo el
          lado del texto y deja respirar la foto
          a la derecha.
          ══════════════════════════════════════════ */}
      <div
        aria-hidden
        className="absolute inset-0 z-10"
        style={{
          background:
            'linear-gradient(95deg, oklch(0.13 0.006 60 / 0.86) 0%, oklch(0.13 0.006 60 / 0.62) 34%, oklch(0.13 0.006 60 / 0.12) 66%, transparent 84%)',
        }}
      />

      {/* ══════════════════════════════════════════
          CAPA 4 — degradados de borde.
          Arriba: garantiza que el header
          transparente se lea sobre cualquier foto.
          Abajo: asienta la barra de ficha técnica.
          ══════════════════════════════════════════ */}
      <div
        aria-hidden
        className="absolute inset-0 z-10"
        style={{
          background: `
            linear-gradient(to bottom, oklch(0.13 0.006 60 / 0.72) 0%, transparent 22%),
            linear-gradient(to top, oklch(0.13 0.006 60 / 0.80) 0%, transparent 28%)
          `,
        }}
      />

      {/* CAPA 5 — viñeta: cierra las esquinas */}
      <div
        aria-hidden
        className="absolute inset-0 z-10"
        style={{
          background:
            'radial-gradient(120% 95% at 40% 45%, transparent 42%, oklch(0.10 0.005 60 / 0.55) 100%)',
        }}
      />

      {/* ══════════════════════════════════════════
          CAPA 6 — el mensaje
          ══════════════════════════════════════════ */}
      <div
        ref={contenido}
        className="relative z-20 flex h-full items-center px-12"
      >
        <div className="max-w-2xl pb-16">
          <p
            className="font-mono text-tecnico uppercase text-forja-400"
            data-e="txt"
          >
            Taller de forja · Sabadell, Barcelona
          </p>

          <div className="mt-4 h-px w-16 bg-forja-500/70" data-e="linea" />

          <h1 className="font-display text-h1 mt-9 uppercase">
            <span
              className="block text-yeso-50 [text-shadow:0_2px_28px_oklch(0.10_0.005_60/0.7)]"
              data-e="txt"
            >
              Herrería y estructuras
            </span>
            <span className="block text-forge" data-e="txt">
              metálicas a medida
            </span>
          </h1>

          <p
            className="text-lead mt-8 max-w-lg text-yeso-100/85 [text-shadow:0_1px_18px_oklch(0.10_0.005_60/0.8)]"
            data-e="txt"
          >
            Diseño, fabricación e instalación. Rejas, barandillas, portones y
            piezas únicas forjadas en caliente en el Vallès desde 1978.
          </p>

          <div className="mt-11 flex items-center gap-5" data-e="txt">
            <Link
              href="/#proyectos"
              className="rounded-md bg-forja-600 px-8 py-4 font-mono text-tecnico uppercase text-yeso-50 transition-all duration-300 hover:-translate-y-0.5 hover:bg-forja-500 hover:shadow-[0_14px_34px_-12px_oklch(0.585_0.19_38/0.6)]"
            >
              Ver proyectos
            </Link>
            <a
              href={enlaceWhatsApp(
                'Hola, quiero pedir una cotización para un trabajo de herrería.'
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-md border border-yeso-100/25 bg-hierro-950/25 px-8 py-4 font-mono text-tecnico uppercase text-yeso-50 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-forja-500/70 hover:text-forja-400"
            >
              <IconoWhatsApp className="h-4 w-4" />
              WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Barra inferior de ficha técnica */}
      <div className="absolute inset-x-0 bottom-0 z-20">
        <div
          className="h-px w-full bg-linear-to-r from-forja-500/50 via-yeso-200/15 to-transparent"
          data-e="regla"
        />
        <div className="grid grid-cols-[1fr_1fr_1fr_auto] items-end gap-10 bg-hierro-950/45 px-12 py-6 backdrop-blur-md">
          {FICHA.map((f) => (
            <div key={f.etiqueta} data-e="celda">
              <p className="font-mono text-tecnico uppercase text-yeso-200/55">
                {f.etiqueta}
              </p>
              <p className="text-body mt-1.5 text-yeso-50">{f.valor}</p>
            </div>
          ))}
          <div className="flex items-center gap-4" data-e="celda">
            <span className="font-mono text-tecnico uppercase text-yeso-200/55">
              Desliza
            </span>
            <div className="h-8 w-px overflow-hidden bg-yeso-200/20">
              <div className="h-8 w-px animate-[bajar_2.4s_ease-in-out_infinite] bg-forja-500" />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes bajar {
          0%   { transform: translateY(-100%); }
          60%  { transform: translateY(100%); }
          100% { transform: translateY(100%); }
        }
      `}</style>
    </section>
  )
}
