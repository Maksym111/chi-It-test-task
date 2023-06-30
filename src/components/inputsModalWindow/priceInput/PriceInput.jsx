import { useState } from "react";
import { Edits, WrapEdits, WrapPrice } from "./PriceInput.styled";

const PriceInput = ({ defaultValue, addNewValue, isPriceOpen }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [nowAndPrevInputValue, setNowAndPrevInputValue] = useState([
    defaultValue.substring(1),
    defaultValue.substring(1),
  ]);

  const onChangeInput = (e) => {
    let { value } = e.target;

    if (value.includes(".") && value.split(".")[1].length > 2) {
      return;
    }

    if (+value > 1000000) {
      return;
    }

    setNowAndPrevInputValue((prevState) => [value, prevState[1]]);
  };

  const onInputKeyDown = (e) => {
    if (e.key === "-" || e.key === "e" || e.key === "E" || e.key === ",") {
      e.preventDefault();
    }
  };

  const changeEdit = () => {
    setIsEdit((prevState) => !prevState);
    isPriceOpen(!isEdit);
    if (nowAndPrevInputValue[0] !== nowAndPrevInputValue[1]) {
      addNewValue({ price: `$${nowAndPrevInputValue[0]}` });
    }
  };

  const cancelChangesEdit = () => {
    isPriceOpen(!isEdit);

    setIsEdit((prevState) => !prevState);
  };

  return (
    <WrapPrice>
      {isEdit ? (
        <>
          <input
            type="number"
            pattern="[0-9]*"
            min="0"
            max="999999"
            value={nowAndPrevInputValue[0]}
            onKeyDown={onInputKeyDown}
            onChange={onChangeInput}
          />
          <WrapEdits>
            <Edits onClick={changeEdit}>✔️</Edits>
            <Edits onClick={cancelChangesEdit}>❌</Edits>
          </WrapEdits>
        </>
      ) : (
        <>
          <div>{`$${nowAndPrevInputValue[0]}`}</div>
          <Edits onClick={cancelChangesEdit}>⚙️</Edits>
        </>
      )}
    </WrapPrice>
  );
};

export default PriceInput;
