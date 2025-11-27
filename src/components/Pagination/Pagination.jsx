const Pagination = ({ totalPages, currentPage, setCurrentPage }) => {
  const buttons = [];
  for (let index = 1; index <= totalPages; index++) {
    buttons.push(
      <li
        className={`page-item ${currentPage === index ? "active" : ""}`}
        key={index}
      >
        <button className="page-link" onClick={() => setCurrentPage(index)}>
          {index}
        </button>
      </li>
    );
  }
  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        <li className="page-item">
          <button
            className="page-link"
            onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
        </li>
        {buttons}
        <li className="page-item">
          <button
            className="page-link"
            onClick={() =>
              currentPage < totalPages && setCurrentPage(currentPage + 1)
            }
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
