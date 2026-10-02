# 🔨 HERRERIA-WEB — Estado del Proyecto

> **Checkpoint 3 — Reconfiguración completa: de prototipo de estilos a landing de conversión**
> Fecha: 29 de julio de 2026
> Usuario: Andres (@andregt99)
> Sesión: Cambio de objetivo del proyecto · Vuelta a paleta oscura · Eliminación del 3D · Estructura de 6 secciones orientadas a venta · Subpáginas de proyecto · Fotografía real a pantalla completa · Header transparente
>
> **Continúa y sustituye al Checkpoint 2 del mismo día.**
> **Este es el checkpoint de referencia: la arquitectura anterior ya no aplica.**

---

## 🎯 EL CAMBIO GRANDE: CAMBIÓ EL OBJETIVO DEL PROYECTO

Los checkpoints 1 y 2 describen un **prototipo de escaparate**: demostrar seis lenguajes de diseño modernos en una sola pieza coherente. El diseño era el producto.

En esta sesión el proyecto pasó a ser **una landing page de conversión para una herrería real**, tomando como referencia el análisis de una web de constructora. El criterio de éxito ya no es "cuántos estilos se lucen" sino **"un cliente entra y pide presupuesto"**.

| | CP1 / CP2 | CP3 |
|---|---|---|
| **Objetivo** | Demostrar 6 estilos de diseño | Convertir visitas en cotizaciones |
| **Criterio de decisión** | ¿Se luce el estilo? | ¿Aporta confianza o empuja al contacto? |
| **Contenido** | Placeholder al servicio del diseño | Contenido de venta real |
| **Éxito medible** | Ninguno | Clics a WhatsApp |

> **Consecuencia práctica:** todo lo que era caro y no ayudaba a convertir se ha eliminado, aunque estuviera terminado y funcionando. La escena 3D de 24 KB es el mejor ejemplo.

---

## 🗂️ QUÉ PASÓ CON LOS SEIS ESTILOS

La clasificación de CP1 (estructura / voz / superficie / componente aislado) sigue siendo correcta como teoría. Lo que cambió es qué se conserva:

| Estilo | CP2 | CP3 | Motivo |
|---|---|---|---|
| **Asimétrico** | ✅ Base de todas las secciones | ✅ **Vigente** | Coste ~0, va en `Section` |
| **Tipografía protagonista** | ✅ Base de todas | ✅ **Vigente** | Coste ~0, es la voz de la marca |
| **Ilustrativo** | ⚠️ Pendiente en Oficio | ✅ **Vigente** vía `Planos.tsx` | Los dibujos técnicos SVG son ahora el lenguaje visual del portafolio |
| **3D inmersivo** | ✅ Escena completa | ❌ **Eliminado** | Sustituido por fotografía real: más creíble para un cliente y 24 KB menos |
| **Gradientes vibrantes** | ✅ `MeshFragua` en Servicios | ⚠️ **Huérfano** | El componente existe pero no se usa en ninguna sección |
| **Neumorphism** | ⏸️ Pendiente en Presupuesto | ❌ **Eliminado** | Su sección desapareció; tokens borrados |

**Regla nueva que sustituye a "un estilo dominante por viewport":**
> Una superficie dominante por viewport sigue vigente, pero ahora la superficie del hero es **una fotografía**, no un canvas. Es más barata que el 3D y convierte mejor.

---

## 🔄 PALETA INVERTIDA (otra vez) — AHORA SÍ OSCURA

CP2 invirtió de oscuro a claro porque el hierro renderizado en 3D no se leía sobre negro. **Ese problema era del render, no del diseño gráfico.** Los planos técnicos en trazo claro sobre antracita ya funcionaban perfectamente en la sección Proyectos de CP2 — ese lenguaje es ahora toda la web.

### Renombrado y tokens nuevos

