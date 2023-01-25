import React,{useState} from 'react'

export const DropDownMenu = ({selectedValue,setSelectedValue,options,setOptions}) => {

    // const [selectedValue, setSelectedValue] = useState('');
  //const [options, setOptions] = useState(['Option 1', 'Option 2', 'Option 3']);
  const [newOption, setNewOption] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if(options.indexOf(newOption) === -1 && newOption!==""){
      setOptions([...options, newOption]);
      setNewOption('');
    }else{
      console.log(`${newOption} already exists in the options`);
    }
  }
  


  return (
    <div>
    <form onSubmit={handleSubmit}>
      <input type="text" value={newOption} onChange={e => setNewOption(e.target.value)} placeholder="Enter a new option" />
      <button type="submit" onClick={handleSubmit} >Add Option</button>
    </form>
    <select value={selectedValue} onChange={e => setSelectedValue(e.target.value)}>
      {options.map(option => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  </div>
  );
}
