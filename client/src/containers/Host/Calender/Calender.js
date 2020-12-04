import React from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css';



const Calender = (props) => {
    return (
            <DateRange
                // style={{zIndex: '1000'}}
                className="bg-light ml-3"
                editableDateInputs={true}
                onChange={item => {
                    props.setTimeState([item.selection])
                }}
                moveRangeOnFirstSelection={false}
                ranges={props.timeState}
                minDate={new Date()}
                direction="vertical"
                // months={2}
                dateFormat="MMM/d/yyyy"
                // disabledDates={[new Date('Nov 21, 2020'), new Date('Nov 22, 2020'), new Date('Nov 23, 2020')]}
            />
    )
}

export default Calender
