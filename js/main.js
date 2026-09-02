/**
 * ==========================================================================
 * TP1: Desarrollo de Sistemas Web Front End (2026)
 * Script Principal (Portada): js/main.js
 * Funcionalidades:
 *   1. Presentación interactiva de 10 segundos con audio y efectos (Zarathustra)
 *   2. Sistema dual de temas (Modo Dinámico vs Modo Formal) y localStorage
 *   3. Buscador interactivo y filtrado en tiempo real de habilidades
 *   4. Efecto 3D Tilt dinámico y Spotlight en tarjetas al mover el cursor
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

  /* --------------------------------------------------------------------------
     1. GESTOR DE INTRODUCCIÓN (10 SEGUNDOS) Y SISTEMA DUAL DE TEMAS
     -------------------------------------------------------------------------- */
  const STORAGE_KEY_INTRO = 'devcore_ha_visto_intro';
  const STORAGE_KEY_THEME = 'devcore_tema_preferido';

  const introOverlay = document.getElementById('introOverlay');
  const introStage = document.getElementById('introStage');
  const introStartWrapper = document.getElementById('introStartWrapper');
  const btnStartIntro = document.getElementById('btnStartIntro');
  const btnSkipIntro = document.getElementById('btnSkipIntro');
  const introGroupName = document.getElementById('introGroupName');
  const introAudio = document.getElementById('introAudio');

  const btnReplayIntro = document.getElementById('btnReplayIntro');
  const btnToggleTheme = document.getElementById('btnToggleTheme');
  const themeToggleIcon = document.getElementById('themeToggleIcon');
  const themeToggleText = document.getElementById('themeToggleText');
  const mainContent = document.getElementById('mainContent');

  let introAnimId = null;
  let synthAudioCtx = null;
  let synthMasterGain = null;
  let introActiva = false;

  // Parámetros URL para testing rápido (?intro=true o ?theme=dinamico)
  const urlParams = new URLSearchParams(window.location.search);
  const forzarIntro = urlParams.get('intro') === 'true' || urlParams.get('intro') === '1';
  const temaUrl = urlParams.get('theme');

  // A. Conmutador de Temas (Formal vs Dinámico)
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

  // Inicializar tema: si es visita recurrente por defecto es formal, o lo guardado
  let temaGuardado = temaUrl || localStorage.getItem(STORAGE_KEY_THEME) || 'formal';
  aplicarTema(temaGuardado);

  if (btnToggleTheme) {
    btnToggleTheme.addEventListener('click', () => {
      const temaActual = document.body.getAttribute('data-theme') || 'formal';
      const nuevoTema = temaActual === 'dinamico' ? 'formal' : 'dinamico';
      aplicarTema(nuevoTema);
    });
  }

  // B. Motor de Síntesis Web Audio API (Respaldo offline idéntico a Zarathustra)
  const iniciarSintetizadorZarathustra = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return null;
      synthAudioCtx = new AudioCtx();
      synthMasterGain = synthAudioCtx.createGain();
      synthMasterGain.gain.setValueAtTime(0.5, synthAudioCtx.currentTime);
      synthMasterGain.connect(synthAudioCtx.destination);

      const now = synthAudioCtx.currentTime;

      // 1. Drone grave de órgano en Do (32.7 Hz y 65.4 Hz)
      [32.7, 65.4, 130.8].forEach(freq => {
        const osc = synthAudioCtx.createOscillator();
        const g = synthAudioCtx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, now);
        
        // Filtro pasa-bajos para calidez
        const filter = synthAudioCtx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(250, now);

        g.gain.setValueAtTime(0.01, now);
        g.gain.linearRampToValueAtTime(0.2, now + 1.2);
        g.gain.linearRampToValueAtTime(0.01, now + 9.5);

        osc.connect(filter);
        filter.connect(g);
        g.connect(synthMasterGain);
        osc.start(now);
        osc.stop(now + 9.8);
      });

      // 2. Metales de Fanfarria (Do - Sol - Do)
      const notasFanfarria = [
        { freq: 261.63, start: 1.2, dur: 1.1 }, // Do4
        { freq: 392.00, start: 2.4, dur: 1.1 }, // Sol4
        { freq: 523.25, start: 3.6, dur: 1.8 }  // Do5
      ];

      notasFanfarria.forEach(nota => {
        const tStart = now + nota.start;
        const tEnd = tStart + nota.dur;
        const osc = synthAudioCtx.createOscillator();
        const g = synthAudioCtx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(nota.freq, tStart);

        const filter = synthAudioCtx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1400, tStart);

        g.gain.setValueAtTime(0.01, tStart);
        g.gain.linearRampToValueAtTime(0.35, tStart + 0.1);
        g.gain.linearRampToValueAtTime(0.01, tEnd);

        osc.connect(filter);
        filter.connect(g);
        g.connect(synthMasterGain);
        osc.start(tStart);
        osc.stop(tEnd + 0.1);
      });

      // 3. Timbales (Golpes con caída de afinación rápida)
      const timbalHits = [4.8, 5.1, 5.4, 5.7, 6.0, 6.3, 6.6];
      timbalHits.forEach((hitTime, idx) => {
        const tStart = now + hitTime;
        const osc = synthAudioCtx.createOscillator();
        const g = synthAudioCtx.createGain();
        const freqBase = idx % 2 === 0 ? 98.0 : 65.4;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freqBase * 1.5, tStart);
        osc.frequency.exponentialRampToValueAtTime(freqBase, tStart + 0.08);

        g.gain.setValueAtTime(0.6, tStart);
        g.gain.exponentialRampToValueAtTime(0.001, tStart + 0.4);

        osc.connect(g);
        g.connect(synthMasterGain);
        osc.start(tStart);
        osc.stop(tStart + 0.45);
      });

      // 4. Clímax Orquestal a pleno (6.6s a 9.8s)
      const acordeClimax = [130.81, 196.00, 261.63, 329.63, 392.00, 523.25];
      acordeClimax.forEach(f => {
        const tStart = now + 6.6;
        const osc = synthAudioCtx.createOscillator();
        const g = synthAudioCtx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(f, tStart);

        g.gain.setValueAtTime(0.01, tStart);
        g.gain.linearRampToValueAtTime(0.18, tStart + 0.15);
        g.gain.linearRampToValueAtTime(0.001, tStart + 3.0);

        osc.connect(g);
        g.connect(synthMasterGain);
        osc.start(tStart);
        osc.stop(tStart + 3.1);
      });

      return synthMasterGain;
    } catch (e) {
      console.warn('Web Audio no disponible:', e);
      return null;
    }
  };

  // C. Atenuación suave de Audio (Fade-Out)
  const atenuarAudio = (duracionMs = 400, callback) => {
    let completado = false;
    const finalizar = () => {
      if (!completado) {
        completado = true;
        if (callback) callback();
      }
    };

    // Fade-out HTML5 Audio
    const audioParaAtenuar = introAudioActual || introAudio;
    if (audioParaAtenuar && !audioParaAtenuar.paused) {
      const volInicial = audioParaAtenuar.volume;
      const startFade = performance.now();
      const stepFade = (time) => {
        const progress = Math.min((time - startFade) / duracionMs, 1);
        audioParaAtenuar.volume = Math.max(0, volInicial * (1 - progress));
        if (progress < 1) {
          requestAnimationFrame(stepFade);
        } else {
          audioParaAtenuar.pause();
          audioParaAtenuar.currentTime = 0;
          audioParaAtenuar.volume = volInicial;
          finalizar();
        }
      };
      requestAnimationFrame(stepFade);
    } else {
      finalizar();
    }

    // Fade-out Web Audio Synth
    if (synthMasterGain && synthAudioCtx) {
      try {
        const t = synthAudioCtx.currentTime;
        synthMasterGain.gain.setValueAtTime(synthMasterGain.gain.value, t);
        synthMasterGain.gain.linearRampToValueAtTime(0.001, t + duracionMs / 1000);
        setTimeout(() => {
          if (synthAudioCtx && synthAudioCtx.state !== 'closed') {
            synthAudioCtx.close();
            synthAudioCtx = null;
          }
        }, duracionMs + 50);
      } catch (e) {
        // Ignorar
      }
    }
  };

  // Variable para referenciar el audio que efectivamente se esté reproduciendo
  let introAudioActual = null;

  // D. Disparo y Animación de la Intro Completa con Fanfarria y Tambores
  const arrancarIntroExperiencia = (esReplay = false) => {
    introActiva = true;
    if (introStartWrapper) {
      introStartWrapper.classList.add('hidden');
      introStartWrapper.style.display = 'none';
    }
    if (introStage) {
      introStage.hidden = false;
      introStage.classList.add('active');
    }

    // Reiniciar elementos visuales (Fondo negro puro, grupo invisible)
    if (introGroupName) {
      introGroupName.style.opacity = '0';
      introGroupName.style.transform = 'scale(0.94)';
    }

    // Iniciar Audio: búsqueda inteligente de archivos (Zaratustra en audio/ o en raíz, o intro.mp3)
    const rutasAudio = [
      'audio/Zaratustra.mp3',
      'Zaratustra.mp3',
      'audio/zaratustra.mp3',
      'zaratustra.mp3',
      'audio/intro.mp3',
      'intro.mp3'
    ];

    let duracionTotal = 18.8; // Duración completa del audio con timbales y tambores
    let rutaIdx = 0;

    const intentarReproducirRuta = () => {
      if (rutaIdx >= rutasAudio.length) {
        // Si ningún archivo existe o responde, recurrir al sintetizador orquestal Web Audio API
        iniciarSintetizadorZarathustra();
        return;
      }

      const rutaActual = rutasAudio[rutaIdx];
      const audioObj = new Audio(rutaActual);
      audioObj.volume = 0.75;

      audioObj.addEventListener('loadedmetadata', () => {
        if (audioObj.duration && isFinite(audioObj.duration)) {
          duracionTotal = audioObj.duration;
        }
      });

      // Al concluir los tambores del final de forma natural, finaliza la intro
      audioObj.addEventListener('ended', () => {
        finalizarIntro(false);
      });

      audioObj.play().then(() => {
        introAudioActual = audioObj;
      }).catch(() => {
        rutaIdx++;
        intentarReproducirRuta();
      });
    };

    intentarReproducirRuta();

    const startTime = performance.now();

    const tick = (now) => {
      if (!introActiva) return;

      const elapsed = (now - startTime) / 1000;

      // Sincronización cinematográfica exacta solicitada:
      // - De 0 a 6 segundos: Fondo negro puro, solo visible el botón 'Saltar Intro'
      // - De 6 a 12 segundos: Fundido progresivo del nombre del grupo (de 0% a 100%)
      // - De 12 segundos hasta el final (~18.8s): Nombre 100% visible mientras suenan los tambores
      if (introGroupName) {
        if (elapsed < 6) {
          introGroupName.style.opacity = '0';
          introGroupName.style.transform = 'scale(0.94)';
        } else if (elapsed >= 6 && elapsed <= 12) {
          const fadeProgress = (elapsed - 6) / 6; // Rango exacto: 0.0 a 1.0
          introGroupName.style.opacity = fadeProgress.toFixed(4);
          const scale = 0.94 + (0.06 * fadeProgress);
          introGroupName.style.transform = `scale(${scale.toFixed(4)})`;
        } else {
          introGroupName.style.opacity = '1';
          introGroupName.style.transform = 'scale(1)';
        }
      }

      // Fin de la duración total del audio
      if (elapsed >= duracionTotal) {
        finalizarIntro(false);
      } else {
        introAnimId = requestAnimationFrame(tick);
      }
    };

    introAnimId = requestAnimationFrame(tick);
  };

  // E. Finalización / Salto de la Intro
  const finalizarIntro = (fueSaltoManual = false) => {
    if (!introActiva && !introOverlay) return;
    introActiva = false;

    if (introAnimId) {
      cancelAnimationFrame(introAnimId);
      introAnimId = null;
    }

    atenuarAudio(350, () => {
      if (introOverlay) {
        introOverlay.classList.add('fade-out');
        introOverlay.setAttribute('aria-hidden', 'true');
      }

      // Al ver la intro completa se activa el Modo Dinámico para lucir el diseño;
      // si se salta de inmediato se mantiene o pasa a Modo Formal.
      if (!fueSaltoManual) {
        aplicarTema('dinamico');
      } else {
        const temaActual = localStorage.getItem(STORAGE_KEY_THEME) || 'formal';
        aplicarTema(temaActual);
      }

      sessionStorage.setItem(SESSION_KEY_INTRO_SEEN, 'true');
      localStorage.setItem(STORAGE_KEY_INTRO, 'true');

      // Mover foco de forma accesible al contenido principal
      if (mainContent) {
        mainContent.focus();
      }
    });
  };

  // F. Inicialización del Flujo de Entrada al recién cargar el sitio
  const SESSION_KEY_INTRO_SEEN = 'devcore_intro_vista_sesion';
  const yaVistoEnSesion = sessionStorage.getItem(SESSION_KEY_INTRO_SEEN) === 'true';

  if (!yaVistoEnSesion || forzarIntro) {
    // Al recién cargar el sitio: Pantalla negra con botón central 'Ver Intro' y botón 'Saltar Intro'
    if (introOverlay) {
      introOverlay.classList.remove('fade-out');
      introOverlay.setAttribute('aria-hidden', 'false');
    }
    if (introStartWrapper) {
      introStartWrapper.classList.remove('hidden');
      introStartWrapper.style.display = 'flex';
    }
    if (introGroupName) {
      introGroupName.style.opacity = '0';
    }
    if (btnStartIntro) {
      btnStartIntro.focus();
    }
  } else {
    // Navegación en la misma sesión: entrada directa sin intro
    if (introOverlay) {
      introOverlay.classList.add('fade-out');
      introOverlay.setAttribute('aria-hidden', 'true');
    }
  }

  // 1. Clic en 'Ver Intro' (en el centro de la pantalla negra al recién cargar)
  if (btnStartIntro) {
    btnStartIntro.addEventListener('click', () => {
      sessionStorage.setItem(SESSION_KEY_INTRO_SEEN, 'true');
      localStorage.setItem(STORAGE_KEY_INTRO, 'true');
      arrancarIntroExperiencia(false);
    });
  }

  // 2. Clic en 'Saltar Intro' (o atajo de teclado Escape)
  if (btnSkipIntro) {
    btnSkipIntro.addEventListener('click', () => {
      sessionStorage.setItem(SESSION_KEY_INTRO_SEEN, 'true');
      localStorage.setItem(STORAGE_KEY_INTRO, 'true');
      finalizarIntro(true);
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && (introActiva || (introOverlay && !introOverlay.classList.contains('fade-out')))) {
      e.preventDefault();
      sessionStorage.setItem(SESSION_KEY_INTRO_SEEN, 'true');
      localStorage.setItem(STORAGE_KEY_INTRO, 'true');
      finalizarIntro(true);
    }
  });

  // 3. Botón de Repetición en la Barra Superior ('Ver Intro')
  if (btnReplayIntro) {
    btnReplayIntro.addEventListener('click', () => {
      if (introOverlay) {
        introOverlay.classList.remove('fade-out');
        introOverlay.setAttribute('aria-hidden', 'false');
      }
      if (introStartWrapper) {
        introStartWrapper.classList.add('hidden');
        introStartWrapper.style.display = 'none';
      }
      arrancarIntroExperiencia(true);
    });
  }
  const searchInput = document.getElementById('skillSearch');
  const quickFilterBtns = document.querySelectorAll('.quick-filter-btn');
  const memberCards = document.querySelectorAll('.member-card');
  const filterStatus = document.getElementById('filterStatus');
  const noResults = document.getElementById('noResults');
  const clearFilterBtn = document.getElementById('clearFilterBtn');

  const normalizeText = (text) => {
    return (text || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();
  };

  const filterMembers = (query) => {
    const term = normalizeText(query);
    let visibleCount = 0;

    memberCards.forEach((card) => {
      const name = normalizeText(card.getAttribute('data-name'));
      const skills = normalizeText(card.getAttribute('data-skills'));

      if (!term || name.includes(term) || skills.includes(term)) {
        card.classList.remove('hidden');
        if (term) {
          card.classList.add('highlighted');
        } else {
          card.classList.remove('highlighted');
        }
        visibleCount++;
      } else {
        card.classList.add('hidden');
        card.classList.remove('highlighted');
      }
    });

    if (filterStatus) {
      if (term) {
        filterStatus.textContent = `Mostrando ${visibleCount} de ${memberCards.length} integrantes para "${query}"`;
      } else {
        filterStatus.textContent = `Mostrando ${memberCards.length} de ${memberCards.length} integrantes`;
      }
    }

    if (noResults) {
      noResults.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  };

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      quickFilterBtns.forEach(btn => btn.classList.remove('active'));
      filterMembers(e.target.value);
    });
  }

  quickFilterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      quickFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');
      if (filterVal === 'all') {
        if (searchInput) searchInput.value = '';
        filterMembers('');
      } else {
        if (searchInput) searchInput.value = filterVal;
        filterMembers(filterVal);
      }
    });
  });

  if (clearFilterBtn && searchInput) {
    clearFilterBtn.addEventListener('click', () => {
      searchInput.value = '';
      quickFilterBtns.forEach(b => b.classList.remove('active'));
      filterMembers('');
      searchInput.focus();
    });
  }


  /* --------------------------------------------------------------------------
     2. EFECTOS DINÁMICOS AL DESPLAZAR EL MOUSE (3D TILT & SPOTLIGHT GLOW)
     -------------------------------------------------------------------------- */
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;

  if (!prefersReducedMotion && !isTouchDevice) {

    // A. Efecto 3D Tilt y Spotlight en Tarjetas (.member-card, .card)
    const interactiveCards = document.querySelectorAll('.member-card, .card');

    interactiveCards.forEach((card) => {
      let rect = null;
      let rafId = null;

      const handleMouseMove = (e) => {
        if (!rect) rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Actualizar coordenadas para el efecto Spotlight CSS (radial-gradient)
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);

        // Calcular ángulo de inclinación 3D
        const xRatio = (x / rect.width) - 0.5;   // Rango: -0.5 a 0.5
        const yRatio = (y / rect.height) - 0.5;

        const maxTilt = 8; // Grados máximos de inclinación
        const tiltX = (yRatio * -maxTilt).toFixed(2);
        const tiltY = (xRatio * maxTilt).toFixed(2);

        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          card.style.transform = `perspective(900px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-5px) scale3d(1.02, 1.02, 1.02)`;
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

    // B. Resplandor Ambiental Dinámico en la sección Hero que sigue el cursor
    const heroSection = document.getElementById('heroSection');
    const heroAmbientGlow = document.getElementById('heroAmbientGlow');

    if (heroSection && heroAmbientGlow) {
      let heroRect = null;

      heroSection.addEventListener('mouseenter', () => {
        heroRect = heroSection.getBoundingClientRect();
      });

      heroSection.addEventListener('mousemove', (e) => {
        if (!heroRect) heroRect = heroSection.getBoundingClientRect();
        const offsetX = (e.clientX - (heroRect.left + heroRect.width / 2)) * 0.25;
        const offsetY = (e.clientY - (heroRect.top + heroRect.height / 2)) * 0.25;

        heroSection.style.setProperty('--hero-x', `${offsetX}px`);
        heroSection.style.setProperty('--hero-y', `${offsetY}px`);
      });

      heroSection.addEventListener('mouseleave', () => {
        heroSection.style.setProperty('--hero-x', '0px');
        heroSection.style.setProperty('--hero-y', '0px');
        heroRect = null;
      });
    }

  }

  /* --------------------------------------------------------------------------
     3. CONTROLADOR ACCESIBLE DEL MENÚ MÓVIL Y TABLET (HAMBURGUESA)
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

