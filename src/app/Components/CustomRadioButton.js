import React, { useState } from "react";

const CustomInputText = ({ months, setMonth }) => {
  // Initialize state with an object for each month
  const [monthValues, setMonthValues] = useState({
    January: "",
    February: "",
    March: "",
    April: "",
    May: "",
    June: "",
    July: "",
    August: "",
    September: "",
    October: "",
    November: "",
    December: "",
  });

  // Handle input change
  const handleInputChange = (event, month) => {
    const value = event.target.value;
    setMonthValues((prevValues) => ({
      ...prevValues,
      [month]: value,
    }));
    setMonth((prev) => ({ ...prev, [month]: value }));
  };

  return (
    <div className='input-container budget_box'>
      {Object.keys(monthValues).map((month) => (
        <div
          key={month}
          className='month-input'
        >
          <label className='input-label'>{month}</label>
          <input
            type='text'
            name={month}
            value={monthValues[month]}
            className='input-text'
            onChange={(event) => handleInputChange(event, month)}
          />
        </div>
      ))}
    </div>
  );
};

export default CustomInputText;
