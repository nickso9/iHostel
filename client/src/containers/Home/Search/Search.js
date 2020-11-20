import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css';
import { format } from 'date-fns'

const SearchBar = () => {

    const [timeState, setTimeState] = useState([
        {
          startDate: new Date(),
          endDate: null,
          key: 'selection',
        }
      ]);
    const [showCalender, setShowCalender] = useState(false)
    

    const timeHandler = () => {
        let convertedStartDate = format(timeState[0].startDate, 'MMM/d/yyyy')
        let convertedEndDate = format(timeState[0].endDate, 'MMM/d/yyyy')
        let dateOne = new Date(convertedStartDate)
        let dateTwo = new Date(convertedEndDate)
        let differenceInTime = dateTwo - dateOne
        let totalDaysBetween = differenceInTime / (1000 * 3600 * 24)
        console.log(totalDaysBetween)
    }


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
                            <span>Check dates</span>
                            <span className="glyphicon">&#xe109;</span>
                            </button>

                    { showCalender && (
                        <DateRange
                            style={{zIndex: '1000'}}
                            className="bg-light"
                            editableDateInputs={true}
                            onChange={item => {
                                setTimeState([item.selection])
                                console.log(item) 
                                // setShowCalender(false) 
                            }}
                            moveRangeOnFirstSelection={false}
                            ranges={timeState}
                            minDate={new Date()}
                            direction="vertical"
                            // months={2}
                            dateFormat="MMM/d/yyyy"
                            // disabledDates={[new Date('Nov 21, 2020'), new Date('Nov 22, 2020'), new Date('Nov 23, 2020')]}
                        />
                    )}


                    </div>
                    <div className="col-md-2">
                        <button 
                        className="w-100 border border-secondary btn-lg text-dark"
                        onClick={timeHandler}
                        >Search</button>
                    </div>
                
           
            </Form.Group>

        
    )   
}



export default SearchBar