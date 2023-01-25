import React,{useState} from 'react'

export const ListOfCheckboxes = ({selectedOptions,setSelectedOptions}) => {
    const [options, setOptions] = useState(["Option 1", "Option 2", "Option 3"]);
    //const [selectedOptions, setSelectedOptions] = useState([]);

    const [newOption, setNewOption] = useState("");
    const handleOptionChange = (event) => {
    setNewOption(event.target.value);
    }

    const handleSelectChange = (event) => {
        if (event.target.checked) {
            setSelectedOptions([...selectedOptions, event.target.value]);
        } else {
            setSelectedOptions(
                selectedOptions.filter((option) => option !== event.target.value)
            );
        }
    }
    
    const handleAddOptionClick = () => {
        if(newOption!==""){
            setOptions([...options, newOption]);
        setNewOption("");
        }
        
    }
    
    return (
        <div>
          {options.map((option, index) => (
              <div key={index}>
                <input
                  type="checkbox"
                  id={option}
                  name="options"
                  value={option}
                  checked={selectedOptions.includes(option)}
                  onChange={handleSelectChange}
                />
                <label htmlFor={option}>{option}</label>
              </div>
            ))}
            <div className="new-option-container">
            <input type="text" value={newOption} onChange={handleOptionChange} placeholder="Enter new option" />
            <button onClick={handleAddOptionClick}>Add option</button>
          </div>
        </div>
      );
      
}
