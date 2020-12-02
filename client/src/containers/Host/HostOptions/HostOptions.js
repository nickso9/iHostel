import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import HostContext from '../../../contexts/HostContext';
import AddAddress from '../../Host/AddAddress/AddAddress';
import AddImage from '../../Host/AddImage/AddImage';
import Calender from '../../../components/Calender/Calender';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav'

const HostOptions = () => {
    const { host, setHost } = useContext(HostContext)
    const [updateState, setUpdateState] = useState(1);

    useEffect(() => {

    })
        
   console.log(host)
    const [timeState, setTimeState] = useState([
        {
            startDate: new Date(host.range[0]),
            endDate: new Date(host.range[1]),
            key: 'selection',
        }
      ]);

    


      console.log(timeState)

      let updateCurrentState;

      if (updateState === 1) {
          updateCurrentState = (
            <div className="mt-4">
            <Form.Label>Price</Form.Label>
            <Form.Control 
                    name='price'
                    disabled
                    type="number"
                    placeholder="Rate per night"
                    onChange={ele => {
                        
                    }}
                    value={host.price}
                />
                
                <br />
                <Form.Label>Title</Form.Label>
                <Form.Control 
                    name='title' 
                    size="md" 
                    type="text" 
                    placeholder="Title" 
                    onChange={ele => {
                        
                    }}
                    value={host.title}
                />
                <br />
                <Form.Label>Description</Form.Label>
                <Form.Group controlId="exampleForm.ControlTextarea1">       
                    <Form.Control 
                        name="description"
                        as="textarea" 
                        rows={3} 
                        placeholder="Description of home" 
                        onChange={ele => {
                            
                        }}
                        value={host.description}
                    />
                
                </Form.Group>
                <span className="text-secondary">* price is fixed</span>
            <AddAddress OnOrOff={true}/>
            <span className="text-secondary">* address is fixed</span>
            <hr />
            </div>
          )
          
      } else if (updateState === 2) {
            updateCurrentState = (
                <div>
                <AddImage />
                </div>
          )
      } else {
            updateCurrentState = (
            
                <div className="text-center">
                <Calender 
                    timeState={timeState} 
                    setTimeState={setTimeState}
                />
            </div>
            
        )  
      }




    return (
        <div className="option-update-wrapper mb-5">
        <Nav variant="tabs" defaultActiveKey="/home">
            <Nav.Item>
                <Nav.Link onClick={() => setUpdateState(1)}>General</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link onClick={() => setUpdateState(2)}>Image</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link onClick={() => setUpdateState(3)}>Date</Nav.Link>
            </Nav.Item>
        </Nav>
        <div>

            {updateCurrentState}

        </div>
        </div>
        
            

        
        // <div className="d-flex justify-content-between mt-5">
        // <Button variant="warning">Pause Bookings</Button>
        // <Button variant="dark">Update Changes</Button>
        // </div>
        // </div>
    )
};

export default HostOptions