// ====================================
// Sticky Header - משותף לכל הדפים
// ====================================
(() => {
  const stickyHeader = document.getElementById('stickyHeader');
  const heroLogo = document.querySelector('.hero-section .logo');
  const heroTitle = document.querySelector('.hero-section .hero-subtitle');

  if (!stickyHeader) return;

  const mqDesktop = window.matchMedia('(min-width: 768px)');
  let triggerY = 0;

  function getTriggerEl() {
    // Desktop: start when HERO LOGO touches the top.
    // Mobile: start when HERO TITLE ("העולם הבלתי נראה") touches the top.
    return mqDesktop.matches ? heroLogo : heroTitle;
  }

  function computeTriggerY() {
    const el = getTriggerEl();
    if (!el) { triggerY = 0; return; }
    // Calculate ONCE on load, not on every scroll
    triggerY = el.getBoundingClientRect().top + window.scrollY;
  }

  function setSticky(isOn) {
    document.body.classList.toggle('is-sticky', isOn);
    stickyHeader.classList.toggle('show', isOn);
  }

  function onScroll() {
    // Use the PRE-CALCULATED trigger position
    setSticky(window.scrollY >= triggerY);
  }

  const init = () => {
    computeTriggerY();
    onScroll();
  };

  window.addEventListener('scroll', onScroll, { passive: true });

  let resizeTimer = null;
  const onResize = () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(init, 120);
  };

  window.addEventListener('resize', onResize, { passive: true });
  mqDesktop.addEventListener?.('change', init);

  window.addEventListener('load', init);
  init();
})();

// ====================================
// Hero Fade-in - משותף לכל הדפים
// ====================================
window.addEventListener('DOMContentLoaded', () => {
  const hero = document.getElementById('hero');
  if (hero) {
    requestAnimationFrame(() => hero.classList.add('is-visible'));
  }
});