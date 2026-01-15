/**
 * @file This file contains a custom implementation of the Bootstrap collapse component.
 * @module assets/js/modules/collapse
 *
 * @description This module handles the functionality for navigation and collapse elements on the page,
 * including navbar toggles, FAQ accordions, auto-closing mobile menus, and sticky navigation.
 *
 * @note This is a custom implementation of the Bootstrap collapse functionality.
 * For better maintainability, accessibility, and compatibility, it is recommended
 * to replace this with the official Bootstrap Collapse plugin. The project already includes
 * Bootstrap's JS dependencies, so you can leverage the native plugin without adding
 * extra weight, especially with modern tree-shaking bundlers.
 * The `data-parent` attribute logic is also custom here; the native BS5 equivalent
 * is `data-bs-parent`.
 *
 * Handles: Navbar Toggles, FAQ Accordion, Auto-Close on Link-Click, and Sticky-State
 */

export function initCollapses() {
  const triggers = document.querySelectorAll('[data-bs-toggle="collapse"]');

  triggers.forEach(trigger => {
    trigger.addEventListener('click', function(e) {
      e.preventDefault();
      const targetSelector = this.getAttribute('data-bs-target');
      const target = document.querySelector(targetSelector);
      if (!target) return;

      const parent = this.getAttribute('data-parent');
      const isExpanded = target.classList.contains('show');

      if (parent) {
        const parentElement = document.querySelector(parent);
        if (parentElement) {
          const siblings = parentElement.querySelectorAll('.collapse.show');
          siblings.forEach(sibling => {
            if (sibling !== target) {
              collapse(sibling);
              const siblingTrigger = document.querySelector(`[data-bs-target="#${sibling.id}"]`);
              if (siblingTrigger) {
                siblingTrigger.classList.add('collapsed');
                siblingTrigger.setAttribute('aria-expanded', 'false');
              }
            }
          });
        }
      }

      if (isExpanded) {
        collapse(target);
        this.classList.add('collapsed');
        this.setAttribute('aria-expanded', 'false');
      } else {
        expand(target);
        this.classList.remove('collapsed');
        this.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // AUTO-CLOSE: Closes the mobile menu when a link is clicked
  const dismissLinks = document.querySelectorAll('[data-bs-dismiss="collapse"]');
  dismissLinks.forEach(link => {
    link.addEventListener('click', function() {
      const targetSelector = this.getAttribute('data-bs-target');
      const target = document.querySelector(targetSelector);
      if (target && target.classList.contains('show')) {
        collapse(target);
        const trigger = document.querySelector(`[data-bs-target="${targetSelector}"]`);
        if (trigger) {
          trigger.classList.add('collapsed');
          trigger.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });

  // STICKY-LOGIK
  const nav = document.querySelector('.main-nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        nav.classList.add('is-sticky');
      } else {
        nav.classList.remove('is-sticky');
      }
    }, { passive: true });
  }
}

function expand(element) {
  element.style.height = '0px';
  element.classList.add('collapsing');
  element.classList.remove('collapse');
  const height = element.scrollHeight;
  requestAnimationFrame(() => {
    element.style.height = height + 'px';
  });
  const handleTransitionEnd = () => {
    element.classList.remove('collapsing');
    element.classList.add('collapse', 'show');
    element.style.height = '';
    element.removeEventListener('transitionend', handleTransitionEnd);
  };
  element.addEventListener('transitionend', handleTransitionEnd);
}

function collapse(element) {
  element.style.height = element.scrollHeight + 'px';
  element.classList.add('collapsing');
  element.classList.remove('collapse', 'show');
  requestAnimationFrame(() => {
    element.style.height = '0px';
  });
  const handleTransitionEnd = () => {
    element.classList.remove('collapsing');
    element.classList.add('collapse');
    element.style.height = '';
    element.removeEventListener('transitionend', handleTransitionEnd);
  };
  element.addEventListener('transitionend', handleTransitionEnd);
}