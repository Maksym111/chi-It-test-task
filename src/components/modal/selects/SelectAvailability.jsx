import { useState } from "react";
import Select from "react-select";

const SelectAvailability = ({ defaultValue, addNewValue }) => {
  const [selectedValue, setSelectedValue] = useState(
    defaultValue.toLowerCase()
  );

  const optionsSelect = [
    {
      value: "false",
      label: "False",
    },
    { value: "true", label: "True" },
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
    return selectedValue
      ? optionsSelect.find((elem) => elem.value === selectedValue)
      : "";
  };

  const onChangeFilter = (newOption) => {
    setSelectedValue(newOption.value);
    addNewValue({ availability: newOption.value });
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

export default SelectAvailability;
