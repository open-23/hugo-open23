import Headroom from 'headroom.js';

let headroomInstance; // Ermöglicht Zugriff für andere Module

export function initHeadroom() {
  const nav = document.querySelector('.main-nav');
  if (!nav) return;

  headroomInstance = new Headroom(nav, {
    offset: 100,
    tolerance: { up: 5, down: 10 },
    classes: {
      initial: 'headroom',
      pinned: 'headroom--pinned',
      unpinned: 'headroom--unpinned',
      top: 'headroom--top',
      notTop: 'headroom--not-top'
    }
  });
  headroomInstance.init();
}

export function pinNavigation() {
  if (headroomInstance) headroomInstance.pin();
}

// Neu: Verhindert, dass Headroom auf Scroll-Events reagiert
export function freezeHeadroom() {
  if (headroomInstance) headroomInstance.freeze();
}

// Neu: Reaktiviert Headroom
export function unfreezeHeadroom() {
  if (headroomInstance) headroomInstance.unfreeze();
}