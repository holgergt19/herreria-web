'use client'

import { useState } from 'react'
import { Section, IconoWhatsApp } from '@/components/ui'
import Reveal from '@/components/Reveal'
import { TALLER, TIPOS_PIEZA, enlaceWhatsApp } from '@/lib/datos'

/* ══════════════════════════════════════════════
   CONTACTO — conversión directa.
   El formulario no tiene backend: compone el
   mensaje y lo abre en WhatsApp en un clic.
   ══════════════════════════════════════════════ */
export default function Contacto() {
  const [nombre, setNombre] = useState('')
  const [telefono, setTelefono] = useState('')
  const [tipo, setTipo] = useState(TIPOS_PIEZA[0])
  const [mensaje, setMensaje] = useState('')

  const enviar = () => {
    const texto = [
      `Hola, soy ${nombre || '—'}.`,
      `Quiero una cotización de: ${tipo}.`,
      mensaje && `Detalles: ${mensaje}`,
      telefono && `Mi teléfono: ${telefono}`,
    ]
      .filter(Boolean)
      .join('\n')

    window.open(enlaceWhatsApp(texto), '_blank', 'noopener,noreferrer')
  }

  return (
    <Section
      id="contacto"
      numero="06"
      titulo="Pide tu cotización"
      intro="Cuéntanos qué necesitas y te respondemos por WhatsApp. Si lo prefieres, llámanos o pásate por el taller sin cita."
    >
      <Reveal className="grid grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] gap-x-16 gap-y-12" stagger={0.12}>
        {/* ── Formulario ── */}
        <div className="space-y-5">
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label
                htmlFor="c-nombre"
                className="font-mono text-tecnico mb-2.5 block uppercase text-hierro-400"
              >
                Nombre
              </label>
              <input
                id="c-nombre"
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Tu nombre"
                className="campo-forja rounded-md"
              />
            </div>
            <div>
              <label
                htmlFor="c-tel"
                className="font-mono text-tecnico mb-2.5 block uppercase text-hierro-400"
              >
                Teléfono
              </label>
              <input
                id="c-tel"
                type="tel"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                placeholder="600 000 000"
                className="campo-forja rounded-md"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="c-tipo"
              className="font-mono text-tecnico mb-2.5 block uppercase text-hierro-400"
            >
              Tipo de proyecto
            </label>
            <select
              id="c-tipo"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              className="campo-forja rounded-md appearance-none bg-hierro-900"
            >
              {TIPOS_PIEZA.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="c-msg"
              className="font-mono text-tecnico mb-2.5 block uppercase text-hierro-400"
            >
              Mensaje
            </label>
            <textarea
              id="c-msg"
              rows={4}
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              placeholder="Medidas aproximadas, ubicación, plazo…"
              className="campo-forja resize-none rounded-md"
            />
          </div>

          <button
            type="button"
            onClick={enviar}
            className="flex items-center gap-3 rounded-md bg-forja-600 px-8 py-4 font-mono text-tecnico uppercase text-yeso-50 transition-all duration-300 hover:-translate-y-0.5 hover:bg-forja-500 hover:shadow-[0_14px_34px_-12px_oklch(0.585_0.19_38/0.6)]"
          >
            <IconoWhatsApp className="h-4 w-4" />
            Enviar por WhatsApp
          </button>

          <p className="font-mono text-tecnico uppercase text-hierro-400">
            Sin registro · Respondemos en horario de taller
          </p>
        </div>

        {/* ── Datos del taller ── */}
        <div className="border-l border-yeso-200/10 pl-16">
          <p className="font-mono text-tecnico uppercase text-forja-500">
            El taller
          </p>
          <div className="mt-4 h-px w-10 bg-yeso-200/25" />
          <address className="text-lead mt-6 not-italic text-yeso-50">
            {TALLER.direccion}
            <br />
            {TALLER.cp}
          </address>
          <p className="text-body mt-5 text-yeso-200/60">{TALLER.horario}</p>

          <p className="font-mono text-tecnico mt-12 uppercase text-forja-500">
            Directo
          </p>
          <div className="mt-4 h-px w-10 bg-yeso-200/25" />
          <ul className="text-lead mt-6 space-y-2 text-yeso-50">
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
          </ul>

          <p className="text-body mt-10 max-w-xs text-yeso-200/55">
            Se puede venir a ver piezas terminadas sin cita, en horario de
            taller.
          </p>
        </div>
      </Reveal>
    </Section>
  )
}
