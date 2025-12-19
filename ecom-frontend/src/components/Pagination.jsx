const Pagination = ({ page, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center items-center gap-2 mt-10">

      {/* Prev */}
      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className={`px-3 py-1 rounded border
          ${page === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"}
        `}
      >
        Prev
      </button>

      {/* Page Numbers */}
      {[...Array(totalPages)].map((_, index) => {
        const pageNumber = index + 1;
        return (
          <button
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            className={`px-3 py-1 rounded border
              ${
                page === pageNumber
                  ? "bg-black text-white"
                  : "hover:bg-gray-100"
              }
            `}
          >
            {pageNumber}
          </button>
        );
      })}

      {/* Next */}
      <button
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        className={`px-3 py-1 rounded border
          ${page === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"}
        `}
      >
        Next
      </button>

    </div>
  );
};

export default Pagination;
