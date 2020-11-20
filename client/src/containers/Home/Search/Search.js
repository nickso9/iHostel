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
    
    console.log(timeState[0].startDate)
    console.log(timeState[0].endDate)

    return (
            <Form.Group className='m-5 form-row'>
                <div className='col-md-6'>
                <Form.Control 
                    size="lg" 
                    type="text" 
                    placeholder="Where are you going?" 
                    className="text-dark rounded bg-light border-secondary"
                />
                    
                </div>
                    <div className="col-md-4">
                    <button 
                        className="w-100 border border-secondary btn-lg 
                        text-secondary d-flex justify-content-between" 
                        onClick={() => setShowCalender(!showCalender)}>
                            <span >Check dates</span>
                            <span className="glyphicon">&#xe109;</span>
                            </button>

                    { showCalender && (
                        <DateRange
                            style={{zIndex: '1000'}}
                            className="bg-light"
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
                    <div className="col-md-2">
                        <button className="w-100 border border-secondary btn-lg text-dark">Search</button>
                    </div>
                
           
            </Form.Group>

        
    )   
}



export default SearchBar