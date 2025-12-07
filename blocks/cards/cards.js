/**
 * Cards Block
 * Creates an accessible card grid layout
 */

import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  // Create semantic list structure
  const ul = document.createElement('ul');
  ul.setAttribute('role', 'list');
  ul.classList.add('cards-list');

  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    li.classList.add('cards-card');

    while (row.firstElementChild) {
      li.append(row.firstElementChild);
    }

    // Classify card sections
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) {
        div.className = 'cards-card-image';
      } else {
        div.className = 'cards-card-body';
      }
    });

    ul.append(li);
  });

  // Optimize images with lazy loading
  ul.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPicture = createOptimizedPicture(
      img.src,
      img.alt || '',
      false, // lazy load
      [{ width: '750' }],
    );
    // Ensure lazy loading attribute
    const newImg = optimizedPicture.querySelector('img');
    if (newImg) {
      newImg.setAttribute('loading', 'lazy');
      newImg.setAttribute('decoding', 'async');
    }
    img.closest('picture').replaceWith(optimizedPicture);
  });

  // Add focus management for card links
  ul.querySelectorAll('a').forEach((link) => {
    link.classList.add('cards-card-link');
  });

  block.replaceChildren(ul);
}
