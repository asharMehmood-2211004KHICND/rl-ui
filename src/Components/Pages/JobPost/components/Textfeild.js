import React ,{ useState }  from 'react'

export const Textfeild = ({placeholderText,inputValue,setInputValue}   ) => {
    // const [inputValue, setInputValue] = useState('');
    return (
        <div>
          {/* <input type="text" value={inputValue} onChange={e => setInputValue(e.target.value)} /> */}
          <label>
            
        <input type="text" placeholder={placeholderText}  value={inputValue} onChange={e => setInputValue(e.target.value)} required/>
      </label>
        </div>
      );

}



