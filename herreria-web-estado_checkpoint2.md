# 🔨 HERRERIA-WEB — Estado del Proyecto

> **Checkpoint 2 — Estructura completa + web navegable de 6 secciones**
> Fecha: 29 de julio de 2026
> Usuario: Andres (@andregt99)
> Sesión: Giro de paleta a base clara · Escena 3D con habitación y atmósfera · Sistema de motion completo · Estructura de 20 archivos cerrada
>
> **Continúa el Checkpoint 1 (v2) del mismo día.**

---

## 🎯 CONTEXTO

Web-prototipo para una **herrería en Sabadell (Barcelona)**. El objetivo no es funcional, es visual: demostrar seis lenguajes de diseño modernos en una sola pieza coherente.

| Decisión de alcance | Estado |
|---|---|
| Un estilo dominante por sección | ✅ Vigente |
| Responsive | ⏸️ Al final |
| Backend / formularios reales | ❌ Fuera de alcance |
| Git / GitHub / Vercel | ⏸️ Al final |
| Todo en español (no catalán) | ✅ |

---

## 🔄 EL CAMBIO GRANDE DE ESTA SESIÓN: PALETA INVERTIDA

El proyecto pasó de **fondo oscuro a base clara de yeso**. Motivo: llevábamos cinco iteraciones peleando por hacer visible hierro oscuro sobre negro. Sobre yeso el hierro se lee como silueta con brillos especulares — que es exactamente cómo se ve una reja en una fachada mediterránea.

**El oscuro no desapareció: pasó a ser recurso de contraste.** Proyectos, Contacto y Footer son negros. La alternancia claro↔oscuro da más carácter cinematográfico que un único tono negro de arriba abajo.

### Renombrado completo de tokens

| Antes (CP1) | Ahora | Rol |
|---|---|---|
| `carbon-950/900/800` | `yeso-50/100/200/300` | Base clara |
| `steel-700/500/300` | `hierro-900/700/500/400` | Texto y filetes |
| `ash-100` | `hierro-900` | Texto principal |
| `ember-300…900` | `forja-400/500/600/700` | Acento de brasa |
| `brick-*` | `ladrillo-500/600` | Herencia de Sabadell |

⚠️ **Cualquier clase `bg-carbon-*`, `text-ash-*`, `text-ember-*` o `steel-*` ya no existe.** Si algo sale sin color, es eso.

---

## 📂 ESTRUCTURA — 20 ARCHIVOS (cerrada)

```
herreria-web/
├── public/                          (vacía — sin assets)
├── next.config.ts                   ✅ allowedDevOrigins
│
└── src/
    ├── app/
    │   ├── favicon.ico              (por defecto de Next)
    │   ├── globals.css              ✅ sistema de diseño en @theme
    │   ├── layout.tsx               ✅ fuentes + Lenis + chasis
    │   └── page.tsx                 ✅ compone 6 secciones + dientes
    │
    ├── components/
    │   ├── Footer.tsx               ✅ oscuro, 3 columnas + legales
    │   ├── Header.tsx               ✅ fijo + barra de progreso
    │   ├── Magnetico.tsx            ✅ hover magnético (quickTo)
    │   ├── Placa.tsx                ✅ chapa translúcida + luz de cursor
    │   ├── Planos.tsx               ✅ 6 dibujos técnicos SVG
    │   ├── Reveal.tsx               ✅ scroll reveal reutilizable
    │   ├── SmoothScroll.tsx         ✅ Lenis ↔ GSAP
    │   └── ui.tsx                   ✅ 6 exports
    │
    ├── sections/
    │   ├── Hero.tsx                 ✅ 3D + tipografía + parallax
    │   ├── Servicios.tsx            ✅ mesh animado + 4 placas
    │   ├── Oficio.tsx               ⚠️ estructura sin estilo firma
    │   ├── Proyectos.tsx            ✅ 6 planos técnicos
    │   ├── Presupuesto.tsx          ⚠️ estructura sin estilo firma
    │   └── Contacto.tsx             ✅ oscuro, datos del taller
    │
    └── lib/
        ├── Scene.tsx                ✅ 24 KB — la escena 3D completa
        └── datos.ts                 ✅ todo el contenido
```

