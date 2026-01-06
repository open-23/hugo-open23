/**
 * Collapse Module - Vanilla JS replacement for Bootstrap Collapse
 * Handles Navbar Toggle and FAQ Accordion
 */

export function initCollapses() {
  // Find all collapse triggers
  const triggers = document.querySelectorAll('[data-bs-toggle="collapse"]');

  triggers.forEach(trigger => {
    trigger.addEventListener('click', function(e) {
      e.preventDefault();

      const targetSelector = this.getAttribute('data-bs-target');
      const target = document.querySelector(targetSelector);

      if (!target) return;

      const parent = this.getAttribute('data-parent');
      const isExpanded = target.classList.contains('show');

      // If accordion (has parent), close siblings
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

      // Toggle current
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
