import React, { useContext, useState } from 'react'
import axios from 'axios'
import HostContext from '../../contexts/HostContext';
import AddAddress from '../Host/AddAddress/AddAddress';
import AddImage from '../Host/AddImage/AddImage';
import Calender from '../../components/Calender/Calender';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


const Options = () => {
    const { host, setHost } = useContext(HostContext)
   
    const [timeState, setTimeState] = useState([
        {
            startDate: new Date(host.dates[0]),
            endDate: new Date(host.dates[1]),
            key: 'selection',
        }
      ]);
      console.log(host)

    return (
        <div className="option-update-wrapper mb-5">
        <h2>Update Listing Menu</h2>
        <div className="">
            <AddImage />
            <hr />
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
                <span className="text-secondary">* price is fixed</span>
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

            <AddAddress OnOrOff={true}/>
            <span className="text-secondary">* address is fixed</span>
            <hr />
            <div className="text-center">
                <Calender 
                    timeState={timeState} 
                    setTimeState={setTimeState}
                />
            </div>

        </div>
        <div className="d-flex justify-content-between mt-5">
        <Button variant="warning">Pause Bookings</Button>
        <Button variant="dark">Update Changes</Button>
        </div>
        </div>
    )
};

export default Options