import { useContext } from "react";
import ctx from "../../context/authContext";

import TableRow from "../tableRow/TableRow";

const TableBody = () => {
  const authContext = useContext(ctx);
  const cars = authContext.carsPerPage;

  return (
    <tbody>
      {cars &&
        cars.map((carEl) => {
          return <TableRow key={carEl.id} carEl={carEl} />;
        })}
    </tbody>
  );
};

export default TableBody;
