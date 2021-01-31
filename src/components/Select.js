import React from 'react'
import {useSelect} from "downshift"
import {items, menuStyles} from "../constants"


export const Select = () => {
  const {
    isOpen,
    selectedItem,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = useSelect({ items });
  return (
    <div>
      <label {...getLabelProps()}>Выберите элемент:</label>
      <button type="button" {...getToggleButtonProps()}>
        {selectedItem || "Elements"}
      </button>
      <ul {...getMenuProps()} style={menuStyles}>
        {isOpen &&
          items.map((item, index) => (
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
    </div>
  );
}
