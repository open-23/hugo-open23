/**
 * Headroom Module - v0.12.0
 * Auto-hide header on scroll
 */

import Headroom from 'headroom.js';

export function initHeadroom() {
  const nav = document.querySelector('.main-nav');

  if (!nav) return;

  const headroom = new Headroom(nav, {
    offset: 100,
    tolerance: {
      up: 5,
      down: 0
    },
    classes: {
      initial: 'headroom',
      pinned: 'headroom--pinned',
      unpinned: 'headroom--unpinned',
      top: 'headroom--top',
      notTop: 'headroom--not-top',
      bottom: 'headroom--bottom',
      notBottom: 'headroom--not-bottom',
      frozen: 'headroom--frozen'
    }
  });

  headroom.init();
}
