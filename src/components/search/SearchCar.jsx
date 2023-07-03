import { useContext, useRef, useState } from "react";
import ctx from "../../context/authContext";
import { Notify } from "notiflix";

const SearchCar = ({ carsForSearch }) => {
  const [searchInputValue, setSearchInputValue] = useState("");
  const { allCars, updateAllCars } = useContext(ctx);
  const allCarsRef = useRef([...allCars]);

  console.log(carsForSearch);
  const searchedCars = (str) => {
    // const ALL_CARS = allCarsRef.current;
    const ALL_CARS = carsForSearch;

    if (str === "") return ALL_CARS;

    let wordsSearch = str.split(" ");

    const newCarsStr = newArrFromString(wordsSearch, ALL_CARS);

    if (newCarsStr.length === 0) {
      Notify.failure("No data for this request :(");
    }

    return newCarsStr;
  };

  const handleChangeInputValue = (e) => {
    const { value } = e.target;

    setSearchInputValue(value);
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const resCars = searchedCars(searchInputValue.toLowerCase().trim());

    updateAllCars(resCars);
  };

  const filterByWord = (word, arr) => {
    return arr.filter((elem) => {
      const carElem = { ...elem };

      delete carElem.id;
      const valuesString = Object.values(carElem).join("").toLowerCase();

      return valuesString.includes(word);
    });
  };

  function newArrFromString(words, cars) {
    let res = filterByWord(words[0], cars);

    if (words.length === 1) {
      return res;
    }

    words.shift();

    return newArrFromString(words, res);
  }

  return (
    <form onSubmit={handleSubmitForm}>
      <input
        type="text"
        onChange={handleChangeInputValue}
        value={searchInputValue}
      />
      <button type="submit">🔍</button>
    </form>
  );
};

export default SearchCar;
