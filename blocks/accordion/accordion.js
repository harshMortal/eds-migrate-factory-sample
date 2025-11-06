/* blocks/accordion/accordion.js */
/**
 * Accordion block decoration
 * Handles click events and active state management
 */
export default function decorate(block) {
  const items = block.querySelectorAll(':scope > div');

  items.forEach((item, index) => {
    const header = item.querySelector('.accordion-header');
    
    if (!header) {
      // Fallback for different structure
      const firstDiv = item.querySelector(':scope > div:first-child');
      if (firstDiv) {
        firstDiv.classList.add('accordion-header');
        firstDiv.addEventListener('click', () => toggleItem(item, items));
      }
      return;
    }

    header.addEventListener('click', () => toggleItem(item, items));

    // Open first item by default
    if (index === 0) {
      item.classList.add('active');
    }
  });
}

function toggleItem(item, allItems) {
  const wasActive = item.classList.contains('active');

  // Close all items
  allItems.forEach((i) => i.classList.remove('active'));

  // Open clicked item if it wasn't active
  if (!wasActive) {
    item.classList.add('active');
  }
}
