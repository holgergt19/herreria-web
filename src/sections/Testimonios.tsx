import { Section, Estrellas } from '@/components/ui'
import Reveal from '@/components/Reveal'
import Placa from '@/components/Placa'
import { TESTIMONIOS } from '@/lib/datos'

export default function Testimonios() {
  return (
    <Section
      id="testimonios"
      numero="05"
      titulo="Lo que dicen los clientes"
      intro="Opiniones reales de obras entregadas en el Vallès."
      tono="900"
    >
      <Reveal className="grid grid-cols-3 gap-8" stagger={0.12} y={44}>
        {TESTIMONIOS.map((t) => (
          <Placa key={t.nombre} className="flex h-full flex-col px-8 py-9">
            {/* Valoración — sustituye a la comilla */}
            <Estrellas valor={t.valoracion} />

            <p className="text-body mb-8 mt-7 text-yeso-200/75">{t.texto}</p>

            {/* mt-auto: la firma se pega al fondo de la placa,
                así las tres quedan alineadas aunque el texto
                tenga distinto número de líneas. */}
            <div className="mt-auto border-t border-yeso-200/10 pt-5">
              <p className="text-body text-yeso-50">{t.nombre}</p>
              <p className="font-mono text-tecnico mt-1.5 uppercase text-hierro-400">
                {t.obra} · {t.lugar}
              </p>
            </div>
          </Placa>
        ))}
      </Reveal>
    </Section>
  )
}
