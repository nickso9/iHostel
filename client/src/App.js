import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import Landing from './containers/Home/Landing/Landing';
import Navbar from './components/Navigation/Navbar'
import Host from './containers/Host/Host';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register'
import PrivateRoute from './components/Auth/Private'
import Rent from './containers/Rent/Rent'
import Home from './containers/Home/Home'
import Options from './containers/Options/Options'
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
      <HostContextProvider>
          <Navbar />
          <Switch>
            <Route exact path='/host' component={Host}> 
                
                  <PrivateRoute
                    component={Host}
                    loggedIn={userData}
                  />
                
            </Route>
            <Route exact path='/rent'>

                  <PrivateRoute
                    component={Rent}
                    loggedIn={userData}
                  />       
                  
            </Route>

            <Route exact path='/options'>

                  <PrivateRoute
                    component={Options}
                    loggedIn={userData}
                  />       
                  
            </Route>
           
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
                
            <Route path='/' component={userData.user ? Home : Landing} /> 
            

            </Switch>
        </HostContextProvider> 
      </UserContext.Provider>
   </BrowserRouter>
  );
}

export default App;
