/* script.js — validation formulaire, top button, reveal on scroll, active nav */

document.addEventListener('DOMContentLoaded', function () {
  // 1) Active nav link
  (function setActiveNav() {
    const links = document.querySelectorAll('.nav-link');
    const path = window.location.pathname.split('/').pop() || 'index.html';
    links.forEach(a => {
      const href = a.getAttribute('href');
      if (href === path || (href === 'index.html' && path === '')) {
        a.classList.add('active');
      }
    });
  })();

  // 2) Reveal on scroll (IntersectionObserver)
  (function revealOnScroll() {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('show');
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
  })();

  // 3) Back to top button
  const topBtn = document.getElementById('topBtn');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) topBtn.style.display = 'block';
    else topBtn.style.display = 'none';
  });
  topBtn?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // 4) Contact form validation + fake send
  const form = document.getElementById('contactForm');
  if (form) {
    const msgEl = document.getElementById('formMsg');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('name')?.value.trim();
      const email = document.getElementById('email')?.value.trim();
      const message = document.getElementById('message')?.value.trim();
      // simple email regex
      const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!name || !email || !message) {
        msgEl.textContent = 'Veuillez remplir tous les champs obligatoires.';
        msgEl.style.color = '#ffb4b4';
        return;
      }
      if (!validEmail.test(email)) {
        msgEl.textContent = 'Adresse email invalide.';
        msgEl.style.color = '#ffb4b4';
        return;
      }
      // simulate send
      msgEl.style.color = '#bfe9ff';
      msgEl.textContent = 'Envoi en cours…';
      setTimeout(() => {
        msgEl.textContent = 'Merci ' + name + ' votre message a bien été envoyé. Je vous répondrai dans les plus brefs délais!';
        form.reset();
      }, 900);
    });
  }
});