import React, { useState } from 'react';

import SignUpForm from './SignUpForm';
import LoginForm from "./LoginForm";


export default function Account() {

    const [loginActive, setLoginActive] = useState(true);

    return (
    
<div className="App">

     
            
    <header>
    
    <h2 className={loginActive ? "active" : null} onClick={(e)=>{
        e.preventDefault();
        setLoginActive(true);
        }}>Log in</h2>
    
    
    <h2 className={loginActive ? "" : "active"} onClick={(e)=>{
        e.preventDefault();
        setLoginActive(false);
        }}>Sign Up</h2>
    
    </header>

{loginActive ? <LoginForm /> : <SignUpForm />}

</div>


    )
}
