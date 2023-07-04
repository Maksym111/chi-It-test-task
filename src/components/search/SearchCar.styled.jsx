import styled from "@emotion/styled";

export const FormSearch = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const InputSearch = styled.input`
  display: block;
  width: 100%;
  padding: 10px 20px;
  font-size: 21px;
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

export const ButtonSearch = styled.button`
  display: inline-block;
  margin-right: 5px;
  background-color: #3288eb;
  border: 1px solid #bdbdbd;
  padding: 10px 20px;
  font-size: 18px;
  border-radius: 0;

  :hover {
    background-color: #2e80dd;
  }
`;

export const ButtonClearSearch = styled.button`
  display: inline-block;
  background-color: #3288eb;
  border: 1px solid #bdbdbd;
  padding: 10px 20px;
  font-size: 18px;
  border-radius: 4px;
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;

  :hover {
    background-color: #2e80dd;
  }
`;
