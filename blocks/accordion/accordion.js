/* blocks/accordion/accordion.js */
export default function decorate(block) {
  const items = block.querySelectorAll(':scope > div');

  items.forEach((item, index) => {
    const header = item.querySelector(':scope > div:first-child');

    header.addEventListener('click', () => {
      const wasActive = item.classList.contains('active');

      items.forEach((i) => i.classList.remove('active'));

      if (!wasActive) {
        item.classList.add('active');
      }
    });

    if (index === 0) {
      item.classList.add('active');
    }
  });
}