### Exports por archivo

| Archivo | Exporta |
|---|---|
| `ui.tsx` | `Grano`, `DienteSierra`, `Cota`, `Section`, `MeshFragua`, `useIsMobile` |
| `datos.ts` | `TALLER`, `SERVICIOS`, `PASOS_OFICIO`, `PROYECTOS`, `TIPOS_PIEZA`, `ACABADOS`, `LEGAL` |
| `Reveal.tsx` | default `Reveal` |
| `Magnetico.tsx` | default `Magnetico` |
| `Placa.tsx` | default `Placa` |
| `Planos.tsx` | default `Plano` |
| `SmoothScroll.tsx` | default `SmoothScroll` |
| `Header.tsx` / `Footer.tsx` | default |
| `Scene.tsx` | default `Scene` |

---

## 🎨 SISTEMA DE DISEÑO

### Concepto rector: **el taller**
La web se lee como entrar en la nave. Yeso, hierro, la brasa como único color cálido, y anotaciones de plano de taller.

### El ancla de Sabadell (sin tópicos)
Sabadell es **la Manchester catalana**, capital textil industrial. De ahí salen:

| Elemento real | Uso |
|---|---|
| Cubiertas de **diente de sierra** de los vapores | El motivo gráfico principal — separadores y footer |
| **Torre de l'Aigua** (1918), ladrillo | Paleta `ladrillo-*` para la sección de oficio |
| Ventanales altos de nave | La mancha de luz de la escena 3D |
| Hollín de chimenea | El grano global |

**Nada de rojo y amarillo planos.** La rampa cálida es física de metal incandescente, siempre sobre base neutra.

### Paleta (en `@theme` de globals.css)

```
yeso-50 / 100 / 200 / 300        ← base
hierro-900 / 700 / 500 / 400     ← texto, filetes
forja-400 / 500 / 600 / 700      ← acento de brasa
ladrillo-500 / 600               ← Sabadell
```

### Tipografía — tres voces, dos familias

| Rol | Fuente | Token |
|---|---|---|
| Display | **Antonio** (condensada, variable) | `font-display` |
| Texto | **IBM Plex Sans** | `font-sans` |
| Técnica | **IBM Plex Mono** | `font-mono` |

Escala fluida con `clamp()`: `text-tecnico`, `text-body`, `text-lead`, `text-h3`, `text-h2`, `text-h1`, `text-mega`.

### Utilities propias
- `text-forge` — tipografía × gradiente de brasa en OKLCH
- `link-forja` — subrayado animado (con `&:hover::after` anidado)

### Los cinco motivos gráficos
1. **Diente de sierra** — separadores entre secciones
2. **Numeración monoespaciada** `01`–`06` como cotas de plano
3. **Línea de cota** — filete de 40px bajo cada número
4. **Remaches** — cuatro esquinas en las placas
5. **Grano** — hollín sobre toda la web, última capa

---

## 🏗️ EL TEMPLATE: SCROLL EDITORIAL

**El scroll nunca se secuestra.** Lo cinematográfico viene de cómo entra cada sección.

```
HEADER · fijo · yeso translúcido · blur · barra de progreso
─────────────────────────────────────────────────────────
01 HERO         yeso    3D inmersivo + tipografía
02 SERVICIOS    yeso    mesh animado + placas translúcidas
03 EL OFICIO    yeso-200  ⚠️ falta ilustrativo
◤◣◤◣ diente de sierra
04 PROYECTOS    OSCURO  planos técnicos + asimétrico
◤◣◤◣
05 PRESUPUESTO  yeso-200  ⚠️ falta neumorphism
◤◣◤◣
06 CONTACTO     OSCURO  datos del taller
─────────────────────────────────────────────────────────
FOOTER · oscuro · 3 columnas + legales
```

> **`DienteSierra` vive en `page.tsx`**, no en el Footer: es `page.tsx` quien conoce los colores de las secciones vecinas. El relleno debe ser el color de la sección de abajo.

---

## 🎬 SISTEMA DE MOTION

