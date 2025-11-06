/* blocks/data-table/data-table.js */
/**
 * Data table block decoration
 * Adds sorting functionality to table headers
 */
export default function decorate(block) {
  const table = block.querySelector('table');
  if (!table) return;

  const headers = table.querySelectorAll('th');
  const tbody = table.querySelector('tbody');
  
  if (!tbody) return;

  // Add sortable class to all headers
  headers.forEach((header) => {
    header.classList.add('sortable');
  });

  // Add click handlers for sorting
  headers.forEach((header, columnIndex) => {
    let sortDirection = 'asc';

    header.addEventListener('click', () => {
      // Remove sorted classes from all headers
      headers.forEach((h) => {
        h.classList.remove('sorted-asc', 'sorted-desc');
      });

      // Get all rows as array
      const rows = Array.from(tbody.querySelectorAll('tr'));

      // Sort rows based on column content
      rows.sort((rowA, rowB) => {
        const cellA = rowA.cells[columnIndex].textContent.trim();
        const cellB = rowB.cells[columnIndex].textContent.trim();

        // Try to parse as numbers first
        const numA = parseFloat(cellA.replace(/[^0-9.-]/g, ''));
        const numB = parseFloat(cellB.replace(/[^0-9.-]/g, ''));

        let comparison = 0;

        if (!Number.isNaN(numA) && !Number.isNaN(numB)) {
          // Numeric comparison
          comparison = numA - numB;
        } else {
          // String comparison
          comparison = cellA.localeCompare(cellB);
        }

        return sortDirection === 'asc' ? comparison : -comparison;
      });

      // Remove all rows and re-add in sorted order
      rows.forEach((row) => tbody.appendChild(row));

      // Update header class and toggle direction
      header.classList.add(sortDirection === 'asc' ? 'sorted-asc' : 'sorted-desc');
      sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    });
  });
}
