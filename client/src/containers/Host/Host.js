import React, { useState } from 'react';
import Calender from '../../components/Calender/Calender';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import AddAddress from './AddAddress/AddAddress'
import AddImage from './AddImage/AddImage'


const Host = () => {

    const [creationState, setCreationState] = useState(1);
    const [showCalender, setShowCalender] = useState(false)
    const [timeState, setTimeState] = useState([
        {
          startDate: new Date(),
          endDate: null,
          key: 'selection',
        }
      ]);

      let currentState;
      if (creationState === 1) {

        currentState =  (    
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

                <Button 
                className="pr-4 pl-4 btn-dark mt-5 ml-auto" 
                onClick={e => {
                    e.preventDefault()
                    setCreationState(2)
                }}
                >Next</Button>
            </div>           
        )

      } else if (creationState === 2) {
            currentState = (
            <>
            <AddImage />
            <Button 
            className="pr-4 pl-4 btn-dark mt-5 ml-auto" 
            onClick={e => {
                e.preventDefault()
                setCreationState(3)
            }}
            >Next</Button>
            </>
            )
      } else {
        currentState = (
        <>
            <AddAddress />
            <Button 
                className="bg-dark pr-4 pl-4 mt-3" 
                variant="primary" 
                type="submit" 
                onClick={e => {
                e.preventDefault()
                console.log(e)
                }}
                >Host</Button>
        </>
        )
      }



    return (
        <div className='host-container bg-light mb-5 pb-5'>
            <h3 className="text-center">Host creation</h3>
            <Form>
                {currentState}      
            </Form>
            
        </div>     
    )
    
}

export default Host