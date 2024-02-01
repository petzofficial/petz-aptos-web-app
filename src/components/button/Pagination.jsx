// Pagination.js
import "../../style/pagination/pagination.scss";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="pagination max-md:my-4 md:my-8">
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={currentPage === page ? "active-page" : ""}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
