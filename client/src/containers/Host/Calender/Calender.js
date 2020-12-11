import React from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css';



const Calender = (props) => {
    return (
            <DateRange
                className="bg-light ml-3"
                editableDateInputs={true}
                onChange={item => {
                    props.setTimeState([item.selection])
                }}
                moveRangeOnFirstSelection={false}
                ranges={props.timeState}
                minDate={new Date()}
                direction="vertical"
                dateFormat="MMM/d/yyyy"
            />
    )
}

export default Calender
