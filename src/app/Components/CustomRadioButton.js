import React, { useState } from "react";

const CustomRadioButton = () => {
  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="radio-container budget_box">
        
      {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((month) => (
        <label
          key={month}
          className={`radio-label ${selectedOption === month ? "selected" : ""}`}
        >
          <input
            type="radio"
            name="month"
            value={month}
            className="radio-input"
            checked={selectedOption === month}
            onChange={handleOptionChange}
          />
          {month}
        </label>
      ))}
    </div>
  );
};

export default CustomRadioButton;
