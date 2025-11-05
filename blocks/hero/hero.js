/* blocks/hero/hero.js */
export default function decorate(block) {
  const bgImage = block.dataset.backgroundImage;
  if (bgImage) {
    block.style.backgroundImage = `url(${bgImage})`;
  }
}