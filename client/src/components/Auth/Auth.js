import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import UserContext from '../../contexts/UserContext'


export default function AuthOptions() {

    const { userData, setUserData } = useContext(UserContext)

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
                    </>
                ) : ( 
                <>
                    <NavLink exact activeClassName="active" to="/register"><span className='navBarLinks'>Register</span></NavLink>
                    <NavLink exact activeClassName="active" to="/login"><span className='navBarLinks'>Login</span></NavLink>       
                </>
                )
            }
            
        </nav>
    )

};