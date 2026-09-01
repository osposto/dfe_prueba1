# TP1: Desarrollo de Sistemas Web Front End (2026)
### Equipo DevCore — Sitio Web Estático Grupal

Proyecto desarrollado para la materia **Desarrollo de Sistemas Web Front End (Tecnicatura Superior 2026)**. Consiste en una plataforma estática colaborativa, responsiva, accesible (a11y) y optimizada para SEO construida exclusivamente con tecnologías nativas del navegador.

---

## 👥 1. Integrantes del Equipo

| # | Integrante | Rol en el Proyecto | Ciudad | GitHub |
|---|------------|--------------------|--------|--------|
| 1 | **Guillermo Escobar** | Frontend & UI Specialist | CABA | [@gescobar-ui](https://github.com) |
| 2 | **José Luis Galvis** | JavaScript Developer & Logic Architect | Córdoba | [@jlgalvis-dev](https://github.com) |
| 3 | **Orlando Sposto** | Layout & SEO Architect | Rosario | [@osposto](https://github.com/osposto) |
| 4 | **Adriana Van Den Dooren** | Accessibility & QA Engineer | Mendoza | [@avandendooren-qa](https://github.com) |

---

## 🚀 2. Enlace de Despliegue en Producción

El proyecto se encuentra publicado y listo para su despliegue continuo en **Vercel**:
* **URL de Producción en Vercel:** `https://tp1-front-end-devcore.vercel.app` *(o el dominio asignado por el equipo)*
* **Estado:** Totalmente funcional y sin dependencias de backend o pasos de build pesados.

---

## 🛠️ 3. Tecnologías y Estándares Utilizados

- **HTML5 Semántico:** Uso riguroso de `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`, con un único `<h1>` por documento y atributos ARIA complementarios.
- **CSS3 Moderno (Vanilla):** CSS Grid, Flexbox, Custom Properties (`:root`), Media Queries Mobile-First, sin frameworks externos (sin Bootstrap ni Tailwind).
- **JavaScript (ES6+ Vanilla):** DOM Scripting modular, funciones flecha, event delegation, manipulación de estados y normalización de cadenas.
- **Gráficos e Iconografía:** Formatos SVG vectoriales y ligeros para avatares e íconos.
- **Tipografías:** Google Fonts (*Inter* y *JetBrains Mono*).

---

## 📂 4. Árbol de Archivos y Carpetas

```text
TP1/
├── index.html               # Portada principal y catálogo de integrantes
├── perfil-1.html            # Perfil individual: Guillermo Escobar
├── perfil-2.html            # Perfil individual: José Luis Galvis
├── perfil-3.html            # Perfil individual: Orlando Sposto
├── perfil-4.html            # Perfil individual: Adriana Van Den Dooren
├── bitacora.html            # Bitácora cronológica de desarrollo y acuerdos
├── MASTER_OUTLINE.md        # Esquema maestro de requerimientos
├── README.md                # Documentación técnica completa
├── css/
│   └── styles.css           # Hoja de estilos unificada y sistema de diseño
├── js/
│   ├── main.js              # Lógica de búsqueda y filtrado en tiempo real (portada)
│   └── perfiles.js          # Lógica interactiva única para cada uno de los 4 perfiles
└── img/
    ├── avatares/
    │   ├── avatar-1.svg     # Avatar ilustrado de Guillermo Escobar
    │   ├── avatar-2.svg     # Avatar ilustrado de Adriana Van Den Dooren
    │   ├── avatar-3.svg     # Avatar ilustrado de Orlando Sposto
    │   └── avatar-4.svg     # Avatar ilustrado de José Luis Galvis
    └── icons/
        ├── arrow-left.svg
        ├── arrow-right.svg
        ├── book.svg
        ├── disc.svg
        ├── github.svg
        ├── home.svg
        ├── movie.svg
        ├── search.svg
        ├── sparkles.svg
        └── terminal.svg
```

---

## 🎨 5. Guía de Estilos y Sistema de Diseño

### Paleta de Colores (Dark Theme)

```css
:root {
  /* Fondo Principal & Tarjetas */
  --bg-main: #0F172A;        /* Slate 900 */
  --bg-card: #1E293B;        /* Slate 800 */
  --bg-card-hover: #273549;  /* Slate 750 */
  --border-color: #334155;   /* Slate 700 */

  /* Acentos Temáticos */
  --accent-sky: #38BDF8;     /* Sky Blue 400 (General / Perfil 1) */
  --accent-emerald: #34D399; /* Emerald 400 (Perfil 2) */
  --accent-purple: #A78BFA;  /* Purple 400 (Perfil 3) */
  --accent-orange: #FB923C;  /* Orange 400 (Perfil 4) */

  /* Tipografías */
  --text-main: #F8FAFC;      /* Slate 50 */
  --text-muted: #94A3B8;     /* Slate 400 */
  --font-sans: 'Inter', sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}
```

### Breakpoints Validados (Mobile-First)
- **Móvil compacto:** `min-width: 400px` (layout en 1 columna, botones táctiles fluidos).
- **Tablet / Pantallas medianas:** `min-width: 900px` (grid de 2 columnas para integrantes, 3 columnas para secciones de perfil).
- **Escritorio / Pantallas grandes:** `min-width: 1200px` (grid completo de 4 columnas en portada con espaciado equilibrado).

---

## ⚡ 6. Documentación de Funcionalidades JavaScript

### 1. Portada (`js/main.js`): Buscador & Filtro en Tiempo Real
Permite escribir en el campo de búsqueda o seleccionar botones rápidos de habilidades (ej. `HTML5`, `JavaScript`, `Accesibilidad`, `CSS3`).
- **Normalización:** Soporta búsquedas sin distinción de mayúsculas ni tildes.
- **Feedback Accesible:** El elemento `#filterStatus` cuenta con `aria-live="polite"` para comunicar en tiempo real a lectores de pantalla el número de coincidencias obtenidas.

### 2. Perfil 1 (`js/perfiles.js`): Inspector Interactivo de Discografía
Permite hacer clic sobre los tres discos favoritos para desplegar dinámicamente:
- Datos de producción, discográfica, duración total y reseña.
- Tracklist completo e interactivo con minutaje de cada pista.

### 3. Perfil 2 (`js/perfiles.js`): Inspector de Competencias y Dominio
Presenta tarjetas con barras de porcentaje visuales:
- Al hacer clic o interactuar con el teclado (`Enter`/`Espacio`), se expande el panel detallando herramientas asociadas y casos de uso prácticos.

### 4. Perfil 3 (`js/perfiles.js`): Ficha Técnica Cinematográfica (Modal Accesible)
Al presionar sobre una tarjeta de película:
- Abre una ventana modal con fondo desenfocado (`backdrop-filter`).
- Muestra ficha técnica (año, director, duración, sinopsis completa y cita icónica).
- Soporta cierre mediante clic externo, botón de cierre o pulsación de la tecla `Escape`.

### 5. Perfil 4 (`js/perfiles.js`): Mini Terminal CLI Interactiva
Simulación de consola de desarrollador Unix en tiempo real:
- Comandos soportados: `help`, `skills`, `bio`, `contact`, `movies`, `music`, `whoami`, `clear`.
- Manejo de prevención de submit por defecto (`event.preventDefault()`) y auto-scroll vertical.

### 6. Sistema Global de Micro-Interacciones (3D Tilt & Cursor Spotlight)
- **3D Tilt Reactivo:** Las tarjetas se inclinan dinámicamente según la posición del cursor mediante transformaciones CSS de perspectiva (`rotateX`, `rotateY`, `scale3d`).
- **Spotlight Iluminado:** Efecto de haz de luz radial (`radial-gradient`) que sigue la posición del mouse sobre los bordes y tarjetas.
- **Resplandor Hero:** Fondo interactivo dinámico en la portada amortiguado mediante `requestAnimationFrame`.
- **Accesibilidad y Rendimiento:** Desactivado de forma segura en dispositivos táctiles (`pointer: coarse`) y ante la preferencia del sistema `prefers-reduced-motion: reduce`.

---

## 🤖 7. Declaración de Uso de Inteligencia Artificial y Criterio de Autoría

En cumplimiento con los lineamientos académicos de honestidad intelectual y transparencia técnica:

* **Herramientas y Modelos Utilizados:** Asistente de desarrollo basado en **Gemini 3.7 Flash / Antigravity**.
* **Tipo de Asistencia:**
  1. *Scaffolding arquitectónico:* Generación de la estructura base semántica y esqueleto de archivos.
  2. *Optimización CSS:* Validación de contrastes cromáticos y reglas de CSS Grid fluidas con `minmax`.
  3. *Optimización y Accesibilidad:* Configuración de roles ARIA, atajos por teclado y normalización de strings en JS.
* **Criterio Propio y Revisión Humana:**
  - Toda la arquitectura, diseño visual y decisiones de contenido fueron revisadas, editadas y aprobadas por el equipo.
  - Se eliminaron redundancias, se verificó manualmente la ausencia de frameworks externos y se realizaron pruebas directas de navegación bidireccional y consola limpia (`0 errores`).
* **Declaración de Autoría:** Los integrantes del equipo comprenden cabalmente el funcionamiento de cada línea de código HTML, CSS y JavaScript presente en el repositorio y asumen la autoría y responsabilidad técnica del proyecto.

---

## 🔮 8. Evolución Técnica (Próximas Entregas)

Para futuras etapas de la cursada se planifica:
1. Incorporación de animaciones basadas en CSS `@keyframes` y View Transitions API nativa.
2. Modo de contraste configurable (selector Light/Dark Theme almacenado en `localStorage`).
3. Integración con APIs REST externas (ej. GitHub API para mostrar repositorios en tiempo real).

