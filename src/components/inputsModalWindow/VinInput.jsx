import { useState } from "react";
import { Edits, Wrapper } from "./StylesInput.styled";

const VinInput = ({ addNewValue }) => {
  const [isEdit, setIsEdit] = useState(true);
  const [car_vin, setCar_vin] = useState("");

  const handleChageValueInput = (e) => {
    let { value } = e.target;

    if (value[0] === " " || value[0] === "-") {
      return;
    }

    const isNotWordOrNumber = !/[a-zA-Z0-9]/.test(value[value.length - 1]);
    if (isNotWordOrNumber || value.length > 17) {
      return;
    }

    let res = value.toUpperCase();

    setCar_vin(res);
  };

  const changeConfirmedData = () => {
    setIsEdit(true);
  };

  const confirmData = () => {
    addNewValue({ car_vin });

    setIsEdit((prevState) => !prevState);
    // isPriceOpen(!isEdit);
  };

  return (
    <Wrapper>
      {isEdit ? (
        <>
          <input type="text" value={car_vin} onChange={handleChageValueInput} />
          <Edits onClick={confirmData}>✔️</Edits>
        </>
      ) : (
        <>
          <div>{car_vin}</div>
          <Edits onClick={changeConfirmedData}>⚙️</Edits>
        </>
      )}
    </Wrapper>
  );
};

export default VinInput;
