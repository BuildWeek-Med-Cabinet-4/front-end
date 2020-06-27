import React, {useState, useEffect, useContext} from 'react';
import axios from "axios";
import {useParams} from 'react-router-dom';
import {appContext} from '../contexts/appContext'


const ViewStrain = () => {
    const [strain, setStrain] = useState({});
    const {id} = useParams();
    const addToMyStrains = useContext(appContext).addToMyStrains;
    const isLoggedIn = useContext(appContext).isLoggedIn;
    const [provider, setProvider] = useState({});
    console.log("provider", provider)

    useEffect(()=>{
        axios
            .get(`https://best-med-cabinet.herokuapp.com/api/products/${id} `)
            .then(res => {
                console.log("strain res", res.data.provider.name)
                setStrain(res.data);
                setProvider(res.data.provider);
                
            })
            .catch(err=>console.log(err))
    },[])

    return (
        <div>
                <div className="strain-header">
                    <div className="title-container">
                    <h1 className="strain-title">{strain.strain_name}</h1>
                    <p style={{fontStyle:"italic"}}>{strain.description}</p>
                    {isLoggedIn ? <button className="mystrains-button" onClick={(e)=>{
                            e.preventDefault();
                            addToMyStrains(strain.id);
                            
                        }}>Add to My Strains</button> : null}
                    </div>
                    <img src={strain.img_url} />
                    
                </div>

                 <div className="strain-info">
                    <div>
                        <h3>Type: {strain.strain_type}</h3>
                        <h3>Cost: ${strain.price}/{strain.price_unit}</h3>
                        <h3>Availability: {strain.is_available ? <span>In stock</span> : <span>Currently Not Available</span>}</h3>
                    </div>
                    <div className="strain-attr">
                        
                            <h4>Effects: </h4> 
                            <span>{strain.effects}</span>
                        
                         
                        
                            <h4>Flavor Options: </h4>
                            <span>{strain.flavors}</span>
                    </div>

                 
                </div>
                <div className="buy-strain">
                    <h3>Where to Buy: </h3>
                    <div className="disp-info">
                        <h3>{provider.name}</h3>
                        {provider.address}<br/>
                        {provider.city}, {provider.state} {provider.postal_code}<br/>
                        {provider.phone_number}<br/>
                        {provider.email}
                        {provider.has_delivery ? <p>We Deliver!</p> : null}


                    </div>
                </div>
                 
                 
            
        </div>
    )
}

export default ViewStrain;