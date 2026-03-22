/* ═══════════════════════════════════════════
   DIPAK GOHIL — PORTFOLIO SCRIPTS
═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── 1. Navbar scroll effect ──────────────────── */
  const navbar = document.getElementById('navbar');

  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();


  /* ── 2. Active nav link on scroll ────────────────── */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.classList.toggle('active', link.dataset.section === id);
          });
        }
      });
    },
    { threshold: 0.35, rootMargin: '-60px 0px -35% 0px' }
  );

  sections.forEach(sec => sectionObserver.observe(sec));


  /* ── 3. Smooth scroll on nav click ───────────────── */
  document.querySelectorAll('a[href^="#"], .mobile-link[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    });
  });


  /* ── 4. Mobile menu ──────────────────────────────── */
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  const openMenu = () => {
    mobileMenu.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const closeMenu = () => {
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  };

  hamburger.addEventListener('click', () => {
    mobileMenu.classList.contains('open') ? closeMenu() : openMenu();
  });

  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  mobileMenu.addEventListener('click', (e) => {
    if (e.target === mobileMenu) closeMenu();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });


  /* ── 5. Fade-in on scroll ─────────────────────── */
  const fadeEls = document.querySelectorAll('.fade-in');

  const fadeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  fadeEls.forEach(el => fadeObserver.observe(el));


  /* ── 6. Hamburger animated state ─────────────────── */
  const spans = hamburger.querySelectorAll('span');

  const updateHamburger = () => {
    const isOpen = mobileMenu.classList.contains('open');
    spans[0].style.transform = isOpen ? 'translateY(7px) rotate(45deg)' : '';
    spans[1].style.opacity   = isOpen ? '0' : '';
    spans[2].style.transform = isOpen ? 'translateY(-7px) rotate(-45deg)' : '';
  };

  new MutationObserver(updateHamburger)
    .observe(mobileMenu, { attributes: true, attributeFilter: ['class'] });


  /* ── 7. Skill tag hover ripple ───────────────────── */
  document.querySelectorAll('.tag').forEach(tag => {
    tag.addEventListener('mouseenter', () => {
      tag.style.boxShadow = '0 0 12px rgba(201, 147, 42, 0.3)';
    });
    tag.addEventListener('mouseleave', () => {
      tag.style.boxShadow = '';
    });
  });


  /* ── 8. Stats count-up animation ─────────────────── */
  const stats = document.querySelectorAll('.stat__num');

  const parseNum  = (str) => parseFloat(str.replace(/[^0-9.]/g, ''));
  const getSuffix = (str) => str.replace(/[0-9.]/g, '');

  const countUp = (el, duration = 1800) => {
    const raw    = el.textContent.trim();
    const target = parseNum(raw);
    const suffix = getSuffix(raw);
    if (isNaN(target)) return;

    const start   = performance.now();
    const isFloat = String(target).includes('.');

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3);
      el.textContent = (isFloat ? (target * eased).toFixed(1) : Math.round(target * eased)) + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  };

  const heroObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => stats.forEach(s => countUp(s)), 400);
          heroObserver.disconnect();
        }
      });
    },
    { threshold: 0.4 }
  );

  const heroSection = document.getElementById('about');
  if (heroSection) heroObserver.observe(heroSection);


  /* ── 9. Parallax on hero circles ─────────────────── */
  const circleL = document.querySelector('.hero-circle--lg');
  const circleM = document.querySelector('.hero-circle--md');

  if (circleL && circleM) {
    window.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth  - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      circleL.style.transform = `translateY(-50%) translate(${x * 0.4}px, ${y * 0.4}px)`;
      circleM.style.transform = `translateY(-50%) translate(${x * 0.6}px, ${y * 0.6}px)`;
    }, { passive: true });
  }


  /* ── 10. Project link — prevent card hover swallow ── */
  // Ensure project link clicks don't bubble to the card hover
  document.querySelectorAll('.project-link').forEach(link => {
    link.addEventListener('click', (e) => e.stopPropagation());
  });


  /* ── 11. Resume download tracking (optional) ─────── */
  document.querySelectorAll('a[download]').forEach(link => {
    link.addEventListener('click', () => {
      // Can plug in analytics here if needed
      console.log('Resume downloaded');
    });
  });

});
