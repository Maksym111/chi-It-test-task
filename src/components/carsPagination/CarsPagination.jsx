import { useEffect, useState } from "react";
import { LiBtn, ListLiPagination, ActiveLiBtn } from "./CarsPagination.styled";

const CarsPagination = ({ users, getCurrentPage }) => {
  const [allNumbersBtn, setAllNumbersBtn] = useState([]);
  const [currentNumbBtn, setCurrentNumbBtn] = useState([]);

  const [activBtnNumber, setActivBtnNumber] = useState("1");

  const LEFT_DOTS = "...";
  const RIGHT_DOTS = "....";

  useEffect(() => {
    const firstCreatePaginationNumbers = () => {
      const countUsers = users.length;
      const countUsersPerPage = 50;
      const btnsPagination = [];

      const countBtn = Math.ceil(countUsers / countUsersPerPage);

      for (let i = 1; i <= countBtn; i++) {
        btnsPagination.push(i.toString());
      }

      setAllNumbersBtn(btnsPagination);
    };

    firstCreatePaginationNumbers();
  }, [users.length]);

  useEffect(() => {
    function switchCurrentPaginationBtn() {
      const lastPage = allNumbersBtn.length.toString();
      if (activBtnNumber === "...") {
        return;
      }

      if (allNumbersBtn.length < 10) {
        return setCurrentNumbBtn(allNumbersBtn);
      } else if (+activBtnNumber < 7) {
        return setCurrentNumbBtn([
          ...allNumbersBtn.slice(0, 7),
          RIGHT_DOTS,
          lastPage,
        ]);
      } else if (allNumbersBtn.length - +activBtnNumber < 6) {
        return setCurrentNumbBtn([
          allNumbersBtn[0],
          LEFT_DOTS,
          ...allNumbersBtn.slice(-7),
        ]);
      } else {
        return setCurrentNumbBtn([
          allNumbersBtn[0],
          LEFT_DOTS,
          ...allNumbersBtn.slice(+activBtnNumber - 3, +activBtnNumber + 2),
          RIGHT_DOTS,
          lastPage,
        ]);
      }
    }

    switchCurrentPaginationBtn();
  }, [activBtnNumber, allNumbersBtn]);

  //Change current LiBtn pagination
  const handleListElementClick = (e) => {
    const { nodeName: currentLi, textContent } = e.target;

    if (currentLi !== "LI") {
      return;
    }

    setActivBtnNumber(textContent);
    setCurrentNumbBtn([]);

    // Сделать проверку на троеточие здесь, потому что передаю в нижнюю функцию число, чтобы менялись данные таблицы
    getCurrentPage(+textContent);
  };

  return (
    <>
      {allNumbersBtn.length > 0 && (
        <ListLiPagination onClick={handleListElementClick}>
          {currentNumbBtn.length > 0 &&
            currentNumbBtn.map((number) => {
              return number === activBtnNumber ? (
                <ActiveLiBtn key={number}>{number}</ActiveLiBtn>
              ) : (
                <LiBtn key={number}>{number}</LiBtn>
              );
            })}
        </ListLiPagination>
      )}
    </>
  );
};
export default CarsPagination;
