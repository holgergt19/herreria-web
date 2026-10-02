import Hero from '@/sections/Hero'
import Nosotros from '@/sections/Nosotros'
import Proyectos from '@/sections/Proyectos'
import Servicios from '@/sections/Servicios'
import Testimonios from '@/sections/Testimonios'
import Contacto from '@/sections/Contacto'
import { DienteSierra } from '@/components/ui'

/* ══════════════════════════════════════════════
   SCROLL DE CONVERSIÓN
   01 Hero → 02 Nosotros+métricas → 03 Proyectos
   → 04 Servicios → 05 Testimonios → 06 Contacto

   El diente de sierra separa las dos
   profundidades de negro (950 base / 900 panel).
   El relleno es SIEMPRE el color de la sección
   de abajo.
   ══════════════════════════════════════════════ */
export default function Home() {
  return (
    <main>
      <Hero />
      <Nosotros />

      {/* 950 → 900 */}
      <DienteSierra relleno="var(--color-hierro-900)" filete="var(--color-hierro-700)" />
      <Proyectos />

      {/* 900 → 950 */}
      <DienteSierra relleno="var(--color-hierro-950)" filete="var(--color-hierro-700)" />
      <Servicios />

      {/* 950 → 900 */}
      <DienteSierra relleno="var(--color-hierro-900)" filete="var(--color-hierro-700)" />
      <Testimonios />

      {/* 900 → 950 */}
      <DienteSierra relleno="var(--color-hierro-950)" filete="var(--color-hierro-700)" />
      <Contacto />
    </main>
  )
}
