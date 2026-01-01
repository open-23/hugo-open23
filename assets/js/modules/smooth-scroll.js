/**
 * Smooth Scroll Module - Vanilla JS
 * Handles scroll-to-top and scroll-to-section with offset
 */

export function initSmoothScroll() {
  // Scroll to top
  const topLinks = document.querySelectorAll('a[href="#top"]');
  topLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  });

  // Scroll to sections with offset
  // Support both .scroll-to and .scroll classes, plus hash links
  const scrollLinks = document.querySelectorAll('a.scroll-to, a.scroll, a[href^="#"]:not([href="#"])');
  scrollLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');

      // Skip if not a valid hash link
      if (!targetId || !targetId.startsWith('#')) return;

      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        e.preventDefault();

        // Calculate header height dynamically + additional spacing
        const header = document.querySelector('.main-nav');
        const headerHeight = header ? header.offsetHeight : 80;
        const extraSpace = 100; // Additional spacing for visual comfort (adjusted for desktop header)

        // If target is a section, try to scroll to .section-title instead
        let scrollTarget = targetElement;
        const sectionTitle = targetElement.querySelector('.section-title');
        if (sectionTitle) {
          scrollTarget = sectionTitle;
        }

        // Get absolute position from top of document
        const rect = scrollTarget.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const absoluteTop = rect.top + scrollTop;

        const offsetTop = absoluteTop - headerHeight - extraSpace;

        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
}
