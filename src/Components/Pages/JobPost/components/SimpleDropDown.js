import React from 'react'

export const SimpleDropDown = ({optionLabel="Select" ,title , selectedOption,setSelectedOption,options, optionText=null}) => {
   if (optionText===null){
      optionText=options
   }

    return (
    <>
        <select id={title} value={selectedOption} title={title} onChange={e =>{setSelectedOption(e.target.value)}} required>
          <option value=""  hidden >{optionLabel}</option>
          { options && options.map((option,i) => (
            <option key={option} value={option}  >
              {optionText[i]}
            </option>
          ))}
        </select>
    </>
      );
    
   
}
