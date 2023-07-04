import styled from "@emotion/styled";

export const ModalInput = styled.input`
  display: block;
  width: ${({ type }) => (type === "number" ? "75px" : "150px")};
  padding: 5px 10px;
  font-size: 16px;
  color: #212529;
  background-color: #fff;
  border: 1px solid #bdbdbd;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 0px;
  transition: box-shadow 250ms ease-in-out;

  :focus {
    color: #212529;
    background-color: #fff;
    border-color: #bdbdbd;
    box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.4);
  }

  :focus-visible {
    outline: none;
  }
`;

export const ResultValue = styled.div`
  font-size: ${({ number }) => (number ? "18pxpx" : "14px")};
`;
