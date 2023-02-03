import React, { useState } from "react";
import { Select } from "antd";
import '../JobList/JobList.css';

const { Option } = Select;

export const MultiSelectDropDown = ({
  fetchedOptions,
  selected,
  setSelected,
}) => {
  function handleSelect(selectedOption) {
    setSelected(selectedOption);
    console.log(selectedOption)
  }

  function handleRemove(selectedList, removedItem) {
    setSelected([selectedList]);
  }

  return (
  <Select
    mode="multiple"
    style={{ width: "100%" }}
    placeholder="Please select"
    value={selected}
    onChange={handleSelect}
  >
   { fetchedOptions && 
      fetchedOptions.map(opt=>
        <Option value={opt}>{opt}</Option>    
    )}
  </Select>
  );
};
