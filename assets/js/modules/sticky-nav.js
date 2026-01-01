/**
 * Sticky Navigation Module - Vanilla JS
 * Adds/removes 'nav-bg' class based on scroll position
 * Uses requestAnimationFrame for better performance
 */

export function initStickyNav() {
  const nav = document.querySelector('nav');
  if (!nav) return;

  let ticking = false;

  function updateNav() {
    if (window.scrollY > 0) {
      nav.classList.add('nav-bg');
    } else {
      nav.classList.remove('nav-bg');
    }
    ticking = false;
  }

  window.addEventListener('scroll', function() {
    if (!ticking) {
      requestAnimationFrame(updateNav);
      ticking = true;
    }
  });

  // Initial check
  updateNav();
}
