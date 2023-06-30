import { useState } from "react";
import Select from "react-select";

const Edit = ({ getTypeAction }) => {
  const [selectedValue, setSelectedValue] = useState("options");

  const optionsSelect = [
    {
      value: "options",
      label: "Options",
      isDisabled: true,
      isOptionSelected: true,
    },
    { value: "edit", label: "Edit" },
    { value: "delete", label: "Delete" },
  ];

  const commonStyles = {
    width: "100%",
    marginLeft: "0",
    cursor: "pointer",
  };

  const selectStyles = {
    control: (baseStyles, { isFocused }) => ({
      ...baseStyles,
      ...commonStyles,
      border: "none",
      borderColor: isFocused ? "#ccc" : baseStyles.borderColor,
      boxShadow: isFocused ? "none" : baseStyles.boxShadow,
    }),
    menu: (styles) => {
      return {
        ...styles,
        ...commonStyles,
        marginTop: "0",
      };
    },
  };

  const getFilter = () => {
    return optionsSelect.find((elem) => elem.value === "options");
  };

  const onChangeFilter = (newOption) => {
    getTypeAction(newOption.value);
    const defaultValue = optionsSelect.find((elem) => elem.value === "options");
    setSelectedValue(defaultValue);
  };

  return (
    <>
      <Select
        options={optionsSelect}
        value={getFilter()}
        onChange={onChangeFilter}
        styles={selectStyles}
        isSearchable={false}
        theme={(theme) => ({
          ...theme,
          borderRadius: 0,
          colors: {
            ...theme.colors,
            primary25: "#94dee0",
            primary: "#9e9e9e",
          },
        })}
      />
    </>
  );
};

export default Edit;
