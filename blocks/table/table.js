export default function decorate(block) {
  const table = block.querySelector('table');
  if (!table) return;

  const headers = table.querySelectorAll('th');
  const tbody = table.querySelector('tbody');
  if (!tbody) return;

  headers.forEach((header) => {
    header.classList.add('sortable');
  });

  headers.forEach((header, columnIndex) => {
    let sortDirection = 'asc';

    header.addEventListener('click', () => {
      headers.forEach((h) => h.classList.remove('sorted-asc', 'sorted-desc'));

      const rows = Array.from(tbody.querySelectorAll('tr'));

      rows.sort((rowA, rowB) => {
        const cellA = rowA.cells[columnIndex].textContent.trim();
        const cellB = rowB.cells[columnIndex].textContent.trim();

        const numA = parseFloat(cellA.replace(/[^0-9.-]/g, ''));
        const numB = parseFloat(cellB.replace(/[^0-9.-]/g, ''));

        let comparison = 0;

        if (!Number.isNaN(numA) && !Number.isNaN(numB)) {
          comparison = numA - numB;
        } else {
          comparison = cellA.localeCompare(cellB);
        }

        return sortDirection === 'asc' ? comparison : -comparison;
      });

      rows.forEach((row) => tbody.appendChild(row));

      header.classList.add(sortDirection === 'asc' ? 'sorted-asc' : 'sorted-desc');
      sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    });
  });
}
