/* ══════════════════════════════════════════════
   CONTENIDO — separado del markup.
   ══════════════════════════════════════════════ */

export const TALLER = {
  nombre: 'Forja Sabadell',
  direccion: 'Polígono Can Roqueta',
  cp: '08202 Sabadell, Barcelona',
  telefono: '93 000 00 00',
  /* Solo dígitos con prefijo de país — lo consume wa.me */
  whatsapp: '34600000000',
  email: 'taller@forjasabadell.es',
  horario: 'Lunes a viernes · 8:00 – 18:00',
  desde: 1978,
}

/* Enlace de WhatsApp con mensaje opcional */
export function enlaceWhatsApp(mensaje?: string) {
  const base = `https://wa.me/${TALLER.whatsapp}`
  return mensaje ? `${base}?text=${encodeURIComponent(mensaje)}` : base
}

/* ═══ Métricas de confianza (social proof) ═══ */
export const METRICAS = [
  { valor: 48, prefijo: '+', sufijo: '', etiqueta: 'Años de oficio' },
  { valor: 600, prefijo: '+', sufijo: '', etiqueta: 'Obras entregadas' },
  { valor: 100, prefijo: '', sufijo: '%', etiqueta: 'Instalación garantizada' },
]

export const SERVICIOS = [
  {
    numero: '01',
    titulo: 'Rejas y cerramientos',
    texto:
      'Protección para ventanas y balcones con diseño propio. Cuadradillo macizo, volutas forjadas sobre plantilla y anclaje a obra.',
    detalles: ['Ventana y balcón', 'Vallado perimetral', 'Cancelas de paso'],
  },
  {
    numero: '02',
    titulo: 'Barandillas y escaleras',
    texto:
      'Pasamanos y barandillas para interior y exterior, adaptados a la pendiente real medida en obra.',
    detalles: ['Tramos rectos y curvos', 'Pasamanos a medida', 'Arranques forjados'],
  },
  {
    numero: '03',
    titulo: 'Puertas y portones',
    texto:
      'Desde puertas peatonales hasta portones de finca con automatización preparada.',
    detalles: ['Batiente y corredera', 'Preinstalación de motor', 'Chapa y forja combinadas'],
  },
  {
    numero: '04',
    titulo: 'Estructuras y piezas a medida',
    texto:
      'Estructuras metálicas, mobiliario y encargos únicos. Si se puede forjar, se puede hacer.',
    detalles: ['Estructuras ligeras', 'Mesas y estanterías', 'Encargos de diseño'],
  },
]

/* `dibujo` decide qué plano técnico se renderiza.
   Cuando haya fotos reales se añade `fotos: string[]`
   y la página de proyecto prioriza <Image>. */
