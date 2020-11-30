import React, { useState, useContext } from 'react';
import UserContext from '../../contexts/UserContext'
import { useHistory, useLocation } from 'react-router-dom'
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import ProgressBar from 'react-bootstrap/ProgressBar'
import Col from 'react-bootstrap/Col'



export default function Register() {

    const location = useLocation() 
    const history = useHistory();
    
    const { setUserData } = useContext(UserContext);
    const [ progress, setProgress ] = useState(1)
    const [ userRegistration, setUserRegistration ] = useState({
        account: location.state.accountType,
        email: '',
        password: '',
        passwordCheck: '',
        userName: '',
        firstName: '',
        lastName: '',
        addressOne: '',
        addressTwo: '',
        city: '',
        state: '',
        zip: ''

    }) 

    

    const submit = async (e) => {
        e.preventDefault()
    try {

        const {email, password, passwordCheck, userName } = userRegistration
        const newUser = {
            email,
            password,
            passwordCheck,
            userName 

        }
        
        await axios.post(
            'http://localhost:5000/users/register', 
            newUser
        );
        
        const loginRes = await axios.post(
            'http://localhost:5000/users/login', {
            email,
            password
        });
        setUserData({
            token: loginRes.data.token,
            user: loginRes.data.user
        })
        localStorage.setItem('auth-token', loginRes.data.token)
        history.push('/')

    } catch (error) {
        console.log(error)
    }
    };
    
    let regProgress;

    if (progress === 2 || userRegistration.account === "renter") {
        regProgress = (
            <div>
                <ProgressBar now={100} variant="secondary"/>

                <Form.Group className="mt-5">
                        <Form.Label>{userRegistration.account === "renter" ? "Username" : "Company Name"}</Form.Label>
                        <Form.Control 
                            className="w-100"
                            onChange={e => {
                                setUserRegistration({
                                    ...userRegistration,
                                    userName: e.target.value
                                })
                            }}
                        />
                    </Form.Group>
            
                <Form.Group >
                    <Form.Label>{userRegistration.account === "renter" ? "Email Address" : "Company Email Address"}</Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="Enter email" 
                        id='register-email' 
                        onChange={e => {
                            setUserRegistration({
                                ...userRegistration,
                                email: e.target.value
                            })
                        }}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        autoComplete="on" 
                        placeholder="Password" 
                        id='register-password' 
                        onChange={e => {
                            setUserRegistration({
                                ...userRegistration,
                                password: e.target.value
                            })
                        }}
                    />
                </Form.Group>
                <Form.Group >
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        autoComplete="on"
                        placeholder='Verify password' 
                        onChange={e => {
                            setUserRegistration({
                                ...userRegistration,
                                passwordCheck: e.target.value
                            })
                        }}
                    />
                </Form.Group>
                <div className="d-flex">

                {userRegistration.account === "innkeeper" ? (

                    <Button 
                        variant="primary" 
                        className="pr-4 pl-4 btn-dark mt-5" 
                        onClick={e => {
                            e.preventDefault()
                            setProgress(1)
                        }}
                        type="button"
                    >Back</Button>
                    ) : ( '' )}
                    <Button 
                        variant="primary" 
                        type="submit"
                        className="pr-4 pl-4 btn-dark mt-5 ml-auto" 
                        onClick={submit}
                    >Create</Button>

                </div>    
            
            </div>
        )
    } else if (progress === 1 && userRegistration.account === "innkeeper") {
        regProgress = (
                
                <div>
                <ProgressBar now={50} variant="secondary"/>
                

                    {/* <Form.Row className="mt-5">
                        <Form.Group as={Col} >
                        <Form.Label>First Name</Form.Label>
                        <Form.Control
                            onChange={e => {
                                setUserRegistration({
                                    ...userRegistration,
                                    firstName: e.target.value
                                })
                            }}
                        />
                        </Form.Group>

                        <Form.Group as={Col} >
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control 
                            onChange={e => {
                                setUserRegistration({
                                    ...userRegistration,
                                    lastName: e.target.value
                                })
                            }}
                        />
                        </Form.Group>

                       
                    </Form.Row> */}

                    
                    <div className="mt-3">Mailing Address: </div>
                    <Form.Group className="mt-4">
                        <Form.Label>Street</Form.Label>
                        <Form.Control
                            onChange={e => {
                                setUserRegistration({
                                    ...userRegistration,
                                    addressOne: e.target.value
                                })
                            }}
                        />
                    </Form.Group>

                    <Form.Group >
                        <Form.Label>Unit/Suite/Number</Form.Label>
                        <Form.Control  
                            onChange={e => {
                                setUserRegistration({
                                    ...userRegistration,
                                    addressTwo: e.target.value
                                })
                            }}
                        />
                    </Form.Group>

                    <Form.Row>
                        <Form.Group as={Col} >
                        <Form.Label>City</Form.Label>
                        <Form.Control 
                            onChange={e => {
                                setUserRegistration({
                                    ...userRegistration,
                                    city: e.target.value
                                })
                            }}
                        />
                        </Form.Group>

                        <Form.Group as={Col} >
                        <Form.Label>State</Form.Label>
                        <Form.Control 
                            as="select" 
                            defaultValue="Choose..."
                            onChange={e => {
                                setUserRegistration({
                                    ...userRegistration,
                                    state: e.target.value
                                })
                            }}
                        >
                            <option>Choose...</option>
                            <option>California</option>
                        </Form.Control>
                        </Form.Group>

                        <Form.Group as={Col} >
                        <Form.Label>Zip</Form.Label>
                        <Form.Control 
                            onChange={e => {
                                setUserRegistration({
                                    ...userRegistration,
                                    zip: e.target.value
                                })
                            }}
                        />
                        </Form.Group>
                    </Form.Row>

                    <Button 
                    type="button"
                    variant="primary" 
                    className="pr-4 pl-4 btn-dark mt-5 ml-auto" 
                    onClick={e => {
                        e.preventDefault()
                        setProgress(2)
                    }}
                    >Next</Button>

 
            </div>
        )
    }

    let regTitle;
    let regClass;

    if (userRegistration.account === "renter") {
        regTitle = "Traveler"
        regClass = 'text-center text-dark register-title border-bottom border-info'
    } else {
        regTitle = "Innkeeper"
        regClass = 'text-center bg-dark text-light register-title border-bottom border-info'
    }

    return (
    <div className='register-login-wrapper bg-light mt-5'>
        
        <div className='register-login-div'>
    <h1 className={regClass}>{regTitle} Registration</h1>
            <div className='register-login-form'>
            <Form className="mt-5">
            {regProgress}
            </Form>
            </div>
        </div>


        
    </div>
    )
}