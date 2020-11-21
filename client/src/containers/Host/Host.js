import React, { useState, useContext } from 'react';
import { HostContext } from '../../contexts/HostContext'
import Calender from '../../components/Calender/Calender';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import AddAddress from './AddAddress/AddAddress';
import AddImage from './AddImage/AddImage';
// import { format } from 'date-fns'

const Host = () => {

    const { host, setHost } = useContext(HostContext)

    const [creationState, setCreationState] = useState(1);
    const [timeState, setTimeState] = useState([
        {
          startDate: new Date(),
          endDate: null,
          key: 'selection',
        }
      ]);

    
      console.log(host)
      console.log(setHost)

    const updater = (event) => {
        setHost(prevState => ({
                ...prevState,
                [event.target.name]: event.target.value
            }   
        ))
    
    }
        // let convertedStartDate = format(timeState[0].startDate, 'MMM/d/yyyy')
        // let convertedEndDate = format(timeState[0].endDate, 'MMM/d/yyyy')
        // console.log(convertedStartDate)
        // console.log(convertedEndDate)


      let currentState;
      if (creationState === 1) {
        currentState =  (    
            <div className="w-100 mt-3 pb-5">
                <h4 className="text-center">Title, Description & Rates </h4>
                <hr />
                <Form.Control 
                    name='price'
                    type="number"
                    placeholder="Rate per night"
                    onChange={ele => {
                        console.log(ele)
                        updater(ele)
                    }}
                    value={!host.price ? '' : host.price}
                />
                <br />
                <Form.Control 
                    name='title' 
                    size="md" 
                    type="text" 
                    placeholder="Title" 
                    onChange={ele => {
                        // updater(ele)
                    }} 
                />
                <Form.Group controlId="exampleForm.ControlTextarea1">       
                    <Form.Label></Form.Label>
                    <Form.Control as="textarea" rows={3} placeholder="Description of home" />
                </Form.Group>
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
            <h4 className="text-center">Location.</h4>
            <Form>
            <AddAddress />
            </Form>
            <hr />
            <Button 
                className="pr-4 pl-4 btn-dark mt-3 ml-auto" 
                onClick={e => {
                    e.preventDefault()
                    setCreationState(2)
                }}
            >Back</Button>
            <Button 
                className="bg-light pr-4 pl-4 mt-3 float-right text-info border-info" 
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
        <>
            <div className='host-container bg-light mb-5 pb-5'> 
                {currentState}       
            </div>  
        </>   
    )
    
}

export default Host