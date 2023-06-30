import { useContext } from "react";
import ctx from "../../context/authContext";

import Edit from "../editSelect/Edit";

import { WrapSelect } from "./TableRow.styled";

const TableRow = ({ carEl }) => {
  const {
    car,
    car_model,
    car_vin,
    car_color,
    car_model_year,
    price,
    availability,
  } = carEl;

  const authContext = useContext(ctx);

  const getTypeAction = (typeAction) => {
    const newCarEl = { typeAction };
    Object.assign(newCarEl, carEl);
    authContext.updateCurrentRowCar(newCarEl);
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
          <WrapSelect>
            <Edit user={carEl} getTypeAction={getTypeAction} />
          </WrapSelect>
        </td>
      </tr>
    </>
  );
};

export default TableRow;
