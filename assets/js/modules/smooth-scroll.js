import { pinNavigation } from './headroom.js';

export function initSmoothScroll() {
  const scrollLinks = document.querySelectorAll('a.scroll-to, a.scroll, a[href^="#"]:not([href="#"])');
  
  scrollLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        e.preventDefault();

        const header = document.querySelector('.main-nav');
        // Aktuelle Höhe der Nav beim Klick messen
        const headerHeight = header ? header.offsetHeight : 80;
        const extraSpace = 20; 

        const rect = targetElement.getBoundingClientRect();
        const absoluteTop = rect.top + window.pageYOffset;
        const offsetTop = absoluteTop - headerHeight - extraSpace;

        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });

        // Navigation eingeblendet lassen/wiederholen
        pinNavigation();
      }
    });
  });
}