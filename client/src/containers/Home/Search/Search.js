import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Calender from '../../../components/Calender/Calender'
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
        console.log(convertedStartDate)
        console.log(convertedEndDate)
    }


    return (
            <Form.Group className='mt-5 mb-4 form-row search-form-container'>
                <div className='col-md-6 mt-2'>
                <Form.Control 
                    size="lg" 
                    type="text" 
                    placeholder="Where are you going?" 
                    className="text-dark rounded bg-light border-secondary"
                />           
                </div>
                    <div className="col-md-4 mt-2">
                    <button 
                        className="w-100 border border-secondary btn-lg 
                        text-secondary d-flex justify-content-between" 
                        onClick={() => setShowCalender(!showCalender)}>
                            <span>Check dates</span>
                            <span className="glyphicon">&#xe109;</span>
                            </button>

                    { showCalender && (
                        <Calender timeState={timeState} setTimeState={setTimeState}/>
                    )}

                    </div>
                    <div className="col-md-2 mt-2">
                        <button 
                        style={{backgroundColor: '#171C24'}}
                        className="w-100 border border-secondary btn-lg text-light"
                        onClick={timeHandler}
                        >Search</button>
                    </div>        
            </Form.Group>      
    )   
}



export default SearchBar


// <DateRange
                        //     style={{zIndex: '1000'}}
                        //     className="bg-light ml-3"
                        //     editableDateInputs={true}
                        //     onChange={item => {
                        //         setTimeState([item.selection])
                        //         console.log(item) 
                        //         // setShowCalender(false) 
                        //     }}
                        //     moveRangeOnFirstSelection={false}
                        //     ranges={timeState}
                        //     minDate={new Date()}
                        //     direction="vertical"
                        //     // months={2}
                        //     dateFormat="MMM/d/yyyy"
                        //     // disabledDates={[new Date('Nov 21, 2020'), new Date('Nov 22, 2020'), new Date('Nov 23, 2020')]}
                        // />