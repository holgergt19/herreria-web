import type { Metadata } from 'next'
import { Antonio, IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google'
import './globals.css'
import SmoothScroll from '@/components/SmoothScroll'
import { Grano } from '@/components/ui'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const display = Antonio({
  subsets: ['latin'],
  variable: '--font-forge-display',
  display: 'swap',
})

const sans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-forge-sans',
  display: 'swap',
})

const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-forge-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Forja Sabadell — Herrería y estructuras metálicas a medida',
  description:
    'Herrería en Sabadell, Barcelona. Diseño, fabricación e instalación de rejas, barandillas, portones, estructuras metálicas y piezas a medida. Pide tu cotización por WhatsApp.',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
      <body className="bg-hierro-950 text-yeso-100 antialiased">
        {/* Lenis. Va primero: no renderiza nada, solo
            engancha el scroll suave a GSAP. */}
        <SmoothScroll />

        <Grano />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}
