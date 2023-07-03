import { useCallback, useEffect, useState } from "react";

import authContext from "../../context/authContext";
import { getAllCars } from "../../services/axios";

import TableHead from "../tableHead/TableHead";
import TableBody from "../tableBody/TableBody";
import AddNewCarBtn from "../addNewCar/AddNewCarBtn";
import ModalWindow from "../modal/ModalWindow";
import CarsPagination from "../carsPagination/CarsPagination";
import SearchCar from "../search/SearchCar";

import { MainTable } from "./TableCars.styled";

const TableCars = () => {
  const [allCars, setAllCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [carsPerPage, setCarsPerPage] = useState([]);

  const [currentRowCar, setCurrentRowCar] = useState([]);

  const [range, setRange] = useState([0, 50]);

  useEffect(() => {
    async function getCar() {
      const cars = await getAllCars();

      setFilteredCars(cars);
      setAllCars(cars);
    }
    getCar();
  }, []);

  useEffect(() => {
    setFilteredCars((prevState) => {
      const idFilteredArr = prevState.map((elem) => {
        return elem.id;
      });

      const qwe = allCars.filter((elem) => {
        return idFilteredArr.includes(elem.id);
      });

      return qwe;
    });
  }, [allCars, filteredCars.id]);

  useEffect(() => {
    async function updateCarsPerPage() {
      const newCarsPerPage = filteredCars.slice(range[0], range[1]);
      setCarsPerPage(newCarsPerPage);
    }

    updateCarsPerPage();
  }, [range, filteredCars]);

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

  const updateFilteredCars = (value) => {
    setFilteredCars(value);
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

        filteredCars,
        updateFilteredCars,
      }}
    >
      <div>
        <SearchCar />
        <AddNewCarBtn />
        <MainTable>
          <TableHead />
          {carsPerPage.length > 0 ? <TableBody /> : <TableBody empty />}
        </MainTable>
        <ModalWindow />
        <CarsPagination getCurrentPage={getCurrentPage} />
      </div>
    </authContext.Provider>
  );
};

export default TableCars;
