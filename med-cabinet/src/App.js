import React, {useState} from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import SignUpForm from './components/SignUpForm';
import LoginForm from "./components/LoginForm";

function App() {

  const [loginActive, setLoginActive] = useState(true);
  

  return (
    
      <div className="App">
        <header>
          
          <h2 className={loginActive ? "active" : null} onClick={(e)=>{
            e.preventDefault();
            setLoginActive(true);
            }}><a href="#">Log in</a></h2>
          
          
          <h2 className={loginActive ? "" : "active"} onClick={(e)=>{
            e.preventDefault();
            setLoginActive(false);
            }}><a href="#">Sign Up</a></h2>
        
        </header>
        {loginActive ? <LoginForm /> : <SignUpForm />}
        
      </div>
    
  );
}

export default App;
