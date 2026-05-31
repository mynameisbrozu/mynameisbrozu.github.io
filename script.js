/* ══════════════════════════════════════════════
   PORTFOLIO · script.js
══════════════════════════════════════════════ */

// ── Smooth scroll for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // Close mobile menu if open
    navLinks.classList.remove('open');
  });
});


// ── Navbar: scroll shadow + active link
const navbar   = document.getElementById('navbar');
const sections = document.querySelectorAll('.section[id]');
const navLinkEls = document.querySelectorAll('.nav-link');

function onScroll() {
  // shadow
  navbar.classList.toggle('scrolled', window.scrollY > 20);

  // active section
  let current = '';
  sections.forEach(sec => {
    const top = sec.getBoundingClientRect().top;
    if (top <= 100) current = sec.id;
  });
  navLinkEls.forEach(link => {
    link.classList.toggle('active', link.dataset.section === current);
  });
}

window.addEventListener('scroll', onScroll, { passive: true });
onScroll(); // run once


// ── Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks  = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});


// ── Intersection Observer: reveal elements
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));


// ── Intersection Observer: skill bars
const skillObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.skill-fill').forEach(bar => {
        bar.classList.add('animated');
      });
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

const skillBars = document.querySelector('.skill-bars');
if (skillBars) skillObserver.observe(skillBars);


// ── Project filter
const filterBtns   = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active button
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    projectCards.forEach(card => {
      const tags = card.dataset.tags || '';
      if (filter === 'all' || tags.includes(filter)) {
        card.classList.remove('hidden');
        // Re-trigger entrance animation
        card.style.animation = 'none';
        card.offsetHeight; // reflow
        card.style.animation = '';
      } else {
        card.classList.add('hidden');
      }
    });
  });
});


// ── Contact form (frontend-only, demo behaviour)
const contactForm = document.getElementById('contactForm');
const formNote    = document.getElementById('formNote');

if (contactForm) {
  contactForm.addEventListener('submit', e => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.querySelector('span').textContent = 'Enviando…';

    setTimeout(() => {
      formNote.textContent = '✓ Mensaje enviado. ¡Gracias, te respondo pronto!';
      contactForm.reset();
      btn.disabled = false;
      btn.querySelector('span').textContent = 'Enviar mensaje';
      setTimeout(() => { formNote.textContent = ''; }, 5000);
    }, 1200);
  });
}


// ── Add .reveal class to key blocks on load (progressive enhancement)
function addRevealClasses() {
  const targets = [
    '.section-header',
    '.filter-bar',
    '.project-card',
    '.about-bio-col',
    '.about-skills-col',
    '.cert-card',
    '.contact-info-col',
    '.contact-form-col',
  ];
  targets.forEach(sel => {
    document.querySelectorAll(sel).forEach((el, i) => {
      el.classList.add('reveal');
      el.style.transitionDelay = `${i * 0.07}s`;
      revealObserver.observe(el);
    });
  });
}
addRevealClasses();
