/**
 * Hero Block
 * Creates an accessible hero section with optimized images
 */

import { createOptimizedPicture } from '../../scripts/aem.js';

function optimizeBackgroundImage(block, bgUrl) {
  // Create optimized picture element for preloading
  const picture = createOptimizedPicture(bgUrl, '', true, [
    { media: '(min-width: 900px)', width: '1600' },
    { width: '900' },
  ]);

  const img = picture.querySelector('img');
  if (img) {
    // Set as eager loading for LCP optimization
    img.setAttribute('loading', 'eager');
    img.setAttribute('fetchpriority', 'high');

    // When image loads, set as background
    img.onload = () => {
      block.style.backgroundImage = `url(${img.src})`;
    };

    // Fallback: set background immediately
    block.style.backgroundImage = `url(${bgUrl})`;
  }
}

export default function decorate(block) {
  // Handle background image from data attribute
  const bgData = block.querySelector('[data-bg]');
  if (bgData) {
    const bgUrl = bgData.dataset.bg;
    optimizeBackgroundImage(block, bgUrl);
    bgData.style.display = 'none';
  }

  // Handle picture elements in hero
  const picture = block.querySelector('picture');
  if (picture) {
    const img = picture.querySelector('img');
    if (img) {
      // Optimize hero images for LCP
      img.setAttribute('loading', 'eager');
      img.setAttribute('fetchpriority', 'high');

      // Replace with optimized version
      const optimizedPicture = createOptimizedPicture(
        img.src,
        img.alt || '',
        true, // eager load
        [
          { media: '(min-width: 900px)', width: '1600' },
          { width: '900' },
        ],
      );

      const optimizedImg = optimizedPicture.querySelector('img');
      if (optimizedImg) {
        optimizedImg.setAttribute('loading', 'eager');
        optimizedImg.setAttribute('fetchpriority', 'high');
      }

      picture.replaceWith(optimizedPicture);
    }
  }

  // Add accessibility attributes
  const heading = block.querySelector('h1');
  if (heading) {
    block.setAttribute('role', 'banner');
    block.setAttribute('aria-labelledby', 'hero-heading');
    heading.id = 'hero-heading';
  }

  // Ensure text content is accessible over background
  const contentWrapper = block.querySelector(':scope > div');
  if (contentWrapper) {
    contentWrapper.setAttribute('role', 'presentation');
  }
}
