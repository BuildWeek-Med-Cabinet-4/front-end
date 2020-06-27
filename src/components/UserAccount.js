import React, {useContext, useState, useEffect} from 'react';
import {appContext} from "../contexts/appContext";
import {Link} from "react-router-dom";
import axiosWithAuth from '../utils/axiosWithAuth';
import UpdateAccount from "./UpdateAccount";



const UserAccount = (props) => {
    const [user, setUser] = useState({})
    const [cart, setCart]= useState([]);
    const [editing, setEditing] = useState(false);
    const isLoggedIn = useContext(appContext).isLoggedIn;
    const id = Number(localStorage.getItem("Current user"))
    console.log("user info", user)

    useEffect(()=>{
        
        axiosWithAuth()
            .get(`/users/${id}`)
            .then(res=>{
                console.log("current user", res)
                setUser(res.data);
                setCart(res.data.cart)
            })
    },[])

    const removeStrain = (strainId) => {
        const strainToRemove = {user_id: id, product_id: strainId }
        console.log("strain to remove", strainToRemove)
        axiosWithAuth()
            .delete(`/users/${id}/cart/${strainId}`)
            .then(res=>{
                console.log("delete res", res)
                axiosWithAuth()
                    .get(`/users/${id}`)
                    .then(res=>{
                        console.log("current user", res)
                        setCart(res.data.cart)
            })

            })
            .catch(err=>console.log(strainToRemove))
    }
    return (
        <div className="my-account">
            <h1>{user.firstName} {user.lastName}</h1>
            <p>{user.email} </p>
            {editing ? <UpdateAccount user={user} setUser={setUser} setEditing={setEditing}/> : <button onClick={()=>setEditing(true)}>Edit Profile</button>}
            <h3>My Saved Strains:</h3>
            
            <div className="my-strains">
             {cart.map(strain=>(
                <div key={strain.id} className ='all-strains-child' >
                    <img className = 'strain-img' src= {strain.img_url} alt = 'something'></img>

                    <h6 ><span className = 'strain-span'> </span>{strain.strain_name}</h6>
                    <Link to={`/strain/${strain.id}`}>more info</Link>
                
                    {isLoggedIn ? <button className="mystrains-button" onClick={(e)=>{
                        e.preventDefault();
                        removeStrain(strain.id);
                    
                    }}>Remove</button> : null}
                </div>
                ))}
            </div>
        </div>
    )
}

export default UserAccount;