# 🔨 HERRERIA-WEB — Estado del Proyecto

> **Checkpoint 1 (v2) — Base cerrada + sistema de diseño validado**
> Fecha: 29 de julio de 2026
> Usuario: Andres (@andregt99)
> Sesión: Análisis de viabilidad de los 6 estilos · Instalación completa de la base · Validación de la cadena 3D · Sistema de diseño aplicado y verificado en pantalla
>
> **Actualiza y sustituye la v1 del mismo día.**

---

## 🎯 CONTEXTO DEL PROYECTO

### ¿Qué es herreria-web?
Una **web-prototipo para una herrería** cuyo objetivo principal **no es funcional, es visual**: demostrar la implementación de seis lenguajes de diseño modernos distintos en una sola pieza coherente.

El valor del proyecto está en el diseño, no en el backend. No hay tienda, ni carrito, ni pagos.

### Los seis estilos a implementar
1. 3D inmersivo
2. Gradientes vibrantes
3. Neumorphism
4. Asimétrico
5. Ilustrativo
6. Tipografía protagonista

### Decisiones de alcance
| Decisión | Estado |
|---|---|
| **Un estilo dominante por sección** | ✅ Acordado — no se mezclan todos en la misma pantalla |
| **Responsive** | ⏸️ Se define al FINAL (ciertos efectos van mal en móviles de gama media) |
| **Backend / Firebase / formularios reales** | ❌ Fuera de alcance |
| **Git / GitHub / Vercel** | ⏸️ Al final, cuando todo esté configurado |
| **Entorno de trabajo** | Visual Studio Code, Windows 11 |

---

## 🧩 CLASIFICACIÓN DE LOS SEIS ESTILOS (clave del proyecto)

Los seis **no son del mismo tipo**. Entender esto es lo que evita que la web parezca hecha por seis personas distintas:

| Tipo de capa | Estilos | Comportamiento |
|---|---|---|
| **Estructura** | Asimétrico | Esqueleto. Está en **TODAS** las secciones. Coste ~0 |
| **Voz** | Tipografía protagonista | Atraviesa **TODAS** las secciones. Coste ~0 |
| **Superficie / escena** | 3D, Gradientes, Ilustrativo | **Una dominante por zona.** Consumen GPU |
| **Componente aislado** | Neumorphism | Exige meseta plana propia. Es **excluyente** |

**Regla derivada:** asimétrico y tipografía no se "asignan" a una sección — son el lenguaje base de todas. Lo que se asigna por sección es la *superficie*.

> Esta regla ya está materializada en el código: el componente `Section` de `ui.tsx` lleva la retícula asimétrica y la tipografía de serie, para no repetir la maquetación seis veces.

---

## 🔀 MATRIZ DE COMPATIBILIDAD

✅ compatible · ⚠️ condicional · ❌ incompatible en el mismo viewport

| | 3D | Gradientes | Neumorph. | Asimétrico | Ilustrativo | Tipografía |
|---|---|---|---|---|---|---|
| **3D** | — | ✅ | ⚠️ | ✅ | ⚠️ | ✅✅ |
| **Gradientes** | ✅ | — | ❌ | ✅ | ✅ | ✅✅ |
| **Neumorphism** | ⚠️ | ❌ | — | ⚠️ | ⚠️ | ❌ |
| **Asimétrico** | ✅ | ✅ | ⚠️ | — | ✅✅ | ✅✅ |
| **Ilustrativo** | ⚠️ | ✅ | ⚠️ | ✅✅ | — | ✅ |
| **Tipografía** | ✅✅ | ✅✅ | ❌ | ✅✅ | ✅ | — |

### Casos no triviales — el detalle
- **Gradientes + Neumorphism ❌** — El relieve neumórfico funciona porque el relleno del elemento es *exactamente* el mismo color que su contenedor. Sobre un gradiente eso es imposible. Único workaround: **meseta anidada** (sección con gradiente, panel plano dentro).
- **Neumorphism + Tipografía ❌** — Texto en relieve a escala display es ilegible. **Regla: en zona neumórfica el display type va plano y de alto contraste ENCIMA de las superficies.** Relieve solo en etiquetas pequeñas.
- **3D + Neumorphism ⚠️** — El neumorphism no puede asentarse sobre un `<canvas>`. Panel plano **adyacente**, nunca superpuesto.
- **3D + Ilustrativo ⚠️** — Técnicamente perfecto, choque de registro. Se resuelve con **ilustración técnica** (plano acotado, líneas de referencia) en lugar de trazo a mano.
- **Neumorphism + Asimétrico ⚠️** — La asimetría está en la **colocación** del panel, no dentro de él. Panel interno ortogonal y tranquilo, situado descentrado.
- **Neumorphism + Ilustrativo ⚠️** — Se resuelve aplicando el mismo par de sombras al `<path>` del SVG: line-art extruido.

