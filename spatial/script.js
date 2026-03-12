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

const accordion = document.querySelector('[data-accordion]');

if (accordion) {
  const items = Array.from(accordion.querySelectorAll('.accordion-item'));

  function closeItem(item) {
    const trigger = item.querySelector('.accordion-trigger');
    const panel = item.querySelector('.accordion-panel');

    if (!trigger || !panel) return;

    item.classList.remove('is-open');
    trigger.setAttribute('aria-expanded', 'false');
    panel.hidden = true;
  }

  function openItem(item) {
    const trigger = item.querySelector('.accordion-trigger');
    const panel = item.querySelector('.accordion-panel');

    if (!trigger || !panel) return;

    item.classList.add('is-open');
    trigger.setAttribute('aria-expanded', 'true');
    panel.hidden = false;
  }

  items.forEach((item) => {
    const trigger = item.querySelector('.accordion-trigger');
    const panel = item.querySelector('.accordion-panel');

    if (!trigger || !panel) return;

    const startsOpen = item.classList.contains('is-open');
    panel.hidden = !startsOpen;
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
