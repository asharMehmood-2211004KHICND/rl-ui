import React,{useState}from 'react'

export const DropDownSearch = ({selectedOption,setSelectedOption}) => {
    const [options, setOptions] = useState(["Karachi", "Quetta", "Pindi","Peshawar"]);
//const [selectedOption, setSelectedOption] = useState("");


const [searchInput, setSearchInput] = useState("");
const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
}

const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
}


return (
    <div>
      <input type="text" value={searchInput} onChange={handleSearchChange} placeholder="Search options" />
      <select
        value={selectedOption}
        onChange={handleSelectChange}
      >
        <option className='option' value="" disabled>Select an option</option>
        {options
            .filter(option => option.toLowerCase().includes(searchInput.toLowerCase()))
            .map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
  
}

