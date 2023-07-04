import styled from "@emotion/styled";

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

export const MainTable = styled.table`
  table-layout: fixed;
  width: auto;

  margin: 0 auto;
  margin-bottom: 30px;
  min-width: 1000px;
  border-collapse: collapse;

  border: 1px solid black;
  box-shadow: 0px 0px 22px 1px rgba(0, 0, 0, 0.75);

  td,
  th {
    padding: 10px 15px;
    text-align: center;
    border: 1px solid black;
    font-size: 18px;
  }

  th {
    background-color: #333;
    color: #ffffff;
    text-transform: uppercase;
    font-size: 16px;
    letter-spacing: 1.1px;
  }

  tr:nth-of-type(even) td {
    background-color: #e6e6e6;
  }

  tr:hover td {
    background-color: #909fff;
  }

  .highlight {
    background-color: #ffcc00;
  }

  td {
    height: 30px;
    background-color: #ffffff;

    ::selection {
      background-color: #d38a03;
      color: white;
    }
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
    width: 125px;
  }

  td:nth-of-type(5) {
    width: 50px;
  }

  td:nth-of-type(6) {
    width: 125px;
    padding: 5px;
  }

  td:nth-of-type(7) {
    width: 100px;
    padding: 5px;
  }
  td:nth-of-type(8) {
    width: 150px;
    padding: 0;
  }
`;
