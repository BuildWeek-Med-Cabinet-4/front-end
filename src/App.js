import React from 'react'
import './App.css';
import { Link, Route } from 'react-router-dom';
import Home from './components/Home'
import Account from './components/Account'

function App() {


  

  return (
    <div >

      <nav class="nav-bar">
        
        <Link to = '/'>Home</Link>
        <Link to  = '/MyAccount'>Account</Link>
      </nav>
        <Route exact path = '/' component = {Home}></Route>
        <Route path = '/MyAccount' component = {Account}></Route>
    
      
    </div>
  );
}

export default App;
