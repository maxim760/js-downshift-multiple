import React from "react";
import { useCombobox, useMultipleSelection } from "downshift";

import { sql as items } from "../constants";

export const MultipleSelection = () => {
  const [inputValue, setInputValue] = React.useState("");
  const {
    getSelectedItemProps,
    getDropdownProps,
    addSelectedItem,
    removeSelectedItem,
    selectedItems,
  } = useMultipleSelection();
  const getFilteredItems = (items) =>
    items.filter((item) => {
      const value = inputValue.split(" ").pop();
      if (value) {
        // return item.toLowerCase().includes(value.toLowerCase());
        return item.toLowerCase().startsWith(value.toLowerCase());
      }
      return false;
    });
  const {
    isOpen,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
    selectItem,
  } = useCombobox({
    inputValue,
    items: getFilteredItems(items),
    onStateChange: ({ inputValue, type, selectedItem }) => {
      switch (type) {
        case useCombobox.stateChangeTypes.InputChange:
          setInputValue(inputValue);

          break;
        case useCombobox.stateChangeTypes.InputKeyDownEnter:
        case useCombobox.stateChangeTypes.ItemClick:
        case useCombobox.stateChangeTypes.InputBlur:
          if (selectedItem) {
            setInputValue(prev => {
              const prevText = prev.substring(0, prev.lastIndexOf(" ") + 1) //rrr => "", r r r r => "r r r"
              return prevText + selectedItem
            });
            selectItem(null);
          }

          break;
        default:
          break;
      }
    },
  });

  return (
    <div>
      <label {...getLabelProps()}>Составьте sql запрос</label>
      <div>
        <div {...getComboboxProps()}>
          <textarea
            value={inputValue}
            {...getInputProps(getDropdownProps({ preventKeyAction: isOpen }))}
          />
        </div>
      </div>
      <ul {...getMenuProps()}>
        {isOpen &&
          getFilteredItems(items).map((item, index) => (
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
};