| Efecto | Implementación |
|---|---|
| Scroll suave | `SmoothScroll.tsx` — Lenis con `easeOutExpo`, conduce a `ScrollTrigger.update` |
| Smooth / Blur / Stagger Reveal | `Reveal.tsx` — anima hijos directos, `once: true`, `start: 'top 82%'` |
| Depth Parallax | Hero: escena `y:120 scale:1.04` vs contenido `y:-90 opacity:0.15`, `scrub: 1` |
| Mouse Parallax | `gsap.quickTo` en el contenido del Hero |
| Magnetic Hover | `Magnetico.tsx` — inclinación hacia el cursor con retorno |
| Light Reflection | `Placa.tsx` — custom property `--mx/--my` escrita en el nodo, **sin estado de React** |
| Inertia / Spring | Lerp exponencial `1 - e^(-k·dt)` en la pieza 3D |
| Animated Mesh Gradient | `MeshFragua` — 4 orbes, periodos 26/30/34/40 s |
| Floating Animation | La pieza 3D y el polvo en suspensión |
| Easing premium | `expo.out` en toda la web |

### Reglas de motion
- El progreso de scroll **nunca** pasa por estado de React → objeto mutable o custom property
- `scrub` sí, `pin` **no**: secuestrar el scroll se percibe como roto, no como premium
- Todo respeta `prefers-reduced-motion`

---

## 🧊 ANATOMÍA DE `Scene.tsx` (24 KB)

Todo procedural: **cero descargas, cero archivos `.glb`, cero HDRI de CDN**.

| Bloque | Qué hace |
|---|---|
| `prng()` | Mulberry32 determinista. Sustituye a `Math.random()`, que incumple `react-hooks/purity` |
| `campoRuido()` | Generador de octavas compartido por hierro y yeso |
| `crearMartillado()` | Normal + roughness map del hierro (abolladuras + piel) |
| `crearYeso()` | Normal map de pared enfoscada (llana + cal + poro) |
| `crearLuzVentana()` | Mancha del ventanal con parteluz, 2 hojas × 3 paños |
| `reproyectarUV()` | Proyección de caja: densidad de textura constante en todas las piezas |
| `crearBarra()` | Perfil chaflanado en las cuatro aristas longitudinales |
| `GEO_*` (7 geometrías) | Se construyen una vez al cargar el módulo |
| `Habitacion()` | Pared + luz de ventana + suelo + zócalo |
| `Polvo()` | 260 motas con deriva y envoltura |
| `Pieza()` | El panel de reja completo |
| `Scene()` | Canvas + `Environment` con 4 `Lightformer` + luz de ventana con sombra |

### La pieza: anatomía real de forja (investigada)

| Elemento | Implementación |
|---|---|
| **Cuadradillo** torsionado (retorcido salomónico) | Vértices de un box girados según altura, extremos lisos |
| **Voluta de pletina** | `ExtrudeGeometry` con `extrudePath` y sección rectangular + recta de entrada |
| **Piña** | 4 tubos curvos rotados 90° |
| **Punta de lanza** | Cono de 4 caras + collarín |
| **6 abrazaderas** | Toros achatados en los ensambles |
| **Martillado** | Normal map con 2 octavas + roughness acoplada |
| Imperfecciones | Desvíos de 0.004–0.02 rad: forja, no CAD |

---

## 🐛 PROBLEMAS RESUELTOS EN ESTA SESIÓN

### 1 · `DataTexture` producía rayas y moiré
**Causa:** por defecto viene con `NearestFilter` y sin mipmaps. En ángulos rasantes → bandas duras.
**Solución:** `LinearFilter` + `LinearMipmapLinearFilter` + `generateMipmaps` + `anisotropy: 8`.

### 2 · El martillado salía estirado en vetas verticales
**Causa:** un barrote mide 0.1 × 3.5 → sus UVs se estiran 35× en vertical.
**Solución:** `reproyectarUV()` — proyección de caja desde la posición del vértice.

### 3 · El hierro se veía negro plano
**Causa:** con `metalness: 1` el `color` tinta los **reflejos**, no pinta. Sin entorno que reflejar, no hay nada.
**Solución:** albedo realista (`#2b2723`) + entorno de estudio con Lightformers verticales.

