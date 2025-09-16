/* script.js — nav active, reveal, top button, form validation, burger menu */
document.addEventListener('DOMContentLoaded', () => {

  // === 1) Active nav link ===
  (() => {
    const links = document.querySelectorAll('.nav-link');
    const path = window.location.pathname.split('/').pop() || 'index.html';
    links.forEach(a => {
      const href = a.getAttribute('href');
      if (href === path || (href === 'index.html' && path === '')) {
        a.classList.add('active');
      }
    });
  })();

  // === 2) Reveal on scroll ===
  (() => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('show');
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
  })();

  // === 3) Back to top button ===
  const topBtn = document.getElementById('topBtn');
  const showTopBtn = () => {
    if (window.scrollY > 300) topBtn.style.display = 'block';
    else topBtn.style.display = 'none';
  };
  window.addEventListener('scroll', showTopBtn);

  topBtn?.addEventListener('click', () => {
    const scrollStep = () => {
      const pos = window.scrollY;
      if (pos > 0) {
        window.scrollTo(0, pos - pos / 8);
        requestAnimationFrame(scrollStep);
      }
    };
    requestAnimationFrame(scrollStep);
  });

  // === 4) Contact form validation + Formspree ===
  const form = document.getElementById('contactForm');
  if (form) {
    const msgEl = document.getElementById('formMsg');
    msgEl.setAttribute('aria-live', 'assertive');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();
      const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!name || !email || !message) {
        msgEl.textContent = '⚠️ Veuillez remplir tous les champs obligatoires.';
        msgEl.style.color = '#ff6b6b';
        return;
      }
      if (!validEmail.test(email)) {
        msgEl.textContent = '❌ Adresse email invalide.';
        msgEl.style.color = '#ff6b6b';
        form.email.classList.add('shake');
        setTimeout(() => form.email.classList.remove('shake'), 400);
        return;
      }

      msgEl.style.color = '#38bdf8';
      msgEl.textContent = '⏳ Envoi en cours…';

      try {
        const res = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { 'Accept': 'application/json' }
        });

        if (res.ok) {
          msgEl.style.color = '#4ade80';
          msgEl.textContent = `✔️ Merci ${name}, votre message a bien été envoyé !`;
          form.reset();
        } else {
          msgEl.style.color = '#ff6b6b';
          msgEl.textContent = '⚠️ Une erreur est survenue, merci de réessayer.';
        }
      } catch (err) {
        msgEl.style.color = '#ff6b6b';
        msgEl.textContent = '❌ Erreur réseau, vérifiez votre connexion.';
      }
    });
  }

  // === 5) Menu burger ===
  const burger = document.getElementById('burger');
  const nav = document.querySelector('.nav-links');

  if (burger && nav) {
    burger.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      burger.setAttribute('aria-expanded', isOpen);
    });

    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (nav.classList.contains('open')) {
          nav.classList.remove('open');
          burger.setAttribute('aria-expanded', false);
        }
      });
    });
  }
});
