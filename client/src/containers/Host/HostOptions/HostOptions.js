import React, { useContext, useState, useRef, useEffect } from 'react'
import axios from 'axios'
import { format } from 'date-fns'
import HostContext from '../../../contexts/HostContext';
import AddAddress from '../../Host/AddAddress/AddAddress';
import AddImage from '../../Host/AddImage/AddImage';
import Calender from '../Calender/Calender';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav'
import Col from 'react-bootstrap/Col'

const HostOptions = () => {

    
    const { host, setHost } = useContext(HostContext)
    const authToken = localStorage.getItem('auth-token')
    const [updateState, setUpdateState] = useState(1);
    const [ generalInfo, setGeneralInfo ] = useState({
        title: host.title,
        description: host.description
    })
    

    const imageRef = useRef(null) 

    useEffect(() => {
        imageRef.current = host.images
    }, [imageRef, host])

    const [timeState, setTimeState] = useState([
        {
            startDate: new Date(host.startDate),
            endDate: new Date(host.endDate),
            key: 'selection',
        }
      ]);

      const dateRef = useRef(null)

        useEffect(() => {
            console.log('use effect')
            dateRef.current = timeState
        }, [dateRef, timeState])
        // console.log('date ref')
        // console.log(dateRef.current)
        // console.log('time state')
        // console.log(timeState)

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
    

      

      let updateCurrentState;

      if (updateState === 1) {
        let buttonChecker = true

        if (host.title !== generalInfo.title ||
          host.description !== generalInfo.description
          ) {
              buttonChecker = false
          }

          updateCurrentState = (
            <div className="mt-4">
                <Form.Row>  
                <Form.Group as={Col}>
            <Form.Label>Price</Form.Label>
            <Form.Control 
                    name='price'
                    disabled
                    type="number"
                    placeholder="Rate per night"
                    value={host.price}
                />

            </Form.Group>
                        <Form.Group as={Col}>
                        <Form.Label>Capacity</Form.Label>
                        <Form.Control 
                            name='capacity'
                            type="number"
                            disabled
                            placeholder=""
                            value={host.capacity}
                        />
                    </Form.Group>
                </Form.Row>     

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
            {/* <div className="text-right mt-1 text-success">info updated</div> */}
            </div>
          )
          
      } else if (updateState === 2) {
    
        let buttonChecker = true
        if (host.images !== imageRef.current) {
            buttonChecker = false
        }     

            updateCurrentState = (
                <div className="mt-4">
                <AddImage />
                <br />
                <Button 
                    variant="dark"
                    disabled={buttonChecker}
                    className="d-block mt-5 ml-auto"
                    onClick={() => {
                        const dataToPut = {
                            updateImages: {
                                images: host.images
                            }
                        }  
                        updaterDb(dataToPut)

                        setHost((prevState) => ({
                            ...prevState,
                            images: host.images
                        }))   
                    }}
                >Update Image
                </Button>
                {/* <div className="text-right mt-1 text-success">image updated</div> */}
                </div>
          )
      } else {
        console.log(timeState)
        console.log(dateRef.current)
        let buttonChecker = true
        if (timeState !== dateRef.current) {
            buttonChecker = false
        }   
            updateCurrentState = (
            
                <div className="text-center mt-4">
                    <h3>Available Dates</h3>
                    <div className="mt-4">
                <Calender 
                    timeState={timeState} 
                    setTimeState={setTimeState}     
                />
                <span></span>
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
                    disabled={buttonChecker}
                    onClick={() => {
                        console.log('button click')
                        const dataToPut = {
                            updateRange: {
                                startDate: timeState[0].startDate,
                                endDate: timeState[0].endDate,
                            }
                        }
                        updaterDb(dataToPut)   
                        let num = updateState === 3 ? 4 : 3
                        setUpdateState(num)   
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
        <Nav variant="tabs" defaultActiveKey="link-0">
            <Nav.Item>
                <Nav.Link eventKey="link-0" onClick={() => setUpdateState(1)}>General Info</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="link-1" onClick={() => setUpdateState(2)}>Image</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="link-2" onClick={() => setUpdateState(3)}>Date</Nav.Link>
            </Nav.Item>
        </Nav>
        <div>
            {updateCurrentState}
        </div>
        </div>
        
    )
};

export default HostOptions