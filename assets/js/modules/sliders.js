/**
 * Sliders Module - Swiper v11.1.15
 * Replacement for Slick Slider
 * Handles Screenshots (horizontal) and Testimonials (vertical)
 */

import Swiper from 'swiper';
import { Pagination, Autoplay } from 'swiper/modules';

/**
 * Screenshots Slider - Horizontal
 * 5 slides desktop, 3 tablet, 1 mobile
 */
export function initScreenshotsSlider() {
  const container = document.querySelector('.screenshots-slider');
  if (!container) return;

  // Convert existing structure to Swiper if needed
  if (!container.classList.contains('swiper')) {
    convertToSwiperStructure(container, 'screenshots-slider-item');
  }

  const swiper = new Swiper('.screenshots-slider', {
    modules: [Pagination, Autoplay],
    slidesPerView: 1,
    spaceBetween: 0,
    centeredSlides: true,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    speed: 500,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      576: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 3,
      },
      992: {
        slidesPerView: 5,
      },
    },
  });
}

/**
 * Testimonial Slider - Vertical (CRITICAL)
 * 3 slides, vertical direction, center mode, click-to-slide
 */
export function initTestimonialSlider() {
  const container = document.querySelector('.testimonial-slider');
  if (!container) return;

  // Convert existing structure to Swiper if needed
  if (!container.classList.contains('swiper')) {
    convertToSwiperStructure(container, 'testimonial-slider-item');
  }

  const swiper = new Swiper('.testimonial-slider', {
    modules: [Autoplay],
    direction: 'vertical',
    slidesPerView: 3,
    spaceBetween: 0,
    centeredSlides: true,
    loop: true,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    speed: 500,
    slideToClickedSlide: true,
  });

  // Add opacity effect for non-active slides
  swiper.on('slideChange', () => {
    const slides = container.querySelectorAll('.swiper-slide');
    slides.forEach((slide, index) => {
      if (index === swiper.activeIndex) {
        slide.style.opacity = '1';
      } else {
        slide.style.opacity = '0.5';
      }
    });
  });

  // Initial opacity
  swiper.emit('slideChange');
}

/**
 * Helper: Convert existing HTML structure to Swiper structure
 * Changes: .container > .container.swiper > .swiper-wrapper > .swiper-slide
 */
function convertToSwiperStructure(container, itemClass) {
  // Add swiper class to container
  container.classList.add('swiper');

  // Find all slide items
  const items = container.querySelectorAll(`.${itemClass}`);

  if (items.length === 0) return;

  // Create wrapper
  const wrapper = document.createElement('div');
  wrapper.className = 'swiper-wrapper';

  // Move items to wrapper and convert to swiper-slide
  items.forEach(item => {
    item.classList.add('swiper-slide');
    wrapper.appendChild(item);
  });

  // Clear container and add wrapper
  container.innerHTML = '';
  container.appendChild(wrapper);

  // Add pagination if needed (for screenshots)
  if (itemClass === 'screenshots-slider-item') {
    const pagination = document.createElement('div');
    pagination.className = 'swiper-pagination';
    container.appendChild(pagination);
  }
}
