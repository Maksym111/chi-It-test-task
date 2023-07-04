import { useEffect, useState } from "react";

import { Notify } from "notiflix/build/notiflix-notify-aio";

import { Edits, WrapEdits, Wrapper } from "./StylesEdit.styled";
import { ModalInput, ResultValue } from "./common/ModalInput.styled";

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

    if (value.charAt(0) === "0" && +value.charAt(1) > 0) {
      value = value.charAt(1);
    }

    if (value.charAt(0) === "0" && value.charAt(1) === "0") {
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
      setNowAndPrevInputValue([
        nowAndPrevInputValue[0],
        nowAndPrevInputValue[0],
      ]);
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
    setNowAndPrevInputValue([nowAndPrevInputValue[1], nowAndPrevInputValue[1]]);

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
          <ModalInput
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
          <ResultValue number>{`$${nowAndPrevInputValue[0]}`}</ResultValue>
          <Edits onClick={cancelChangesEdit}>⚙️</Edits>
        </>
      )}
    </Wrapper>
  );
};

export default PriceInput;
