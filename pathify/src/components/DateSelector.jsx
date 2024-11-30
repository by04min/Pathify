import React, { useState } from "react";
import { updateSheet } from '../services/sheetServices';

const DateSelector = ({initialDate, tableid}) => {
  const [selectedDate, setSelectedDate] = useState(initialDate.substring(0,10));

  const handleChange = (event) => {
    const date = event.target.value;
    console.log(event.target.value);
    updateSheet('deadline', date, tableid);
    setSelectedDate(date);
  };

  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      <input 
        type="date" 
        value={selectedDate} 
        onChange={handleChange} 
        style={{ fontSize: "16px" }}
      />
    </div>
  );
};

export default DateSelector;