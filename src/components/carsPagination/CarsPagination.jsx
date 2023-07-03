import { useContext, useEffect, useRef, useState } from "react";

import ctx from "../../context/authContext";

import {
  LiBtn,
  ListLiPagination,
  ActiveLiBtn,
  PaginationWrapper,
  ButtonPagination,
} from "./CarsPagination.styled";

const CarsPagination = ({ getCurrentPage }) => {
  const { filteredCars: cars } = useContext(ctx);

  const [allNumbersBtn, setAllNumbersBtn] = useState([]);
  const [currentNumbsBtn, setCurrentNumbsBtn] = useState([]);

  const [activеBtnNumber, setActivBtnNumber] = useState("1");
  const arrowBack = useRef("");
  const arrowNext = useRef("second");

  const LEFT_DOTS = "...";
  const RIGHT_DOTS = "....";

  useEffect(() => {
    //Створення масиву номерів для кнопок пагінації
    const firstCreatePaginationNumbers = () => {
      let countCars = 1;
      if (cars.length !== 0) {
        countCars = cars.length;
      }
      const countCarsPerPage = 50;
      const btnsPagination = [];

      const countBtn = Math.ceil(countCars / countCarsPerPage);

      for (let i = 1; i <= countBtn; i++) {
        btnsPagination.push(i.toString());
      }

      setAllNumbersBtn(btnsPagination);
    };

    firstCreatePaginationNumbers();
  }, [cars.length]);

  useEffect(() => {
    // Логіка виведення кнопок пагінацїї

    function switchCurrentPaginationBtn() {
      const lastPage = allNumbersBtn.length.toString();
      const { current: backBtn } = arrowBack;
      const { current: nextBtn } = arrowNext;

      //Активні чи неактивні кнопки "наступна" (>) та "попередня" (<)
      if (lastPage === "1") {
        backBtn.disabled = true;
        nextBtn.disabled = true;
      } else if (backBtn && activеBtnNumber.toString() === "1") {
        backBtn.disabled = true;
        nextBtn.disabled = false;
      } else if (nextBtn && activеBtnNumber.toString() === lastPage) {
        backBtn.disabled = false;
        nextBtn.disabled = true;
      } else if (
        activеBtnNumber > 1 &&
        activеBtnNumber.toString() !== lastPage
      ) {
        backBtn.disabled = false;
        nextBtn.disabled = false;
      }

      if (allNumbersBtn.length < 10) {
        return setCurrentNumbsBtn(allNumbersBtn);
      } else if (activеBtnNumber < 7) {
        return setCurrentNumbsBtn([
          ...allNumbersBtn.slice(0, 7),
          RIGHT_DOTS,
          lastPage,
        ]);
      } else if (allNumbersBtn.length - activеBtnNumber < 6) {
        return setCurrentNumbsBtn([
          allNumbersBtn[0],
          LEFT_DOTS,
          ...allNumbersBtn.slice(-7),
        ]);
      } else {
        return setCurrentNumbsBtn([
          allNumbersBtn[0],
          LEFT_DOTS,
          ...allNumbersBtn.slice(activеBtnNumber - 3, activеBtnNumber + 2),
          RIGHT_DOTS,
          lastPage,
        ]);
      }
    }

    switchCurrentPaginationBtn();
  }, [activеBtnNumber, allNumbersBtn]);

  //Зміна поточної кнопки пагінацїї при кліку на неї
  const handleListElementClick = (e) => {
    const { nodeName: currentLi, textContent } = e.target;

    if (currentLi !== "LI" || activеBtnNumber.toString() === textContent) {
      return;
    }

    //-------логіка натискання на три крапк, в else на будь-який номер кнопки

    if (textContent === RIGHT_DOTS) {
      let newNumber = 0;
      if (currentNumbsBtn.length < 12) {
        newNumber = +activеBtnNumber + 4;
      } else {
        newNumber = +activеBtnNumber + 6;
      }

      setActivBtnNumber(newNumber);
      getCurrentPage(newNumber);
    } else if (textContent === LEFT_DOTS) {
      const newNumber = +activеBtnNumber - 5;

      setActivBtnNumber(newNumber);
      getCurrentPage(newNumber);
    } else {
      setActivBtnNumber(+textContent);
      getCurrentPage(+textContent);
    }

    //Очищення масиву пагінації при кліку на іншу кнопку пагінації
    // setCurrentNumbBtn([]);
  };

  const handleArrowClick = (e) => {
    const arrowBtn = e.target;
    if (arrowBtn.textContent === ">") {
      setActivBtnNumber((prevState) => (prevState = +prevState + 1));
    } else {
      setActivBtnNumber((prevState) => (prevState = +prevState - 1));
    }
  };

  return (
    <>
      {allNumbersBtn.length > 0 && (
        <PaginationWrapper>
          <ButtonPagination
            type="button"
            ref={arrowBack}
            onClick={handleArrowClick}
          >
            {"<"}
          </ButtonPagination>
          <ListLiPagination onClick={handleListElementClick}>
            {currentNumbsBtn.length > 0 &&
              currentNumbsBtn.map((number) => {
                return number === activеBtnNumber.toString() ? (
                  <ActiveLiBtn key={number}>{number}</ActiveLiBtn>
                ) : (
                  <LiBtn key={number}>{number}</LiBtn>
                );
              })}
          </ListLiPagination>
          <ButtonPagination
            type="button"
            ref={arrowNext}
            onClick={handleArrowClick}
          >
            {">"}
          </ButtonPagination>
        </PaginationWrapper>
      )}
    </>
  );
};
export default CarsPagination;
