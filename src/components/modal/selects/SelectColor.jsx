import { useContext, useEffect, useState } from "react";
import Select from "react-select";
import ctx from "../../../context/authContext";

const SelectColor = ({ defaultValue, addNewValue }) => {
  const [allColors, setAllColors] = useState([]);
  const [selectedValue, setSelectedValue] = useState(
    defaultValue.toLowerCase()
  );

  const authContext = useContext(ctx);
  const { allCars } = authContext;

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

  useEffect(() => {
    const getAllColors = () => {
      const allColors = allCars.reduce((uniqCars, { car_color }) => {
        return uniqCars.includes(car_color)
          ? uniqCars
          : [...uniqCars, car_color];
      }, []);

      setAllColors(allColors);
    };

    getAllColors();
  }, [allCars]);

  const createAllOptionsSelect = () => {
    const allOptions = allColors.map((color) => {
      if (color === defaultValue) {
        return {
          value: color.toLowerCase(),
          label: color,
          isOptionSelected: true,
        };
      }
      return {
        value: color.toLowerCase(),
        label: color,
      };
    });

    return allOptions;
  };

  const getFilter = () => {
    const values = createAllOptionsSelect();

    return selectedValue
      ? values.find((elem) => elem.value === selectedValue)
      : "";
  };

  const onChangeFilter = (newOption) => {
    setSelectedValue(newOption.value);
    addNewValue({ car_color: newOption.label });
  };

  return (
    <>
      <Select
        options={createAllOptionsSelect()}
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

export default SelectColor;
