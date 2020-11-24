import React from 'react';
import { Redirect, Route } from 'react-router-dom';




export default function PrivateRoute({component: Component, ...rest }) {
    
    const loggedIn = (rest.loggedIn.token !== undefined)
    return (
       <Route
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



