import React from "react";

const Pagination = () => {
    return (
        <div className="pagination-container">
            <p>Showing 15 of 354 elements</p>
            <button className="pagination-button button_left_dub">
                 <img
                    src=
                    "/images/button_left_dub.svg" 
                    alt='product'
                />
            </button>
            <button className="pagination-button button_left_singl">
            <img
                    src=
                    "/images/button_left_singl.svg" 
                    alt='product'
                />
            </button>
            <span className="pagination-info">1 of 14</span>
            <button className="pagination-button button_right_singl"><img
                    src=
                    "/images/button_left_singl.svg" 
                    alt='product'
                /></button>
            <button className="pagination-button button_right_dub"><img
                    src=
                    "/images/button_left_dub.svg" 
                    alt='product'
                /></button>
        </div>
    );
};

export default Pagination;
