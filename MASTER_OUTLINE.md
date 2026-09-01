# MASTER OUTLINE: TP1 - Desarrollo de Sistemas Web Front End 2026

## 1. Alcance General y Entregables
- **Objetivo:** Construir un sitio web estático grupal (HTML5, CSS3, JS Vanilla), responsive, accesible y optimizado para SEO, publicado en Vercel con documentación técnica completa en `README.md`.
- **Estructura del Proyecto:**
  - `./index.html` (Portada del equipo y catálogo de perfiles)
  - `./perfil-1.html`, `./perfil-2.html`, `./perfil-3.html`, `./perfil-4.html` (Páginas individuales)
  - `./bitacora.html` (Historial de acuerdos, problemas y resoluciones)
  - `./css/styles.css` (Hoja de estilos unificada)
  - `./js/main.js` (Interacciones globales y de portada)
  - `./js/perfiles.js` (Interacciones de perfiles individuales)
  - `./img/` (Avatares e iconografía SVG/WebP)
  - `./README.md` (Documentación obligatoria y registro de IA)

---

## 2. Restricciones Técnicas Globales (Guardrails)
- **Tecnologías:** Únicamente HTML5 semántico, CSS3 moderno y JavaScript ES6+ nativo (sin frameworks como React, Bootstrap o Tailwind).
- **Ubicación de archivos:** Todos los archivos `.html` DEBEN residir en la raíz del repositorio.
- **Estilos:** Variables CSS centralizadas en `:root` dentro de `css/styles.css` con estética Dark Theme sobria.
- **Responsive Web Design:** Mobile-First con validación estricta en breakpoints: `400px`, `900px` y `1200px` (sin scroll horizontal).
- **Navegación:** Enlaces bidireccionales en todas las secciones; prohibido depender del botón "Atrás" del navegador.
- **Accesibilidad y SEO:** Uso de etiquetas semánticas (`header`, `nav`, `main`, `section`, `article`, `footer`), un único `<h1>` por página, atributos `alt` descriptivos y metadatos completos.

---

## 3. Desglose de Tareas y Fases de Ejecución

### FASE 1: Setup y Sistema de Diseño Base
- **Objetivo:** Inicializar el repositorio y la arquitectura visual unificada.
- **Pasos:**
  1. Crear la estructura de directorios (`css/`, `js/`, `img/avatares/`, `img/icons/`).
  2. En `css/styles.css`, configurar:
     - Reset CSS y box-sizing global (`*, *::before, *::after { box-sizing: border-box; }`).
     - Variables de color (Slate 900 `#0F172A`, Slate 800 `#1E293B`, Slate 700 `#334155`, Sky Blue `#38BDF8`, Emerald `#34D399`).
     - Importación de fuentes de Google Fonts (`Inter` y `JetBrains Mono`).
     - Clases base de contenedor, botones de navegación y tarjetas (`.card`).
     - Media queries para `min-width: 400px`, `min-width: 900px` y `min-width: 1200px`.

### FASE 2: Portada Principal (`index.html` y `js/main.js`)
- **Objetivo:** Presentar la identidad del equipo, accesos a perfiles y primera interacción interactiva.
- **Pasos:**
  1. Maquetar `index.html` con `<header>` (logo y navegación hacia Bitácora), `<main>` (sección hero con nombre y propósito del equipo) y `<section class="team-grid">` con 4 tarjetas de presentación.
  2. Cada tarjeta en `index.html` debe incluir avatar, nombre, rol, badges de habilidades (con atributo `data-skills`) y botón hacia su respectivo `perfil-[n].html`.
  3. En `js/main.js`, implementar una función interactiva (ej. buscador/filtro en tiempo real por habilidades) que oculte o resalte dinámicamente las tarjetas según la coincidencia de texto.
  4. Maquetar el `<footer>` con créditos institucionales y navegación secundaria.

