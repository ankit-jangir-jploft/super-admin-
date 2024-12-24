import React from "react"; 

const Pagination = () => {
  return (
    <div className="pagination-container">
        <p>Showing 15 of 354 elements</p>
      <button className="pagination-button button_left_dub" disabled>
        «
      </button>
      <button className="pagination-button button_left_singl" disabled>
        ‹
      </button>
      <span className="pagination-info">1 of 14</span>
      <button className="pagination-button button_right_singl">›</button>
      <button className="pagination-button button_right_dub">»</button>
    </div>
  );
};

export default Pagination;
