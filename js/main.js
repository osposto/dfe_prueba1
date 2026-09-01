/**
 * ==========================================================================
 * TP1: Desarrollo de Sistemas Web Front End (2026)
 * Script Principal (Portada): js/main.js
 * Funcionalidad: 
 *   - Buscador interactivo y filtrado en tiempo real de habilidades
 *   - Efecto 3D Tilt dinámico y Spotlight en tarjetas al desplazar el mouse
 *   - Resplandor ambiental interactivo que sigue el cursor en la cabecera
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

  /* --------------------------------------------------------------------------
     1. BUSCADOR Y FILTRADO DINÁMICO DE INTEGRANTES
     -------------------------------------------------------------------------- */
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

});

