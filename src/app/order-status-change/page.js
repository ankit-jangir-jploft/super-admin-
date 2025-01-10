// Step 1: Create a new file named `CreateCategory.js` inside the `src` directory.

// src/CreateCategory.js

import React from 'react';

function CreateCategory() {
  return (
    <div className='main-cont-qr-apge'>
      <div className='qr-code-box'>
        <h2 className="hedingtext_top custom-pup-mn">Update order status</h2>
        <div className='order-id'>
          <h3>Order #10333</h3>
          <p>29. September 2024 - 15:04</p>
        </div>
        <div className='order-status-btn'>
          <button className='status-puop ready_for_picking'>Ready to picking</button>
        </div>
        <form action="#" className="createcategory_cumtm change-stastu">
          <div style={{ marginBottom: '15px' }}>
            <label htmlFor="categoryName">Update status</label>
            <select
            id="categorySelect"  
            style={{
              width: '100%',
              padding: '10px 15px',
              marginTop: '5px',
              height:"50px",
              borderRadius: '40px',
              border: '1px solid rgb(206, 212, 218)'
            }}
          >
           
            <option value="category1">Ready for picking</option>
            <option value="category2">Category 2</option>
            <option value="category3">Category 3</option>
          </select>
          </div>
          <div className="" >
            <button className="cr-btn btn createcustomer_btn px-5  w-100 mb-3 mt-4" type="submit">Update</button>
            <button className="can-btn btn createcustomer_btncmf w-100 px-5 ">Close</button>
          </div>
        </form>
      </div>

    </div>
  );
}

export default CreateCategory;

// Step 2: To use this component, you can import and render it in your main `App.js` file or any other component.
