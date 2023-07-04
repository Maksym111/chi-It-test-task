import { useContext } from "react";
import ctx from "../../../context/authContext";

import CompanyInput from "../../inputsModalWindow/CompanyInput";
import ModelInput from "../../inputsModalWindow/ModelInput";
import VinInput from "../../inputsModalWindow/VinInput";
import SelectColor from "../selects/SelectColor";
import PriceInput from "../../inputsModalWindow/PriceInput";
import SelectAvailability from "../selects/SelectAvailability";

import SelectYear from "../selects/yearSelect/SelectYear";
import { TableRow } from "./CleanBodyModalTable.styled";

const CleanBodyModalTable = ({ isEditOpen }) => {
  const { updateCurrentRowCar } = useContext(ctx);

  const addNewValue = (newData) => {
    updateCurrentRowCar((prevState) => {
      return { ...prevState, ...newData };
    });
  };

  return (
    <tbody>
      <TableRow>
        <td>
          <CompanyInput addNewValue={addNewValue} isEditOpen={isEditOpen} />
        </td>
        <td>
          <ModelInput addNewValue={addNewValue} isEditOpen={isEditOpen} />
        </td>
        <td>
          <VinInput addNewValue={addNewValue} isEditOpen={isEditOpen} />
        </td>
        <td>
          <SelectColor
            defaultValue=""
            addNewValue={addNewValue}
            isEditOpen={isEditOpen}
          />
        </td>
        <td>
          <SelectYear addNewValue={addNewValue} isEditOpen={isEditOpen} />
        </td>
        <td>
          <PriceInput
            defaultValue="$0"
            addNewValue={addNewValue}
            isEditOpen={isEditOpen}
          />
        </td>
        <td>
          <SelectAvailability
            defaultValue=""
            addNewValue={addNewValue}
            isEditOpen={isEditOpen}
          />
        </td>
      </TableRow>
    </tbody>
  );
};

export default CleanBodyModalTable;
