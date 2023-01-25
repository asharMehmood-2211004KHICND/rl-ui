import React,{useState} from 'react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';



export const Calander = ({selectedDate,setSelectedDate}) => {

    //const [selectedDate, setSelectedDate] = useState(null);

    return (
        <DatePicker
          selected={selectedDate}
          onChange={date => setSelectedDate(date)}
          minDate={new Date()}
          placeholderText="Closing Date"
        //   isClearable={true}
          showYearDropdown={true}
          scrollableMonthYearDropdown={true}
        />
      );
      
}
