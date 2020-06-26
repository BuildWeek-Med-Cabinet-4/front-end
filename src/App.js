import React, {useState, useEffect} from 'react'
import './App.css';
import axiosWithAuth from "./utils/axiosWithAuth"
import { BrowserRouter as Router, Route, Link  } from "react-router-dom";
import Home from './components/Home';
import Identify from './components/Identify'
import StrainFinder from './StrainFinder';
import { appContext } from './contexts/appContext';
import UserAccount from './components/UserAccount'
import PrivateRoute from './components/PrivateRoute';
import ViewStrain from './components/ViewStrain';
import {useHistory} from 'react-router-dom'


function App() {

  useEffect(()=>{
    if(localStorage.getItem("Current user")) {
      const userID = Number(localStorage.getItem("Current user"))
      axiosWithAuth()
        .get(`/users/${userID}`)
        .then(res=>{
          console.log("current use", res)
          setCurrentUser(res.data);
        })
        .catch(err=>console.log(err))
    }
  }, [])

  const loggedIn = () => {
    if(localStorage.getItem("Logged in") === "true") {
      return true;
    }
    return false;
  }
  const [isLoggedIn, setIsLoggedIn] = useState(loggedIn());
  const [currentUser, setCurrentUser] = useState({});
  const {push} = useHistory();

  const addToMyStrains = () => {
    return "hello";
  }

  const logout = () => {
    setIsLoggedIn(false);
    setCurrentUser({});
    localStorage.removeItem("Logged in")
    localStorage.removeItem("Current user")
    localStorage.removeItem("token")
    push("/");
  }

  

  return (
    <Router>
    <div >

      <appContext.Provider value = {{isLoggedIn: isLoggedIn, addToMyStrains: addToMyStrains, setIsLoggedIn: setIsLoggedIn, setCurrentUser: setCurrentUser}}>
        <nav className="nav-bar">
          
          <Link to = '/'>Home</Link>
          {isLoggedIn ? <Link to={`/myaccount/${currentUser.id}`}>My Account</Link> : <Link to="/identify">Sign up/Log in</Link>}
          <Link to  = '/StrainFinder'>Strain Finder</Link>
  {isLoggedIn ? <span><span onClick={logout} className="logout">Log out</span><span style={{marginLeft: "20%", color: "white"}}>Hello, <Link to={`/myaccount/${currentUser.id}`} style={{textDecoration: "none", color: "blue"}}>{currentUser.firstName}</Link></span> </span> : null}
        </nav>
        
          
          <PrivateRoute exact path = '/myaccount/:id' component={UserAccount} />
          <Route exact path = '/identify' ><Identify /></Route>
         
          <Route exact path = '/' component = {Home}></Route>
          <Route exact path = '/StrainFinder' component = {StrainFinder}></Route>
          <Route exact path = "/strain/:id" component={ViewStrain} />
        

      
      </appContext.Provider>
      
    
    </div>
    </Router>
  );
}

export default App;
