import React, { useState } from "react";
import { Select } from "antd";
import "./MultiSelectDropDown.css"

const { Option } = Select;

export const MultiSelectDropDown = ({
  fetchedOptions,
  selected,
  setSelected,
  nameTag = "name"
}) => {
  function handleSelect(selectedOption) { 
    setSelected(selectedOption);
    console.log(selectedOption)
  }

  function handleRemove(selectedList, removedItem) {
    setSelected([selectedList]);
  }

  return (
<div
 >
  <Select
    className="multiSelectStyled"
    mode="multiple"
    placeholder="Please select"
    value={selected}
    onChange={handleSelect}
  >
   { fetchedOptions && 
      fetchedOptions.map((opt,i)=>
        <Option key={i} value={opt} >{opt}</Option>    
    )}
  </Select>
  </div>
  );
};
