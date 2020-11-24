import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import UserContent from '../../contexts/UserContext'



export default function PrivateRoute({component: Component, ...rest }) {

    const { userData } = useContext(UserContent)
    
    const loggedIn = (userData.token !== undefined)
    return (
       <Route
            exact
            {...rest}
            render={props => {
                if (loggedIn) {
                return <Component {...props} />
                } else {
                return <Redirect to='/' />
                }
            }}
        />
      )
}



