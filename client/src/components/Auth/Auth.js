import React, { useContext } from 'react';
import { useHistory, NavLink } from 'react-router-dom';
import UserContext from '../../contexts/UserContext'


export default function AuthOptions() {

    const { userData, setUserData } = useContext(UserContext)

    const history = useHistory();

    const host = () => history.push('/host')
    const register = () => history.push("/register");
    const login = () => history.push("/login");
    const rent = () => history.push("/")
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
                    
                    <NavLink exact activeClassName="active" to="/"><span className='navBarLinks'>Rent</span></NavLink>
                    <NavLink exact activeClassName="active" to="/host"><span className='navBarLinks'>Host</span></NavLink>
                    <NavLink to="/logout"><span onClick={logout} className='navBarLinks'>Logout</span></NavLink>
                    {/* <button onClick={rent}>Rent</button>
                    <button onClick={host}>Host</button>
                    <button onClick={logout}>Logout</button> */}
                    
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