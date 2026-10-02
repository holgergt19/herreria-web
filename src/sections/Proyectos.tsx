import Link from 'next/link'
import { Section } from '@/components/ui'
import Reveal from '@/components/Reveal'
import Plano from '@/components/Planos'
import { PROYECTOS } from '@/lib/datos'

/* Papel milimetrado como background CSS: el compositor lo
   dibuja una vez y no se repinta al cambiar el color del
   trazo. */
const MILIMETRADO = {
  backgroundImage: `
    repeating-linear-gradient(to right, oklch(0.90 0.013 74 / 0.07) 0 1px, transparent 1px 14px),
    repeating-linear-gradient(to bottom, oklch(0.90 0.013 74 / 0.07) 0 1px, transparent 1px 14px)
  `,
}

export default function Proyectos() {
  return (
    <Section
      id="proyectos"
      numero="03"
      titulo="Proyectos realizados"
      intro="Piezas medidas, forjadas e instaladas en Sabadell y el Vallès Occidental. Cada proyecto tiene su ficha con materiales y detalles de la obra."
      tono="900"
    >
      <Reveal className="grid grid-cols-3 gap-x-8 gap-y-14" stagger={0.09} y={48}>
        {PROYECTOS.map((p) => (
          <article key={p.slug} className="group">
            <Link href={`/proyectos/${p.slug}`} className="block">
              <div
                className="relative aspect-4/5 w-full overflow-hidden rounded-lg border border-yeso-200/12 transition-colors duration-300 group-hover:border-forja-500/50"
                style={MILIMETRADO}
              >
                <Plano
                  clave={p.dibujo}
                  className="absolute inset-0 h-full w-full p-7 text-yeso-200/50 transition-all duration-500 group-hover:scale-[1.03] group-hover:text-forja-400"
                />
                <p className="font-mono text-tecnico absolute bottom-4 left-5 uppercase text-yeso-200/35">
                  {p.medidas}
                </p>
                <span className="font-mono text-tecnico absolute right-5 top-4 uppercase text-forja-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  Ver ficha →
                </span>
              </div>

              <p className="font-mono text-tecnico mt-5 uppercase text-forja-500">
                {p.tipo} · {p.anio}
              </p>
              <h3 className="font-display mt-2 text-2xl uppercase leading-none text-yeso-50 transition-colors group-hover:text-forja-400">
                {p.titulo}
              </h3>
              <p className="text-body mt-1.5 text-yeso-200/55">{p.lugar}</p>
            </Link>
          </article>
        ))}
      </Reveal>
    </Section>
  )
}
