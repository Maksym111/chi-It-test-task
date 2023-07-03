import { useContext } from "react";
import ctx from "../../context/authContext";

import Edit from "../editSelect/Edit";

import { WrapSelect } from "./TableRow.styled";

const TableRow = ({ carEl }) => {
  const {
    id,
    car,
    car_model,
    car_vin,
    car_color,
    car_model_year,
    price,
    availability,
  } = carEl;

  const { updateCurrentRowCar } = useContext(ctx);

  const getTypeAction = (typeAction) => {
    const newCarEl = { typeAction };
    Object.assign(newCarEl, carEl);
    updateCurrentRowCar(newCarEl);
  };

  return (
    <>
      <tr>
        <td>{car}</td>
        <td>{car_model}</td>
        <td>{car_vin}</td>
        <td>{car_color}</td>
        <td>{car_model_year}</td>
        <td>{price}</td>
        <td>{availability.toString()}</td>
        <td>
          {id === 0 ? (
            ""
          ) : (
            <WrapSelect>
              <Edit user={carEl} getTypeAction={getTypeAction} />
            </WrapSelect>
          )}
        </td>
      </tr>
    </>
  );
};

export default TableRow;
