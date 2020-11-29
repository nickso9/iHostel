import React, { useState, useContext } from 'react';
import UserContext from '../../contexts/UserContext'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import ProgressBar from 'react-bootstrap/ProgressBar'



export default function Register() {

    const { setUserData } = useContext(UserContext);
    const [ progress, setProgress ] = useState(1)
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordCheck, setPasswordCheck] = useState();
    const [userName, setUserName] = useState();
    
    



    const history = useHistory();

    const submit = async (e) => {
        e.preventDefault()
        console.log('hihihi')
    // try {

    //     const newUser = {email, password, passwordCheck, userName }
    //     console.log(newUser)
    //     await axios.post(
    //         'http://localhost:5000/users/register', 
    //         newUser
    //     );
        
    //     const loginRes = await axios.post(
    //         'http://localhost:5000/users/login', {
    //         email,
    //         password
    //     });
    //     setUserData({
    //         token: loginRes.data.token,
    //         user: loginRes.data.user
    //     })
    //     localStorage.setItem('auth-token', loginRes.data.token)
    //     history.push('/')

    // } catch (error) {
    //     console.log(error)
    // }
    };
    
    let regProgress;

    if (progress === 1) {
        regProgress = (
            <div>
                <ProgressBar now={50} variant="secondary"/>
            
                <Form.Group className="mt-5">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="Enter email" 
                        id='register-email' 
                        onChange={e => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        autoComplete="on" 
                        placeholder="Password" 
                        id='register-password' 
                        onChange={e => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        autoComplete="on"
                        placeholder='Verify password' 
                        onChange={e => setPasswordCheck(e.target.value)} 
                    />
                </Form.Group>
                {/* <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="" 
                        id='register-display-name' 
                        onChange={e => setUserName(e.target.value)}
                    />
                </Form.Group> */}
                <Button 
                    variant="primary" 
                    type="submit"
                    className="pr-4 pl-4 btn-dark mt-3 ml-auto" 
                    onClick={() => setProgress(2)}
                >Next</Button>
            
            </div>
        )
    } else if (progress === 2) {
        regProgress = (
                
                <div>
                <ProgressBar now={100} variant="secondary"/>
                
                <Form.Group className="mt-5">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control 
                        type="email" 
                        placeholder="Enter email" 
                        id='register-email' 
                        onChange={e => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        autoComplete="on" 
                        placeholder="Password" 
                        id='register-password' 
                        onChange={e => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control 
                        type="password" 
                        autoComplete="on"
                        placeholder='Verify password' 
                        onChange={e => setPasswordCheck(e.target.value)} 
                    />
                </Form.Group>
                {/* <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control 
                        type="text" 
                        placeholder="" 
                        id='register-display-name' 
                        onChange={e => setUserName(e.target.value)}
                    />
                </Form.Group> */}
                <Button 
                    variant="primary" 
                    type="submit"
                    className="pr-4 pl-4 btn-dark mt-3 ml-auto" 
                    onClick={() => setProgress(1)}
                >Back</Button>
                <Button 
                    variant="primary" 
                    type="submit"
                    className="pr-4 pl-4 btn-dark mt-3 ml-auto" 
                >Create</Button>
            
            </div>
        )
    }

    return (
    <div className='register-login-wrapper bg-light mt-5'>
        
        <div className='register-login-div'>
            <h1 className="text-center text-light register-title">Traveler Registration</h1>
            <div className='register-login-form'>
            <Form onSubmit={submit} className="mt-5">
            {regProgress}
            </Form>
            </div>
        </div>


        
    </div>
    )
}