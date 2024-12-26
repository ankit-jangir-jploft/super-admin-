import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handleFirstPage = () => onPageChange(1);
  const handleLastPage = () => onPageChange(totalPages);
  const handlePreviousPage = () => onPageChange(Math.max(currentPage - 1, 1));
  const handleNextPage = () =>
    onPageChange(Math.min(currentPage + 1, totalPages));

  return (
    <div style={styles.paginationContainer}>
      <button
        onClick={handleFirstPage}
        disabled={currentPage === 1}
        style={currentPage === 1 ? styles.disabledButton : styles.button}
      >
        &laquo;
      </button>
      <button
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
        style={currentPage === 1 ? styles.disabledButton : styles.button}
      >
        &lsaquo;
      </button>
      <span style={styles.pageInfo}>
        {currentPage} of {totalPages}
      </span>
      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        style={
          currentPage === totalPages ? styles.disabledButton : styles.button
        }
      >
        &rsaquo;
      </button>
      <button
        onClick={handleLastPage}
        disabled={currentPage === totalPages}
        style={
          currentPage === totalPages ? styles.disabledButton : styles.button
        }
      >
        &raquo;
      </button>
    </div>
  );
};

const styles = {
  paginationContainer: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontFamily: "Arial, sans-serif",
    fontSize: "14px",
  },
  button: {
    width: "35px",
    height: "31px",
    borderRadius: "50%",
    border: "1px solid #ccc",
    background: "#fff",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  disabledButton: {
    width: "35px",
    height: "31px",
    borderRadius: "50%",
    border: "1px solid #eee",
    background: "#f9f9f9",
    color: "#aaa",
    cursor: "not-allowed",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  pageInfo: {
    fontSize: "14px",
  },
};

export default Pagination;
