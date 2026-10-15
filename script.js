/**
 * Portfolio — script.js
 * Levaku Naga Mallikarjun
 * Handles: nav, theme toggle, scroll reveal, role type animation,
 *          project filters, contact form validation, back-to-top.
 */

'use strict';

/* ===== CONFIGURATION ===== */
const CONFIG = {
  email:    'levakumallikarjun@gmail.com',
  linkedin: 'https://www.linkedin.com/in/levaku-mallikarjun/',
  github:   'https://github.com/MalliKarJun901428',
  roles: [
    'Full Stack Developer',
    'Java Developer',
    'AI & ML Enthusiast',
  ],
};

/* ===== HELPERS ===== */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/* ===================================================================
   1. THEME TOGGLE
   =================================================================== */
(function initTheme() {
  const html   = document.documentElement;
  const toggle = $('#theme-toggle');
  const stored = localStorage.getItem('portfolio-theme');

  const applyTheme = (theme) => {
    html.setAttribute('data-theme', theme);
    toggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`);
  };

  applyTheme(stored || 'dark');

  toggle.addEventListener('click', () => {
    const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem('portfolio-theme', next);
  });
})();

/* ===================================================================
   2. NAVBAR — sticky scroll shadow + hamburger + active link
   =================================================================== */
(function initNavbar() {
  const navbar    = $('#navbar');
  const hamburger = $('#hamburger');
  const navMenu   = $('#nav-menu');
  const navLinks  = $$('.nav-link');

  /* Scroll shadow */
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 20);

    /* Back-to-top */
    const btn = $('#back-to-top');
    btn.classList.toggle('visible', window.scrollY > 400);
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  /* Hamburger toggle */
  hamburger.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  /* Close menu on link click */
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  /* Active section highlight via IntersectionObserver */
  const sections = $$('section[id]');
  const observerOptions = {
    rootMargin: '-50% 0px -40% 0px',
    threshold: 0,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        const active = $$(`.nav-link[data-section="${entry.target.id}"]`);
        active.forEach(l => l.classList.add('active'));
      }
    });
  }, observerOptions);

  sections.forEach(s => observer.observe(s));
})();

/* ===================================================================
   3. SCROLL REVEAL
   =================================================================== */
(function initReveal() {
  const reveals = $$('.reveal');

  if (!reveals.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, idx) => {
        if (entry.isIntersecting) {
          // Stagger siblings slightly
          const siblings = $$(`.reveal`, entry.target.parentElement);
          const sibIdx   = siblings.indexOf(entry.target);
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, sibIdx * 80);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  reveals.forEach(el => observer.observe(el));
})();

/* ===================================================================
   4. HERO ROLE TYPEWRITER
   =================================================================== */
(function initTypewriter() {
  const el = $('#role-text');
  if (!el) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    el.textContent = CONFIG.roles[0];
    return;
  }

  const roles    = CONFIG.roles;
  let roleIdx    = 0;
  let charIdx    = 0;
  let deleting   = false;
  const typeSpeed   = 80;
  const deleteSpeed = 45;
  const pauseAfter  = 1800;
  const pauseBefore = 400;

  const tick = () => {
    const current = roles[roleIdx];

    if (!deleting) {
      el.textContent = current.slice(0, charIdx + 1);
      charIdx++;
      if (charIdx === current.length) {
        deleting = true;
        setTimeout(tick, pauseAfter);
        return;
      }
      setTimeout(tick, typeSpeed);
    } else {
      el.textContent = current.slice(0, charIdx - 1);
      charIdx--;
      if (charIdx === 0) {
        deleting  = false;
        roleIdx   = (roleIdx + 1) % roles.length;
        setTimeout(tick, pauseBefore);
        return;
      }
      setTimeout(tick, deleteSpeed);
    }
  };

  tick();
})();

/* ===================================================================
   5. PROJECT FILTERS
   =================================================================== */
(function initFilters() {
  const filterBtns = $$('.filter-btn');
  const cards      = $$('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');

      const filter = btn.dataset.filter;

      cards.forEach(card => {
        const cat = card.dataset.category;
        const show = filter === 'all' || cat === filter;
        card.classList.toggle('hidden', !show);
        // Reset animation so cards re-reveal nicely
        if (show) {
          card.style.opacity = '1';
          card.style.transform = 'none';
        }
      });
    });
  });
})();

/* ===================================================================
   6. CONTACT FORM VALIDATION + MAILTO
   =================================================================== */
(function initForm() {
  const form    = $('#contact-form');
  if (!form) return;

  const fields  = {
    name:    { el: $('#contact-name'),    err: $('#name-error'),    label: 'Name' },
    email:   { el: $('#contact-email'),   err: $('#email-error'),   label: 'Email' },
    subject: { el: $('#contact-subject'), err: $('#subject-error'), label: 'Subject' },
    message: { el: $('#contact-message'), err: $('#message-error'), label: 'Message' },
  };

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const validate = (key, showError = true) => {
    const { el, err, label } = fields[key];
    const val = el.value.trim();
    let msg = '';

    if (!val) {
      msg = `${label} is required.`;
    } else if (key === 'email' && !EMAIL_RE.test(val)) {
      msg = 'Please enter a valid email address.';
    } else if (key === 'message' && val.length < 10) {
      msg = 'Message must be at least 10 characters.';
    }

    if (showError) {
      el.classList.toggle('error', !!msg);
      err.textContent = msg;
    }
    return !msg;
  };

  // Live validation on blur
  Object.keys(fields).forEach(key => {
    fields[key].el.addEventListener('blur', () => validate(key));
    fields[key].el.addEventListener('input', () => {
      if (fields[key].el.classList.contains('error')) validate(key);
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const allValid = Object.keys(fields).map(k => validate(k)).every(Boolean);
    if (!allValid) {
      // Focus first invalid
      const first = Object.values(fields).find(f => f.el.classList.contains('error'));
      if (first) first.el.focus();
      return;
    }

    const { el: nameEl }    = fields.name;
    const { el: emailEl }   = fields.email;
    const { el: subjectEl } = fields.subject;
    const { el: msgEl }     = fields.message;

    const mailtoLink = `mailto:${CONFIG.email}`
      + `?subject=${encodeURIComponent(subjectEl.value.trim())}`
      + `&body=${encodeURIComponent(
          `Hi Mallikarjun,\n\n${msgEl.value.trim()}\n\n— ${nameEl.value.trim()} (${emailEl.value.trim()})`
        )}`;

    window.location.href = mailtoLink;
  });
})();

/* ===================================================================
   7. BACK TO TOP
   =================================================================== */
(function initBackToTop() {
  const btn = $('#back-to-top');
  if (!btn) return;
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

/* ===================================================================
   8. DYNAMIC COPYRIGHT YEAR
   =================================================================== */
(function setCopyright() {
  const el = $('#year');
  if (el) el.textContent = new Date().getFullYear();
})();

/* ===================================================================
   9. SMOOTH SCROLL FOR ANCHOR LINKS
   =================================================================== */
(function initSmoothScroll() {
  document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a[href^="#"]');
    if (!anchor) return;
    const target = document.getElementById(anchor.getAttribute('href').slice(1));
    if (target) {
      e.preventDefault();
      const navH = 68;
      const top  = target.getBoundingClientRect().top + window.scrollY - navH;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
})();
