import { MainTable } from "./TableCars.styled";
import TableHead from "../tableHead/TableHead";
import TableBody from "../tableBody/TableBody";
import { useCallback, useEffect, useState } from "react";
import { getAllCars } from "../services/axios";
import CarsPagination from "../carsPagination/CarsPagination";

const TableCars = () => {
  const [allCars, setAllCars] = useState([]);
  const [carsPerPage, setCarsPerPage] = useState([]);

  const [range, setRange] = useState([0, 50]);

  useEffect(() => {
    async function getCar() {
      const cars = await getAllCars();

      setAllCars(cars);
      setCarsPerPage(cars.slice(range[0], range[1]));
    }

    getCar();
  }, [range]);

  useEffect(() => {
    async function updateCarsPerPage() {
      const newCarsPerPage = allCars.slice(range[0], range[1]);
      setCarsPerPage(newCarsPerPage);
    }

    updateCarsPerPage();
  }, [range, allCars]);

  const getCurrentPage = useCallback((number) => {
    let firstRange = number * 50 - 50;
    let secondRange = number * 50;

    setRange([firstRange, secondRange]);
  }, []);

  return (
    <div>
      {carsPerPage.length > 0 && (
        <>
          <MainTable>
            <TableHead />
            <TableBody cars={carsPerPage} />
          </MainTable>

          <CarsPagination cars={allCars} getCurrentPage={getCurrentPage} />
        </>
      )}
    </div>
  );
};

export default TableCars;
