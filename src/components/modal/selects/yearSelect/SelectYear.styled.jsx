import styled from "@emotion/styled";

export const ContainerYearPicker = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0;

  border: 1px solid #ccc;
  border-radius: 4px;
  overflow: hidden;

  .react-datepicker__input-container {
    display: flex;
  }

  .react-datepicker__input-container span {
    display: none;
  }

  .react-datepicker__input-container input {
    width: 38px;
    padding: 0 15px;

    font-size: 16px;
    border: none;
    caret-color: transparent;
  }

  .react-datepicker__input-container input:hover {
    cursor: pointer;
  }

  .react-datepicker__input-container input:focus-visible {
    outline: none;
  }

  .react-datepicker__year-dropdown-container {
    width: 100%;

    .react-datepicker__year-dropdown {
      width: 100%;
      max-height: 200px;
      overflow-y: auto;
      border: 1px solid #ccc;
      border-radius: 4px;
      background-color: #fff;
    }
  }

  .react-datepicker__year-dropdown-container
    .react-datepicker__year-dropdown
    .react-datepicker__year-option {
    padding: 8px;
    cursor: pointer;
    transition: background-color 0.2s ease;
  }

  .react-datepicker__year-dropdown-container
    .react-datepicker__year-dropdown
    .react-datepicker__year-option:hover {
    background-color: #f0f0f0;
  }

  p {
    margin: 0;
    font-size: 16px;
    color: #555;
  }
`;

export const WrapperYearPicker = styled.div`
  margin-top: 1px;
  margin-bottom: 1px;
`;
