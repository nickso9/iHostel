import React, { useState } from 'react';
import Calender from '../../components/Calender/Calender';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import AddAddress from './AddAddress/AddAddress'
import AddImage from './AddImage/AddImage'


const Host = () => {

    const [creationState, setCreationState] = useState(1);
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
            <div className="w-100 mt-3 pb-5">
                <h4 className="text-center">Pick avaiable date range.</h4>
                <hr />
                    <div className="text-center">
                    <Calender timeState={timeState} setTimeState={setTimeState}/>
                    </div>
                <hr />
                <Button 
                className="pr-4 pl-4 btn-dark mt-3 float-right" 
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
            <h4 className="text-center">Upload images.</h4>
            <AddImage />
            <br /><br />
            <hr />
            <Button 
            className="pr-4 pl-4 btn-dark mt-5 ml-auto" 
            onClick={e => {
                e.preventDefault()
                setCreationState(1)
            }}
            >Back</Button>
            <Button 
            className="pr-4 pl-4 btn-dark mt-5 ml-auto float-right" 
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
            <h4 className="text-center">Location of rental.</h4>
            <AddAddress />
            <hr />
            <Button 
                className="pr-4 pl-4 btn-dark mt-3 ml-auto" 
                onClick={e => {
                    e.preventDefault()
                    setCreationState(2)
                }}
            >Back</Button>
            <Button 
                className="bg-dark pr-4 pl-4 mt-3 float-right" 
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
            <Form>
                {currentState}      
            </Form>
            
        </div>     
    )
    
}

export default Host