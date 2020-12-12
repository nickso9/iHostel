import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import HostContext from '../../contexts/HostContext';
import UserContext from '../../contexts/UserContext'
import Calender from './Calender/Calender';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col'
import AddAddress from './AddAddress/AddAddress';
import AddImage from './AddImage/AddImage';
import { format } from 'date-fns'

const Host = () => {

    const history = useHistory();
    const { host, setHost } = useContext(HostContext)
    const { userData } = useContext(UserContext)
    const [creationState, setCreationState] = useState(1);
    const [errorHandler, setErrorHandler] = useState('')
    const [timeState, setTimeState] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection',
        }
      ]);
     

    const updater = (event) => {
        setHost(prevState => ({
                ...prevState,
                [event.target.name]: event.target.value
            }   
        ))
    }

    const timeHandler = () => {
        let convertedStartDate = format(timeState[0].startDate, 'MMM/d/yyyy')
        let convertedEndDate = format(timeState[0].endDate, 'MMM/d/yyyy')
            setHost(prevState => ({
                ...prevState,
                startDate: convertedStartDate,
                endDate: convertedEndDate
                // range: [
                //     convertedStartDate,
                //     convertedEndDate
                // ]
            }))   
    }

      let currentState;
      if (creationState === 1) {
        currentState =  (    
            <div className="w-100 mt-3 pb-5">
                <h4 className="text-center">General Information </h4>
                <hr />
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Label>Nightly rate</Form.Label>
                        <Form.Control 
                            name='price'
                            type="number"
                            placeholder=""
                            onChange={ele => {
                                updater(ele)
                            }}
                            value={!host.price ? '' : host.price}
                        />
                    </Form.Group>
                        <Form.Group as={Col}>
                        <Form.Label>Capacity</Form.Label>
                        <Form.Control 
                            name='capacity'
                            type="number"
                            placeholder=""
                            onChange={ele => {
                                updater(ele)
                            }}
                            value={!host.capacity ? '' : host.capacity}
                        />
                    </Form.Group>
                </Form.Row>
                
                <Form.Label>Title</Form.Label>
                <Form.Control 
                    name='title' 
                    size="md" 
                    type="text" 
                    placeholder="Quietest place in town...." 
                    onChange={ele => {
                        updater(ele)
                    }}
                    value={!host.title ? '' : host.title}
                />
                <br />
                <Form.Label>Description</Form.Label>
                <Form.Group controlId="exampleForm.ControlTextarea1">       
                    <Form.Control 
                        name="description"
                        as="textarea" 
                        rows={3} 
                        placeholder="clean, warm....." 
                        onChange={ele => {
                            updater(ele)
                        }}
                        value={!host.description ? '' : host.description}
                    />
                </Form.Group>
                <h4 className="text-center">Pick available date range.</h4>
                <hr />
                    <div className="text-center">
                    <Calender 
                        timeState={timeState} 
                        setTimeState={setTimeState}
                        />
                    </div>
                <hr />
                <Button 
                className="pr-4 pl-4 btn-dark mt-3 float-right" 
                onClick={e => {
                    e.preventDefault()
                    timeHandler()

                    
                    if (!host.title || !host.description || !host.price || !host.capacity) {
                        setErrorHandler('All fields required')
                    } else {
                        setErrorHandler('')
                        setCreationState(2)
                    }
                }}
                >Next</Button>
                <p className="text-danger">{errorHandler}</p>
            </div>           
        )

      } else if (creationState === 2) {
            currentState = (
            <>
            <h4 className="text-center">Upload images.</h4>
            <hr />
            <AddImage />
            <br /><br />
            <hr />
            <Button 
            className="pr-4 pl-4 btn-dark mt-5 ml-auto" 
            onClick={e => {
                e.preventDefault()
                setErrorHandler('')
                setCreationState(1)
            }}
            >Back</Button>
            <Button 
            className="pr-4 pl-4 btn-dark mt-5 ml-auto float-right" 
            onClick={e => {
                e.preventDefault()
                if (host.images.length <= 0) {
                    setErrorHandler('Image required.')
                } else {
                    setErrorHandler('')
                    setCreationState(3)
                }         
            }}
            >Next</Button>
            <p className="text-danger">{errorHandler}</p>
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
                    setErrorHandler('')
                    setCreationState(2)
                }}
            >Back</Button>
            <Button 
                className="bg-light pr-4 pl-4 mt-3 float-right text-info border-info" 
                variant="primary" 
                type="submit" 
                onClick={e => {
                e.preventDefault()
                    if (!host.address.addressOne || !host.address.state || !host.address.zip || !host.address.city) {
                        setErrorHandler('More information required.')
                    } else {
                        setErrorHandler('')
                        
                                const hostDataToPost = {
                                    active: true,
                                    capacity: host.capacity,
                                    userName: userData.user.userName,
                                    userId: userData.user.id,
                                    // range: host.range,
                                    startDate: host.startDate,
                                    endDate: host.endDate,
                                    title: host.title,
                                    description: host.description,
                                    price: host.price,
                                    images: host.images,
                                    addressFormat: host.address.addressOne + ' ' + host.address.addressTwo + ', ' +
                                        host.address.city + ', ' + host.address.state + ' ' + host.address.zip,
                                    address: {
                                        addressOne: host.address.addressOne,
                                        addressTwo: host.address.addressTwo,
                                        city: host.address.city,
                                        state: host.address.state, 
                                        zip: host.address.zip
                                    }                  
                                }
                                
                                const authToken = localStorage.getItem('auth-token')
                                
                                axios({
                                    method: 'POST',
                                    url: '/users/host',
                                    data: hostDataToPost,
                                    headers: {
                                        'x-auth-token': authToken
                                    }
                                })
                                .then(response => {
                                    
                                    setHost({
                                        id: response.data._id,
                                        active: response.data.active,
                                        capacity: response.data.capacity,
                                        userId: response.data.userId,
                                        price: response.data.price,
                                        description: response.data.description,
                                        title: response.data.title,
                                        address: {
                                          addressOne: response.data.address.addressOne,
                                          addressTwo: response.data.address.addressTwo,
                                          state: response.data.address.state,
                                          city: response.data.address.city,
                                          zip: response.data.address.zip
                                        },
                                        images: response.data.images,
                                        // range: response.data.range,
                                        startDate: response.data.startDate,
                                        endDate: response.data.endDate,
                                    })
                                    
                                    history.push('/')
                                })
                                .catch(error => console.log(error))                   
                    } 
                }}
            >Host</Button>
            <p className="text-danger">{errorHandler}</p>
        </>
        )
      }



    return (
        <>
            <div className='host-container bg-light mb-5 pb-5 bg-light'> 
                {currentState}       
            </div>  
        </>   
    )
    
}

export default Host