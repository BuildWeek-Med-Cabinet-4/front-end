import React, {useContext} from 'react';
import {appContext} from "../contexts/appContext";
import {Link} from "react-router-dom";



const UserAccount = (props) => {
    const user = useContext(appContext).currentUser;
    const addToMyStrains = useContext(appContext).addToMyStrains;
    const isLoggedIn = useContext(appContext).isLoggedIn;
    console.log("user info", user.cart)
    return (
        <div>
            <h1>{user.firstName} {user.lastName}</h1>
            <p>{user.email} </p>
            <button>Edit Profile</button>
            <h3>My Saved Strains:</h3>
            
            <div>
             {/* {user.cart.map(strain=>(
                <div key={strain.id} className ='all-strains-child' >
                    <img className = 'strain-img' src= {strain.img_url} alt = 'something'></img>

                    <h6 ><span className = 'strain-span'> </span>{strain.strain_name}</h6>
                    <Link to={`/strain/${strain.id}`}>more info</Link>
                
                    {isLoggedIn ? <button className="mystrains-button" onClick={(e)=>{
                        e.preventDefault();
                        addToMyStrains(strain.id);
                    
                    }}>Add to My Strains</button> : null}
                </div>
                ))} */}
            </div>
        </div>
    )
}

export default UserAccount;