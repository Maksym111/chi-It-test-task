import styled from "@emotion/styled";

export const MainTable = styled.table`
  table-layout: fixed;
  width: auto;

  margin: 0 auto;
  margin-bottom: 30px;
  min-width: 1000px;
  border-collapse: collapse;

  border: 1px solid black;

  td,
  th {
    padding: 5px 15px;
    text-align: center;
    border: 1px solid black;
  }

  td {
    overflow: hidden;
  }
  td:nth-of-type(1) {
    width: 150px;
  }
  td:nth-of-type(2) {
    width: 175px;
  }
  td:nth-of-type(3) {
    width: 200px;
  }
  td:nth-of-type(4) {
    width: 100px;
  }
  td:nth-of-type(5) {
    width: 50px;
  }
  td:nth-of-type(6) {
    width: 100px;
  }
  td:nth-of-type(7) {
    width: 10px;
  }
  td:nth-of-type(8) {
    width: 10px;
    padding: 0;
  }
`;
