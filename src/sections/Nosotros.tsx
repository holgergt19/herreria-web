import { Section } from '@/components/ui'
import Reveal from '@/components/Reveal'
import Contador from '@/components/Contador'
import { METRICAS, TALLER } from '@/lib/datos'

export default function Nosotros() {
  return (
    <Section
      id="nosotros"
      numero="02"
      titulo="Sobre nosotros"
      intro={`Tres generaciones forjando hierro en Sabadell desde ${TALLER.desde}.`}
    >
      <Reveal className="grid grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] gap-x-16" stagger={0.12}>
        <div className="space-y-6">
          <p className="text-body text-yeso-200/75">
            Empezamos en un taller de la calle con una fragua de carbón y hoy
            trabajamos desde una nave propia en el polígono de Can Roqueta,
            pero el método es el mismo: medir en obra, dibujar el plano y
            forjar cada pieza en caliente antes de instalarla con garantía.
          </p>
          <p className="text-body text-yeso-200/75">
            Trabajamos para particulares, constructoras y arquitectos en todo
            el Vallès Occidental. Cada encargo sale del taller revisado,
            protegido contra la corrosión y con la instalación incluida —
            nada de piezas de catálogo cortadas a medida.
          </p>
          <p className="font-mono text-tecnico uppercase text-ladrillo-500">
            Sabadell · La Manchester catalana · Hierro y oficio
          </p>
        </div>

        {/* Barra de métricas — social proof */}
        <div className="grid gap-12 border-l border-yeso-200/10 pl-16">
          {METRICAS.map((m) => (
            <Contador
              key={m.etiqueta}
              valor={m.valor}
              prefijo={m.prefijo}
              sufijo={m.sufijo}
              etiqueta={m.etiqueta}
            />
          ))}
        </div>
      </Reveal>
    </Section>
  )
}
