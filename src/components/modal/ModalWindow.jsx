import { useContext, useEffect, useState } from "react";
import { Notify } from "notiflix/build/notiflix-notify-aio";

import ctx from "../../context/authContext";
import isEqualObject from "../../utils/jsFunc/isEqualObject";

import { Modal, ModalOverlay } from "./ModalWindow.styled";
import { MainTable } from "../tableCars/TableCars.styled";
import HeadModalTable from "./headModalTable/HeadModalTable";
import BodyModalTable from "./bodyModalTable/BodyModalTable";

const ModalWindow = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPriceInputOpen, setIsPriceInputOpen] = useState(false);

  const {
    allCars,
    updateAllCars,
    updateCurrentRowCar,
    currentRowCar: carEl,
  } = useContext(ctx);

  const { id, typeAction } = carEl;

  useEffect(() => {
    if (id) {
      openModal();

      document.addEventListener("keydown", handleKeyDown);
    }

    function handleKeyDown(e) {
      if (e.key === "Escape") {
        setIsModalOpen(false);
        updateCurrentRowCar([]);
      }
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [id, updateCurrentRowCar]);

  const onOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    updateCurrentRowCar([]);
  };

  const deleteCarItem = () => {
    const newAllCars = [...allCars];
    const deletedCar = newAllCars.find((elem) => elem.id === id);
    const indexElem = newAllCars.indexOf(deletedCar);
    newAllCars.splice(indexElem, 1);
    updateAllCars(newAllCars);

    closeModal();
  };

  const saveNewData = () => {
    const newCars = [...allCars];
    const updatedCar = newCars.find((elem) => elem.id === id);
    updatedCar["typeAction"] = "edit";

    const indexElem = newCars.indexOf(updatedCar);
    const isEqual = isEqualObject(updatedCar, carEl);

    if (isEqual) {
      Notify.warning("You haven't made any changes");
      return;
    }
    if (isPriceInputOpen) {
      Notify.warning(
        "Enter the price value and confirm or cancel the price change"
      );
      return;
    }

    newCars.splice(indexElem, 1, carEl);
    updateAllCars(newCars);
    closeModal();
  };

  return (
    <>
      {isModalOpen && typeAction === "edit" && (
        <ModalOverlay onClick={onOverlayClick}>
          <Modal>
            <MainTable>
              <HeadModalTable />
              <BodyModalTable isPriceOpen={setIsPriceInputOpen} />
            </MainTable>

            <button type="button" onClick={saveNewData}>
              Save
            </button>
            <button type="button" onClick={closeModal}>
              Cancel
            </button>
          </Modal>
        </ModalOverlay>
      )}
      {isModalOpen && typeAction === "delete" && (
        <ModalOverlay onClick={onOverlayClick}>
          <Modal>
            <h1>Are you want to perform your action?</h1>

            <button type="button" onClick={deleteCarItem}>
              Yes
            </button>
            <button type="button" onClick={closeModal}>
              No
            </button>
          </Modal>
        </ModalOverlay>
      )}
    </>
  );
};

export default ModalWindow;