export const PROYECTOS = [
  {
    slug: 'reja-balcon-casc-antic',
    titulo: 'Reja de balcón',
    lugar: 'Casc Antic, Sabadell',
    anio: '2025',
    tipo: 'Reja',
    medidas: '1.400 × 900 mm',
    dibujo: 'reja' as const,
    descripcion:
      'Reja de protección para balcón en finca del casco antiguo. Diseño de barrote vertical con dos volutas centrales enfrentadas, forjadas sobre plantilla, y doble travesaño de pletina. Anclaje químico a fábrica de ladrillo macizo sin dañar la fachada protegida.',
    materiales: ['Cuadradillo macizo 14 × 14 mm', 'Pletina 30 × 6 mm', 'Imprimación epoxi + esmalte forja'],
    caracteristicas: ['Volutas forjadas en caliente', 'Anclaje químico a fachada protegida', 'Acabado negro forja mate'],
  },
  {
    slug: 'barandilla-escalera-sant-quirze',
    titulo: 'Barandilla de escalera',
    lugar: 'Sant Quirze del Vallès',
    anio: '2025',
    tipo: 'Barandilla',
    medidas: '4.200 × 1.000 mm',
    dibujo: 'barandilla' as const,
    descripcion:
      'Barandilla de tramo inclinado para escalera interior de vivienda unifamiliar. Pendiente tomada en obra con plantilla real, pasamanos continuo de pletina calibrada y barrotes verticales con separación normativa inferior a 100 mm.',
    materiales: ['Pletina calibrada 40 × 8 mm', 'Cuadradillo 12 × 12 mm', 'Cera de forja natural'],
    caracteristicas: ['Pendiente medida en obra', 'Separación normativa CTE', 'Pasamanos continuo sin juntas vistas'],
  },
  {
    slug: 'porton-finca-castellar',
    titulo: 'Portón de finca',
    lugar: 'Castellar del Vallès',
    anio: '2024',
    tipo: 'Portón',
    medidas: '3.000 × 2.100 mm',
    dibujo: 'porton' as const,
    descripcion:
      'Portón de dos hojas batientes para entrada de finca, con zócalo inferior de chapa y cuerpo superior de barrote. Bisagras de bulón engrasables y preinstalación completa para motorización de brazo articulado.',
    materiales: ['Tubo estructural 60 × 40 mm', 'Chapa lisa 2 mm', 'Barrote 16 × 16 mm', 'Pintura al horno'],
    caracteristicas: ['Preinstalación de motor', 'Bisagras de bulón regulables', 'Cerradura de seguridad de 3 puntos'],
  },
  {
    slug: 'cancela-jardin-terrassa',
    titulo: 'Cancela de jardín',
    lugar: 'Terrassa',
    anio: '2024',
    tipo: 'Cancela',
    medidas: '1.100 × 1.800 mm',
    dibujo: 'cancela' as const,
    descripcion:
      'Cancela peatonal de paso a jardín con arco superior rebajado y remates de punta de lanza forjada. Cierre de golpe y llave, y muelle de retorno oculto en el quicio.',
    materiales: ['Cuadradillo 14 × 14 mm', 'Pletina de arco 40 × 10 mm', 'Óxido estabilizado + barniz'],
    caracteristicas: ['Arco rebajado forjado', 'Puntas de lanza macizas', 'Acabado óxido envejecido'],
  },
  {
    slug: 'mesa-forja-roble-sabadell',
    titulo: 'Mesa de forja y roble',
    lugar: 'Sabadell centre',
    anio: '2024',
    tipo: 'Mobiliario',
    medidas: '2.200 × 900 mm',
    dibujo: 'mesa' as const,
    descripcion:
      'Mesa de comedor por encargo: bastidor de forja con volutas laterales y sobre de roble macizo de 40 mm aceitado. Las patas se ensamblan con abrazaderas cerradas en caliente, sin soldadura vista.',
    materiales: ['Pletina 50 × 10 mm', 'Roble macizo 40 mm', 'Cera de forja + aceite de madera'],
    caracteristicas: ['Abrazaderas cerradas en caliente', 'Sin soldadura vista', 'Sobre desmontable'],
  },
  {
    slug: 'cerramiento-industrial-can-roqueta',
    titulo: 'Cerramiento industrial',
    lugar: 'Can Roqueta',
    anio: '2023',
    tipo: 'Cerramiento',
    medidas: '12.000 × 2.000 mm',
    dibujo: 'cerramiento' as const,
    descripcion:
      'Cerramiento perimetral de parcela industrial en tramos de 2,4 m: barrote vertical con remate superior disuasorio y doble travesaño. Postes anclados sobre murete con placa y taco químico, galvanizado en caliente antes de pintar.',
    materiales: ['Barrote 20 × 20 mm', 'Tubo 80 × 40 mm', 'Galvanizado en caliente + poliéster'],
    caracteristicas: ['Tramos atornillados registrables', 'Galvanizado anticorrosión', 'Remate superior disuasorio'],
  },
]

export type Proyecto = (typeof PROYECTOS)[number]

/* ═══ Testimonios — social proof ═══
   `valoracion` admite decimales: 4.5 dibuja media estrella. */
export const TESTIMONIOS = [
  {
    nombre: 'Montse R.',
    lugar: 'Sabadell',
    obra: 'Reja de balcón',
    valoracion: 5,
    texto:
      'Vinieron a medir a los dos días de escribirles y la reja quedó clavada al dibujo que nos enseñaron. La soldadura ni se ve, parece de una pieza.',
  },
  {
    nombre: 'Jordi C.',
    lugar: 'Castellar del Vallès',
    obra: 'Portón de finca',
    valoracion: 5,
    texto:
      'Cumplieron la fecha que dijeron, que hoy en día ya es mucho. El portón cierra suave y dejaron todo preparado para ponerle motor más adelante.',
  },
  {
    nombre: 'Anna y Marc',
    lugar: 'Sant Quirze del Vallès',
    obra: 'Barandilla de escalera',
    valoracion: 4.5,
    texto:
      'Se nota que es trabajo de taller y no de catálogo. Nos asesoraron con el acabado y el resultado da otra categoría a la escalera.',
  },
]

/* Tipos de proyecto para el formulario de contacto */
export const TIPOS_PIEZA = [
  'Reja o cerramiento',
  'Barandilla o escalera',
  'Puerta o portón',
  'Estructura metálica',
  'Pieza a medida',
]

export const LEGAL = [
  { href: '#', texto: 'Aviso legal' },
  { href: '#', texto: 'Privacidad' },
  { href: '#', texto: 'Cookies' },
]
