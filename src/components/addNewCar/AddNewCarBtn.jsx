import { useContext } from "react";
import ctx from "../../context/authContext";
import { ButtonClearSearch } from "./AddNewCarBtn.tyled";

const AddNewCarBtn = () => {
  const { updateCurrentRowCar } = useContext(ctx);

  const handleAddCar = () => {
    updateCurrentRowCar({ typeAction: "addNew" });
  };

  return (
    <ButtonClearSearch type="button" onClick={handleAddCar}>
      Add new car
    </ButtonClearSearch>
  );
};

export default AddNewCarBtn;
