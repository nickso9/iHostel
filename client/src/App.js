import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import Home from './containers/Home/Home';
import Navbar from './components/Navigation/Navbar'
import Host from './containers/Host/Host';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register'
import PrivateRoute from './components/Auth/Private'
import './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HostContextProvider } from './contexts/HostContext';
import UserContext from './contexts/UserContext';


function App() {

  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  })

      useEffect(() => {
          const checkLoggedIn = async () => {
              let token = localStorage.getItem('auth-token');
              if (token == null) {
                  localStorage.setItem('auth-token', '')
                  token = ''
              }
              const tokenRes = await axios.post(
                  'http://localhost:5000/users/tokenIsValid', 
                  null,
                  { headers: {
                      'x-auth-token': token
                  }})

                  if (tokenRes.data) {
                      const userRes = await axios.get(
                          'http://localhost:5000/users/', 
                          { headers: {
                              'x-auth-token': token
                          }}
                          );
                      setUserData({
                          token,
                          user: userRes.data
                      })
                  }            
          };

          checkLoggedIn()
      }, []);

  return (
   <BrowserRouter>
      <UserContext.Provider value={{userData, setUserData}}>
          <Navbar />
          <Switch>
              <Route exact path='/host'>
                <HostContextProvider>
                  <PrivateRoute
                    component={Host}
                    loggedIn={userData}
                  />
                </HostContextProvider> 
            </Route> 
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
                
            <Route path='/' component={Home} /> 
            

            </Switch>
      </UserContext.Provider>
   </BrowserRouter>
  );
}

export default App;
