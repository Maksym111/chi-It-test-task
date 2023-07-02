import { useCallback, useEffect, useState } from "react";

import authContext from "../../context/authContext";
import { getAllCars } from "../../services/axios";

import TableHead from "../tableHead/TableHead";
import TableBody from "../tableBody/TableBody";
import AddNewCarBtn from "../addNewCar/addNewCarBtn";
import ModalWindow from "../modal/ModalWindow";
import CarsPagination from "../carsPagination/CarsPagination";
import SearchCar from "../search/SearchCar";

import { MainTable } from "./TableCars.styled";

const TableCars = () => {
  const [allCars, setAllCars] = useState([]);
  const [carsPerPage, setCarsPerPage] = useState([]);

  const [currentRowCar, setCurrentRowCar] = useState([]);

  const [range, setRange] = useState([0, 50]);

  useEffect(() => {
    async function getCar() {
      const cars = await getAllCars();

      setAllCars(cars);
    }
    getCar();
  }, []);

  useEffect(() => {
    setCarsPerPage(allCars.slice(range[0], range[1]));
  }, [allCars, range]);

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

  const updateAllCars = (value) => {
    setAllCars(value);
  };
  const updateCarsPerPage = (value) => {
    setCarsPerPage(value);
  };
  const updateCurrentRowCar = (value) => {
    setCurrentRowCar(value);
  };

  return (
    <authContext.Provider
      value={{
        allCars,
        updateAllCars,

        carsPerPage,
        updateCarsPerPage,

        currentRowCar,
        updateCurrentRowCar,
      }}
    >
      <div>
        {carsPerPage.length > 0 && (
          <>
            <SearchCar />

            <AddNewCarBtn />

            <MainTable>
              <TableHead />
              <TableBody />
            </MainTable>

            <ModalWindow />

            <CarsPagination getCurrentPage={getCurrentPage} />
          </>
        )}
      </div>
    </authContext.Provider>
  );
};

export default TableCars;
