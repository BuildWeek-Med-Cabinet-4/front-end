import React from 'react'
import {} from 'reactstrap';



export default function Posts({ posts, loading }) {
    if(loading) {
        return (<h2>Loading</h2>)
    }    
    
    
    return (
        <section className = 'all-strains-container'>
            {
                posts.map(post => (
                    <div key={post.id} className ='all-strains-child' >
                        <h6 >{post.strain_name}</h6>
                    </div>
                ))
            }
        </section>
    )
}