---

## 📏 LAS CUATRO REGLAS DURAS

1. **El neumorphism va solo.** Su zona no lleva gradiente de fondo, ni canvas debajo, ni display type en relieve.
2. **Una superficie dominante por viewport.** 3D, gradiente animado e ilustración con filtros SVG no comparten pantalla. No es estética: es **presupuesto de GPU**.
3. **Asimétrico y tipografía son ubicuos.** Si una sección no los tiene, no es que aplique otro estilo: está sin diseñar.
4. **El grano va siempre arriba.** El overlay de ruido es la última capa de **toda la web**, no de cada sección. Es lo que unifica seis lenguajes en una sola pieza.

---

## 🎨 FUSIONES GRATIS (usar a propósito)

| Fusión | Cómo | Estado |
|---|---|---|
| Tipografía × Gradiente | `bg-clip-text` + `text-transparent` | ✅ **Ya implementada** en `@utility text-forge` |
| Tipografía × Asimétrico | El titular *es* la celda del grid | ✅ Base en `Section` de `ui.tsx` |
| Ilustrativo × Asimétrico | El line-art rellena las celdas vacías del grid | ⏳ |
| Ilustrativo × Tipografía | Igualar el `stroke-width` del SVG al grosor del asta de la fuente | ⏳ |
| 3D × Tipografía | Display type sobre el canvas | ✅ **Ya funcionando** en el Hero |

> ⚠️ **Trampa confirmada en la práctica:** el texto sobre canvas necesita `pointer-events-none`. Sin él la capa de texto bloquea el ratón y `OrbitControls` deja de responder.

---

## 🗺️ ASIGNACIÓN POR SECCIÓN

| # | Sección | Superficie dominante | Estructura | Voz |
|---|---|---|---|---|
| 01 | Hero | **3D inmersivo** + gradiente de forja detrás | Asimétrico | Tipografía XL |
| 02 | Servicios | **Gradientes vibrantes** (mesh) | Asimétrico | Tipografía |
| 03 | El oficio / proceso | **Ilustrativo** (line-art de herramientas) | Asimétrico | Tipografía |
| 04 | Galería de proyectos | **Fotografía a sangre** (superficie neutra) | Asimétrico duro | Tipografía |
| 05 | Configurador / presupuesto | **Neumorphism oscuro** (enclave plano) | Ortogonal dentro, descentrado fuera | Tipografía plana |
| 06 | Contacto / cierre | **Gradiente** (eco del hero) | Asimétrico | Tipografía XL |

**Dos decisiones intencionadas:**
- La **galería no lleva superficie propia**: la foto del hierro ya es la textura. Meterle gradiente o ilustración sería ruido.
- El **gradiente aparece dos veces** (servicios y cierre) para cerrar el arco visual.

---

## 🛠️ STACK INSTALADO — TODAS LAS VERSIONES VERIFICADAS

### Base
| Herramienta | Versión | Notas |
|---|---|---|
| Node.js | v22.14.0 | |
| pnpm | 10.33.2 | |
| Next.js | **16.2.12** | App Router + Turbopack |
| React | **19.2.4** | |
| TypeScript | 5.x | |
| Tailwind CSS | **4.x** | Sin `tailwind.config.js` — tokens en `@theme` dentro del CSS |

### Opciones elegidas en `create-next-app`
```
TypeScript ................... Yes
ESLint ....................... Yes
Tailwind CSS ................. Yes
src/ directory ............... Yes
App Router ................... Yes
Turbopack .................... Yes
Customize import alias ....... No
React Compiler ............... No   ← a propósito
```

> **React Compiler en No** porque R3F y GSAP mutan objetos y refs por diseño; el compilador puede generar errores raros difíciles de distinguir de errores propios.

### Animación — ✅ verificado con `pnpm list`
| Paquete | Versión instalada | Para qué |
|---|---|---|
| `gsap` | **3.15.0** | ScrollTrigger (asimétrico), SplitText (tipografía), DrawSVG (ilustrativo) |
| `@gsap/react` | **2.1.2** | Hook `useGSAP` — cleanup correcto en React 19 |
| `lenis` | **1.3.25** | Scroll suave; se integra nativamente con ScrollTrigger |

> 🔑 **Desde GSAP 3.13 todos los plugins antes de pago vienen incluidos en el paquete público de npm.** Con la 3.15 hay SplitText y DrawSVG sin registro ni licencia. **Por eso una sola dependencia cubre tres de los seis estilos.**

### 3D — ✅ verificado con `pnpm list`
| Paquete | Versión instalada | Por qué importa |
|---|---|---|
| `@react-three/fiber` | **9.6.1** | v9 empareja con React 19. **v8 es para React 18 y NO arranca** |
| `@react-three/drei` | **10.7.7** | v10 empareja con fiber v9 |
| `three` | **0.185.1** | |
| `@types/three` | devDep | |

