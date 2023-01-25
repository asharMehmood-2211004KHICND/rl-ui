import React,{useState} from 'react'

export const RadioMenu = () => {

    const [options, setOptions] = useState(["Option 1", "Option 2", "Option 3"]);
    const [selectedOption, setSelectedOption] = useState("");
    
    const [newOption, setNewOption] = useState("");
    const handleOptionChange = (event) => {
        setNewOption(event.target.value);
    }

    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
    }

    const handleAddOptionClick = () => {
        setOptions([...options, newOption]);
        setNewOption("");
    }

    return (
        <div>
          {options.map((option, index) => (
              <div key={index}>
                <input
                  type="radio"
                  id={option}
                  name="options"
                  value={option}
                  checked={selectedOption === option}
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
