import React, { useState, useContext } from 'react';
import UserContext from '../../contexts/UserContext';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
// import ErrorHandler from '../misc/ErrorHandler'


export default function Login() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    // const [error, setError] = useState()


    const { setUserData } = useContext(UserContext);
    const history = useHistory();

    const submit = async (e) => {
        e.preventDefault()

        try {
            const loginUser = { email, password }
           
            const loginRes = await axios.post(
                'http://localhost:5000/users/login', loginUser);

            setUserData({
                token: loginRes.data.token,
                user: loginRes.data.user
            });
            localStorage.setItem('auth-token', loginRes.data.token)
            history.push('/')

        } catch (error) {
            // error.response.data.msg && setError(error.response.data.msg)
        }
    
    };


    return (
        <div className='register-login-wrapper bg-light'>
            <h2 className="mb-4">Login</h2>

            {
                // error && <ErrorHandler message={error} clearError={() => setError(undefined)} />
            }
            
            <Form onSubmit={submit}>
                    <Form.Group>
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
                    <Button 
                        variant="primary" 
                        type="submit"
                        className="pr-4 pl-4 btn-dark mt-3 ml-auto" 
                        >Login</Button>
                    </Form>
        </div>



    );

};