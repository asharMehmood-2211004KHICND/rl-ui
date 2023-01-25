import React,{useState} from 'react'

export const ListOfOptions = ({items,setItems,options,setOptions}) => {

//const [items, setItems] = useState([]);
const [selectedItem, setSelectedItem] = useState('');

//const options = ["Option 1", "Option 2", "Option 3"];
//const [options, setOptions] = useState(['Select Option', 'Option 1', 'Option 2']);
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


const handleSelectChange = (event) => {
    setSelectedItem(event.target.value);
}
const handleAddClick = () => {
    if(selectedItem!=="")
    setItems([...items, selectedItem]);
    setSelectedItem('');
}
return (
    <div>
        <form onSubmit={handleSubmit}>
      <input type="text" value={newOption} onChange={e => setNewOption(e.target.value)} placeholder="Enter a new option" />
      <button type="submit" onClick={handleSubmit} >Add Option</button>
    </form>
        <select value={selectedItem} onChange={handleSelectChange}>
            { options && options.map((option, index) => <option key={index}>{option}</option>)}
        </select>
        <button onClick={handleAddClick}>Add to list</button>
        <ul>
            {items.map((item, index) => <li key={index}>{item}</li>)}
        </ul>
    </div>
);

}
