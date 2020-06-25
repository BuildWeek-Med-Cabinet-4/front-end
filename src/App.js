import React, {useState, useEffect} from 'react'
import './App.css';

import { BrowserRouter as Router, Route, Link  } from "react-router-dom";
import Home from './components/Home';
import Identify from './components/Identify'
import StrainFinder from './StrainFinder';
import { appContext } from './contexts/appContext';
import UserAccount from './components/UserAccount'
import PrivateRoute from './components/PrivateRoute';
import axios from 'axios';
import ViewStrain from './components/ViewStrain';


function App() {

  const loggedIn = () => {
    if(localStorage.getItem("Logged in") === "true") {
      return true;
    }
    return false;
  }
  const [isLoggedIn, setIsLoggedIn] = useState(loggedIn());

  const addToMyStrains = () => {
    return "hello"
  }

  

  return (
    <Router>
    <div >

      <appContext.Provider value = {{isLoggedIn: isLoggedIn, addToMyStrains: addToMyStrains}}>
        <nav className="nav-bar">
          
          <Link to = '/'>Home</Link>
          {isLoggedIn ? <Link to  = "/myaccount/{current user id}">My Account</Link> : <Link to="/identify">Sign up/Log in</Link>}
          <Link to  = '/StrainFinder'>Strain Finder</Link>
          {isLoggedIn ? <span>Hello, <Link to="/myaccount/{current user id}">Current user name</Link></span> : null}
        </nav>
        
          
          <PrivateRoute exact path = '/myaccount/:id' component={UserAccount} />
          <Route path = '/identify/' ><Identify /></Route>
         
          <Route exact path = '/' component = {Home}></Route>
          <Route path = '/StrainFinder' component = {StrainFinder}></Route>
          <Route path = "/strain/:id" component={ViewStrain} />
        

      
      </appContext.Provider>
      
    
    </div>
    </Router>
  );
}

export default App;