> ⚠️ **R3F v10 y drei 11 existen pero SOLO en alpha.** No usar `@alpha` ni `@next`.
> ⚠️ La mayoría de tutoriales en internet son de **R3F v8**. Su API de instalación difiere.

### Extensión de VS Code
| Extensión | Estado |
|---|---|
| **Tailwind CSS IntelliSense** | ✅ Instalada y leyendo los tokens de `@theme` |

---

## 🚫 LO QUE NO SE INSTALÓ (y por qué)

| Paquete | Motivo del descarte |
|---|---|
| `framer-motion` / `motion` | Redundante con GSAP. Dos librerías de animación = bugs de timing |
| `zustand` | No hay estado global en un prototipo visual |
| `shadcn/ui` | Trae opiniones visuales propias (radios, sombras, variables de color) que pelearían con el neumorphism y los gradientes. **Aquí el diseño es el producto** |
| `@react-three/postprocessing` | Tentador para el *bloom* del metal incandescente, pero pesa. Se valora al final |
| Firebase / Firestore / Cloudinary / Make | Fuera de alcance |

---

## ✅ LOS 11 PASOS DE INSTALACIÓN — COMPLETOS

| # | Paso | Estado |
|---|---|---|
| 1 | Verificar Node y pnpm | ✅ |
| 2 | Situarse en la carpeta padre | ✅ |
| 3 | `pnpm create next-app@latest herreria-web` | ✅ |
| 4 | Comprobar que arranca | ✅ |
| 5 | Verificar que es Tailwind v4 | ✅ |
| 6 | Instalar GSAP + Lenis | ✅ |
| 7 | Instalar three + R3F + drei | ✅ |
| 8 | Verificar versiones instaladas | ✅ |
| 9 | **Prueba de humo del 3D** | ✅ |
| 10 | Limpieza de `public/` y archivos por defecto | ✅ |
| 11 | Extensión Tailwind CSS IntelliSense | ✅ |
| **E1** | `next.config.ts` con `allowedDevOrigins` | ✅ |
| **E2** | **Sistema de diseño en `@theme`** | ✅ |

**Nada pendiente. La infraestructura está lista.**

---

## 🧪 VALIDACIÓN 1 — CADENA 3D DE EXTREMO A EXTREMO ✅

Se hizo una **prueba de humo** antes de escribir una sola línea de diseño, para descartar incompatibilidades de versiones antes de tener secciones montadas encima.

| Pieza validada | Estado |
|---|---|
| React 19.2.4 → R3F 9.6.1 → drei 10.7.7 → three 0.185.1 | ✅ Cadena completa |
| Reconciliador de React 19.2 | ✅ Sin conflicto |
| WebGL, compilación de shaders, `meshStandardMaterial` | ✅ Compilando y pintando |
| Bucle de render (`useFrame`) | ✅ Animando |
| Abstracciones de drei (`OrbitControls`) | ✅ Orbita con el ratón |
| `dynamic()` + `ssr: false` | ✅ |
| Luces: `ambientLight`, `directionalLight`, `pointLight` | ✅ Rim lighting naranja visible |

**Resultado visual:** nudo toroidal naranja girando sobre fondo oscuro, con reflejo especular y luz de borde de brasa.

---

## 🧪 VALIDACIÓN 2 — SISTEMA DE DISEÑO EN PANTALLA ✅

`globals.css` aplicado y comprobado con un test real (superponer un titular `text-forge` sobre el canvas).

> ⚠️ **Nota de método:** el primer test que se planteó era inútil — "si el fondo sigue oscuro, funciona". El `<Canvas>` lleva `<color attach="background">` y tapa por completo el `bg-carbon-950`: se vería idéntico funcionaran los tokens o no. Se cambió por el test del titular, que sí demuestra algo.

| Evidencia en pantalla | Qué confirma |
|---|---|
| **"HIERRO"** con degradado ámbar → naranja → cereza | ✅ `@utility` + `background-clip: text` + gradiente en **OKLCH** |
| **"FORJA ARTESANAL · HIERRO A MEDIDA"** naranja, muy espaciado | ✅ `--color-ember-500` + `--text-eyebrow--letter-spacing` |
| **Párrafo en gris claro** | ✅ `--color-steel-300` |
| **Tamaño descomunal del titular** | ✅ `--text-mega` con `clamp()` respondiendo al viewport |
| **El nudo 3D sigue girando detrás** | ✅ Las capas no se pisan |
| **Autocompletado de `bg-ember-`, `text-mega`, `shadow-neu`** | ✅ IntelliSense lee el `@theme` |

**Cuatro de los seis estilos quedan implementados a nivel de sistema:** tipografía protagonista, gradientes vibrantes, neumorphism (tokens listos) y la base del asimétrico.

---

## 🐛 PROBLEMAS RESUELTOS

