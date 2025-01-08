import React from "react";
import { useTranslation } from "react-i18next";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  paginationData,
}) => {
  const { t } = useTranslation();
  const handleFirstPage = () => onPageChange(1);
  const handleLastPage = () => onPageChange(totalPages);
  const handlePreviousPage = () => onPageChange(Math.max(currentPage - 1, 1));
  const handleNextPage = () =>
    onPageChange(Math.min(currentPage + 1, totalPages));

  return (
    <div style={styles.paginationContainer} className="pagint-box">
      <div className="totla-text-nimb">

      <p className='mb-0'>{`${t("paginate.showing")} ${parseInt(
        paginationData?.items_in_range
      )} ${t("paginate.of")} ${paginationData?.total_items} ${t(
        "paginate.elements"
      )}`}</p>
      </div>

      <button
        onClick={handleFirstPage}
        disabled={currentPage === 1}
        style={currentPage === 1 ? styles.disabledButton : styles.button}
      >
        <img
          src='/images/button_left_dub.svg'
          alt='product'
        />
      </button>
      <button
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
        style={currentPage === 1 ? styles.disabledButton : styles.button}
      >
        <img
          src='/images/button_left_singl.svg'
          alt='product'
        />
      </button>
      <span style={styles.pageInfo}>
        {currentPage} {t("paginate.of")} {totalPages}
      </span>
      <button
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
        style={
          currentPage === totalPages ? styles.disabledButton : styles.button
        }
      >
        <img
          src='/images/right-singlarrow.svg'
          alt='product'
        />
      </button>
      <button
        onClick={handleLastPage}
        disabled={currentPage === totalPages}
        style={
          currentPage === totalPages ? styles.disabledButton : styles.button
        }
      >
        <img
          src='/images/right-dublarrow1.svg'
          alt='product'
        />
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
    justifyContent:"end",  
    flexWrap:"wrap",
    width: "100%",
  },
  button: {
    border: "0",
    background: "#fff",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  disabledButton: {
    border: "0",
    borderRadius: "50%",
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
