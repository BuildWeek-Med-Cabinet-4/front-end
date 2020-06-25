import React, {useContext, useState} from 'react'
import {} from 'reactstrap';
import {appContext} from '../contexts/appContext'
import {Link} from 'react-router-dom'



function Posts({ posts, loading }) {

    console.log(posts)
    
    const addToMyStrains = useContext(appContext).addToMyStrains;
    const isLoggedIn = useContext(appContext).isLoggedIn;

    if(loading) {


        return (<h2>Loading</h2>)
    }    
    
    
    return (
        <section className = 'all-strains-container'>
            {
                posts.map(post => (
                    <div key={post.id} className ='all-strains-child' >
                        <img className = 'strain-img' src= {post.img_url} alt = 'something'></img>

                        <h6 ><span className = 'strain-span'>Strain Name: </span>{post.strain_name}</h6>
                        <Link to={`/strain/${post.id}`} style={{textDecoration: "none"}}>more info</Link>
                        <div>
                        <button className="mystrains-button" onClick={(e)=>{
                            e.preventDefault();
                            if(isLoggedIn) {
                                addToMyStrains();
                            } else {
                                alert("You must be logged in to do that")
                                
                            }
                        }}>Add to My Strains</button>
                        </div>
                        
                        
                        
                        
                        
                    </div>
                    
                ))
            }
            
        </section>
    )
}



export default Posts;

