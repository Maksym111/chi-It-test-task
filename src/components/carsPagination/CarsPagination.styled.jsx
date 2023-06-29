import styled from "@emotion/styled";

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  gap: 10px;

  margin-bottom: 30px;
`;

export const ButtonPagination = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 30px;
  height: 30px;
  margin: 0;
  padding: 0;

  background-color: #afc8ff;
  color: black;
  font-size: 18px;

  border: 1px solid black;
  border-radius: 4px;

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

    border: 1px solid black;
    border-radius: 4px;

    cursor: pointer;

    :not(:last-child) {
      margin-right: 10px;
    }
  }
`;

export const LiBtn = styled.li`
  background-color: #afc8ff;
`;

export const ActiveLiBtn = styled.li`
  background-color: #0039b4;
  color: white;
`;
