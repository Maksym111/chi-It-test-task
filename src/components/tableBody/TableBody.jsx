import { useContext } from "react";
import ctx from "../../context/authContext";

import TableRow from "../tableRow/TableRow";
import { emptyCarObj } from "../../utils/constants/emptyCarObj";

const TableBody = ({ empty }) => {
  const authContext = useContext(ctx);
  const cars = authContext.carsPerPage;

  return (
    <>
      {empty ? (
        <>
          <tbody>
            <TableRow carEl={emptyCarObj} />
          </tbody>
        </>
      ) : (
        <tbody>
          {cars &&
            cars.map((carEl) => {
              return <TableRow key={carEl.id} carEl={carEl} />;
            })}
        </tbody>
      )}
    </>
  );
};

export default TableBody;
