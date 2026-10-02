import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PROYECTOS, enlaceWhatsApp } from '@/lib/datos'
import Plano from '@/components/Planos'
import Reveal from '@/components/Reveal'
import { IconoWhatsApp, DienteSierra } from '@/components/ui'

/* ══════════════════════════════════════════════
   FICHA DE PROYECTO — subpágina estática.
   Hoy el visual es el plano técnico; cuando haya
   fotos reales se añade `fotos: string[]` al
   proyecto y esta página prioriza la galería.
   ══════════════════════════════════════════════ */

export function generateStaticParams() {
  return PROYECTOS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const proyecto = PROYECTOS.find((p) => p.slug === slug)
  if (!proyecto) return {}
  return {
    title: `${proyecto.titulo} · ${proyecto.lugar} — Forja Sabadell`,
    description: proyecto.descripcion,
  }
}

const MILIMETRADO = {
  backgroundImage: `
    repeating-linear-gradient(to right, oklch(0.90 0.013 74 / 0.07) 0 1px, transparent 1px 14px),
    repeating-linear-gradient(to bottom, oklch(0.90 0.013 74 / 0.07) 0 1px, transparent 1px 14px)
  `,
}

export default async function PaginaProyecto({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const indice = PROYECTOS.findIndex((p) => p.slug === slug)
  if (indice === -1) notFound()

  const proyecto = PROYECTOS[indice]
  const siguiente = PROYECTOS[(indice + 1) % PROYECTOS.length]

  const FICHA = [
    { etiqueta: 'Tipo de obra', valor: proyecto.tipo },
    { etiqueta: 'Ubicación', valor: proyecto.lugar },
    { etiqueta: 'Año', valor: proyecto.anio },
    { etiqueta: 'Medidas', valor: proyecto.medidas },
  ]

  return (
    <main className="bg-hierro-950 pt-24">
      <article className="grid grid-cols-[7rem_minmax(0,1fr)_14rem] gap-x-12 px-12 py-20">
        {/* Cota lateral */}
        <div className="pt-3">
          <span className="font-mono text-tecnico uppercase text-forja-500">
            {String(indice + 1).padStart(2, '0')}
          </span>
          <div className="mt-4 h-px w-10 bg-yeso-200/25" />
        </div>

        <div>
          <Link
            href="/#proyectos"
            className="link-forja font-mono text-tecnico uppercase text-yeso-200/50 transition-colors hover:text-yeso-50"
          >
            ← Todos los proyectos
          </Link>

          <Reveal stagger={0.1}>
            <p className="font-mono text-tecnico mt-10 uppercase text-forja-500">
              {proyecto.tipo} · {proyecto.anio}
            </p>

            <h1 className="font-display text-h1 mt-4 uppercase text-yeso-50">
              {proyecto.titulo}
            </h1>

            <p className="text-lead mt-5 text-yeso-200/65">{proyecto.lugar}</p>
          </Reveal>

          {/* ── Plano + ficha técnica ── */}
          <div className="mt-16 grid grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] gap-14">
            <Reveal>
              <div
                className="relative aspect-4/5 w-full overflow-hidden rounded-lg border border-yeso-200/12"
                style={MILIMETRADO}
              >
                <Plano
                  clave={proyecto.dibujo}
                  className="absolute inset-0 h-full w-full p-10 text-yeso-200/55"
                />
                <p className="font-mono text-tecnico absolute bottom-4 left-5 uppercase text-yeso-200/35">
                  {proyecto.medidas}
                </p>
                <p className="font-mono text-tecnico absolute right-5 top-4 uppercase text-forja-500/70">
                  Plano de taller
                </p>
              </div>
              <p className="font-mono text-tecnico mt-4 uppercase text-hierro-400">
                Dibujo técnico de la pieza · Galería de fotos próximamente
              </p>
            </Reveal>

            <Reveal className="space-y-12" stagger={0.1}>
              {/* Ficha */}
              <div className="grid grid-cols-2 gap-x-8 gap-y-7 border-t border-yeso-200/12 pt-8">
                {FICHA.map((f) => (
                  <div key={f.etiqueta}>
                    <p className="font-mono text-tecnico uppercase text-hierro-400">
                      {f.etiqueta}
                    </p>
                    <p className="text-body mt-1.5 text-yeso-50">{f.valor}</p>
                  </div>
                ))}
              </div>

              {/* Descripción */}
              <div>
                <p className="font-mono text-tecnico uppercase text-forja-500">
                  La obra
                </p>
                <p className="text-body mt-5 text-yeso-200/75">
                  {proyecto.descripcion}
                </p>
              </div>

              {/* Materiales */}
              <div>
                <p className="font-mono text-tecnico uppercase text-forja-500">
                  Materiales
                </p>
                <ul className="mt-5 space-y-2.5">
                  {proyecto.materiales.map((m) => (
                    <li
                      key={m}
                      className="text-body flex items-center gap-3 text-yeso-200/75"
                    >
                      <span className="h-px w-4 bg-forja-500/70" />
                      {m}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Características */}
              <div>
                <p className="font-mono text-tecnico uppercase text-forja-500">
                  Características
                </p>
                <ul className="mt-5 space-y-2.5">
                  {proyecto.caracteristicas.map((c) => (
                    <li
                      key={c}
                      className="text-body flex items-center gap-3 text-yeso-200/75"
                    >
                      <span className="h-px w-4 bg-forja-500/70" />
                      {c}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA de conversión */}
              <div className="flex flex-wrap items-center gap-5 border-t border-yeso-200/12 pt-9">
                <a
                  href={enlaceWhatsApp(
                    `Hola, he visto el proyecto «${proyecto.titulo}» en vuestra web y quiero una cotización para algo parecido.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-md bg-forja-600 px-8 py-4 font-mono text-tecnico uppercase text-yeso-50 transition-all duration-300 hover:-translate-y-0.5 hover:bg-forja-500"
                >
                  <IconoWhatsApp className="h-4 w-4" />
                  Quiero algo así
                </a>
                <Link
                  href={`/proyectos/${siguiente.slug}`}
                  className="link-forja font-mono text-tecnico uppercase text-yeso-200/60 transition-colors hover:text-yeso-50"
                >
                  Siguiente: {siguiente.titulo} →
                </Link>
              </div>
            </Reveal>
          </div>
        </div>

        <div aria-hidden />
      </article>

      <DienteSierra relleno="var(--color-hierro-900)" filete="var(--color-hierro-700)" />
    </main>
  )
}
