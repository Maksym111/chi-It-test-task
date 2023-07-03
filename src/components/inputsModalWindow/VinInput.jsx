import { useContext, useEffect, useState } from "react";
import ctx from "../../context/authContext";

import { Notify } from "notiflix/build/notiflix-notify-aio";

import { Edits, Wrapper } from "./StylesInput.styled";

const VinInput = ({ addNewValue, isEditOpen }) => {
  const [isEdit, setIsEdit] = useState(true);
  const [car_vin, setCar_vin] = useState("");

  const { allCars } = useContext(ctx);

  useEffect(() => {
    if (isEdit === true) {
      isEditOpen((prevState) => {
        return {
          ...prevState,
          vin: true,
        };
      });
    }
  }, [isEdit, isEditOpen]);

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
    if (car_vin.length < 17) {
      Notify.warning("Not the full length of the VIN!");
      return;
    }

    const findTheSame = allCars.find((elem) => elem.car_vin === car_vin);

    if (car_vin === findTheSame?.car_vin) {
      Notify.warning("Such a VIN is already exist in the table!");
      return;
    }
    addNewValue({ car_vin });

    setIsEdit(false);

    isEditOpen((prevState) => {
      return {
        ...prevState,
        vin: false,
      };
    });
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
