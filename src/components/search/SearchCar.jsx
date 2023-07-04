import { useContext, useEffect, useState } from "react";
import ctx from "../../context/authContext";
import { Notify } from "notiflix";
import { getDataLocStor, setDataLocStor } from "../../services/localStorage";
import { KEY_LOCAL } from "../../utils/constants";
import {
  ButtonClearSearch,
  ButtonSearch,
  FormSearch,
  InputSearch,
} from "./SearchCar.styled";

const SearchCar = () => {
  const [searchInputValue, setSearchInputValue] = useState("");
  const { allCars, updateFilteredCars } = useContext(ctx);
  const valueSearchLocStor = getDataLocStor(KEY_LOCAL.keyValueSearch);

  useEffect(() => {
    if (valueSearchLocStor) {
      setSearchInputValue(valueSearchLocStor);
    }
  }, [valueSearchLocStor]);

  const searchedCars = (str) => {
    if (str === "") return allCars;

    let wordsSearch = str.split(" ");

    const newCarsStr = newArrFromString(wordsSearch, allCars);

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

    updateFilteredCars(resCars);
    setDataLocStor(KEY_LOCAL.keyFilteredCars, resCars);
    setDataLocStor(KEY_LOCAL.keyValueSearch, searchInputValue);
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

  const onClearBtnClick = () => {
    setSearchInputValue("");
    setDataLocStor(KEY_LOCAL.keyValueSearch, "");
    setDataLocStor(KEY_LOCAL.keyFilteredCars, allCars);
    updateFilteredCars(allCars);
  };

  return (
    <FormSearch onSubmit={handleSubmitForm}>
      <InputSearch
        type="text"
        onChange={handleChangeInputValue}
        value={searchInputValue}
        placeholder="Search..."
      />
      <ButtonSearch type="submit">🔍</ButtonSearch>
      {valueSearchLocStor && (
        <ButtonClearSearch type="button" onClick={onClearBtnClick}>
          ❌
        </ButtonClearSearch>
      )}
    </FormSearch>
  );
};

export default SearchCar;
