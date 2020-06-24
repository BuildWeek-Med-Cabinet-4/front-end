import React, {useState} from 'react'
import './App.css';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Home from './components/Home';
import Identify from './components/Identify'
import { appContext } from './contexts/appContext';
import UserAccount from './components/UserAccount'
import PrivateRoute from './components/PrivateRoute';


function App() {

  const loggedIn = () => {
    if(localStorage.getItem("Logged in") === "true") {
      return true;
    }
    return false;
  }
  const [isLoggedIn, setIsLoggedIn] = useState(loggedIn());
  

  return (
    <Router>
    <div >
      <appContext.Provider value = {{isLoggedIn: isLoggedIn}}>
        <nav className="nav-bar">
          
          <Link to = '/'>Home</Link>
          <Link to  = '/identify'>Account</Link>
        </nav>
        <Switch>
          
          <PrivateRoute exact path = '/myaccount/:id' component={UserAccount} />
          <Route path = '/identify/' ><Identify /></Route>
          <Route exact path = '/' component = {Home}></Route>
        </Switch>
        
        </appContext.Provider>
      
    </div>
    </Router>
  );
}

export default App;
