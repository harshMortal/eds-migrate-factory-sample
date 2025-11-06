export default function decorate(block) {
  const bgData = block.querySelector('[data-bg]');
  if (bgData) {
    const bgUrl = bgData.dataset.bg;
    block.style.backgroundImage = `url(${bgUrl})`;
    bgData.style.display = 'none';
  }
}
