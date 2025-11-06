export default function decorate(block) {
  const container = block.querySelector(':scope > div');
  if (!container) return;

  const children = Array.from(container.children);
  
  for (let i = 0; i < children.length; i += 2) {
    const header = children[i];
    const content = children[i + 1];
    
    if (header && content) {
      header.addEventListener('click', () => {
        const isActive = header.classList.contains('active');
        
        // Close all
        children.forEach(child => child.classList.remove('active'));
        
        // Open clicked if it wasn't active
        if (!isActive) {
          header.classList.add('active');
          content.classList.add('active');
        }
      });
      
      // Open first by default
      if (i === 0) {
        header.classList.add('active');
        content.classList.add('active');
      }
    }
  }
}