import React, { useState } from 'react';
import Calender from '../../components/Calender/Calender';

import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';
// import Col from 'react-bootstrap/Col' 
import AddAddress from './AddAddress/AddAddress'
import AddImage from './AddImage/AddImage'


const Host = () => {

    // const images = [
    //     'https://placeimg.com/400/280/arch',
    //     'https://placeimg.com/400/280/tech',
    //     'https://placeimg.com/400/280/people'
    // ]

    const [timeState, setTimeState] = useState([
        {
          startDate: new Date(),
          endDate: null,
          key: 'selection',
        }
      ]);

    const [showCalender, setShowCalender] = useState(false)

    return (
        <div className='host-container bg-light mb-5 pb-5'>
            <h3 className="text-center">Host creation</h3>
            <Form>

                <AddImage />

                    <br />
                <div className="w-100 mt-3">
                    <button 
                        className="w-80 border border-secondary btn-lg 
                        text-secondary d-flex justify-content-between
                        mx-auto" 
                        onClick={e => {
                            e.preventDefault()
                            setShowCalender(!showCalender)
                        }}>
                            <span>Click here to set available dates.</span>
                            <span className="glyphicon">&#xe109;</span>
                            </button>

                    { showCalender && (
                        <div className="text-center">
                        <Calender timeState={timeState} setTimeState={setTimeState}/>
                        </div>
                    )}

                    </div>

                <br /><hr />

                    <AddAddress />         
                
            </Form>
            
        </div>
        
    )
}

export default Host