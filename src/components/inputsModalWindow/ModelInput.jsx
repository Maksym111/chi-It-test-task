import { useEffect, useState } from "react";
import { Notify } from "notiflix";
import { Edits, Wrapper } from "./StylesEdit.styled";
import { ModalInput, ResultValue } from "./common/ModalInput.styled";

const ModelInput = ({ addNewValue, isEditOpen }) => {
  const [isEdit, setIsEdit] = useState(true);
  const [car_model, setCar_model] = useState("");

  useEffect(() => {
    if (isEdit === true) {
      isEditOpen((prevState) => {
        return {
          ...prevState,
          model: true,
        };
      });
    }
  }, [isEdit, isEditOpen]);

  const handleChageValueInput = (e) => {
    let { value } = e.target;
    const regExp = /^[a-zA-Z0-9\s-]+$/;

    if (value[0] === " " || value[0] === "-") {
      return;
    }

    if (!regExp.test(value[value.length - 1]) || value.length > 25) {
      return;
    }

    let result = value;

    if (value.length === 1) {
      result = `${value[0].toUpperCase()}${value.substring(1)}`;
    }

    const prevElem = result[result.length - 2];
    const lastElem = result[result.length - 1];

    if (prevElem === "-" || prevElem === " ") {
      result = `${value.substring(
        0,
        value.length - 1
      )}${lastElem.toUpperCase()}`;
    }

    setCar_model(result);
  };

  const changeConfirmedData = () => {
    setIsEdit(true);
  };

  const confirmData = () => {
    if (car_model.length === 0) {
      Notify.warning("Value cannot be empty!");
      return;
    }

    addNewValue({ car_model });

    setIsEdit(false);

    isEditOpen((prevState) => {
      return {
        ...prevState,
        model: false,
      };
    });
  };

  return (
    <Wrapper>
      {isEdit ? (
        <>
          <ModalInput
            type="text"
            value={car_model}
            onChange={handleChageValueInput}
          />
          <Edits onClick={confirmData}>✔️</Edits>
        </>
      ) : (
        <>
          <ResultValue>{car_model}</ResultValue>
          <Edits onClick={changeConfirmedData}>⚙️</Edits>
        </>
      )}
    </Wrapper>
  );
};

export default ModelInput;
