/* blocks/accordion/accordion.js */
/**
 * Accordion block decoration
 * Handles click events and active state management
 */
export default function decorate(block) {
  const items = block.querySelectorAll(':scope > div');

  items.forEach((item, index) => {
    const header = item.querySelector(':scope > div:first-child');
    
    if (!header) return;

    header.addEventListener('click', () => {
      const wasActive = item.classList.contains('active');

      // Close all items
      items.forEach((i) => i.classList.remove('active'));

      // Open clicked item if it wasn't active
      if (!wasActive) {
        item.classList.add('active');
      }
    });

    // Open first item by default
    if (index === 0) {
      item.classList.add('active');
    }
  });
}
