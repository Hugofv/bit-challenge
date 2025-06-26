import './pagination.styles.css';

const MAX_VISIBLE_PAGES = 5;
const Pagination = ({
  currentPage,
  totalItems,
  totalPages,
  onPageChange,
  itemsPerPage,
  onItemsPerPageChange,
  perPageOptions = [5, 10, 20, 50],
}) => {
  const pages = [];

  // Generate page numbers
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  const getPageNumbers = () => {
    const pages = [];

    if (totalPages <= MAX_VISIBLE_PAGES + 2) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const start = Math.max(
        2,
        currentPage - Math.floor(MAX_VISIBLE_PAGES / 2)
      );
      const end = Math.min(totalPages - 1, start + MAX_VISIBLE_PAGES - 1);

      pages.push(1);

      if (start > 2) pages.push('...');

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (end < totalPages - 1) pages.push('...');

      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className='pagination-wrapper'>
      <div className='pagination-controls'>
        <button
          className='page-btn'
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
        >
          ⬅ Prev
        </button>

        {getPageNumbers().map((page, idx) =>
          page === '...' ? (
            <span key={idx} className='ellipsis'>
              ...
            </span>
          ) : (
            <button
              key={page}
              className={`page-btn ${currentPage === page ? 'active' : ''}`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          )
        )}

        <button
          className='page-btn'
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next ➡
        </button>
      </div>

      <div className='pagination-footer'>
        <div className='pagination-info'>
          {/* Showing <strong>{from}</strong>–<strong>{to}</strong> of{' '} */}
          <strong>{totalItems}</strong> items
        </div>
        <div className='items-per-page'>
          <label htmlFor='per-page-select'>Items per page:</label>
          <select
            id='per-page-select'
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
          >
            {perPageOptions.map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