### 4 · `Math.random()` rompía `react-hooks/purity`
**Solución:** PRNG con semilla. Además hace la textura determinista.

### 5 · `setState` en efecto rompía `react-hooks/set-state-in-effect`
**Solución:** `useIsMobile` con `useSyncExternalStore` — sin efecto, sin renders en cascada.

### 6 · Veinte instancias del material del hierro
**Causa:** `<Hierro />` como componente se montaba una vez por malla.
**Solución:** `HIERRO` como singleton a nivel de módulo, pasado con `material={HIERRO}`.

### 7 · El diente de sierra era casi invisible
**Causa:** relleno `carbon-900` sobre `carbon-950` = 4 centésimas de luminosidad. Y el del footer, mismo color que el fondo.
**Solución:** SVG con `<pattern>` + `useId()`, relleno **y filete**. Se lee por su perfil.

### 8 · El hero anclado (`pin`) no gustó
**Tres errores:** el `pin` secuestra el scroll y se percibe como roto; el objeto retrocedía al alejarse; y **tres `<h1>` intercambiándose** son cero afirmaciones (y un problema de SEO y accesibilidad).
**Solución:** sin `pin`, un solo mensaje fijo, un solo `<h1>`, salida por parallax de profundidad.

### 9 · La escena parecía un objeto pegado sobre un fondo
**Solución:** construir una habitación — pared enfoscada, suelo, zócalo, sombra proyectada real, mancha de ventanal y polvo en suspensión. El fondo dejó de ser color y pasó a ser un lugar.

### 10 · Errores de integración (todos resueltos)
- `MeshFragua` declarado dos veces en `ui.tsx`
- `Footer` importaba `LEGAL` que `datos.ts` no exportaba
- `Section` sin la prop `oscuro` que usaban Proyectos y Contacto
- `href="#galeria"` sin sección correspondiente
- `Placa.tsx` y `Planos.tsx` creados pero sin conectar
- `Header` y `Footer` duplicados dentro de `ui.tsx`
- `scrollHero` como export muerto

### Avisos ignorables permanentemente
```
[browser] THREE.Clock: This module has been deprecated
warning X4122: sum of ... double precision   (ANGLE/HLSL en Windows)
Unknown at rule @theme / @utility            (CSS de VS Code, no conoce Tailwind v4)
```
Los dos últimos se silencian con `.vscode/settings.json`:
```json
{
  "files.associations": { "*.css": "tailwindcss" },
  "css.lint.unknownAtRules": "ignore"
}
```

---

## 📐 DECISIONES DE ARQUITECTURA A RESPETAR

1. **Una superficie dominante por viewport.** 3D, mesh animado e ilustración con filtros SVG no comparten pantalla. Es presupuesto de GPU, no estética. → **No poner `MeshFragua` en el Hero.**
2. **El glassmorphism se traduce a chapa translúcida.** Misma técnica (`backdrop-blur`, transparencia, borde de 1px), pero con remaches y filete de brasa: se lee como taller, no como dashboard SaaS.
3. **`overflow-hidden` en el `<div>` interior**, nunca en el `<section>` a pantalla completa: crea contextos de composición que capturan eventos táctiles.
4. **`pointer-events-none` obligatorio** en cualquier capa de texto sobre el canvas 3D.
5. **Contenido en `datos.ts`**, nunca escrito a mano en el JSX.
6. **Nada de fotos de stock.** Los proyectos se muestran como dibujos técnicos SVG. Cuando haya fotos reales, se añade `foto` al proyecto y el componente prioriza `<Image>`.
7. **Todo procedural.** Ni un asset externo, ni un CDN.

---

## ⏳ LO QUE QUEDA POR HACER

### 🔜 PRÓXIMA SESIÓN

| # | Tarea | Detalle |
|---|---|---|
| 1 | **`Oficio.tsx` — estilo ilustrativo** | 5 herramientas en SVG (metro, tenazas, yunque, martillo, cepillo) dibujándose con `stroke-dasharray` al entrar en viewport. Ladrillo de Sabadell como acento. `datos.ts` ya tiene el campo `herramienta` previsto |
| 2 | **`Presupuesto.tsx` — neumorphism** | Configurador funcional: selectores en relieve sobre meseta plana. Tokens ya listos: `--shadow-neu`, `--shadow-neu-sm`, `--shadow-neu-inset`, `--shadow-neu-focus`, `--radius-neu` |
| 3 | **Split Text** en los titulares | Con `SplitText` de GSAP, ya incluido en 3.15 |

