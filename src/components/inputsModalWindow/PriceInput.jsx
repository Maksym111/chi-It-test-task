import { useEffect, useState } from "react";

import { Notify } from "notiflix/build/notiflix-notify-aio";

import { Edits, WrapEdits, Wrapper } from "./StylesInput.styled";

const PriceInput = ({ defaultValue, addNewValue, isEditOpen }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [nowAndPrevInputValue, setNowAndPrevInputValue] = useState([
    defaultValue.substring(1),
    defaultValue.substring(1),
  ]);

  useEffect(() => {
    if (defaultValue === "$0") {
      setIsEdit(true);
      isEditOpen((prevState) => {
        return {
          ...prevState,
          price: true,
        };
      });
    }
  }, [defaultValue, isEditOpen]);

  const onChangeInput = (e) => {
    let { value } = e.target;
    if (value === "") {
      value = "0";
    }

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
    if (nowAndPrevInputValue[0] === "0") {
      Notify.warning("Price must be greater than 0");
      return;
    }
    if (nowAndPrevInputValue[0] !== nowAndPrevInputValue[1]) {
      addNewValue({ price: `$${nowAndPrevInputValue[0]}` });
    }
    setIsEdit(false);

    isEditOpen((prevState) => {
      return {
        ...prevState,
        price: false,
      };
    });
  };

  const cancelChangesEdit = () => {
    setNowAndPrevInputValue((prevState) => [prevState[1], prevState[1]]);
    setIsEdit((prevState) => !prevState);

    if (isEdit) {
      isEditOpen((prevState) => {
        return {
          ...prevState,
          price: !isEdit,
        };
      });
    } else {
      isEditOpen((prevState) => {
        return {
          ...prevState,
          price: !isEdit,
        };
      });
    }
  };

  return (
    <Wrapper>
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
    </Wrapper>
  );
};

export default PriceInput;
