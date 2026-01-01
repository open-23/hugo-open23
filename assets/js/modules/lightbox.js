/**
 * Lightbox Module - GLightbox v3.3.0
 * Replacement for Magnific Popup
 * Handles Video Popups (Vimeo, YouTube, Google Maps)
 */

import GLightbox from 'glightbox';

export function initLightbox() {
  const lightbox = GLightbox({
    selector: '.popup-vimeo, .popup-youtube, .popup-gmaps',
    touchNavigation: true,
    loop: false,
    autoplayVideos: false,
    plyr: {
      css: 'https://cdn.plyr.io/3.7.8/plyr.css',
      js: 'https://cdn.plyr.io/3.7.8/plyr.js',
      config: {
        ratio: '16:9',
        youtube: {
          noCookie: true,
          rel: 0,
          showinfo: 0,
          iv_load_policy: 3
        },
        vimeo: {
          byline: false,
          portrait: false,
          title: false
        }
      }
    }
  });
}
