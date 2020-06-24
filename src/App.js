import React from 'react'
import './App.css';
import { Link, Route } from 'react-router-dom';
import Home from './components/Home';
import Account from './components/Account';
import StrainFinder from './StrainFinder';



function App() {


  

  return (
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
  );
}

export default App;
