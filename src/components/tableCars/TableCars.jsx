import { useCallback, useEffect, useState } from "react";

import authContext from "../../context/authContext";
import { getAllCars } from "../../services/axios";

import TableHead from "../tableHead/TableHead";
import TableBody from "../tableBody/TableBody";
import AddNewCarBtn from "../addNewCar/AddNewCarBtn";
import ModalWindow from "../modal/ModalWindow";
import CarsPagination from "../carsPagination/CarsPagination";
import SearchCar from "../search/SearchCar";

import { HeaderWrapper, MainTable } from "./TableCars.styled";
import { getDataLocStor, setDataLocStor } from "../../services/localStorage";
import { KEY_LOCAL } from "../../utils/constants";

const TableCars = () => {
  const [allCars, setAllCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);

  const [carsPerPage, setCarsPerPage] = useState([]);

  const [currentRowCar, setCurrentRowCar] = useState([]);

  const [range, setRange] = useState([0, 50]);

  useEffect(() => {
    const localAllCars = getDataLocStor(KEY_LOCAL.keyAllCars);
    const localFilteredCars = getDataLocStor(KEY_LOCAL.keyFilteredCars);

    if (localFilteredCars) {
      setFilteredCars(localFilteredCars);
      setAllCars(localAllCars);
    } else if (localAllCars) {
      setFilteredCars(localAllCars);
      setAllCars(localAllCars);
      setCarsPerPage(localAllCars.slice(0, 50));
    } else {
      getCar();
    }

    async function getCar() {
      try {
        const cars = await getAllCars();

        setFilteredCars(cars);
        setAllCars(cars);
        setCarsPerPage(cars.slice(0, 50));
        setDataLocStor(KEY_LOCAL.keyAllCars, cars);
      } catch (err) {
        console.error(err);
      }
    }
  }, []);

  useEffect(() => {
    if (allCars.length === 0) {
      return;
    }

    setFilteredCars((prevState) => {
      const idFilteredArr = prevState.map((elem) => {
        return elem.id;
      });

      const filtered = allCars.filter((elem) => {
        return idFilteredArr.includes(elem.id);
      });

      setDataLocStor(KEY_LOCAL.keyFilteredCars, filtered);

      return filtered;
    });
  }, [allCars]);

  useEffect(() => {
    const newCarsPerPage = filteredCars.slice(range[0], range[1]);
    setCarsPerPage(newCarsPerPage);
  }, [filteredCars, range]);

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
      <>
        <HeaderWrapper>
          <SearchCar />
          <AddNewCarBtn />
        </HeaderWrapper>
        <MainTable>
          <TableHead />
          {carsPerPage.length > 0 ? <TableBody /> : <TableBody empty />}
        </MainTable>
        <ModalWindow />
        <CarsPagination getCurrentPage={getCurrentPage} />
      </>
    </authContext.Provider>
  );
};

export default TableCars;
