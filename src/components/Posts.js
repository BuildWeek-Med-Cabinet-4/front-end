import React from 'react'
import {} from 'reactstrap';



export default function Posts({ posts, loading }) {

    console.log(posts)

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
                        
                    </div>
                ))
            }
        </section>
    )
}
