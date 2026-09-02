/**
 * ==========================================================================
 * TP1: Desarrollo de Sistemas Web Front End (2026)
 * Script de Perfiles: js/perfiles.js
 * Contiene la lógica interactiva única para cada uno de los 4 perfiles
 * y efectos dinámicos 3D Tilt y Spotlight al desplazar el mouse.
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

  /* --------------------------------------------------------------------------
     0. EFECTO DINÁMICO 3D TILT & SPOTLIGHT AL DESPLAZAR EL MOUSE
     -------------------------------------------------------------------------- */
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;

  if (!prefersReducedMotion && !isTouchDevice) {
    const cards = document.querySelectorAll('.card, .skill-inspect-card, .movie-inspect-card, .disc-btn');

    cards.forEach((card) => {
      let rect = null;
      let rafId = null;

      const handleMouseMove = (e) => {
        if (!rect) rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);

        const xRatio = (x / rect.width) - 0.5;
        const yRatio = (y / rect.height) - 0.5;

        const maxTilt = 6;
        const tiltX = (yRatio * -maxTilt).toFixed(2);
        const tiltY = (xRatio * maxTilt).toFixed(2);

        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          card.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-3px)`;
        });
      };

      const handleMouseLeave = () => {
        if (rafId) cancelAnimationFrame(rafId);
        card.style.transform = '';
        card.style.setProperty('--mouse-x', '-999px');
        card.style.setProperty('--mouse-y', '-999px');
        rect = null;
      };

      card.addEventListener('mouseenter', () => {
        rect = card.getBoundingClientRect();
      });
      card.addEventListener('mousemove', handleMouseMove);
      card.addEventListener('mouseleave', handleMouseLeave);
    });
  }


  /* --------------------------------------------------------------------------
     PERFIL 1: Inspector interactivo de Discografía (Guillermo Escobar)
     -------------------------------------------------------------------------- */
  const discButtons = document.querySelectorAll('.disc-btn');
  const discDisplay = document.getElementById('discDetailsDisplay');

  if (discButtons.length && discDisplay) {
    const albumsData = [
      {
        title: "Random Access Memories",
        artist: "Daft Punk",
        year: 2013,
        genre: "Electronic / Disco / Funk",
        duration: "74:28 min",
        label: "Columbia Records",
        description: "Ganador de 5 premios Grammy. Álbum tributo a la era dorada de la música grabada en vivo de finales de los 70s y principios de los 80s con colaboradores como Giorgio Moroder, Nile Rodgers y Pharrell Williams.",
        tracks: [
          { name: "Give Life Back to Music", duration: "4:35" },
          { name: "Giorgio by Moroder", duration: "9:04" },
          { name: "Instant Crush (feat. Julian Casablancas)", duration: "5:37" },
          { name: "Lose Yourself to Dance", duration: "5:53" },
          { name: "Touch (feat. Paul Williams)", duration: "8:18" },
          { name: "Get Lucky (feat. Pharrell Williams)", duration: "6:09" },
          { name: "Contact", duration: "6:23" }
        ]
      },
      {
        title: "Currents",
        artist: "Tame Impala",
        year: 2015,
        genre: "Psychedelic Pop / Synth-Pop",
        duration: "51:06 min",
        label: "Modular / Interscope",
        description: "Escrito, interpretado, grabado y producido enteramente por Kevin Parker en Fremantle, Australia. Marca una transición sónica radical hacia cajas de ritmo analógicas y sintetizadores vintage.",
        tracks: [
          { name: "Let It Happen", duration: "7:48" },
          { name: "The Moment", duration: "4:15" },
          { name: "Eventually", duration: "5:19" },
          { name: "The Less I Know the Better", duration: "3:36" },
          { name: "Past Life", duration: "3:47" },
          { name: "'Cause I'm a Man", duration: "4:01" },
          { name: "New Person, Same Old Mistakes", duration: "6:02" }
        ]
      },
      {
        title: "OK Computer",
        artist: "Radiohead",
        year: 1997,
        genre: "Alternative Rock / Art Rock",
        duration: "53:21 min",
        label: "Parlophone / Capitol",
        description: "Considerado unánimemente como uno de los álbumes más influyentes de la historia del rock. Retrata la alienación social provocada por el advenimiento de la sociedad digital y la globalización corporativa.",
        tracks: [
          { name: "Airbag", duration: "4:44" },
          { name: "Paranoid Android", duration: "6:23" },
          { name: "Subterranean Homesick Alien", duration: "4:27" },
          { name: "Exit Music (For a Film)", duration: "4:24" },
          { name: "Let Down", duration: "4:59" },
          { name: "Karma Police", duration: "4:21" },
          { name: "No Surprises", duration: "3:48" }
        ]
      }
    ];

    const renderAlbum = (index) => {
      const album = albumsData[index];
      if (!album) return;

      discButtons.forEach((btn, idx) => {
        btn.classList.toggle('active', idx === index);
      });

      discDisplay.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap; gap: 0.5rem; border-bottom: 1px solid var(--border-color); padding-bottom: 0.75rem;">
          <div>
            <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--text-main);">${album.title}</h3>
            <p style="color: var(--accent-sky); font-size: 0.95rem; font-weight: 500;">${album.artist} • ${album.year}</p>
          </div>
          <div style="font-size: 0.85rem; font-family: var(--font-mono); color: var(--text-muted); background: var(--bg-card); padding: 0.3rem 0.6rem; border-radius: var(--radius-sm);">
            ${album.genre} | ⏱ ${album.duration}
          </div>
        </div>

        <p style="margin-top: 1rem; font-size: 0.925rem; color: var(--text-muted); line-height: 1.6;">
          ${album.description}
        </p>

        <h4 style="margin-top: 1.25rem; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-dim);">
          Lista de Temas Seleccionados (${album.tracks.length} tracks):
        </h4>

        <ul class="disc-tracklist">
          ${album.tracks.map((track, i) => `
            <li class="track-item">
              <span><strong>${i + 1}.</strong> ${track.name}</span>
              <span style="font-family: var(--font-mono); color: var(--text-dim);">${track.duration}</span>
            </li>
          `).join('')}
        </ul>
      `;
    };

    discButtons.forEach((btn, idx) => {
      btn.addEventListener('click', () => renderAlbum(idx));
    });

    renderAlbum(0);
  }


  /* --------------------------------------------------------------------------
     PERFIL 2: Inspector de Competencias y Dominio (José Luis Galvis)
     -------------------------------------------------------------------------- */
  const skillsInspectorGrid = document.getElementById('skillsInspectorGrid');

  if (skillsInspectorGrid) {
    const skillsList = [
      {
        name: "JavaScript Moderno (ES6+)",
        level: 95,
        ratingText: "Avanzado / Arquitectura",
        tools: "Async/Await, Proxies, Closures, Currying, Módulos ESM",
        project: "Motor de renderizado de componentes livianos y cliente HTTP con interceptores."
      },
      {
        name: "Manipulación Avanzada del DOM",
        level: 90,
        ratingText: "Avanzado",
        tools: "MutationObserver, Event Delegation, Virtual Fragment, DocumentFragment",
        project: "Filtros en tiempo real sin repaints innecesarios con batching en el render loop."
      },
      {
        name: "Web APIs Nativas & Fetch",
        level: 88,
        ratingText: "Competente",
        tools: "Fetch API, LocalStorage, AbortController, Web Workers",
        project: "Capa de persistencia offline con sincronización en background."
      },
      {
        name: "Arquitectura Modular y Clean Code",
        level: 92,
        ratingText: "Avanzado",
        tools: "SOLID en JS, Patrón Observer, Factory, Singleton",
        project: "Estructura desacoplada de scripts para sitios estáticos de alto rendimiento."
      }
    ];

    skillsInspectorGrid.innerHTML = skillsList.map((skill, index) => `
      <div class="skill-inspect-card ${index === 0 ? 'expanded' : ''}" data-index="${index}" tabindex="0" role="button" aria-expanded="${index === 0}">
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <strong style="color: var(--text-main); font-size: 1rem;">${skill.name}</strong>
          <span class="badge badge-emerald">${skill.level}%</span>
        </div>

        <div class="skill-progress-bar">
          <div class="skill-progress-fill" style="width: ${skill.level}%;"></div>
        </div>

        <div style="display: flex; justify-content: space-between; font-size: 0.8rem; color: var(--text-dim); font-family: var(--font-mono);">
          <span>Nivel: ${skill.ratingText}</span>
          <span style="color: var(--accent-emerald);">Click para detalles ▾</span>
        </div>

        <div class="skill-details-expand">
          <p><strong>Herramientas y Conceptos:</strong> ${skill.tools}</p>
          <p style="margin-top: 0.4rem;"><strong>Caso Práctico:</strong> ${skill.project}</p>
        </div>
      </div>
    `).join('');

    const cards = skillsInspectorGrid.querySelectorAll('.skill-inspect-card');
    cards.forEach((card) => {
      const toggle = () => {
        const isExpanded = card.classList.contains('expanded');
        card.classList.toggle('expanded');
        card.setAttribute('aria-expanded', !isExpanded);
      };

      card.addEventListener('click', toggle);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggle();
        }
      });
    });
  }


  /* --------------------------------------------------------------------------
     PERFIL 3: Modal de Ficha Cinematográfica (Orlando Sposto)
     -------------------------------------------------------------------------- */
  const movieCards = document.querySelectorAll('.movie-inspect-card');
  const movieModal = document.getElementById('movieModal');
  const closeMovieModalBtn = document.getElementById('closeMovieModalBtn');
  const modalMovieBody = document.getElementById('modalMovieBody');

  if (movieCards.length && movieModal && modalMovieBody) {
    const moviesData = [
      {
        title: "The Dark Knight",
        director: "Christopher Nolan",
        year: 2008,
        duration: "152 min",
        genre: "Acción / Drama / Crimen",
        rating: "★★★★★ (9.0/10 IMDb)",
        synopsis: "Cuando la amenaza conocida como el Joker desata el caos en Gotham City, Batman debe aceptar una de las mayores pruebas psicológicas y físicas de su capacidad para luchar contra la injusticia.",
        quote: "«O mueres como un héroe, o vives lo suficiente para verte convertido en el villano.»",
        speaker: "Harvey Dent"
      },
      {
        title: "Dune: Part Two",
        director: "Denis Villeneuve",
        year: 2024,
        duration: "166 min",
        genre: "Ciencia Ficción / Aventura Épica",
        rating: "★★★★★ (8.6/10 IMDb)",
        synopsis: "Paul Atreides se une a Chani y a los Fremen mientras busca venganza contra los conspiradores que destruyeron a su familia. Ante una elección entre el amor de su vida y el destino del universo conocido, lucha por evitar un futuro terrible.",
        quote: "«El poder sobre una especia es poder sobre todo.»",
        speaker: "Princesa Irulan"
      },
      {
        title: "Oppenheimer",
        director: "Christopher Nolan",
        year: 2023,
        duration: "180 min",
        genre: "Biografía / Drama / Historia",
        rating: "★★★★★ (8.9/10 IMDb)",
        synopsis: "La historia del científico estadounidense J. Robert Oppenheimer y su papel en el desarrollo de la bomba atómica durante el Proyecto Manhattan en la Segunda Guerra Mundial, seguida de las consecuencias políticas posteriores.",
        quote: "«Ahora me he convertido en la muerte, el destructor de mundos.»",
        speaker: "J. Robert Oppenheimer"
      }
    ];

    const openModal = (index) => {
      const movie = moviesData[index];
      if (!movie) return;

      modalMovieBody.innerHTML = `
        <span class="badge badge-purple" style="margin-bottom: 0.5rem;">Ficha Técnica Cinematográfica</span>
        <h3 id="modalMovieTitle" style="font-size: 1.6rem; font-weight: 800; color: var(--text-main); margin-bottom: 0.25rem;">
          ${movie.title}
        </h3>
        
        <p style="color: var(--accent-purple); font-size: 0.95rem; font-weight: 600; margin-bottom: 1rem;">
          Dir. ${movie.director} • ${movie.year} • ${movie.duration}
        </p>

        <div style="background-color: var(--bg-main); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 1rem; margin-bottom: 1.25rem;">
          <div style="font-size: 0.85rem; color: var(--text-dim); margin-bottom: 0.35rem;">
            <strong>Género:</strong> ${movie.genre} | <strong>Calificación:</strong> ${movie.rating}
          </div>
          <p style="font-size: 0.925rem; color: var(--text-muted); line-height: 1.6;">
            ${movie.synopsis}
          </p>
        </div>

        <blockquote style="border-left: 3px solid var(--accent-purple); padding-left: 1rem; font-style: italic; color: var(--text-main); font-size: 0.95rem;">
          ${movie.quote}
          <footer style="font-style: normal; font-size: 0.8rem; color: var(--text-dim); margin-top: 0.3rem;">— ${movie.speaker}</footer>
        </blockquote>
      `;

      movieModal.classList.add('open');
      movieModal.setAttribute('aria-hidden', 'false');
      closeMovieModalBtn.focus();
      document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
      movieModal.classList.remove('open');
      movieModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    };

    movieCards.forEach((card, idx) => {
      card.addEventListener('click', () => openModal(idx));
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openModal(idx);
        }
      });
    });

    if (closeMovieModalBtn) {
      closeMovieModalBtn.addEventListener('click', closeModal);
    }

    movieModal.addEventListener('click', (e) => {
      if (e.target === movieModal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && movieModal.classList.contains('open')) {
        closeModal();
      }
    });
  }


  /* --------------------------------------------------------------------------
     PERFIL 4: Mini Terminal CLI Interactiva (Adriana Van Den Dooren)
     -------------------------------------------------------------------------- */
  const terminalForm = document.getElementById('terminalForm');
  const cliInput = document.getElementById('cliInput');
  const terminalHistory = document.getElementById('terminalHistory');
  const terminalBody = document.getElementById('terminalBody');

  if (terminalForm && cliInput && terminalHistory) {
    const commands = {
      help: () => `
Comandos disponibles en DevCore CLI:
  • help      - Muestra esta lista de comandos.
  • skills    - Muestra las habilidades y herramientas de Adriana Van Den Dooren.
  • bio       - Breve biografía y enfoque profesional.
  • contact   - Información de contacto y redes profesionales.
  • movies    - Películas favoritas comentadas.
  • music     - Discos favoritos en rotación continua.
  • whoami    - Información sobre el usuario conectado.
  • clear     - Limpia el historial de la pantalla de terminal.
      `,
      skills: () => `
[ACCESIBILIDAD & QA TOOLKIT]
  1. WCAG 2.1 (A/AA/AAA) Standards Compliance & Semantic Trees
  2. Chrome DevTools (Lighthouse Audits, Rendering & Memory Profiles)
  3. Cross-Browser & Multi-Device Responsive Testing
  4. ARIA Roles, Live Regions & Keyboard Trap Avoidance
      `,
      bio: () => `
Adriana Van Den Dooren (27 años, Mendoza). QA & Accessibility Engineer en DevCore.
Apasionada por la inclusión digital y la construcción de experiencias accesibles
donde cualquier usuario pueda navegar de forma intuitiva, rápida y sin barreras.
      `,
      contact: () => `
[CANALES DE CONTACTO]
  • Email: adriana.vdooren@devcore.local
  • GitHub: https://github.com/adrianavdooren-qa
  • LinkedIn: linkedin.com/in/adriana-vandendooren-a11y
      `,
      movies: () => `
[CINE FAVORITO]
  1. The Truman Show (1998) - Análisis sobre la autenticidad y los límites de la realidad.
  2. Her (2013) - Diálogo sobre afecto y tecnología.
  3. Spider-Man: Into the Spider-Verse (2018) - Vanguardia en estética y animación.
      `,
      music: () => `
[DISCOS EN REPRODUCCIÓN]
  1. Radiohead - In Rainbows (2007)
  2. Lorde - Melodrama (2017)
  3. Taylor Swift - Folklore (2020)
      `,
      whoami: () => `guest@devcore-tp1 [Privilegios: Lectura / Interacción]`,
      clear: () => '__CLEAR__'
    };

    terminalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const rawCmd = cliInput.value.trim();
      const cmd = rawCmd.toLowerCase();

      if (!rawCmd) return;

      if (cmd === 'clear') {
        terminalHistory.textContent = `DevCore CLI v1.0.4 - Pantalla reiniciada.\nEscribe "help" para ver los comandos disponibles.`;
        cliInput.value = '';
        return;
      }

      let responseText = '';
      if (commands[cmd]) {
        responseText = commands[cmd]();
      } else {
        responseText = `Comando no reconocido: "${rawCmd}". Escribe "help" para ver los comandos disponibles.`;
      }

      terminalHistory.textContent += `\n\nadriana@tp1:~$ ${rawCmd}\n${responseText.trim()}`;
      cliInput.value = '';

      if (terminalBody) {
        terminalBody.scrollTop = terminalBody.scrollHeight;
      }
    });
  }

  /* --------------------------------------------------------------------------
     5. SINCRONIZACIÓN DEL SISTEMA DUAL DE TEMAS (Formal vs Dinámico)
     -------------------------------------------------------------------------- */
  const STORAGE_KEY_THEME = 'devcore_tema_preferido';
  const btnToggleTheme = document.getElementById('btnToggleTheme');
  const themeToggleIcon = document.getElementById('themeToggleIcon');
  const themeToggleText = document.getElementById('themeToggleText');

  const aplicarTema = (tema) => {
    document.body.setAttribute('data-theme', tema);
    localStorage.setItem(STORAGE_KEY_THEME, tema);

    if (btnToggleTheme && themeToggleText && themeToggleIcon) {
      if (tema === 'dinamico') {
        themeToggleIcon.textContent = '👔';
        themeToggleText.textContent = 'Modo Formal';
        btnToggleTheme.setAttribute('title', 'Cambiar a Modo Formal (sobrio y académico)');
      } else {
        themeToggleIcon.textContent = '🎨';
        themeToggleText.textContent = 'Modo Dinámico';
        btnToggleTheme.setAttribute('title', 'Cambiar a Modo Dinámico (colorido y vibrante)');
      }
    }
  };

  const temaGuardado = localStorage.getItem(STORAGE_KEY_THEME) || 'formal';
  aplicarTema(temaGuardado);

  if (btnToggleTheme) {
    btnToggleTheme.addEventListener('click', () => {
      const temaActual = document.body.getAttribute('data-theme') || 'formal';
      const nuevoTema = temaActual === 'dinamico' ? 'formal' : 'dinamico';
      aplicarTema(nuevoTema);
    });
  }

  /* --------------------------------------------------------------------------
     6. CONTROLADOR ACCESIBLE DEL MENÚ MÓVIL Y TABLET (HAMBURGUESA)
     -------------------------------------------------------------------------- */
  const navToggle = document.getElementById('navToggle');
  const headerMenu = document.getElementById('headerMenu');

  if (navToggle && headerMenu) {
    const alternarMenu = (abrir) => {
      const estaAbierto = abrir !== undefined ? abrir : !headerMenu.classList.contains('is-open');
      headerMenu.classList.toggle('is-open', estaAbierto);
      navToggle.setAttribute('aria-expanded', estaAbierto ? 'true' : 'false');
      navToggle.setAttribute('aria-label', estaAbierto ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');
      
      if (estaAbierto) {
        const primerFocuseable = headerMenu.querySelector('a, button');
        if (primerFocuseable) primerFocuseable.focus();
      }
    };

    navToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      alternarMenu();
    });

    // Cerrar al hacer clic en enlaces del menú
    headerMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => alternarMenu(false));
    });

    // Cerrar al hacer clic fuera del menú
    document.addEventListener('click', (e) => {
      if (headerMenu.classList.contains('is-open') && !headerMenu.contains(e.target) && !navToggle.contains(e.target)) {
        alternarMenu(false);
      }
    });

    // Cerrar con Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && headerMenu.classList.contains('is-open')) {
        alternarMenu(false);
        navToggle.focus();
      }
    });

    // Cerrar al redimensionar a versión de escritorio
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 860 && headerMenu.classList.contains('is-open')) {
        alternarMenu(false);
      }
    });
  }

});
