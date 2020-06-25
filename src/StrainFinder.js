import React, { useState, useEffect } from 'react';
import axios from 'axios';





function StrainFinder() {

    //List of all Effects

//List of all Effects

const allEffects = [ 'happy', 'euphoric', 'relaxed', 'uplifted', 'sleepy', 'creative', 'energetic', 'focus', 'focus', 'hungry', 'talkative', 'uplift', 'tingly', 'giggly', 'relax', 'arouse', 'focused', 'aroused'];
//List of all Flavors
const allFlavors = ['earthy', 'sweet', 'citrus', 'pungent', 'berry', 'pine', 'flowery', 'woody', 'diesel', 'spicy', 'herbal', 'lemon', 'skunk', 'tropical', 'blueberry', 'grape', 'orange', 'cheese', 'pepper', 'lime', 'strawberry', 'minty', 'pineapple', 'sage', 'grapefruit', 'lavender', 'chemical', 'vanilla', 'mango', 'honey', 'tree', 'fruit', 'ammonia', 'nutty', 'coffee', 'menthol', 'butter', 'mint', ' tea ', 'apple', 'rise', 'blue', 'apricot', 'tobacco', 'violet', 'chestnut', ' tar ', 'peach', 'pear', 'plum']

//Setting form data slices of state
const [formData, setFormData] = useState ({
    UserID: 1000,
    Strain: "Hello",
    Type: '',
    Effects: [],
    Flavor: [],
    Description: ""
  });

  const updateEffects = (e) => {
    if(e.target.checked) {
        formData.Effects.push(e.target.name)
    } else {
        const effectToRemoveIndex = formData.Effects.indexOf(e.target.name);
        formData.Effects.splice(effectToRemoveIndex, 1);
    }
    console.log("value of checckeed", e.target.checked)
    console.log("updates",formData)
  }

  const updateFlavors = e => {
    if(e.target.checked) {
        formData.Flavor.push(e.target.name)
    } else {
        const flavorToRemoveIndex = formData.Effects.indexOf(e.target.name);
        formData.Flavor.splice(flavorToRemoveIndex, 1);
    }
    console.log("value of checckeed", e.target.checked)
    console.log("updates",formData)
  }
  


  const handleChanges = e => {
    e.persist();
    e.preventDefault();
    setFormData({...formData, [e.target.name]: e.target.value });
    console.log("updates",formData)
}



    useEffect(()=>{
        const fetchPosts = async () =>{

          const res = await axios.get('https://best-med-cabinet.herokuapp.com/api/products');
          console.log(res.data)
          
      
        }
      
        fetchPosts();
      },[]);

    return (


        <div>
            <h3> Let us help you find a Strain</h3>

            <form>

            <div className = 'strain-type'>
                    <h3>Choose a strain type:</h3>
                    <select name="Type" value={formData.Type} onChange={handleChanges}>
                        <option value="">--Select--</option>
                        <option value="Indica">Indica</option>
                        <option value="Sativa">Sativa</option>
                        <option value="Hybrid">Hybrid</option>
                    </select>
                </div>

                <div className="effects">
                    <h3>choose some effects:</h3>
                
                    {allEffects.map(effect=>(
                        <label className = 'effects-label' key={effect}>
                        {effect}:<input  className='effects-input' type='checkbox' name={effect} onChange={updateEffects}></input>
                        </label>
                    ))}
                </div>
                <div className = 'flavors'>
                    <h3>choose some flavors</h3>
                    {allFlavors.map(flavor=>(
                        <label className = 'flavors-label' key={flavor}>
                            {flavor}:<input className = 'flavors-input' type='checkbox' name={flavor} onChange={updateFlavors}></input>
                        </label>
                    ))}
                </div>
                <h3>Please provide a brief description what you would like your strain to do for you:</h3>
                <input type="textbox" name="Description" value={formData.Description} onChange={handleChanges}/>
                <button type="submit" className="finder-button">Submit</button>

                

            </form>
        </div>
    )
}


export default StrainFinder;
