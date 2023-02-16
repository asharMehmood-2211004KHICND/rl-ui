import React ,{ useState }  from 'react';
import styles from './Textfeild.module.css';

export const Textfeild = ({ChildrenTag,placeholderText,inputValue,setInputValue}   ) => {
    // const [inputValue, setInputValue] = useState('');
    return (
        <div>
          {/* <input type="text" value={inputValue} onChange={e => setInputValue(e.target.value)} /> */}
      <label>
              
        <input className={styles.input} {...ChildrenTag} placeholder={placeholderText}  value={inputValue} onChange={e =>{e.target.validity.valid && setInputValue(e.target.value) }} />
      </label>
        </div>
      );

}



