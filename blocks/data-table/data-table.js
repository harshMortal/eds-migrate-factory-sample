/**
 * Data Table Block
 * Accessible sortable data table with keyboard navigation
 */

function compareValues(cellA, cellB, direction) {
  const textA = cellA.textContent.trim();
  const textB = cellB.textContent.trim();

  // Try to parse as numbers first (handles percentages too)
  const numA = parseFloat(textA.replace(/[^0-9.-]/g, ''));
  const numB = parseFloat(textB.replace(/[^0-9.-]/g, ''));

  let comparison = 0;

  if (!Number.isNaN(numA) && !Number.isNaN(numB)) {
    comparison = numA - numB;
  } else {
    comparison = textA.localeCompare(textB);
  }

  return direction === 'asc' ? comparison : -comparison;
}

function sortTable(header, columnIndex, tbody, headers) {
  // Determine new sort direction
  const currentSort = header.getAttribute('aria-sort');
  const newDirection = currentSort === 'ascending' ? 'descending' : 'ascending';

  // Reset all headers
  headers.forEach((h) => {
    h.classList.remove('sorted-asc', 'sorted-desc');
    h.setAttribute('aria-sort', 'none');
  });

  // Get and sort rows
  const rows = Array.from(tbody.querySelectorAll('tr'));
  const direction = newDirection === 'ascending' ? 'asc' : 'desc';

  rows.sort((rowA, rowB) => compareValues(
    rowA.cells[columnIndex],
    rowB.cells[columnIndex],
    direction,
  ));

  // Re-append sorted rows
  rows.forEach((row) => tbody.appendChild(row));

  // Update header state
  header.classList.add(direction === 'asc' ? 'sorted-asc' : 'sorted-desc');
  header.setAttribute('aria-sort', newDirection);

  // Announce to screen readers
  const announcement = document.createElement('div');
  announcement.setAttribute('role', 'status');
  announcement.setAttribute('aria-live', 'polite');
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = `Table sorted by ${header.textContent.trim()}, ${newDirection}`;
  header.closest('table').appendChild(announcement);
  setTimeout(() => announcement.remove(), 1000);
}

function handleKeydown(e, header, columnIndex, tbody, headers) {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    sortTable(header, columnIndex, tbody, headers);
  }
}

export default function decorate(block) {
  const table = block.querySelector('table');
  if (!table) return;

  const headers = Array.from(table.querySelectorAll('th'));
  const tbody = table.querySelector('tbody');

  if (!tbody) return;

  // Add table accessibility attributes
  table.setAttribute('role', 'grid');

  // Set up sortable headers
  headers.forEach((header, columnIndex) => {
    header.classList.add('sortable');
    header.setAttribute('role', 'columnheader');
    header.setAttribute('aria-sort', 'none');
    header.setAttribute('tabindex', '0');
    header.setAttribute('scope', 'col');

    // Click handler
    header.addEventListener('click', () => {
      sortTable(header, columnIndex, tbody, headers);
    });

    // Keyboard handler
    header.addEventListener('keydown', (e) => {
      handleKeydown(e, header, columnIndex, tbody, headers);
    });
  });

  // Add row roles
  tbody.querySelectorAll('tr').forEach((row) => {
    row.setAttribute('role', 'row');
    row.querySelectorAll('td').forEach((cell) => {
      cell.setAttribute('role', 'gridcell');
    });
  });

  // Add screen reader only styles if not present
  if (!document.querySelector('style[data-sr-only]')) {
    const style = document.createElement('style');
    style.setAttribute('data-sr-only', 'true');
    style.textContent = '.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0; }';
    document.head.appendChild(style);
  }
}
