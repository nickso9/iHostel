import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../../contexts/UserContext'


export default function AuthOptions() {

    const { userData, setUserData } = useContext(UserContext)

    const history = useHistory();

    const host = () => history.push('/host')
    const register = () => history.push("/register");
    const login = () => history.push("/login");
    const logout = () => {
        setUserData({
            token: undefined,
            user: undefined
        })
        localStorage.setItem('auth-token', '')
    };

    return (
        <nav className={'auth-btn'}>
            {
                userData.user ? 
                (   
                    <>
                    <button onClick={host}>Host</button>
                    <button onClick={logout}>Logout</button>
                    </>
                ) : ( 
                <>
                    <button onClick={register}>Register</button>
                    <button onClick={login}>Login</button>
                </>
                )
            }
            
        </nav>
    )

};