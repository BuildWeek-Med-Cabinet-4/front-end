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

                        <h6 ><span className = 'strain-span'> </span>{post.strain_name}</h6>
                        <Link to={`/strain/${post.id}`}>more info</Link>
                        <div>
                        {isLoggedIn ? <button className="mystrains-button" onClick={(e)=>{
                            e.preventDefault();
                            addToMyStrains(post.id);
                            
                        }}>Add to My Strains</button> : null}
                        
                        </div>
                        
                        
                        
                        
                        
                    </div>
                    
                ))
            }
            
        </section>
    )
}



export default Posts;

