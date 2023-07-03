import { useEffect, useState } from "react";
import { Edits, Wrapper } from "./StylesInput.styled";

const CompanyInput = ({ addNewValue, isEditOpen }) => {
  const [isEdit, setIsEdit] = useState(true);
  const [car, setCar] = useState("");

  useEffect(() => {
    if (isEdit === true) {
      isEditOpen((prevState) => {
        return {
          ...prevState,
          company: true,
        };
      });
    }
  }, [isEdit, isEditOpen]);

  const handleChageValueInput = (e) => {
    let { value } = e.target;

    if (value[0] === " " || value[0] === "-") {
      return;
    }

    const regExp = /^[a-zA-Z\s-]+$/;
    if (!regExp.test(value[value.length - 1]) || value.length > 20) {
      return;
    }

    const result = `${value[0].toUpperCase()}${value.substring(1)}`;
    setCar(result);
  };

  const changeConfirmedData = () => {
    setIsEdit(true);
  };

  const confirmData = () => {
    addNewValue({ car });

    setIsEdit(false);

    isEditOpen((prevState) => {
      return {
        ...prevState,
        company: false,
      };
    });
  };

  return (
    <Wrapper>
      {isEdit ? (
        <>
          <input type="text" value={car} onChange={handleChageValueInput} />
          <Edits onClick={confirmData}>✔️</Edits>
        </>
      ) : (
        <>
          <div>{car}</div>
          <Edits onClick={changeConfirmedData}>⚙️</Edits>
        </>
      )}
    </Wrapper>
  );
};

export default CompanyInput;
