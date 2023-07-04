import styled from "@emotion/styled";

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  gap: 10px;
`;

export const ButtonPagination = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 110px;
  height: 34px;
  margin: 0;
  padding: 5px 10px;

  background-color: #ffffff;
  color: #2c48fc;
  font-size: 18px;

  border: 2px solid black;
  border-radius: 2px;
  border-color: #2c48fc;

  :disabled {
    opacity: 0.3;
    cursor: default;
  }
`;

export const ListLiPagination = styled.ul`
  display: flex;
  justify-content: center;

  li {
    display: flex;
    align-items: center;
    justify-content: center;

    padding: 5px;

    width: 20px;
    height: 20px;

    border: 2px solid #2c48fc;
    border-radius: 2px;
    color: #2c48fc;

    transition: background-color 250ms ease-in-out, box-shadow 250ms ease-in-out;
    cursor: pointer;

    :not(:last-child) {
      margin-right: 10px;
    }

    :hover {
      box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.4);
    }
  }
`;

export const LiBtn = styled.li`
  background-color: #ffffff;
`;

export const ActiveLiBtn = styled.li`
  && {
    background-color: #2c48fc;
    border-color: #2c48fc;
    color: white;
    box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.4);
  }
`;
