/**
 * Accordion Block
 * Accessible accordion component with keyboard navigation
 */

let accordionIdCounter = 0;

function generateId() {
  accordionIdCounter += 1;
  return `accordion-panel-${accordionIdCounter}`;
}

function toggleAccordion(header, content, children, forceState = null) {
  const isActive = forceState !== null ? !forceState : header.classList.contains('active');

  // Close all panels
  children.forEach((child) => {
    child.classList.remove('active');
    if (child.hasAttribute('aria-expanded')) {
      child.setAttribute('aria-expanded', 'false');
    }
  });

  // Open clicked panel if it wasn't active
  if (!isActive) {
    header.classList.add('active');
    header.setAttribute('aria-expanded', 'true');
    content.classList.add('active');
  }
}

function handleKeydown(e, header, content, children, headers) {
  const currentIndex = headers.indexOf(header);

  switch (e.key) {
    case 'Enter':
    case ' ':
      e.preventDefault();
      toggleAccordion(header, content, children);
      break;
    case 'ArrowDown':
      e.preventDefault();
      if (currentIndex < headers.length - 1) {
        headers[currentIndex + 1].focus();
      }
      break;
    case 'ArrowUp':
      e.preventDefault();
      if (currentIndex > 0) {
        headers[currentIndex - 1].focus();
      }
      break;
    case 'Home':
      e.preventDefault();
      headers[0].focus();
      break;
    case 'End':
      e.preventDefault();
      headers[headers.length - 1].focus();
      break;
    default:
      break;
  }
}

export default function decorate(block) {
  const container = block.querySelector(':scope > div');
  if (!container) return;

  const children = Array.from(container.children);
  const headers = [];

  // Set up accordion role
  block.setAttribute('role', 'presentation');

  for (let i = 0; i < children.length; i += 2) {
    const header = children[i];
    const content = children[i + 1];

    if (header && content) {
      const panelId = generateId();

      // Set up header accessibility attributes
      header.setAttribute('role', 'button');
      header.setAttribute('tabindex', '0');
      header.setAttribute('aria-expanded', 'false');
      header.setAttribute('aria-controls', panelId);
      header.classList.add('accordion-header');

      // Set up content accessibility attributes
      content.setAttribute('id', panelId);
      content.setAttribute('role', 'region');
      content.setAttribute('aria-labelledby', `${panelId}-header`);
      header.setAttribute('id', `${panelId}-header`);
      content.classList.add('accordion-content');

      headers.push(header);

      // Click handler
      header.addEventListener('click', () => {
        toggleAccordion(header, content, children);
      });

      // Keyboard handler
      header.addEventListener('keydown', (e) => {
        handleKeydown(e, header, content, children, headers);
      });

      // Open first panel by default
      if (i === 0) {
        header.classList.add('active');
        header.setAttribute('aria-expanded', 'true');
        content.classList.add('active');
      }
    }
  }
}
