import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css';


const SearchBar = () => {

    const [timeState, setTimeState] = useState([
        {
          startDate: new Date(),
          endDate: null,
          key: 'selection',
        }
      ]);
    const [showCalender, setShowCalender] = useState(false)
      console.log(showCalender)

   


    return (
            <Form.Group className='m-5 form-row'>
                <div className='col-md-6'>
                <Form.Control 
                    size="lg" 
                    type="text" 
                    placeholder="Where are you going?" 
                    className="text-danger rounded bg-light"
                />
                    
                </div>
                    <div className="col-md-3">
                    <button onClick={() => setShowCalender(!showCalender)}>Select Dates</button>

                    { showCalender && (
                        <DateRange
                        editableDateInputs={true}
                        onChange={item => setTimeState([item.selection])}
                        moveRangeOnFirstSelection={true}
                        ranges={timeState}
                        minDate={new Date()}
                        direction="vertical"
                        months={2}
                        dateformat="MM/DD/YYYY"
                    />
                    )}




                    </div>
                    <div className="col-md-3">
                        
                    </div>
                
           
            </Form.Group>

        
    )   
}



export default SearchBar