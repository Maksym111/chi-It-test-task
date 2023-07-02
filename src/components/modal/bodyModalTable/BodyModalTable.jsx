import { useContext } from "react";
import ctx from "../../../context/authContext";

import SelectColor from "../selects/SelectColor";
import SelectAvailability from "../selects/SelectAvailability";
import PriceInput from "../../inputsModalWindow/PriceInput";

const BodyModalTable = ({ isPriceOpen }) => {
  const { currentRowCar: carEl, updateCurrentRowCar } = useContext(ctx);

  const {
    car,
    car_model,
    car_vin,
    car_color,
    car_model_year,
    price,
    availability,
  } = carEl;

  const addNewValue = (newData) => {
    updateCurrentRowCar((prevState) => {
      return { ...prevState, ...newData };
    });
  };

  return (
    <tbody>
      <tr>
        <td>{car}</td>
        <td>{car_model}</td>
        <td>{car_vin}</td>
        <td>
          <SelectColor defaultValue={car_color} addNewValue={addNewValue} />
        </td>
        <td>{car_model_year}</td>
        <td>
          <PriceInput
            defaultValue={price}
            addNewValue={addNewValue}
            isPriceOpen={isPriceOpen}
          />
        </td>
        <td>
          <SelectAvailability
            defaultValue={availability.toString()}
            addNewValue={addNewValue}
          />
        </td>
      </tr>
    </tbody>
  );
};

export default BodyModalTable;
