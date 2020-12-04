import React, { useContext, useState } from 'react'
import axios from 'axios'
import { format } from 'date-fns'
import HostContext from '../../../contexts/HostContext';
import AddAddress from '../../Host/AddAddress/AddAddress';
import AddImage from '../../Host/AddImage/AddImage';
import Calender from '../Calender/Calender';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav'

const HostOptions = () => {

    const { host, setHost } = useContext(HostContext)
    const authToken = localStorage.getItem('auth-token')
    const [updateState, setUpdateState] = useState(1);
    const [ generalInfo, setGeneralInfo ] = useState({
        title: host.title,
        description: host.description
    })
    
        

    const [timeState, setTimeState] = useState([
        {
            startDate: new Date(host.range[0]),
            endDate: new Date(host.range[1]),
            key: 'selection',
        }
      ]);

      const updater = (event) => {
        setGeneralInfo(prevState => ({
                ...prevState,
                [event.target.name]: event.target.value
            }   
        ))
    }

    const updaterDb = (data) => {
        axios({
            method: 'PUT',
            url: `http://localhost:5000/users/host/${host.id}`,
            data: data,
            headers: {
                'x-auth-token': authToken
            }
        })
        .then(() => {
            
        })
        .catch(err => console.log(err))
    }
    

      let buttonChecker = true

      if (host.title !== generalInfo.title ||
        host.description !== generalInfo.description
        ) {
            buttonChecker = false
        }

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
                        updater(ele)
                    }}
                    value={generalInfo.title}
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
                            updater(ele)
                        }}
                        value={generalInfo.description}
                    />
                
                </Form.Group>
                <span className="text-secondary">* price is fixed</span>
            <AddAddress OnOrOff={true}/>
            <span className="text-secondary">* address is fixed</span>
            <Button 
            variant="dark"
            className="d-block mt-2 ml-auto"
            disabled={buttonChecker}
            onClick={() => {
                const dataToPut = {
                    genInfo: {
                        title: generalInfo.title,
                        description: generalInfo.description
                    }
                }
                updaterDb(dataToPut)

                setHost(prevState => ({
                    ...prevState,
                    title: generalInfo.title,
                    description: generalInfo.description
                }))

            }}
            >Update Info</Button>
            </div>
          )
          
      } else if (updateState === 2) {
            
            updateCurrentState = (
                <div className="mt-4">
                <AddImage />
                <br />
                <Button 
                    variant="dark"
                    className="d-block mt-5 ml-auto"
                    onClick={() => {
                        const dataToPut = {
                            updateImages: {
                                images: host.images
                            }
                        }
                        
                        updaterDb(dataToPut)
                    }}
                >Update Image
                </Button>
                </div>
          )
      } else {
            updateCurrentState = (
            
                <div className="text-center mt-4">
                    <h3>Available Dates</h3>
                    <div className="mt-4">
                <Calender 
                    timeState={timeState} 
                    setTimeState={setTimeState}     
                />
                <div className="d-flex justify-content-between mt-5">
                <Button 
                    variant="warning"
                    className=""
                    onClick={() => {
                        const dataToPut = {
                            active : {
                                active: !host.active
                            }
                        }
                        updaterDb(dataToPut)

                        setHost(prevState => ({
                            ...prevState,
                            active: !host.active
                        }))
                    }}
                >{host.active ? "Pause Booking" : "Booking is Paused"}
                </Button>
                <Button 
                    variant="dark"
                    className=""
                    onClick={() => {
                        const dataToPut = {
                            updateRange: [
                                format(timeState[0].startDate, 'MMM/d/yyyy'),
                                format(timeState[0].endDate, 'MMM/d/yyyy')
                            ]
                        }
                        updaterDb(dataToPut)
                    }}
                >Update Date
                </Button>
                </div>
                </div>
            </div>
            
        )  
      }




    return (
        <div className="option-update-wrapper mb-5">
        <Nav variant="tabs" defaultActiveKey="/home">
            <Nav.Item>
                <Nav.Link onClick={() => setUpdateState(1)}>General Info</Nav.Link>
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