import { Section } from '@/components/ui'
import Reveal from '@/components/Reveal'
import Magnetico from '@/components/Magnetico'
import Placa from '@/components/Placa'
import { SERVICIOS } from '@/lib/datos'

export default function Servicios() {
  return (
    <Section
      id="servicios"
      numero="04"
      titulo="Nuestros servicios"
      intro="Trabajo de forja y estructura para obra nueva, reforma y encargo particular. Todo medido, dibujado y forjado en el taller."
    >
      <Reveal className="grid grid-cols-2 gap-8" stagger={0.13} y={52}>
        {SERVICIOS.map((s) => (
          <Magnetico key={s.numero} fuerza={6}>
            <Placa className="h-full px-9 py-10">
              <p className="font-mono text-tecnico uppercase text-hierro-400">
                {s.numero}
              </p>

              <h3 className="font-display text-h3 mt-5 uppercase text-yeso-50">
                {s.titulo}
              </h3>

              <p className="text-body mt-4 text-yeso-200/65">{s.texto}</p>

              <ul className="mt-7 space-y-2 border-t border-yeso-200/10 pt-6">
                {s.detalles.map((d) => (
                  <li
                    key={d}
                    className="font-mono text-tecnico flex items-center gap-3 uppercase text-yeso-200/45"
                  >
                    <span className="h-px w-3 bg-forja-500/70" />
                    {d}
                  </li>
                ))}
              </ul>
            </Placa>
          </Magnetico>
        ))}
      </Reveal>
    </Section>
  )
}
