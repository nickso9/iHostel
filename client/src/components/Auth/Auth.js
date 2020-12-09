import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import UserContext from '../../contexts/UserContext'
import HostContext from '../../contexts/HostContext'

export default function AuthOptions() {

    const { userData, setUserData } = useContext(UserContext)
    const { host, setHost } = useContext(HostContext)

    const logout = () => {
        setUserData({
            token: undefined,
            user: undefined
        })
        localStorage.setItem('auth-token', '')

        setHost({
            active: undefined,
            capacity: undefined,
            userId: undefined,
            price: undefined,
            description: undefined,
            title: undefined,
            address: {
              addressOne: undefined,
              addressTwo: undefined,
              state: undefined,
              city: undefined,
              zip: undefined
            },
            images: [],
            startDate: new Date(),
            endDate: new Date()
        })
    };

        let hostNavLink;        
            if (host.userId) {
                hostNavLink = 'View Listing'
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
                        <>
                        {/* <NavLink exact activeClassName="active" to="/"><span className='navBarLinks'>Dashboard</span></NavLink>  */}
                        <NavLink exact activeClassName="active" to="/host"><span className='navBarLinks'>{hostNavLink}</span></NavLink>
                        </>
                    )
                    
                    }      
                        
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