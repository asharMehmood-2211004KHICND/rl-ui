import React, { useState } from "react";
import styled from "./SimpleDropDown.module.css";

export const SimpleDropDown = ({
  optionLabel = "Select",
  title,
  selectedOption,
  setSelectedOption,
  options,
  optionText = null,
}) => {
  if (optionText === null) {
    optionText = options;
  }
  //  console.log("data of simple dropdown")
  return (
    <div className={styled.SimpleDropDown}>
      <select
        title={title}
        name={optionLabel}
        defaultValue={""}
        className={selectedOption ? styled.blackColor : styled.greyColor}
        id={title}
        value={selectedOption}
        onChange={(e) => {
          setSelectedOption(e.target.value);
        }}
        required
      >
        <option value="" hidden>
          {optionLabel}
        </option>
        {options &&
          options.map((option, i) => (
            <option key={option} value={option}>
              {optionText[i]}
            </option>
          ))}
      </select>
    </div>
  );
};
