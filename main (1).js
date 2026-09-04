/* ============================================================
   DH Aluminium Windows & Doors — shared scripts
   Loaded by every page with <script src="main.js" defer></script>
   ============================================================ */

/* ── Mobile menu (keyboard accessible, ARIA kept in sync) ── */
(function () {
  const navLinks  = document.getElementById('navLinks');
  const hamburger = document.getElementById('hamburger');
  if (!navLinks || !hamburger) return;

  function setMenu(open) {
    navLinks.classList.toggle('open', open);
    hamburger.setAttribute('aria-expanded', String(open));
    hamburger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }

  hamburger.addEventListener('click', function () {
    setMenu(!navLinks.classList.contains('open'));
  });

  navLinks.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () { setMenu(false); });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) {
      setMenu(false);
      hamburger.focus();
    }
  });
})();

/* ── Scroll-triggered reveal animations ── */
(function () {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  // Respect the OS "reduce motion" setting
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    els.forEach(function (el) { el.classList.add('visible'); });
    return;
  }

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  els.forEach(function (el) { observer.observe(el); });
})();

/* ── Nav shadow on scroll (throttled with rAF) ── */
(function () {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  let queued = false;
  window.addEventListener('scroll', function () {
    if (queued) return;
    queued = true;
    requestAnimationFrame(function () {
      navbar.style.boxShadow = window.scrollY > 60
        ? '0 4px 30px rgba(26,18,8,0.12)'
        : 'none';
      queued = false;
    });
  }, { passive: true });
})();

/* ── Hero background zoom-in on load ── */
window.addEventListener('load', function () {
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) heroBg.style.transform = 'scale(1)';
});

/* ── Copyright year: never goes stale ── */
(function () {
  document.querySelectorAll('.js-year').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();

/* ── Formspree form handling ──────────────────────────────────
   Any <form> with data-formspree="<your-form-id>" is handled here.
   Shows inline status messages instead of browser alert() popups.
   ------------------------------------------------------------ */
(function () {
  const forms = document.querySelectorAll('form[data-formspree]');
  if (!forms.length) return;

  forms.forEach(function (form) {
    const endpoint = 'https://formspree.io/f/' + form.dataset.formspree;
    const btn      = form.querySelector('button[type="submit"]');
    const status   = form.querySelector('.form-status');

    function showStatus(message, kind) {
      if (!status) return;
      status.textContent = message;
      status.className = 'form-status is-visible is-' + kind;
    }

    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      // Let the browser show its own messages for empty required fields
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const originalText = btn ? btn.textContent : '';
      if (btn) { btn.textContent = 'Sending…'; btn.disabled = true; }
      if (status) status.className = 'form-status';

      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          body: new FormData(form),
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          window.location.href = 'thankyou.html';
          return;
        }

        // Formspree returns field-level errors in JSON — surface them
        let msg = 'Something went wrong. Please try again, or call us on 03 7047 5652.';
        try {
          const data = await response.json();
          if (data && Array.isArray(data.errors) && data.errors.length) {
            msg = data.errors.map(function (err) { return err.message; }).join(' ');
          }
        } catch (_) { /* keep the default message */ }

        showStatus(msg, 'error');
      } catch (err) {
        showStatus(
          'We couldn\u2019t send your message — please check your connection, or call us on 03 7047 5652.',
          'error'
        );
      } finally {
        if (btn) { btn.textContent = originalText; btn.disabled = false; }
      }
    });
  });
})();