| CP2 | CP3 | Rol |
|---|---|---|
| `yeso-*` = base | `yeso-50/100/200/300` = **texto** | Se invierte: ahora es la tinta |
| `hierro-900` = texto | `hierro-950/900/800/700/500/400` = **base** | `950` (≈ #121212 cálido) es el fondo |
| — | **`hierro-950` (nuevo)** | Fondo base |
| — | **`hierro-800` (nuevo)** | Bordes y hover |
| `forja-400…700` | `forja-400…700` **recalibrado** | Más luminoso: sobre negro necesita brillo |
| `ladrillo-500/600` | `ladrillo-500/600` **aclarado** | Se usa solo en Nosotros |
| `--shadow-neu-*`, `--radius-neu` | ❌ **borrados** | No hay sección neumórfica |
| — | **`campo-forja` (nuevo `@utility`)** | Inputs oscuros del formulario |

⚠️ **Cualquier clase que dé por hecho fondo claro está mal.** Si algo aparece con texto oscuro sobre negro, es esto.

### Grano
Pasó de `mix-blend-multiply` a **`mix-blend-screen`**. Sobre negro, multiply es invisible: las motas oscuras se pierden en el fondo. Sigue al 5 %.

---

## 📂 ESTRUCTURA — 21 ARCHIVOS + `public/`

```
herreria-web/
├── public/
│   ├── herreria1.webp           ✅ NUEVO — foto del hero (144 KB)
│   └── herreria1.png            (original de 1,8 MB, sin usar)
├── next.config.ts               ✅ allowedDevOrigins (sin cambios)
│
└── src/
    ├── app/
    │   ├── favicon.ico          (por defecto de Next)
    │   ├── globals.css          ✅ REESCRITO — sistema oscuro
    │   ├── layout.tsx           ✅ chasis oscuro
    │   ├── page.tsx             ✅ compone 6 secciones + dientes
    │   └── proyectos/
    │       └── [slug]/
    │           └── page.tsx     ✅ NUEVO — ficha por proyecto
    │
    ├── components/
    │   ├── Contador.tsx         ✅ NUEVO — número que sube al entrar
    │   ├── Footer.tsx           ✅ 3 columnas + WhatsApp
    │   ├── Header.tsx           ✅ REESCRITO — transparente → cristal
    │   ├── Magnetico.tsx        ✅ hover magnético (sin cambios)
    │   ├── Placa.tsx            ✅ chapa translúcida OSCURA
    │   ├── Planos.tsx           ✅ 6 dibujos técnicos SVG (sin cambios)
    │   ├── Reveal.tsx           ✅ scroll reveal (sin cambios)
    │   ├── SmoothScroll.tsx     ✅ Lenis ↔ GSAP (sin cambios)
    │   └── ui.tsx               ✅ 9 exports (+Estrellas, +IconoWhatsApp)
    │
    ├── sections/
    │   ├── Hero.tsx             ✅ REESCRITO — foto full-screen + 5 velos
    │   ├── Nosotros.tsx         ✅ NUEVO — historia + métricas
    │   ├── Proyectos.tsx        ✅ grid → enlaza a subpáginas
    │   ├── Servicios.tsx        ✅ 4 placas oscuras
    │   ├── Testimonios.tsx      ✅ NUEVO — 3 reseñas con estrellas
    │   └── Contacto.tsx         ✅ REESCRITO — formulario → WhatsApp
    │
    └── lib/
        └── datos.ts             ✅ AMPLIADO — slugs, fichas, métricas
```

### Archivos eliminados

| Archivo | Tamaño | Motivo |
|---|---|---|
| `lib/Scene.tsx` | 24 KB | La escena 3D construía su propia habitación de yeso claro: incompatible con dark mode. Y era el origen de cinco iteraciones peleando por hacer visible hierro sobre negro |
| `sections/Oficio.tsx` | — | Los 5 pasos no encajan en el flujo de conversión. Su esencia se resumió en Nosotros |
| `sections/Presupuesto.tsx` | — | Sustituido por el formulario → WhatsApp. Sus `TIPOS_PIEZA` viven ahora en el `<select>` de Contacto |

> **`lib/` se quedó con un solo archivo.** No se colapsó en `datos.ts` a la raíz para no romper todos los imports por un cambio cosmético.

### Exports por archivo

| Archivo | Exporta |
|---|---|
| `ui.tsx` | `Grano`, `DienteSierra`, `Cota`, `Section`, `MeshFragua`⚠️, `Estrellas`, `IconoWhatsApp`, `useIsMobile`⚠️ |
| `datos.ts` | `TALLER`, `enlaceWhatsApp()`, `METRICAS`, `SERVICIOS`, `PROYECTOS`, `Proyecto` (type), `TESTIMONIOS`, `TIPOS_PIEZA`, `LEGAL` |
| `Contador.tsx` | default `Contador` |
| `Reveal` / `Magnetico` / `Placa` / `Planos` / `SmoothScroll` / `Header` / `Footer` | default |
| `[slug]/page.tsx` | `generateStaticParams`, `generateMetadata`, default `PaginaProyecto` |

⚠️ `MeshFragua` y `useIsMobile` **existen pero no se consumen**. `useIsMobile` es intencional (espera la fase responsive). `MeshFragua` quedó huérfano al quitar el plano técnico del hero: o se reutiliza de fondo en alguna sección, o se borra.

---

## 🏗️ EL TEMPLATE: SCROLL DE CONVERSIÓN

**El scroll nunca se secuestra** (regla heredada de CP2, sigue vigente). Lo cinematográfico viene de cómo entra cada sección.

```
HEADER · fijo · TRANSPARENTE sobre el hero → cristal al scrollear
─────────────────────────────────────────────────────────
01 HERO         FOTO      full-screen + 5 capas de velo
                          CTA "Ver proyectos" + "WhatsApp"
02 NOSOTROS     950       historia + 3 contadores animados
◤◣◤◣ diente de sierra
03 PROYECTOS    900       grid → cada tarjeta abre subpágina
◤◣◤◣
04 SERVICIOS    950       4 placas translúcidas oscuras
◤◣◤◣
05 TESTIMONIOS  900       3 reseñas con estrellas
◤◣◤◣
06 CONTACTO     950       formulario → WhatsApp en 1 clic
─────────────────────────────────────────────────────────
FOOTER · 900 · 3 columnas + legales
```

**El orden no es decorativo.** Proyectos va antes de Servicios porque la prueba visual convence más rápido que la lista de capacidades, y Testimonios va justo antes del formulario para eliminar la última objeción.

### La alternancia de negros
Ya no hay contraste claro↔oscuro. La respiración la dan **dos profundidades de negro**: `hierro-950` (base) y `hierro-900` (panel). El diente de sierra separa las dos.

> **`DienteSierra` sigue viviendo en `page.tsx`**, no en las secciones: es `page.tsx` quien conoce los colores de las secciones vecinas. **El relleno debe ser siempre el color de la sección de abajo.**

---

## 🖼️ EL HERO — ANATOMÍA DE LAS SEIS CAPAS

El cambio más visible de la sesión. La foto ocupa `h-screen` completo y **se mete por debajo del header**, no lo esquiva.

| z | Capa | Qué hace |
|---|---|---|
| `z-0` | **Fotografía** | `next/image` con `fill` + `object-cover` (el equivalente de `background-size: cover`, pero optimizado). `priority` porque es el LCP. Contenedor a `scale-110` |
| `z-10` | **Oscurecimiento base** | `bg-hierro-950/45` — un 45 % uniforme |
| `z-10` | **Velo lateral** | Degradado a 95° del 86 % al 0 %: refuerza el lado del texto y deja respirar la foto a la derecha |
| `z-10` | **Degradados de borde** | Arriba: garantiza que el header transparente se lea. Abajo: asienta la barra de ficha técnica |
| `z-10` | **Viñeta** | Radial que cierra las esquinas |
| `z-20` | **Contenido** | Titular, subtítulo, CTAs, ficha inferior |

### Por qué cinco velos y no uno
Un solo `bg-black/50` funciona pero **aplana la foto**: mata las luces cálidas que son justo lo que la hace atractiva. Con capas separadas se oscurece **donde hace falta** (arriba por el menú, izquierda por el texto, abajo por la barra) y la zona iluminada de la foto queda casi intacta.

Refuerzo extra: el `<h1>` y el subtítulo llevan `text-shadow` sutil. Es el seguro por si algún día se cambia la foto por una más clara.

### Parallax de profundidad
La foto se desplaza `yPercent: -3 → 4` mientras el contenido sube `y: -90`. Como el contenedor está a `scale-110`, el desplazamiento del 4 % **nunca descubre un borde**.

> ⚠️ Esto contradice en apariencia el problema 8 de CP2 ("escalar el canvas lo trata como mapa de bits"). No es contradicción: **ese aviso valía para un canvas WebGL, no para una fotografía.** Mover una foto es parallax estándar y se lee bien; mover un render 3D se lee como si el objeto se despegara.

---

## 🧭 EL HEADER TRANSPARENTE → CRISTAL

| Capa | Comportamiento |
|---|---|
| **A · Cristal sólido** | `bg-hierro-950/72` + `backdrop-blur-xl` + borde inferior. Opacidad **0** sobre el hero, **1** a partir de 80 px de scroll |
| **B · Degradado permanente** | Negro al 55 % desvaneciéndose en 128 px. El seguro de legibilidad mientras A es invisible. Sobre fondo sólido es imperceptible |
| **Contenido** | `relative` para quedar por encima de A y B |
| **Barra de progreso** | Sin cambios respecto a CP2 |

### Tres decisiones técnicas
1. **La transición se hace animando la opacidad de una capa aparte**, no alternando clases con estado de React. Cero re-renders y la transición es continua en lugar de un salto. Coherente con la regla de CP2: *el progreso de scroll nunca pasa por estado de React*.
2. **La opacidad inicial se declara en el markup** (`style={{ opacity: enPortada ? 0 : 1 }}`), no en un `gsap.set`. Si se hiciera en el efecto, el servidor enviaría el header opaco y habría un parpadeo antes de hidratar.
3. **`usePathname()` decide el arranque.** Solo la portada tiene hero a pantalla completa; en las subpáginas de proyecto el header arranca ya sólido.

Disparador: `start: 'top -80'` sobre `document.documentElement` con `toggleActions: 'play none none reverse'` — vuelve a transparente al subir.

---

## 🛣️ RUTAS Y SEO

Primera vez que el proyecto tiene más de una página.

| Ruta | Generación | Metadata |
|---|---|---|
| `/` | Estática | `layout.tsx` |
| `/proyectos/[slug]` | `generateStaticParams()` — 6 páginas al build | `generateMetadata()` por obra |

**Los enlaces del header llevan `/` delante** (`/#servicios`, no `#servicios`) para que funcionen también desde las subpáginas.

`params` es una **Promise** y hay que hacerle `await` (Next 16). Cada ficha muestra plano técnico, tabla de ficha, descripción, materiales, características, CTA a WhatsApp con el nombre de la obra en el mensaje, y enlace al proyecto siguiente en bucle.

---

## 🎬 SISTEMA DE MOTION

| Efecto | Implementación | Estado |
|---|---|---|
| Scroll suave | `SmoothScroll.tsx` — Lenis + `ScrollTrigger.update` | Sin cambios |
| Reveal con blur + stagger | `Reveal.tsx` — hijos directos, `once: true`, `start: 'top 82%'` | Sin cambios |
| Depth Parallax | Hero: foto `yPercent -3→4` vs contenido `y:-90 opacity:0.1`, `scrub: 1` | Reescrito |
| Mouse Parallax | `gsap.quickTo` en el contenido del Hero | Sin cambios |
| Magnetic Hover | `Magnetico.tsx` | Sin cambios |
| Light Reflection | `Placa.tsx` — custom property `--mx/--my` en el nodo | Recalibrado a oscuro |
| **Header transparente → cristal** | Opacidad de capa, `toggleActions` con reverse | **Nuevo** |
| **Contadores** | `Contador.tsx` — `textContent` escrito desde el tick de GSAP | **Nuevo** |
| Ken Burns de entrada | Foto `scale: 1.16 → 1.10` en 2,4 s | Nuevo |
| Animated Mesh Gradient | `MeshFragua` | ⚠️ Huérfano |
| Inercia / spring / polvo | Iban en la escena 3D | ❌ Eliminados |

### Reglas de motion (vigentes)
- El progreso de scroll **nunca** pasa por estado de React → objeto mutable, custom property o `textContent`.
- `scrub` sí, `pin` **no**.
- Todo respeta `prefers-reduced-motion`.
- Easing `expo.out` en toda la web.

---

## ⭐ COMPONENTES NUEVOS — DETALLE

### `Contador.tsx`
Anima un objeto plano `{ n: 0 }` y escribe `Math.round(obj.n)` en `textContent` desde `onUpdate`. **El número nunca pasa por estado de React**, así que no hay 60 re-renders por segundo. Con `prefers-reduced-motion` escribe el valor final directamente.

### `Estrellas` (en `ui.tsx`)
Sustituye a la comilla tipográfica de los testimonios.

Dos capas superpuestas: cinco estrellas vacías en `yeso-200/18` y encima las llenas en `forja-500`, **recortadas por ancho con `overflow-hidden`**. Así admite decimales (`4.5` dibuja media estrella) sin dibujar un icono partido a mano.

El detalle que importa: el ancho del recorte **no es un porcentaje del total**. Se calcula como `enteras × (ancho + hueco) + resto × ancho`, porque un porcentaje plano haría que el corte de la media estrella cayera dentro de un hueco en vez de en el centro del icono. Trazo de estrella generado con radios 10 / 4,3 sobre `viewBox="0 0 24 24"`.

### `IconoWhatsApp` (en `ui.tsx`)
SVG de trazo que hereda `currentColor`. Coherente con la regla de cero assets externos.

---

## 📞 LA CONVERSIÓN — WHATSAPP SIN BACKEND

El backend sigue fuera de alcance, pero el formulario **funciona de verdad**:

1. `datos.ts` expone `enlaceWhatsApp(mensaje?)`, que construye `https://wa.me/<numero>?text=<encodeURIComponent>`.
2. `Contacto.tsx` mantiene los cuatro campos en estado local, compone el mensaje y abre WhatsApp en pestaña nueva.
3. Cada ficha de proyecto tiene su propio CTA con el nombre de la obra ya escrito en el mensaje.

⚠️ **`TALLER.whatsapp` es un placeholder** (`'34600000000'`). Solo dígitos, con prefijo de país, sin `+` ni espacios.

---

## 📐 DECISIONES DE ARQUITECTURA A RESPETAR

1. **Una superficie dominante por viewport.** Sigue vigente. La del hero es ahora una fotografía.
2. **El glassmorphism se traduce a chapa translúcida.** Misma técnica (`backdrop-blur`, transparencia, borde de 1 px), pero con remaches y filete de brasa: se lee como taller, no como dashboard SaaS. En oscuro el fondo baja a `yeso-50/[0.035]`.
3. **`overflow-hidden` en el `<div>` interior**, nunca en el `<section>` a pantalla completa.
4. **Contenido en `datos.ts`**, nunca escrito a mano en el JSX. Esto es lo que permitió añadir estrellas y fichas de proyecto tocando un solo archivo.
5. **Nada de fotos de stock en el portafolio.** Los proyectos se muestran como dibujos técnicos SVG. Cuando haya fotos reales se añade `fotos: string[]` al proyecto y el componente prioriza `<Image>`.
6. **Cero assets externos, cero CDN.** La única excepción ya no es una excepción: la foto del hero es local y está en `public/`.
7. **El scroll no se secuestra.**

---

## 🐛 PROBLEMAS RESUELTOS EN ESTA SESIÓN

### 1 · La firma de los testimonios no se alineaba
**Causa:** `flex-1` en el párrafo empujaba la firma, pero con textos de distinto número de líneas las tres quedaban a distinta altura.
**Solución:** `mt-auto` en el bloque de firma + `mb-8` en el párrafo para garantizar el hueco mínimo.

### 2 · La media estrella caía en el hueco entre iconos
**Causa:** recortar al `valor / total × 100 %` ignora que los huecos también ocupan ancho.
**Solución:** calcular el ancho en píxeles descontando huecos (ver `Estrellas` arriba).

### 3 · Parpadeo del header al cargar
**Causa:** `gsap.set(opacity: 0)` dentro del efecto. El servidor enviaba el header opaco y se veía saltar a transparente al hidratar.
**Solución:** opacidad inicial en el markup; GSAP solo anima desde ahí.

### 4 · La foto de 1,8 MB como LCP
**Solución:** WebP a calidad 84 → **144 KB**, sin diferencia visible en una foto oscura. `next/image` con `priority`, `sizes="100vw"` y `quality={90}`.

### 5 · Comentarios dentro de la lista de atributos JSX
`<Image /* comentario */ src="…" />` es válido pero frágil. Movidos a `{/* … */}` sobre la etiqueta.

### 6 · Enlaces de ancla rotos desde las subpáginas
**Causa:** `href="#servicios"` en el header apunta a un ancla de la página actual, que en `/proyectos/x` no existe.
**Solución:** `/#servicios`.

### Errores de integración corregidos al reestructurar
- `MeshFragua` y `Plano` seguían importados en el Hero después de quitarlos.
- `Section` tenía la prop `oscuro` booleana, sin sentido cuando todo es oscuro → sustituida por `tono: '950' | '900'`.
- `Cota` tenía la misma prop `oscuro` → eliminada.

### Avisos ignorables permanentemente
```
Unknown at rule @theme / @utility     (CSS de VS Code, no conoce Tailwind v4)
```
Se silencia con `.vscode/settings.json`:
```json
{
  "files.associations": { "*.css": "tailwindcss" },
  "css.lint.unknownAtRules": "ignore"
}
```
Los avisos de `THREE.Clock` y `X4122` de CP2 **ya no aparecen**: no queda 3D.

---

## ⏳ LO QUE QUEDA POR HACER

### 🔜 PRÓXIMA SESIÓN

| # | Tarea | Detalle |
|---|---|---|
| 1 | **Datos reales en `datos.ts`** | Número de WhatsApp, teléfono, email, `METRICAS` reales, testimonios reales. Es lo que separa un prototipo de una web publicable |
| 2 | **Fotos reales de piezas** | Añadir `fotos: string[]` a `PROYECTOS` y galería en la subpágina. El plano técnico pasa a respaldo |
| 3 | **Decidir sobre `MeshFragua`** | Reutilizar de fondo en Nosotros o Testimonios, o borrarlo |
| 4 | **Split Text** en los titulares | `SplitText` de GSAP, ya incluido en 3.15 |

### Después
- [ ] Limpiar dependencias: `pnpm remove three @react-three/fiber @react-three/drei` (~40 % del `node_modules`)
- [ ] Textos legales reales (los enlaces ya existen apuntando a `#`)
- [ ] Mapa en Contacto
- [ ] Favicon propio
- [ ] `alt` descriptivos cuando entren las fotos reales

### Fase final
- [ ] **Responsive** — `grid-template-areas` + `useIsMobile`. Puntos críticos: las tres retículas de columna fija (`Section`, hero, contacto) y `h-screen` → `h-[100svh]` por la barra del navegador móvil
- [ ] Git + GitHub
- [ ] Deploy en Vercel

---

## 🔑 DATOS CLAVE

| Concepto | Valor |
|---|---|
| **Proyecto** | herreria-web |
| **Ruta local** | `C:\Users\corpa\Documents\GitHub\herreria-web\` |
| **Nombre ficticio** | Forja Sabadell (placeholder) |
| **Ubicación** | Polígono Can Roqueta, 08202 Sabadell, Barcelona |
| **Editor** | Visual Studio Code · Windows 11 |
| Node.js | v22.14.0 |
| pnpm | 10.33.2 |
| Next.js | 16.2.12 (Turbopack) |
| React | 19.2.4 |
| Tailwind CSS | 4.x (tokens en `@theme`, sin config file) |
| gsap | 3.15.0 |
| @gsap/react | 2.1.2 |
| lenis | 1.3.25 |
| ~~three / @react-three/fiber / @react-three/drei~~ | **instalados pero sin usar** |
| **URL dev** | http://localhost:3000 |

### Fuentes (sin cambios)
`Antonio` (display) · `IBM_Plex_Sans` (texto) · `IBM_Plex_Mono` (técnica), todas vía `next/font/google` y autoalojadas.

---

## 💡 NOTAS PARA RETOMAR

1. **Arrancar:** `pnpm dev` y trabajar en `localhost:3000`. `next.config.ts` exige reiniciar; el resto va por hot reload.

2. **Al pegar código, sustituir el archivo completo** cuando se indique. Los errores de las tres sesiones salieron todos de ediciones parciales.

3. **Comprobar `PROBLEMS` en VS Code antes de mirar el navegador.**

4. **Para cambiar la foto del hero:** dejar el archivo en `public/` y cambiar el `src` en `Hero.tsx`. Si la nueva foto es más clara, subir la capa base de `bg-hierro-950/45` a `/55` o `/60`. Si el motivo principal queda descentrado, ajustar `object-center` a `object-[70%_center]` o similar.

5. **Los cinco velos del hero son independientes a propósito.** Si el texto no se lee, casi siempre se arregla tocando **solo la capa 3** (velo lateral), no oscureciendo todo.

6. **Si el diente de sierra desaparece**, el relleno no coincide con la sección de abajo. Ver `page.tsx`.

7. **El grano está al 5 % con `mix-blend-screen`.** Si se ve lechoso sobre las zonas negras, bajar a `0.03`.

---

## 📊 RESUMEN DE LA SESIÓN

| Aspecto | CP2 | CP3 |
|---|---|---|
| **Objetivo del proyecto** | Demo de 6 estilos de diseño | ✅ Landing de conversión |
| **Paleta** | Clara (yeso base) | ✅ Oscura (`hierro-950` base), dos profundidades de negro |
| **Archivos en `src/`** | 20 | ✅ **21** + `public/` |
| **Páginas** | 1 | ✅ **7** (portada + 6 fichas estáticas) |
| **Secciones** | 6 (2 sin estilo firma) | ✅ **6 completas**, ordenadas por conversión |
| **Hero** | Escena 3D procedural | ✅ Fotografía full-screen + 5 velos + parallax |
| **Header** | Fijo, siempre opaco | ✅ Transparente → cristal al scrollear |
| **Portafolio** | Grid sin destino | ✅ Grid → ficha técnica por proyecto |
| **Social proof** | Ninguno | ✅ Contadores + 3 testimonios con estrellas |
| **Conversión** | `mailto:` | ✅ Formulario → WhatsApp en 1 clic |
| **Peso del hero** | 24 KB de JS + WebGL | ✅ 144 KB de imagen, cero WebGL |
| **Dependencias en uso** | gsap, lenis, three, r3f, drei | ✅ gsap, lenis (three y compañía, huérfanas) |

---

*Documento generado el 29 de julio de 2026 como Checkpoint 3 de herreria-web.*
*Proyecto en `C:\Users\corpa\Documents\GitHub\herreria-web`*
*Próxima sesión: datos reales en `datos.ts` → fotos reales de piezas → decidir sobre `MeshFragua` → Split Text.*
