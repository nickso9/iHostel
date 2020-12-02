import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import UserContext from '../../contexts/UserContext'
import HostContext from '../../contexts/HostContext'

export default function AuthOptions() {

    const { userData, setUserData } = useContext(UserContext)
    const { host } = useContext(HostContext)

    const logout = () => {
        setUserData({
            token: undefined,
            user: undefined
        })
        localStorage.setItem('auth-token', '')
    };

        let hostNavLink;        
            if (host.userId) {
                hostNavLink = 'Host'
            } else {
                hostNavLink = 'Add Listing!!'
            }
  
 
    
   
    return (
        <nav className={'auth-btn'}>
            {
                userData.user ? 
                (   
                    <>         
                    {userData.user.accountType === "renter" ? (
                        <NavLink exact activeClassName="active" to="/rent"><span className='navBarLinks'>Rent</span></NavLink>

                    ): 
                    
                    (
                        <NavLink exact activeClassName="active" to="/host"><span className='navBarLinks'>{hostNavLink}</span></NavLink>
                        
                    )
                    
                    }      
                        <NavLink exact activeClassName="active" to="/options"><span className='navBarLinks'>Options</span></NavLink> 
                        <NavLink to="/logout"><span onClick={logout} className='navBarLinks'>Logout</span></NavLink>           
                    </>
                ) : ( 
                <>
                    {/* <NavLink exact activeClassName="active" to="/register"><span className='navBarLinks'>Register</span></NavLink> */}
                    <NavLink exact activeClassName="active" to="/login"><span className='navBarLinks'>Login</span></NavLink>       
                </>
                )
            }
            
        </nav>
    )

};