Documentados para no repetir el camino:

### Problema 1 — Pantalla blanca con icono de imagen rota
**Diagnóstico:** el código no contenía ningún `<img>` ni fondo blanco → era **imposible** que lo produjera. El navegador servía la página de bienvenida de Next desde **caché**, con la imagen rota porque `next.svg` ya se había borrado.
**Solución:** entrar por `http://127.0.0.1:3000` en lugar de `localhost:3000`. Para Chrome son orígenes distintos con cachés separadas — carga limpia garantizada sin tocar nada.

### Problema 2 — El canvas 3D no pintaba (`Environment` colgado)
**Causa:** `<Environment preset="warehouse" />` de drei **descarga un HDRI desde un CDN externo**. Mientras la descarga no termina, el contenido del `<Canvas>` queda suspendido y no se pinta nada. Si el CDN falla o va lento, se cuelga indefinidamente.
**Solución:** eliminar `Environment` y usar luces locales. **Cero peticiones de red.**
**Lección:** en producción el HDRI va como **archivo local en `public/`**, nunca desde CDN ajeno.

### Problema 3 — Avisos `Blocked cross-origin request to /_next/webpack-hmr`
**Causa:** pestañas abiertas en `127.0.0.1:3000` y `192.168.1.38:3000` intentando reconectar el websocket de HMR. Next solo permite `localhost` por defecto.
**Solución:** `allowedDevOrigins` en `next.config.ts`. **Requiere reiniciar el servidor.**
**Trampa:** el propio aviso del terminal sugiere sintaxis de `next.config.js` (`module.exports`). Con `.ts` hay que usar `const nextConfig: NextConfig` + `export default`.

### Problema 4 — El metal se veía negro / plástico
**Causa:** `metalness: 1` **sin environment map** produce negro. Un metal no tiene color propio: refleja el entorno.
**Solución temporal:** `metalness: 0.6` + luces, para que la prueba fuese visible.
**Para el hero definitivo:** `metalness: 1` + HDRI local. **El environment map es el 90% del resultado en materiales metálicos.**

### Problema 5 — La fuente display no cae al fallback esperado
**Síntoma:** "HIERRO" se muestra en una sans normal en lugar de la condensada `"Arial Narrow"` declarada como reserva.
**Causa técnica:** cuando un `var()` apunta a una variable **inexistente y sin valor de reserva**, CSS **invalida toda la declaración**, no solo ese elemento de la lista. Así que `font-family` entero se descarta y hereda de `body`. La reserva nunca se aplica.
```css
--font-display: var(--font-forge-display), "Arial Narrow", system-ui, sans-serif;
                /*  ↑ no existe todavía → invalida la línea completa  */
```
**Estado:** no es un error a corregir. En cuanto `next/font` defina `--font-forge-display` en `layout.tsx`, la declaración pasa a ser válida.

### Aviso ignorable permanentemente
```
[browser] THREE.Clock: This module has been deprecated. Please use THREE.Timer instead.
```
`three` 0.185 marcó `Clock` como obsoleto, pero R3F lo sigue usando internamente en su bucle de render. **No es código propio y no se puede silenciar.**

### Aviso ignorable en Windows
```
warning X4122: sum of ... cannot be represented accurately in double precision
```
Viene del compilador HLSL de ANGLE, la capa que Chrome usa en Windows para traducir WebGL a Direct3D. Aparece en casi cualquier proyecto R3F sobre Windows. Inofensivo y no silenciable.

---

## 📂 ESTADO REAL DE LOS ARCHIVOS

```
herreria-web/
├── next.config.ts           ✅ allowedDevOrigins configurado y verificado
├── package.json             ✅ todas las dependencias
├── public/                  ✅ VACÍA (limpiada)
│
└── src/
    ├── app/
    │   ├── favicon.ico      ← correcto aquí (Next 16), NO en public/
    │   ├── globals.css      ✅ SISTEMA DE DISEÑO APLICADO Y VALIDADO
    │   ├── layout.tsx       ⚠️ POR DEFECTO — fuentes Geist, metadata "Create Next App"
    │   └── page.tsx         🧪 TEMPORAL — prueba de tokens sobre el canvas
    │
    └── lib/
        └── Scene.tsx        🧪 TEMPORAL — nudo toroidal de validación
```

### 🧹 Limpieza ya hecha
- [x] `public/next.svg`, `vercel.svg`, `file.svg`, `window.svg`, `globe.svg` borrados
- [x] `public/` completamente vacía

### 🧹 Limpieza pendiente
- [ ] **Borrar `src.zip`** de la raíz del proyecto si aún está

---

## 🏗️ ESTRUCTURA A CREAR — SIGUIENTE ACCIÓN

Criterio: **una sección = un estilo = un archivo.** Sin carpeta `components/` con veinte piezas sueltas, sin `types/`, sin archivos barril `index.ts`. **11 archivos en total.**

