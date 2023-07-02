import { useContext } from "react";
import ctx from "../../context/authContext";

const AddNewCarBtn = () => {
  const { updateCurrentRowCar } = useContext(ctx);

  const handleAddCar = () => {
    updateCurrentRowCar({ typeAction: "addNew" });
  };

  return (
    <button type="button" onClick={handleAddCar}>
      Add new car
    </button>
  );
};

export default AddNewCarBtn;
