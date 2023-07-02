import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { ContainerYearPicker, WrapperYearPicker } from "./SelectYear.styled";
import { useState } from "react";

const SelectYear = ({ addNewValue }) => {
  const [selectedYear, setSelectedYear] = useState(null);
  const currentYear = new Date().getFullYear();

  const handleYearChange = (dataYear) => {
    setSelectedYear(dataYear);
    const car_model_year = dataYear.getFullYear();
    addNewValue({ car_model_year });
  };

  const handleKeyDown = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <ContainerYearPicker>
        <WrapperYearPicker onKeyDown={handleKeyDown}>
          <DatePicker
            selected={selectedYear}
            onChange={handleYearChange}
            dateFormat="yyyy"
            showYearPicker
            scrollableYearDropdown
            minDate={new Date("1900-01-01")}
            maxDate={new Date(currentYear, 11, 31)}
          />
          {/* {selectedYear && <p>Выбранный год: {selectedYear}</p>} */}
        </WrapperYearPicker>
      </ContainerYearPicker>
    </>
  );
};

export default SelectYear;