```
herreria-web/
├── public/
│   ├── noise.png            ← OPCIONAL (el grano se genera con feTurbulence)
│   └── forge.hdr            ← HDRI LOCAL para el hero (no CDN)
│
├── src/
│   ├── app/
│   │   ├── globals.css      ✅1  ← HECHO
│   │   ├── layout.tsx       ⏳2  ← fuentes + metadata (fase de diseño)
│   │   └── page.tsx         🌱3  ← compone las 6 secciones
│   │
│   ├── sections/            ← CREAR CARPETA
│   │   ├── Hero.tsx         🌱4  ← 3D + tipografía XL
│   │   ├── Servicios.tsx    🌱5  ← gradientes vibrantes
│   │   ├── Oficio.tsx       🌱6  ← ilustrativo (SVG)
│   │   ├── Galeria.tsx      🌱7  ← asimétrico duro
│   │   ├── Presupuesto.tsx  🌱8  ← neumorphism (enclave)
│   │   └── Contacto.tsx     🌱9  ← gradiente (eco del hero)
│   │
│   └── lib/
│       ├── Scene.tsx        🧪10 ← la escena 3D (ahora es el nudo de prueba)
│       └── ui.tsx           🌱11 ← Grano + Section + useIsMobile
│
└── next.config.ts           ✅
```

### Tres ajustes sobre la estructura original

**1. `noise.png` pasa a OPCIONAL.** El grano se genera con `feTurbulence` en SVG embebido como data-URI, sin ningún archivo. Un PNG *tileable* rinde algo mejor, pero no bloquea nada. Resuelto en `ui.tsx`.

**2. El `dynamic import` del 3D se muda de `page.tsx` a `Hero.tsx`.** Consecuencia importante: **`page.tsx` vuelve a ser Server Component**, que es la arquitectura correcta.

**3. `ui.tsx` gana un componente `Section`.** La regla "asimétrico y tipografía son ubicuos" necesita un sitio donde vivir. Un wrapper con la retícula base evita repetir la misma maquetación seis veces.

### Criterio de creación: stubs válidos, no archivos vacíos

**Un `.tsx` vacío que se importa rompe la compilación.** Por eso los nueve archivos se crean con un stub funcional de ~6 líneas: estructura completa, nada roto, y el esqueleto de la web entera visible en el navegador desde el primer momento.

**Código completo de los stubs → ANEXO B.**

**Resultado esperado tras crearlos:** poder hacer scroll por **seis pantallas** — el hero con el nudo 3D y "HIERRO", y cinco secciones numeradas 02–06 con título y una línea de acero separándolas. Y el grano cubriendo toda la web.

---

## ⏳ LO QUE QUEDA POR HACER

### 🔜 PRÓXIMA SESIÓN — orden exacto

| # | Tarea |
|---|---|
| 1 | Crear la carpeta `src/sections/` |
| 2 | Crear los 6 archivos de sección + `ui.tsx` + reescribir `page.tsx` (ANEXO B) |
| 3 | Verificar las 6 pantallas con scroll y el grano global |
| 4 | **DIRECCIÓN DE ARTE** — decidir las dos fuentes |
| 5 | `layout.tsx`: `next/font`, `metadata` real de la herrería |
| 6 | Calibrar la paleta de brasa sobre una sección real |

### 🎨 Decisión pendiente — tipografía

Es una decisión de **dirección de arte, no técnica**. La tipografía es uno de los seis estilos y además la **voz** que atraviesa todas las secciones.

Dos preguntas abiertas sin responder:
1. **¿Qué personalidad debe proyectar la herrería?** → artesanal y tradicional · industrial contemporánea · premium a medida · brutalista y rotunda
2. **El titular gigante ("HIERRO"), ¿cómo se imagina?** → condensada y alta · ancha y geométrica · serif con contraste

Candidata anotada para display si se elige *condensada industrial*: **Big Shoulders Display** (variable, condensada, carácter de rotulación industrial). Alternativas: Archivo (tiene eje Expanded), Anton, Oswald. Para texto de apoyo: Space Grotesk.

### Después, una sección por sesión
- [ ] `Hero.tsx` definitivo — tipografía + gradiente, **sin 3D todavía**
- [ ] `Servicios.tsx` — gradientes vibrantes (mesh con `radial-gradient` + `blur` + `mix-blend-mode`)
- [ ] `Oficio.tsx` — ilustrativo (SVG inline, `stroke-dasharray`)
- [ ] `Galeria.tsx` — asimétrico duro
- [ ] `Contacto.tsx` — gradiente eco
- [ ] `Presupuesto.tsx` — neumorphism aislado
- [ ] **`Scene.tsx` definitivo + HDRI local + conectar al Hero** ← EL ÚLTIMO

