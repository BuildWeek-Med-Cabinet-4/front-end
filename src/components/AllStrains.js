import React, {useContext} from 'react';
import { appContext } from '../contexts/appContext';
import {Link} from 'react-router-dom';



export default function Strains() {
    const allStrains = useContext(appContext).allStrains;
    
    return (
        <div className="all-strains">
            {allStrains.map(strain => (
                <div className="strain-card" key={strain.id}>
                    <img src={strain.img_url} alt={`${strain.strain_name} strain`} />
                    <p>Strain:</p>
                    <h3>{strain.strain_name}</h3>
                    <Link to={`/strain/${strain.id}`} style={{ textDecoration: 'none', color: 'blue'}}>More info</Link>
                    <button>Save to My Strains</button>
                </div>
            ))}
            
        </div>
    )
}
