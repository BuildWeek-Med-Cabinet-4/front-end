import React, {useState, useEffect} from 'react'
import './App.css';
import { Link, Route } from 'react-router-dom';
import Home from './components/Home';
import Account from './components/Account';
import StrainFinder from './StrainFinder';

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

      <nav className="nav-bar">
        
        <Link to = '/'>Home</Link>
        <Link to  = '/MyAccount'>Account</Link>
        <Link to  = '/StrainFinder'>Strain Finder</Link>
      </nav>

        <Route exact path = '/' component = {Home}></Route>
        <Route path = '/MyAccount' component = {Account}></Route>
        <Route path = '/StrainFinder' component = {StrainFinder}></Route>

      
    </div>
    </Router>
  );
}

export default App;