### Fase final
- [ ] Responsive (`grid-template-areas` + flag `useIsMobile` para el 3D)
- [ ] Git + GitHub
- [ ] Deploy en Vercel

> **Por qué el 3D al final:** es lo único que puede atascarse de verdad. Si llega la fecha de entrega y la escena no está, hay un prototipo completo con cinco de los seis estilos funcionando. Al revés, un hero 3D a medias bloquea todo.

---

## 🔑 DATOS CLAVE

| Concepto | Valor |
|---|---|
| **Proyecto** | herreria-web |
| **Ruta local** | `C:\Users\corpa\Documents\GitHub\herreria-web\` |
| **Sistema operativo** | Windows 11 |
| **Editor** | Visual Studio Code |
| **Node.js** | v22.14.0 |
| **pnpm** | 10.33.2 |
| **Next.js** | 16.2.12 (Turbopack) |
| **React** | 19.2.4 |
| **Tailwind CSS** | 4.x |
| **gsap** | 3.15.0 |
| **@gsap/react** | 2.1.2 |
| **lenis** | 1.3.25 |
| **@react-three/fiber** | 9.6.1 |
| **@react-three/drei** | 10.7.7 |
| **three** | 0.185.1 |
| **IP local (dev)** | 192.168.1.38 (DHCP — **cambiará**) |
| **URL dev** | http://localhost:3000 |
| **Git / GitHub** | ⏸️ Pendiente (fase final) |

---

## 💡 NOTAS IMPORTANTES PARA LA PRÓXIMA SESIÓN

1. **Trabajar siempre en `localhost:3000`.** `127.0.0.1` fue solo un truco de diagnóstico para saltarse la caché; ya cumplió su función.

2. **La IP local va a cambiar.** Es DHCP del router. Cuando cambie, el aviso de cross-origin volverá con la IP nueva y solo hay que actualizar esa línea de `next.config.ts` + reiniciar. No es un error, es mantenimiento.

3. **`next.config.ts` solo se lee al arrancar.** Cualquier cambio ahí exige `Ctrl + C` y `pnpm dev`. `globals.css` y los `.tsx` van por hot reload.

4. **`Scene.tsx` tiene finales de línea CRLF**, los demás LF. No afecta ahora, pero al conectar Git saldrán avisos de `LF will be replaced by CRLF`. Se silencia con `"files.eol": "\n"` en los ajustes de VS Code.

5. **Trampa a vigilar:** `overflow-hidden` en secciones a pantalla completa crea contextos de composición que capturan eventos táctiles y aíslan z-index. Con retícula asimétrica (solapamientos + z-index) y canvas 3D esto va a aparecer. **Mantener el `overflow-hidden` en el `<div>` interior que lo necesita, nunca en el `<section>`.**

6. **`pointer-events-none` es obligatorio** en cualquier capa de texto que se superponga al canvas 3D. Sin él, `OrbitControls` deja de responder al ratón.

7. **El grano al 18% con `mix-blend-overlay` es un punto de partida.** Cuando lleguen los gradientes probablemente haya que bajarlo: sobre color saturado se nota mucho más que sobre negro.

8. **Las secciones con animación GSAP llevan `'use client'`** en la primera línea. En un prototipo no tiene coste real y evita una clase entera de errores de "hooks en Server Component".

---

## 📊 RESUMEN DE LA SESIÓN

| Aspecto | Antes | Después |
|---|---|---|
| **Proyecto** | No existía | ✅ Creado y arrancando |
| **Viabilidad de los 6 estilos** | Sin analizar | ✅ 5 de 6 sin dependencias; solo el 3D abre stack |
| **Compatibilidad entre estilos** | Sin definir | ✅ Matriz + 4 reglas duras + asignación por sección |
| **Versiones R3F / React 19** | Riesgo desconocido | ✅ Validadas de extremo a extremo |
| **Cadena 3D** | Sin probar | ✅ WebGL, shaders, `useFrame`, drei — funcionando |
| **GSAP / Lenis** | Sin verificar | ✅ 3.15.0 / 2.1.2 / 1.3.25 — plugins premium incluidos |
| **`next.config.ts`** | Por defecto | ✅ `allowedDevOrigins` configurado y verificado |
| **Sistema de diseño** | Sin definir | ✅ **Aplicado y validado en pantalla** |
| **`public/`** | SVGs de ejemplo | ✅ Vacía |
| **Tailwind IntelliSense** | Sin confirmar | ✅ Instalada y leyendo `@theme` |
| **Estructura de carpetas** | Sin definir | ⏳ Definida, pendiente de crear (ANEXO B) |
| **`layout.tsx`** | Por defecto | ⏳ Pendiente (a falta de decidir fuentes) |

---
---

# 📎 ANEXO A — `globals.css` (APLICADO — referencia de lo que está vivo)

> Estado: ✅ **YA APLICADO Y VALIDADO.** Este anexo es el registro de lo que contiene el archivo.
> Cambio respecto a la v1 del checkpoint: se añadió `-webkit-background-clip: text` por compatibilidad, y `scroll-behavior` se unificó en un solo bloque `html`.

```css
@import "tailwindcss";

