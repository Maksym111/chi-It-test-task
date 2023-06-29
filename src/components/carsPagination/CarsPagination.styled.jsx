import styled from "@emotion/styled";

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
