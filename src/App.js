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
import AllStrains from './components/AllStrains';

function App() {

  const loggedIn = () => {
    if(localStorage.getItem("Logged in") === "true") {
      return true;
    }
    return false;
  }
  const [isLoggedIn, setIsLoggedIn] = useState(loggedIn());
  const [allStrains, setAllStrains] = useState([]);

  useEffect(()=>{
    axios
      .get("https://best-med-cabinet.herokuapp.com/api/products")
      .then(res=>{
        console.log("all strains", res);
        setAllStrains(res.data);
      })
      .catch(err=>console.log(err))
  },[]) 
  

  return (
    <Router>
    <div >

      <appContext.Provider value = {{isLoggedIn: isLoggedIn, allStrains: allStrains}}>
        <nav className="nav-bar">
          
          <Link to = '/'>Home</Link>
          <Link to  = '/identify'>Account</Link>
        </nav>
        
          
          <PrivateRoute exact path = '/myaccount/:id' component={UserAccount} />
          <Route path = '/identify/' ><Identify /></Route>
          <Route path = '/all-strains' component={AllStrains} />
          <Route exact path = '/' component = {Home}></Route>
          <Route path = '/StrainFinder' component = {StrainFinder}></Route>
        

      
      </appContext.Provider>
      
    
    </div>
    </Router>
  );
}

export default App;
