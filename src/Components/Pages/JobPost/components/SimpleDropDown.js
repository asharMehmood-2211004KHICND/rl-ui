import React from 'react'

export const SimpleDropDown = ({title , selectedOption,setSelectedOption,options}) => {
  
    return (
    <>
        <select value={selectedOption} title={title} onChange={e =>{setSelectedOption(e.target.value)}} required>
          <option value=""  hidden >Select</option>
          { options && options.map((option,i) => (
            <option key={option} value={option}  >
              {option}
            </option>
          ))}
        </select>
    </>
      );
    
   
}