### Después
- [ ] **Bloom** en el 3D → requiere `pnpm add @react-three/postprocessing postprocessing`
- [ ] Textos legales reales (los enlaces ya existen apuntando a `#`)
- [ ] Fotos reales de piezas
- [ ] Mapa en Contacto
- [ ] Favicon propio

### Fase final
- [ ] **Responsive** — `grid-template-areas` + `useIsMobile` para desactivar el 3D
- [ ] Git + GitHub
- [ ] Deploy en Vercel

> **`useIsMobile` ya existe y no se usa todavía.** Es intencional: está listo para la fase responsive.

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
| @react-three/fiber | 9.6.1 |
| @react-three/drei | 10.7.7 |
| three | 0.185.1 |
| **IP local (dev)** | 192.168.1.38 (DHCP — cambiará) |
| **URL dev** | http://localhost:3000 |

### Fuentes
`Antonio` (display) · `IBM_Plex_Sans` (texto) · `IBM_Plex_Mono` (técnica), todas vía `next/font/google` y autoalojadas.

---

## 💡 NOTAS PARA RETOMAR

1. **Arrancar:** `pnpm dev` y trabajar en `localhost:3000`. Los cambios en `.tsx` y `globals.css` van por hot reload; `next.config.ts` exige reiniciar.

2. **Al pegar código, sustituir el archivo completo** cuando se indique. Los errores de esta sesión salieron todos de ediciones parciales: bloques duplicados o archivos a medio actualizar.

3. **Comprobar `PROBLEMS` en VS Code antes de mirar el navegador.** Si hay un error rojo, `next dev` puede arrancar igual pero la página no reflejará los cambios.

4. **Los diales de la escena 3D están todos en `CFG`**, arriba de `Scene.tsx`. Los más útiles: `escalaPieza`, `relieveYeso`, `luzVentanaIntensidad`, `polvoCantidad`, `inercia`.

5. **El grano está al 5% con `mix-blend-multiply`.** Sobre yeso claro se nota el triple que sobre negro: si se ve sucio, bajar a `0.03`.

6. **La mancha de luz del ventanal está a la izquierda** (`position={[-1.9, 1.15, ...]}`), detrás del titular. Si se prefiere detrás de la reja, cambiar el `-1.9` por `1.2`.

---

## 📊 RESUMEN DE LA SESIÓN

| Aspecto | Antes (CP1) | Después |
|---|---|---|
| **Paleta** | Oscura (carbón + brasa) | ✅ Clara (yeso + hierro + forja), oscuro como contraste |
| **Archivos** | 5 reales | ✅ **20**, estructura cerrada |
| **Secciones** | 0 | ✅ **6** navegables con contenido real |
| **Header / Footer** | Dentro de `ui.tsx` | ✅ Archivos propios; header con barra de progreso |
| **Contenido** | Hardcodeado | ✅ `datos.ts` centralizado |
| **Scroll** | Nativo | ✅ Lenis + ScrollTrigger |
| **Escena 3D** | Nudo toroidal de prueba | ✅ Panel de reja forjada en una habitación con luz, zócalo y polvo |
| **Motion** | Solo entrada del hero | ✅ Reveal, parallax, magnético, luz de cursor, inercia, mesh animado |
| **Estilos firma aplicados** | 0 de 6 | ✅ **4 de 6** (3D, gradientes, asimétrico, tipografía) |
| **Pendientes de estilo** | — | ⚠️ Ilustrativo (Oficio) · Neumorphism (Presupuesto) |

---

*Documento generado el 29 de julio de 2026 como Checkpoint 2 de herreria-web.*
*Proyecto en `C:\Users\corpa\Documents\GitHub\herreria-web`*
*Próxima sesión: `Oficio.tsx` con SVG animado → `Presupuesto.tsx` neumórfico → Split Text.*
