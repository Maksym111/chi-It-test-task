import { useContext, useEffect, useState } from "react";
import { Notify } from "notiflix/build/notiflix-notify-aio";

import { v4 as uuidv4 } from "uuid";

import ctx from "../../../context/authContext";
import isEqualObject from "../../../utils/jsFunc";

import {
  ActionBtnsWrapper,
  CancelBtn,
  DeleteNameAction,
  DeleteTitle,
  Modal,
  ModalOverlay,
  SaveBtn,
} from "./ModalWindow.styled";
import { MainTable } from "../../tableCars/TableCars.styled";
import HeadModalTable from "../headModalTable/HeadModalTable";
import BodyModalTable from "../bodyModalTable/BodyModalTable";
import CleanBodyModalTable from "../cleanBodyModalTable/CleanBodyModalTable";
import { setDataLocStor } from "../../../services/localStorage";
import { KEY_LOCAL } from "../../../utils/constants";

const ModalWindow = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isInputEditAvailable, setIsInputEditAvailable] = useState({});

  const {
    allCars,
    updateAllCars,
    updateFilteredCars,
    updateCurrentRowCar,
    currentRowCar: carEl,
  } = useContext(ctx);

  const { id, typeAction } = carEl;

  useEffect(() => {
    if (typeAction) {
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
  }, [typeAction, updateCurrentRowCar]);

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

    setDataLocStor(KEY_LOCAL.keyAllCars, newAllCars);
    closeModal();
  };

  const saveUpdateDataCar = () => {
    const newCars = [...allCars];
    const updatedCar = newCars.find((elem) => elem.id === id);
    delete carEl.typeAction;

    const indexElem = newCars.indexOf(updatedCar);
    const isEqual = isEqualObject(updatedCar, carEl);

    if (isEqual) {
      Notify.warning("You haven't made any changes");
      return;
    }

    console.log("isInputEditAvailable.price", isInputEditAvailable.price);
    if (isInputEditAvailable.price) {
      Notify.warning(`Enter the price value and confirm or cancel it`);
      return;
    }

    newCars.splice(indexElem, 1, carEl);
    updateAllCars(newCars);
    setDataLocStor(KEY_LOCAL.keyAllCars, newCars);
    closeModal();
  };

  const saveNewDataCar = () => {
    const cars = [...allCars];
    let isAllFine = true;

    const openEdits = Object.keys(isInputEditAvailable);

    openEdits.forEach((elemKey) => {
      if (isInputEditAvailable[elemKey]) {
        Notify.warning(`Enter the ${elemKey} value and confirm it`);
        isAllFine = false;
        return;
      }
    });

    if (!isAllFine) {
      return;
    }

    carEl["id"] = Number(
      uuidv4()
        .replace(/[^0-9]/g, "")
        .slice(0, 17)
    );

    delete carEl.typeAction;

    cars.unshift(carEl);
    updateAllCars(cars);
    updateFilteredCars(cars);

    setDataLocStor(KEY_LOCAL.keyAllCars, cars);
    setDataLocStor(KEY_LOCAL.keyFilteredCars, cars);
    closeModal();
  };

  return (
    <>
      {isModalOpen && typeAction === "edit" && (
        <ModalOverlay onClick={onOverlayClick}>
          <Modal>
            <MainTable>
              <HeadModalTable />
              <BodyModalTable isEditOpen={setIsInputEditAvailable} />
            </MainTable>

            <ActionBtnsWrapper>
              <SaveBtn type="button" onClick={saveUpdateDataCar}>
                Save
              </SaveBtn>
              <CancelBtn type="button" onClick={closeModal}>
                Cancel
              </CancelBtn>
            </ActionBtnsWrapper>
          </Modal>
        </ModalOverlay>
      )}
      {isModalOpen && typeAction === "delete" && (
        <ModalOverlay onClick={onOverlayClick}>
          <Modal>
            <DeleteNameAction>Delete car from table?</DeleteNameAction>
            <DeleteTitle>Are you want to perform your action?</DeleteTitle>

            <ActionBtnsWrapper>
              <SaveBtn type="button" onClick={deleteCarItem}>
                Yes
              </SaveBtn>
              <CancelBtn type="button" onClick={closeModal}>
                No
              </CancelBtn>
            </ActionBtnsWrapper>
          </Modal>
        </ModalOverlay>
      )}
      {isModalOpen && typeAction === "addNew" && (
        <ModalOverlay onClick={onOverlayClick}>
          <Modal>
            <MainTable>
              <HeadModalTable />
              <CleanBodyModalTable isEditOpen={setIsInputEditAvailable} />
            </MainTable>

            <ActionBtnsWrapper>
              <SaveBtn type="button" onClick={saveNewDataCar}>
                Save
              </SaveBtn>
              <CancelBtn type="button" onClick={closeModal}>
                Cancel
              </CancelBtn>
            </ActionBtnsWrapper>
          </Modal>
        </ModalOverlay>
      )}
    </>
  );
};

export default ModalWindow;
