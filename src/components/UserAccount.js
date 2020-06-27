import React, {useContext, useState, useEffect} from 'react';
import {appContext} from "../contexts/appContext";
import {Link} from "react-router-dom";
import axiosWithAuth from '../utils/axiosWithAuth';



const UserAccount = (props) => {
    const [user, setUser] = useState({})
    const [cart, setCart]= useState([]);
    const addToMyStrains = useContext(appContext).addToMyStrains;
    const isLoggedIn = useContext(appContext).isLoggedIn;
    console.log("user info", user)

    useEffect(()=>{
        const id = Number(localStorage.getItem("Current user"))
        axiosWithAuth()
            .get(`/users/${id}`)
            .then(res=>{
                console.log("current user", res)
                setUser(res.data);
                setCart(res.data.cart)
            })
    },[])
    return (
        <div>
            <h1>{user.firstName} {user.lastName}</h1>
            <p>{user.email} </p>
            <button>Edit Profile</button>
            <h3>My Saved Strains:</h3>
            
            <div className="my-strains">
             {cart.map(strain=>(
                <div key={strain.id} className ='all-strains-child' >
                    <img className = 'strain-img' src= {strain.img_url} alt = 'something'></img>

                    <h6 ><span className = 'strain-span'> </span>{strain.strain_name}</h6>
                    <Link to={`/strain/${strain.id}`}>more info</Link>
                
                    {isLoggedIn ? <button className="mystrains-button" onClick={(e)=>{
                        e.preventDefault();
                        
                    
                    }}>Remove</button> : null}
                </div>
                ))}
            </div>
        </div>
    )
}

export default UserAccount;