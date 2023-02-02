import React, { useState } from 'react'
import Multiselect from 'multiselect-react-dropdown';


export const MultiSelectDropDown = ({fetchedOptions,selected,setSelected}) => {


    // const[multiSelectOptions,setMultiSelectOptions] = useState(['Contribute in all phases of the development lifecycle',
    // 'Write well designed, testable, efficient code',
    // 'Ensure designs are in compliance with specifications']);

    //const[selected,setSelected] = useState([]);
    console.log("multiselect "+selected)

    function handleSelect(selectedOption){
        setSelected([selectedOption]);
    }

    function handleRemove( selectedList, removedItem){
     
        setSelected([selectedList]);
       
    }


  return (
    <div>

<Multiselect
  isObject={false}
  onKeyPressFn={function noRefCheck(){}}
  onRemove={handleRemove}
  selectedValues={selected}
  onSearch={function noRefCheck(){}}
  options={fetchedOptions}
  onSelect={handleSelect}
    />
    </div> 


  );



}
