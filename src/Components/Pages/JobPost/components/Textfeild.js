import React ,{ useState }  from 'react'

export const Textfeild = ({ChildrenTag,placeholderText,inputValue,setInputValue}   ) => {
    // const [inputValue, setInputValue] = useState('');
    return (
        <div>
          {/* <input type="text" value={inputValue} onChange={e => setInputValue(e.target.value)} /> */}
          <label>
            
        <input {...ChildrenTag} placeholder={placeholderText}  value={inputValue} onChange={e => setInputValue(e.target.value)} />
      </label>
        </div>
      );

}



