/**
 * Table Block
 * Accessible sortable table with keyboard navigation
 */

function compareValues(cellA, cellB, direction) {
  const textA = cellA.textContent.trim();
  const textB = cellB.textContent.trim();

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
  const currentSort = header.getAttribute('aria-sort');
  const newDirection = currentSort === 'ascending' ? 'descending' : 'ascending';

  headers.forEach((h) => {
    h.classList.remove('sorted-asc', 'sorted-desc');
    h.setAttribute('aria-sort', 'none');
  });

  const rows = Array.from(tbody.querySelectorAll('tr'));
  const direction = newDirection === 'ascending' ? 'asc' : 'desc';

  rows.sort((rowA, rowB) => compareValues(
    rowA.cells[columnIndex],
    rowB.cells[columnIndex],
    direction,
  ));

  rows.forEach((row) => tbody.appendChild(row));

  header.classList.add(direction === 'asc' ? 'sorted-asc' : 'sorted-desc');
  header.setAttribute('aria-sort', newDirection);
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

  // Add table accessibility
  table.setAttribute('role', 'grid');

  headers.forEach((header, columnIndex) => {
    header.classList.add('sortable');
    header.setAttribute('role', 'columnheader');
    header.setAttribute('aria-sort', 'none');
    header.setAttribute('tabindex', '0');
    header.setAttribute('scope', 'col');

    header.addEventListener('click', () => {
      sortTable(header, columnIndex, tbody, headers);
    });

    header.addEventListener('keydown', (e) => {
      handleKeydown(e, header, columnIndex, tbody, headers);
    });
  });

  tbody.querySelectorAll('tr').forEach((row) => {
    row.setAttribute('role', 'row');
    row.querySelectorAll('td').forEach((cell) => {
      cell.setAttribute('role', 'gridcell');
    });
  });
}
