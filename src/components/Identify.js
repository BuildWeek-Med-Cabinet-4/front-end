import React, { useState, useContext } from 'react';
import {useHistory} from 'react-router-dom';
import SignUpForm from './SignUpForm';
import LoginForm from "./LoginForm";
import { appContext } from '../contexts/appContext';



export default function Identify() {
    const isLoggedIn = useContext(appContext).isLoggedIn; 

    const [loginTabActive, setLoginTabActive] = useState(true);
     
    const {push} = useHistory();

    if(isLoggedIn) {
        push('/myaccount/{current user id}');
        //need update line above once we get login post api data
    }


    return (
    
<div className="App">

     
           
    <header>
    
    <h2 className={loginTabActive ? "active" : null} onClick={(e)=>{
        e.preventDefault();
        setLoginTabActive(true);
        }}>Log in</h2>
    
    
    <h2 className={loginTabActive ? "" : "active"} onClick={(e)=>{
        e.preventDefault();
        setLoginTabActive(false);
        }}>Sign Up</h2>
    
    </header>

    
    {loginTabActive ? <LoginForm /> : <SignUpForm />}

</div>


    )
}