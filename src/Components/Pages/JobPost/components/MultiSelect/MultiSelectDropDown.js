import React, { useState } from "react";
import { Select } from "antd";
import "./MultiSelectDropDown.css"

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
<div
//  className="MultiSelectDropDown_MultiSelectDropDown_Select__q-Jt"
 >
  <Select
    className="multiSelectStyled"
    // className={styled.Select}
    mode="multiple"
    // style={{ width: "100%" }}
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
