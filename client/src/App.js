import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './containers/Home/Home';
import Navbar from './components/Navigation/Navbar'
import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
   <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path='/' component={Home}/>
      </Switch>
   </BrowserRouter>
  );
}

export default App;
