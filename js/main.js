/**
 * Grace Onyinye Peters — Portfolio
 * main.js — Interactivity & Animations
 */

'use strict';

/* ============================================================
   NAVIGATION: scroll-aware styling + mobile menu
   ============================================================ */
(function initNav() {
  const nav       = document.getElementById('nav');
  const toggle    = document.getElementById('nav-toggle');
  const navLinks  = document.getElementById('nav-links');
  const allLinks  = navLinks ? navLinks.querySelectorAll('a') : [];

  if (!nav || !toggle || !navLinks) return;

  /* Scroll: add .scrolled class when past hero */
  const onScroll = () => {
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load

  /* Toggle mobile menu */
  toggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    toggle.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  /* Close menu on link click (mobile) */
  allLinks.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open navigation menu');
      document.body.style.overflow = '';
    });
  });

  /* Close menu on Escape key */
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) {
      navLinks.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      toggle.focus();
    }
  });

  /* Active nav link on scroll (highlight current section) */
  const sections = document.querySelectorAll('section[id], article[id]');
  const updateActiveLink = () => {
    let current = '';
    sections.forEach(section => {
      const offset = section.offsetTop - 100;
      if (window.scrollY >= offset) {
        current = section.getAttribute('id');
      }
    });
    allLinks.forEach(link => {
      link.classList.remove('nav__link--active');
      const href = link.getAttribute('href');
      if (href && href === '#' + current) {
        link.classList.add('nav__link--active');
      }
    });
  };
  window.addEventListener('scroll', updateActiveLink, { passive: true });
})();


/* ============================================================
   REVEAL ON SCROLL — Intersection Observer
   ============================================================ */
(function initReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger delay based on sibling position
        const siblings = entry.target.parentElement
          ? Array.from(entry.target.parentElement.children).filter(el => el.classList.contains('reveal'))
          : [];
        const index = siblings.indexOf(entry.target);
        const delay = Math.min(index * 80, 400); // max 400ms stagger

        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);

        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(el => observer.observe(el));
})();


/* ============================================================
   SMOOTH SCROLL — for anchor links
   ============================================================ */
(function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const navHeight = document.getElementById('nav')?.offsetHeight || 64;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight;

      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();


/* ============================================================
   CONTACT FORM — mailto fallback
   ============================================================ */
(function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const name    = (document.getElementById('contact-name')?.value || '').trim();
    const email   = (document.getElementById('contact-email')?.value || '').trim();
    const subject = (document.getElementById('contact-subject')?.value || 'General Enquiry').trim();
    const message = (document.getElementById('contact-message')?.value || '').trim();

    // Basic validation
    if (!name || !email || !message) {
      showFormMessage(form, 'Please fill in your name, email, and message.', 'error');
      return;
    }

    if (!isValidEmail(email)) {
      showFormMessage(form, 'Please enter a valid email address.', 'error');
      return;
    }

    const emailBody = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Subject: ${subject}`,
      '',
      message
    ].join('\n');

    const mailtoHref =
      `mailto:gracioustracy@gmail.com` +
      `?subject=${encodeURIComponent(subject + ' — from ' + name)}` +
      `&body=${encodeURIComponent(emailBody)}`;

    window.location.href = mailtoHref;

    showFormMessage(form, 'Your email client should open now. If not, please email gracioustracy@gmail.com directly.', 'success');
    form.reset();
  });

  function isValidEmail(val) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  }

  function showFormMessage(form, text, type) {
    // Remove any existing message
    const existing = form.querySelector('.form-message');
    if (existing) existing.remove();

    const msg = document.createElement('p');
    msg.className = 'form-message';
    msg.textContent = text;
    msg.style.cssText = [
      'font-size: 0.875rem',
      'margin-top: 0.75rem',
      'text-align: center',
      'padding: 0.625rem 1rem',
      'border-radius: 0.5rem',
      'font-weight: 500',
      type === 'error'
        ? 'color: #fca5a5; background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.25)'
        : 'color: #6ee7b7; background: rgba(16,185,129,0.1); border: 1px solid rgba(16,185,129,0.25)'
    ].join(';');

    form.appendChild(msg);

    // Auto-remove after 6s
    setTimeout(() => msg.remove(), 6000);
  }
})();


/* ============================================================
   LINKEDIN PLACEHOLDER — warn if not set
   ============================================================ */
(function initLinkedinLink() {
  const link = document.getElementById('linkedin-link');
  if (!link) return;

  if (link.getAttribute('href') === '#') {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      alert('LinkedIn URL not yet configured. Please update the href in index.html (search for "linkedin-link").');
    });

    // Visual hint that it's a placeholder
    link.title = 'LinkedIn URL — to be configured';
  }
})();


/* ============================================================
   FOOTER YEAR
   ============================================================ */
(function setYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
})();


/* ============================================================
   CASE STUDY SCROLL TARGET — offset for sticky nav
   ============================================================ */
(function initCaseStudyLinks() {
  // Project cards link to case study anchors.
  // The scroll is handled by the global smooth scroll function above.
  // No additional logic needed here — just confirming the IDs align.
  // case-study-1 → #case-study-1
  // case-study-2 → #case-study-2
})();


/* ============================================================
   KEYBOARD ACCESSIBILITY — focus visible
   ============================================================ */
(function initFocusVisible() {
  // Add :focus-visible polyfill behaviour:
  // Only show focus ring when navigating by keyboard, not by mouse.
  let usingKeyboard = false;

  document.addEventListener('mousedown', () => { usingKeyboard = false; });
  document.addEventListener('keydown',   () => { usingKeyboard = true; });

  document.addEventListener('focusin', e => {
    if (!usingKeyboard) {
      e.target.setAttribute('data-focus-mouse', 'true');
    }
  });
  document.addEventListener('focusout', e => {
    e.target.removeAttribute('data-focus-mouse');
  });
})();
