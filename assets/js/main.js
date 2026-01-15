import 'swiper/css';
import 'swiper/css/pagination';
import 'glightbox/dist/css/glightbox.css';

import { initCollapses } from './modules/collapse.js';
import { initScreenshotsSlider, initTestimonialSlider } from './modules/sliders.js';
import { initLightbox } from './modules/lightbox.js';

function init() {
  initCollapses();
  initLightbox();
  initScreenshotsSlider();
  initTestimonialSlider();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}