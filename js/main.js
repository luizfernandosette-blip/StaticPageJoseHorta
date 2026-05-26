/* global */
'use strict';

// ---- Sticky Header ----
const header = document.getElementById('header');
const onScroll = () => {
  if (window.scrollY > 40) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }

  // Back to top
  const btt = document.getElementById('backToTop');
  if (btt) {
    if (window.scrollY > 400) {
      btt.classList.add('visible');
    } else {
      btt.classList.remove('visible');
    }
  }
};
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// ---- Mobile Nav Toggle ----
const navToggle = document.getElementById('navToggle');
const navMenu   = document.getElementById('navMenu');
const waIcon    = document.getElementById('waIcon');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const open = navMenu.classList.toggle('open');
    navToggle.querySelector('i').className = open ? 'fas fa-times' : 'fas fa-bars';
  });

  // Close on link click
  navMenu.querySelectorAll('.nav__link, .nav__btn').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      navToggle.querySelector('i').className = 'fas fa-bars';
    });
  });
}

// WhatsApp floating button is now a direct link — no JS needed.

// ---- Scroll Reveal ----
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll(
  '.treatment-card, .condition-item, .testimonial-card, .about__content, .about__image-wrap, .ozone__content, .ozone__image, .iteracare__info, .iteracare__video-wrap, .contact__info, .contact__form-wrap'
).forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

// ---- Contact Form → WhatsApp ----
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name      = document.getElementById('name').value.trim();
    const phone     = document.getElementById('phone').value.trim();
    const treatment = document.getElementById('treatment').value;
    const message   = document.getElementById('message').value.trim();

    if (!name || !phone) {
      alert('Por favor, preencha seu nome e WhatsApp.');
      return;
    }

    const treatmentLabels = {
      ozonioterapia: 'Ozonioterapia',
      acupuntura: 'Acupuntura',
      homeopatia: 'Homeopatia',
      coluna: 'Correção de Coluna',
      bioressonancia: 'Bioressonância Magnética',
      ortomolecular: 'Ortomolecular',
      florais: 'Florais / Florais Quânticos',
      'terapia-neural': 'Terapia Neural',
      iteracare: 'Iteracare',
      outro: 'Outro / Ainda não sei'
    };

    let text = `Olá! Meu nome é ${name} e gostaria de agendar uma consulta.`;
    if (treatment && treatmentLabels[treatment]) {
      text += `\nTratamento de interesse: ${treatmentLabels[treatment]}`;
    }
    if (message) {
      text += `\n\nObservações: ${message}`;
    }
    text += `\nMeu WhatsApp: ${phone}`;

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/5531984445256?text=${encoded}`, '_blank', 'noopener,noreferrer');
  });
}

// ---- Smooth Scroll for anchor links ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h') || '72');
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ---- Active nav link on scroll ----
const sections = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav__link');

const activeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${entry.target.id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => activeObserver.observe(s));

// ---- Lightbox ----
function openLightbox(imgEl) {
  const lb = document.getElementById('lightbox');
  const lbImg = document.getElementById('lightboxImg');
  lbImg.src = imgEl.src;
  lbImg.alt = imgEl.alt;
  lb.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lb = document.getElementById('lightbox');
  lb.classList.remove('active');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeLightbox();
});
