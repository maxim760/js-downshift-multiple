import React from "react";
import { sql, menuStyles } from "../constants";
import { useCombobox } from "downshift";


export const Combobox = () => {
  const [inputItems, setInputItems] = React.useState(sql);
  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
  } = useCombobox({
    items: inputItems,
    onInputValueChange: ({ inputValue }) => {
      setInputItems(
        inputItems.filter((item) =>
          item.toLowerCase().includes(inputValue.toLowerCase())
        )
      );
    },
  });

  return (
    <>
      <label {...getLabelProps()}>Choose an element:</label>
      <div style={{}} {...getComboboxProps()}>
        <input {...getInputProps()} />
        <button
          type="button"
          {...getToggleButtonProps()}
          aria-label={"toggle menu"}
        >
          &#8595;
        </button>
      </div>
      <ul {...getMenuProps()} style={menuStyles}>
        {isOpen &&
          inputItems.map((item, index) => (
            <li
              style={
                highlightedIndex === index ? { backgroundColor: "#bde4ff" } : {}
              }
              key={`${item}${index}`}
              {...getItemProps({ item, index })}
            >
              {item}
            </li>
          ))}
      </ul>
    </>
  );
};
