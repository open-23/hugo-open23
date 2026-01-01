import 'swiper/css';
import 'swiper/css/pagination';
import 'glightbox/dist/css/glightbox.css';

import { initCollapses } from './modules/collapse.js';
import { initScreenshotsSlider, initTestimonialSlider } from './modules/sliders.js';
import { initLightbox } from './modules/lightbox.js';
import { initHeadroom } from './modules/headroom.js';
import { initSmoothScroll } from './modules/smooth-scroll.js';
import { initStickyNav } from './modules/sticky-nav.js';

function init() {
  initCollapses();
  initHeadroom();
  initStickyNav();
  initSmoothScroll();
  initLightbox();
  initScreenshotsSlider();
  initTestimonialSlider();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}