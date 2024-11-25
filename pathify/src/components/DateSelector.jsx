import React, { useState } from "react";

const DateSelector = () => {
  const [selectedDate, setSelectedDate] = useState("");

  const handleChange = (event) => {
    setSelectedDate(event.target.value);
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