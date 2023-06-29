import { MainTable } from "./TableCars.styled";
import TableHead from "../tableHead/TableHead";
import TableBody from "../tableBody/TableBody";
import { useEffect, useState } from "react";
import { getAllCars } from "../services/axios";
import CarsPagination from "../carsPagination/CarsPagination";

const TableCars = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [usersPerPage, setUsersPerPage] = useState([]);

  useEffect(() => {
    async function getCar() {
      const users = await getAllCars();

      setAllUsers(users);
      setUsersPerPage(users.slice(0, 50));
    }

    getCar();
  }, []);

  useEffect(() => {
    const [firstRange, secondRange] = getCurrentPage();
    console.log(firstRange);
    console.log(secondRange);

    setUsersPerPage(allUsers.slice(firstRange, secondRange));
  }, [allUsers]);

  const getCurrentPage = (number) => {
    let firstRange = number * 50 - 50;
    let secondRange = number * 50;

    if (isNaN(firstRange) || isNaN(secondRange)) {
      firstRange = 0;
      secondRange = 50;
    }

    return [firstRange, secondRange];
  };

  return (
    <div>
      <MainTable>
        <TableHead />
        <TableBody users={usersPerPage} />
      </MainTable>

      <CarsPagination users={allUsers} getCurrentPage={getCurrentPage} />
    </div>
  );
};

export default TableCars;
