import { TALLER, LEGAL, enlaceWhatsApp } from '@/lib/datos'

export default function Footer() {
  return (
    <footer className="bg-hierro-900 px-12 pb-10 pt-24 text-yeso-200">
      <div className="grid grid-cols-[1.4fr_1fr_1fr] gap-12">
        <div>
          <p className="font-display text-5xl uppercase leading-none text-yeso-50">
            Forja<span className="text-forja-500">·</span>Sabadell
          </p>
          <p className="text-body mt-6 max-w-xs text-yeso-200/65">
            Herrería y estructuras metálicas a medida. Diseño, fabricación e
            instalación en el Vallès desde {TALLER.desde}.
          </p>
        </div>

        <div>
          <p className="font-mono text-tecnico uppercase text-forja-500">
            El taller
          </p>
          <div className="mt-4 h-px w-10 bg-yeso-200/30" />
          <address className="text-body mt-6 not-italic text-yeso-200/80">
            {TALLER.direccion}
            <br />
            {TALLER.cp}
            <br />
            <br />
            {TALLER.horario}
          </address>
        </div>

        <div>
          <p className="font-mono text-tecnico uppercase text-forja-500">
            Contacto
          </p>
          <div className="mt-4 h-px w-10 bg-yeso-200/30" />
          <ul className="text-body mt-6 space-y-2 text-yeso-200/80">
            <li>
              <a
                href={`tel:${TALLER.telefono.replace(/\s/g, '')}`}
                className="link-forja"
              >
                {TALLER.telefono}
              </a>
            </li>
            <li>
              <a href={`mailto:${TALLER.email}`} className="link-forja">
                {TALLER.email}
              </a>
            </li>
            <li>
              <a
                href={enlaceWhatsApp()}
                target="_blank"
                rel="noopener noreferrer"
                className="link-forja"
              >
                WhatsApp directo
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* ── Fila inferior: copyright · legales · firma ── */}
      <div className="mt-24 flex items-center justify-between gap-8 border-t border-yeso-200/15 pt-7">
        <p className="font-mono text-tecnico uppercase text-yeso-200/45">
          © 2026 {TALLER.nombre}
        </p>

        <nav aria-label="Enlaces legales" className="flex items-center gap-7">
          {LEGAL.map((l) => (
            <a
              key={l.texto}
              href={l.href}
              className="link-forja font-mono text-tecnico uppercase text-yeso-200/45 transition-colors hover:text-yeso-100"
            >
              {l.texto}
            </a>
          ))}
        </nav>

        <p className="font-mono text-tecnico uppercase text-yeso-200/45">
          Forjado en Sabadell
        </p>
      </div>
    </footer>
  )
}
