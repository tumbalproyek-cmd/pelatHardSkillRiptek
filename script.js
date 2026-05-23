/* ===========================
   DODO PRASETYA — PORTFOLIO JS
=========================== */

document.addEventListener('DOMContentLoaded', () => {

  // ---- Custom Cursor ----
  const cursor      = document.getElementById('cursor');
  const cursorTrail = document.getElementById('cursorTrail');
  let mx = 0, my = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    cursor.style.left      = mx + 'px';
    cursor.style.top       = my + 'px';
    cursorTrail.style.left = mx + 'px';
    cursorTrail.style.top  = my + 'px';
  });

  const hoverTargets = document.querySelectorAll('a, button, .skill-card, .timeline-card');
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('cursor-hover');
      cursorTrail.classList.add('cursor-hover');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('cursor-hover');
      cursorTrail.classList.remove('cursor-hover');
    });
  });

  // ---- Nav Scroll ----
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  // ---- Mobile Menu ----
  const navToggle  = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');

  navToggle.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    navToggle.classList.toggle('active', isOpen);
    document.body.classList.toggle('menu-open', isOpen);
  });

  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      navToggle.classList.remove('active');
      document.body.classList.remove('menu-open');
    });
  });

  // ---- Intersection Observer — Reveal ----
  const revealEls = document.querySelectorAll('.reveal');
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach(el => revealObs.observe(el));

  // ---- Timeline Fade ----
  const timelineItems = document.querySelectorAll('.timeline-item');
  const tlObs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 100);
        tlObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.2 });

  timelineItems.forEach(el => tlObs.observe(el));

  // ---- Skill Bars Animation ----
  const skillBars = document.querySelectorAll('.skill-bar');
  const barObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const pct  = e.target.dataset.pct || 0;
        const fill = e.target.querySelector('.skill-bar-fill');
        if (fill) {
          fill.style.width = pct + '%';
        }
        barObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.4 });

  skillBars.forEach(bar => barObs.observe(bar));

  // ---- Counter Animation ----
  const statNums = document.querySelectorAll('.stat-num');
  const counterObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const target = parseInt(e.target.dataset.target, 10);
        animateCounter(e.target, target);
        counterObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });

  statNums.forEach(el => counterObs.observe(el));

  function animateCounter(el, target) {
    let start    = 0;
    const dur    = 1400;
    const step   = 16;
    const inc    = target / (dur / step);

    const tick = () => {
      start += inc;
      if (start >= target) {
        el.textContent = target;
        return;
      }
      el.textContent = Math.floor(start);
      requestAnimationFrame(tick);
    };
    tick();
  }

  // ---- Skill Cards Stagger ----
  const skillCards = document.querySelectorAll('.skill-card');
  const skillObs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => {
          e.target.style.opacity   = '1';
          e.target.style.transform = 'translateY(0)';
        }, i * 80);
        skillObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });

  skillCards.forEach(card => {
    card.style.opacity   = '0';
    card.style.transform = 'translateY(24px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    skillObs.observe(card);
  });

  // ---- Active Nav Link on Scroll ----
  const sections = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-links a');

  const activeObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const id = e.target.id;
        navLinks.forEach(link => {
          link.style.color = link.getAttribute('href') === '#' + id
            ? 'var(--text)'
            : '';
        });
      }
    });
  }, { threshold: 0.45 });

  sections.forEach(s => activeObs.observe(s));

  // ---- Smooth Scroll for all internal links ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // ---- Contact Form ----
  const form        = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');

  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn  = form.querySelector('button[type="submit"]');
      const orig = btn.querySelector('span').textContent;

      btn.disabled = true;
      btn.querySelector('span').textContent = 'Mengirim...';

      // Simulate send delay
      setTimeout(() => {
        form.reset();
        btn.querySelector('span').textContent = orig;
        btn.disabled = false;
        formSuccess.classList.add('show');

        setTimeout(() => formSuccess.classList.remove('show'), 5000);
      }, 1600);
    });
  }

  // ---- Parallax Doodles on Mouse Move ----
  const doodles = document.querySelectorAll('.doodle');
  document.addEventListener('mousemove', e => {
    const cx = window.innerWidth  / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;

    doodles.forEach((d, i) => {
      const speed  = (i + 1) * 6;
      const tx     = dx * speed;
      const ty     = dy * speed;
      d.style.transform = `translate(${tx}px, ${ty}px)`;
    });
  });

  // ---- Tilt Effect on Cards ----
  const tiltCards = document.querySelectorAll('.skill-card, .timeline-card');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect   = card.getBoundingClientRect();
      const cx     = rect.left + rect.width  / 2;
      const cy     = rect.top  + rect.height / 2;
      const dx     = (e.clientX - cx) / (rect.width  / 2);
      const dy     = (e.clientY - cy) / (rect.height / 2);
      const tiltX  = dy * -4;
      const tiltY  = dx *  4;
      card.style.transform = `perspective(600px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // ---- Sticky Notes Wobble on Hover ----
  const stickyNotes = document.querySelectorAll('.sticky-note');
  stickyNotes.forEach(note => {
    note.addEventListener('mouseenter', () => {
      note.style.transform += ' scale(1.08)';
    });
    note.addEventListener('mouseleave', () => {
      // reset to original rotation
      const isNote1 = note.classList.contains('note-1');
      note.style.transform = isNote1 ? 'rotate(6deg)' : 'rotate(-5deg)';
    });
  });

  // ---- Typing Effect in Hero ----
  const roleText  = 'Junior Visual Designer';
  const roleBadge = document.querySelector('.role-badge');
  if (roleBadge) {
    roleBadge.textContent = '';
    let idx = 0;
    const type = () => {
      if (idx < roleText.length) {
        roleBadge.textContent += roleText[idx++];
        setTimeout(type, 60);
      }
    };
    setTimeout(type, 1200);
  }

  // ---- Section Enter Animations ----
  const sectionTitles = document.querySelectorAll('.section-title');
  const titleObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity    = '1';
        e.target.style.transform  = 'translateY(0)';
        titleObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.2 });

  sectionTitles.forEach(t => {
    t.style.opacity    = '0';
    t.style.transform  = 'translateY(20px)';
    t.style.transition = 'opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s';
    titleObs.observe(t);
  });

  // ---- Section Labels fade ----
  const sectionLabels = document.querySelectorAll('.section-label');
  const labelObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity    = '1';
        e.target.style.transform  = 'translateX(0)';
        labelObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.3 });

  sectionLabels.forEach(l => {
    l.style.opacity    = '0';
    l.style.transform  = 'translateX(-12px)';
    l.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    labelObs.observe(l);
  });

});
