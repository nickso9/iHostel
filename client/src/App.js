import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './containers/Home/Home';
import Navbar from './components/Navigation/Navbar'
import Host from './containers/Host/Host'
import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
   <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/host' component={Host} />
      </Switch>
   </BrowserRouter>
  );
}

export default App;
