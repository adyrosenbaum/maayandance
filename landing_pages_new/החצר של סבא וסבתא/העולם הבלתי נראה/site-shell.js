// ====================================
// Shared Header + Footer
// ====================================
(() => {
  function renderHeader() {
    const headerMount = document.getElementById('site-header');
    if (!headerMount) return;

    const title = document.body.dataset.heroTitle || 'העולם הבלתי נראה';
    const subtitle1 = document.body.dataset.heroSubtitle1 || 'מסע דרך המדע';
    const subtitle2 = document.body.dataset.heroSubtitle2 || 'אל תוך המסתורין של העולם';

    headerMount.innerHTML = `
      <div class="sticky-header" id="stickyHeader">
        <div class="sticky-header-logos" aria-label="לוגואים">
          <img src="images/logo_hazer1.png" alt="לוגו החצר של סבא וסבתא" class="sticky-header-logo">
          <img src="images/logo_erez_ir1.png" alt="לוגו ארץ עיר" class="sticky-header-logo">
          <img src="images/logo_olam1.png" alt="לוגו העולם הבלתי נראה" class="sticky-header-logo">
        </div>

        <div class="sticky-header-text">
          <h2 class="sticky-header-title">${title}</h2>
          <p class="sticky-header-subtitle">
            <span>${subtitle1}</span>
            <span>${subtitle2}</span>
          </p>
        </div>

        <div class="sticky-header-spacer" aria-hidden="true"></div>
      </div>

      <section class="hero-section" id="hero">
        <div class="hero-content">
          <div class="hero-logos" aria-label="לוגואים">
            <img src="images/logo_hazer.png" alt="לוגו החצר של סבא וסבתא" class="logo hero-logo">
            <img src="images/logo_erez_ir.png" alt="לוגו ארץ עיר" class="logo hero-logo">
            <img src="images/logo_olam.png" alt="לוגו העולם הבלתי נראה" class="logo hero-logo">
          </div>

          <h1 class="hero-subtitle hero-title">${title}</h1>

          <p class="hero-description hero-tagline">
            ${subtitle1}<br>${subtitle2}
          </p>
        </div>
      </section>
    `;
  }

  function renderFooter() {
    const footerMount = document.getElementById('site-footer');
    if (!footerMount) return;

    footerMount.innerHTML = `
      <footer class="footer">
        <div class="container">
          <p>החצר של סבא וסבתא | העולם הבלתי נראה</p>
          <p>
            ליצירת קשר:
            <a href="tel:050-6395727">מעיין - 050-6395727</a> |
            <a href="mailto:saba.savta.yard@gmail.com">saba.savta.yard@gmail.com</a>
          </p>
        </div>
      </footer>
    `;
  }

  function initStickyHeader() {
    const stickyHeader = document.getElementById('stickyHeader');
    const heroLogo = document.querySelector('.hero-section .hero-logos');
    const heroTitle = document.querySelector('.hero-section .hero-subtitle');

    if (!stickyHeader) return;

    const mqDesktop = window.matchMedia('(min-width: 768px)');
    let triggerY = 0;

    function getTriggerEl() {
      return mqDesktop.matches ? heroLogo : heroTitle;
    }

    function computeTriggerY() {
      const el = getTriggerEl();
      if (!el) {
        triggerY = 0;
        return;
      }
      triggerY = el.getBoundingClientRect().top + window.scrollY;
    }

    function setSticky(isOn) {
      document.body.classList.toggle('is-sticky', isOn);
      stickyHeader.classList.toggle('show', isOn);
    }

    function onScroll() {
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
  }

  function initHeroFadeIn() {
    const hero = document.getElementById('hero');
    if (!hero) return;

    requestAnimationFrame(() => {
      hero.classList.add('is-visible');
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    renderHeader();
    renderFooter();
    initStickyHeader();
    initHeroFadeIn();
  });
})();