import styled from "@emotion/styled";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 10;
`;

export const Modal = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

export const ActionBtnsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 50px;

  button {
    display: inline-block;
    border: 1px solid #bdbdbd;
    color: white;
    padding: 10px 20px;
    font-size: 21px;
    border-radius: 4px;
  }
`;

export const SaveBtn = styled.button`
  background-color: #23a801;

  :hover {
    background-color: #1f9202;
  }
`;

export const CancelBtn = styled.button`
  background-color: #a52a2a;

  :hover {
    background-color: #812020;
  }
`;

export const DeleteNameAction = styled.p`
  font-size: 18px;
  font-weight: 700;
  text-align: center;
  font-style: italic;
  color: red;
`;

export const DeleteTitle = styled.h1`
  padding: 50px 50px 70px;
`;