@theme {
  /* ══════════════════════════════════════════════════
     SUPERFICIES — carbón y acero
     ══════════════════════════════════════════════════ */
  --color-carbon-950: oklch(0.13 0.006 265);
  --color-carbon-900: oklch(0.17 0.007 265);
  --color-carbon-800: oklch(0.22 0.009 265);
  --color-steel-700:  oklch(0.32 0.011 265);
  --color-steel-500:  oklch(0.52 0.013 265);
  --color-steel-300:  oklch(0.72 0.011 265);
  --color-ash-100:    oklch(0.94 0.004 265);

  /* ══════════════════════════════════════════════════
     BRASA — el acento incandescente
     ══════════════════════════════════════════════════ */
  --color-ember-300: oklch(0.88 0.15 82);   /* chispa */
  --color-ember-500: oklch(0.73 0.19 58);   /* naranja de forja */
  --color-ember-600: oklch(0.65 0.21 45);
  --color-ember-700: oklch(0.55 0.20 30);   /* rojo cereza */
  --color-ember-900: oklch(0.38 0.15 25);   /* metal enfriando */

  /* ══════════════════════════════════════════════════
     TIPOGRAFÍA — escala fluida
     ══════════════════════════════════════════════════ */
  --font-display: var(--font-forge-display), "Arial Narrow", system-ui, sans-serif;
  --font-sans:    var(--font-forge-sans), system-ui, sans-serif;

  --text-eyebrow: clamp(0.7rem, 0.68rem + 0.12vw, 0.8rem);
  --text-eyebrow--letter-spacing: 0.22em;

  --text-body: clamp(1rem, 0.96rem + 0.25vw, 1.15rem);
  --text-body--line-height: 1.65;

  --text-lead: clamp(1.15rem, 1rem + 0.7vw, 1.6rem);
  --text-lead--line-height: 1.45;

  --text-h3: clamp(1.6rem, 1.2rem + 1.8vw, 2.6rem);
  --text-h3--line-height: 1.1;
  --text-h3--letter-spacing: -0.02em;

  --text-h2: clamp(2.2rem, 1.4rem + 3.6vw, 4.6rem);
  --text-h2--line-height: 0.98;
  --text-h2--letter-spacing: -0.03em;

  --text-h1: clamp(3rem, 1.2rem + 8vw, 9rem);
  --text-h1--line-height: 0.88;
  --text-h1--letter-spacing: -0.04em;

  --text-mega: clamp(4rem, 0.5rem + 14vw, 16rem);
  --text-mega--line-height: 0.82;
  --text-mega--letter-spacing: -0.055em;

  /* ══════════════════════════════════════════════════
     NEUMORPHISM — relieve en chapa oscura
     ══════════════════════════════════════════════════ */
  --shadow-neu:
    9px 9px 22px oklch(0.07 0 0 / 0.80),
    -7px -7px 20px oklch(0.34 0.008 265 / 0.26);

  --shadow-neu-sm:
    4px 4px 11px oklch(0.07 0 0 / 0.70),
    -3px -3px 9px oklch(0.34 0.008 265 / 0.22);

  --shadow-neu-inset:
    inset 7px 7px 15px oklch(0.07 0 0 / 0.82),
    inset -5px -5px 13px oklch(0.34 0.008 265 / 0.24);

  --shadow-neu-focus:
    0 0 0 2px var(--color-ember-500),
    var(--shadow-neu-inset);
}

@layer base {
  html {
    background-color: var(--color-carbon-950);
    color: var(--color-ash-100);
    -webkit-font-smoothing: antialiased;
    scroll-behavior: auto;
  }

  body {
    font-family: var(--font-sans);
    font-size: var(--text-body);
  }

  ::selection {
    background-color: var(--color-ember-500);
    color: var(--color-carbon-950);
  }

  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }
}

/* ══════════════════════════════════════════════════
   Fusión gratis: tipografía × gradiente
   Uso: <h1 className="text-mega text-forge">
   ══════════════════════════════════════════════════ */