### FASE 3: Perfiles Individuales (`perfil-1.html` a `perfil-4.html` y `js/perfiles.js`)
- **Objetivo:** Maquetar los 4 perfiles cumpliendo con los datos obligatorios y una función JS única por integrante.
- **Requisitos por Perfil:**
  - Avatar o foto optimizada.
  - Nombre completo, ciudad de residencia y edad.
  - Lista desordenada con 4 habilidades.
  - Lista ordenada con 3 películas favoritas.
  - Lista ordenada con 3 discos favoritos.
  - Botón de navegación explícito de regreso al inicio (`index.html`) y acceso a `bitacora.html`.
- **Lógica JS en `js/perfiles.js`:**
  - **Perfil 1:** Explorador interactivo de discos (muestra tracklist, duración y año al hacer clic en cada disco).
  - **Perfil 2:** Inspector interactivo de habilidades (expande nivel de dominio, herramientas asociadas y proyectos).
  - **Perfil 3:** Modal con ficha técnica de películas (sinopsis, director y cita memorable al hacer clic).
  - **Perfil 4:** Mini terminal de comandos interactiva que responde a inputs del usuario (`skills`, `bio`, `contact`).

### FASE 4: Bitácora de Desarrollo (`bitacora.html`)
- **Objetivo:** Documentar el proceso colaborativo, la evolución técnica y las decisiones de diseño.
- **Pasos:**
  1. Maquetar `bitacora.html` con la misma cabecera y pie de página que el resto del sitio para mantener consistencia.
  2. Implementar una estructura cronológica en tarjetas (`.card`) con:
     - **Decisiones tomadas:** Arquitectura Mobile-First, paleta de colores, selección tipográfica y modularización de scripts.
     - **Dificultades encontradas:** Gestión de colisiones en Git, ajuste fino de breakpoints en resoluciones intermedias y validación de contrastes.
     - **Soluciones aplicadas:** Reestructuración de CSS Grid a `repeat(auto-fit, minmax(...))` y refactorización modular de eventos JS.

### FASE 5: Documentación Obligatoria (`README.md`) y Despliegue
- **Objetivo:** Completar la guía técnica excluyente para la corrección y desplegar en Vercel.
- **Secciones del `README.md`:**
  1. Título y descripción del proyecto.
  2. Tabla de integrantes con enlaces a sus perfiles de GitHub.
  3. Tecnologías utilizadas y versiones.
  4. Árbol de archivos y carpetas.
  5. Guía de estilos (paleta `#HEX`, fuentes de Google Fonts, iconografía).
  6. Documentación técnica de las funciones JavaScript (portada + 4 perfiles) con capturas de pantalla de referencia.
  7. Enlace directo a la URL de producción en Vercel.
  8. **Sección de Uso de IA y Criterio de Autoría:** Modelos utilizados (ej. Gemini/Antigravity), plan (gratuito/pago), tipo de asistencia (scaffolding, debugging, optimización CSS), prompts representativos y cambios aplicados con criterio propio.
  9. Sección de evolución técnica (mejoras previstas para entregas futuras).

---

## 4. Criterios de Aceptación (Definition of Done)
- [ ] Todos los archivos `.html` se encuentran en la raíz del repositorio.
- [ ] No existen enlaces rotos; la navegación entre portada, perfiles y bitácora es 100% funcional sin usar el botón "Atrás".
- [ ] Cada perfil contiene rigurosamente: foto/avatar, nombre, ciudad, edad, 4 habilidades, 3 películas y 3 discos.
- [ ] Se verifica adaptabilidad fluida y sin desbordes horizontales en `400px`, `900px` y `1200px`.
- [ ] La consola del navegador permanece limpia (0 errores) al ejecutar todas las funciones JS.
- [ ] El proyecto está publicado en Vercel y la URL está visible en el `README.md`.
- [ ] El repositorio de GitHub es público y registra commits de todos los integrantes.

