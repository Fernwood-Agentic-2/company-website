const body = document.body;

const siteHeader = document.querySelector('.site-header');
if (siteHeader) {
  const onScroll = () => siteHeader.classList.toggle('scrolled', window.scrollY > 10);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('#mobile-menu');

function setMenuState(open) {
  if (!menuToggle || !mobileMenu) return;

  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  mobileMenu.hidden = !open;
  body.classList.toggle('menu-open', open);
}

if (menuToggle && mobileMenu) {
  setMenuState(false);

  menuToggle.addEventListener('click', () => {
    const currentlyOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    setMenuState(!currentlyOpen);
  });

  mobileMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setMenuState(false));
  });

  mobileMenu.addEventListener('click', (event) => {
    if (event.target === mobileMenu) {
      setMenuState(false);
    }
  });

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      setMenuState(false);
    }
  });

  window.addEventListener('resize', () => {
    if (window.matchMedia('(min-width: 769px)').matches) {
      setMenuState(false);
    }
  });
}

// ── Count-up stats ──
const countEls = document.querySelectorAll('.count-up');

if (countEls.length && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      observer.unobserve(entry.target);

      const el = entry.target;
      const target = parseFloat(el.dataset.target);
      const prefix = el.dataset.prefix || '';
      const suffix = el.dataset.suffix || '';
      const separator = el.dataset.separator || '';
      const isDecimal = target % 1 !== 0;
      const duration = 1600;
      const start = performance.now();

      function format(val) {
        if (isDecimal) {
          return prefix + val.toFixed(1) + suffix;
        }
        const rounded = Math.round(val);
        return prefix + (separator ? rounded.toLocaleString('en-CA') : rounded) + suffix;
      }

      function tick(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // ease out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = format(eased * target);
        if (progress < 1) requestAnimationFrame(tick);
      }

      requestAnimationFrame(tick);
    });
  }, { threshold: 0.4 });

  countEls.forEach((el) => observer.observe(el));
}

const accordion = document.querySelector('[data-accordion]');

if (accordion) {
  const items = Array.from(accordion.querySelectorAll('.accordion-item'));

  function closeItem(item) {
    const trigger = item.querySelector('.accordion-trigger');
    if (!trigger) return;
    item.classList.remove('is-open');
    trigger.setAttribute('aria-expanded', 'false');
  }

  function openItem(item) {
    const trigger = item.querySelector('.accordion-trigger');
    if (!trigger) return;
    item.classList.add('is-open');
    trigger.setAttribute('aria-expanded', 'true');
  }

  items.forEach((item) => {
    const trigger = item.querySelector('.accordion-trigger');
    const panel = item.querySelector('.accordion-panel');

    if (!trigger || !panel) return;

    // Remove HTML hidden attr — animation is CSS-only now
    panel.removeAttribute('hidden');

    const startsOpen = item.classList.contains('is-open');
    trigger.setAttribute('aria-expanded', String(startsOpen));

    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');

      items.forEach((other) => {
        if (other !== item) closeItem(other);
      });

      if (isOpen) {
        closeItem(item);
      } else {
        openItem(item);
      }
    });
  });
}