@utility text-forge {
  background-image: linear-gradient(
    100deg in oklch,
    var(--color-ember-300) 0%,
    var(--color-ember-500) 45%,
    var(--color-ember-700) 100%
  );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
```

### Decisiones del anexo A que conviene recordar
- **El `in oklch` del gradiente** es la clave de "vibrante". Sin él, ámbar→cereza pasa por un punto grisáceo a mitad de camino.
- **`--shadow-neu-focus` existe por accesibilidad**, no por estética. El relieve neumórfico es de bajo contraste por definición y no puede servir como indicador de foco de teclado.
- **Los `--font-*` apuntan a variables que aún no existen** → ver Problema 5.

---
---

# 📎 ANEXO B — STUBS DE LA ESTRUCTURA (pendiente de crear)

> Estado: ⏳ **PENDIENTE.** Este es el paso 1 y 2 de la próxima sesión.
> Primero crear la carpeta `src/sections/`, luego los archivos en este orden.

## B.1 — `src/lib/ui.tsx` (crear primero: los demás lo importan)

```tsx
'use client'

import { useEffect, useState } from 'react'

/* ── Grano global: última capa de toda la web ── */
export function Grano() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-50 opacity-[0.18] mix-blend-overlay"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)'/%3E%3C/svg%3E\")",
      }}
    />
  )
}

/* ── Wrapper de sección: retícula asimétrica base ── */
export function Section({
  id,
  numero,
  titulo,
  children,
}: {
  id: string
  numero: string
  titulo: string
  children?: React.ReactNode
}) {
  return (
    <section
      id={id}
      className="grid min-h-screen grid-cols-[0.7fr_2.4fr_1fr] gap-6 border-t border-steel-700 p-10"
    >
      <p className="text-eyebrow uppercase text-ember-500">{numero}</p>
      <div>
        <h2 className="font-display text-h2 text-ash-100">{titulo}</h2>
        <p className="text-lead mt-4 text-steel-500">{children}</p>
      </div>
    </section>
  )
}

/* ── Flag para desactivar el 3D en móvil ── */
export function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint - 1}px)`)
    setIsMobile(mq.matches)
    const on = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [breakpoint])
  return isMobile
}
```

## B.2 — `src/sections/Hero.tsx`

```tsx
'use client'

import dynamic from 'next/dynamic'

const Scene = dynamic(() => import('@/lib/Scene'), { ssr: false })

export default function Hero() {
  return (
    <section id="hero" className="relative h-screen bg-carbon-950">
      <div className="absolute inset-0">
        <Scene />
      </div>

      <div className="pointer-events-none relative z-10 flex h-full flex-col justify-end p-10">
        <p className="text-eyebrow uppercase text-ember-500">
          Forja artesanal · Hierro a medida
        </p>
        <h1 className="font-display text-mega text-forge">HIERRO</h1>
      </div>
    </section>
  )
}
```

## B.3 — `src/sections/Servicios.tsx`

```tsx
import { Section } from '@/lib/ui'

export default function Servicios() {
  return (
    <Section id="servicios" numero="02" titulo="Servicios">
      Gradientes vibrantes
    </Section>
  )
}
```

## B.4 — Las cuatro secciones restantes

Mismo patrón que B.3. Cambia solo el nombre del componente, el `id`, el `numero` y el texto:

| Archivo | Componente | `id` | `numero` | `titulo` | Texto |
|---|---|---|---|---|---|
| `Oficio.tsx` | `Oficio` | `oficio` | `03` | `El oficio` | `Ilustrativo` |
| `Galeria.tsx` | `Galeria` | `galeria` | `04` | `Proyectos` | `Asimétrico duro` |
| `Presupuesto.tsx` | `Presupuesto` | `presupuesto` | `05` | `Presupuesto` | `Neumorphism` |
| `Contacto.tsx` | `Contacto` | `contacto` | `06` | `Contacto` | `Gradiente (eco)` |

## B.5 — `src/app/page.tsx` (reemplazar completo)

```tsx
import Hero from '@/sections/Hero'
import Servicios from '@/sections/Servicios'
import Oficio from '@/sections/Oficio'
import Galeria from '@/sections/Galeria'
import Presupuesto from '@/sections/Presupuesto'
import Contacto from '@/sections/Contacto'
import { Grano } from '@/lib/ui'

export default function Home() {
  return (
    <>
      <Grano />
      <Hero />
      <Servicios />
      <Oficio />
      <Galeria />
      <Presupuesto />
      <Contacto />
    </>
  )
}
```

> **Ya no lleva `'use client'`**: vuelve a ser Server Component porque el `dynamic` se movió a `Hero.tsx`.

## B.6 — Verificación

Guardar y refrescar `localhost:3000`. Debe poderse **hacer scroll por seis pantallas**:
- Hero con el nudo 3D girando y "HIERRO" en degradado de brasa
- Cinco secciones numeradas 02–06, cada una con su título y una línea de acero superior
- Grano visible sobre toda la web

Si se ven las seis, la estructura está montada y el sistema de tokens funciona en todas.

---

*Documento generado el 29 de julio de 2026 como Checkpoint 1 (v2) de herreria-web.*
*Proyecto en `C:\Users\corpa\Documents\GitHub\herreria-web`*
*Próxima sesión: crear la estructura (ANEXO B) → dirección de arte (fuentes + paleta) → `layout.tsx` → diseño del Hero.*
