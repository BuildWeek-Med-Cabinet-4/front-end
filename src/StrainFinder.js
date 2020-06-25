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
    strain_type: '',
    strain_effects: '',
    strain_flavors: ''
  });






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
                    <select>
                        <option>Indica</option>
                        <option>Sativa</option>
                        <option>Hybrid</option>
                    </select>
                </div>

                <div className="effects">
                    <h3>choose some effects:</h3>
                
                    {allEffects.map(effect=>(
                        <label className = 'effects-label'>
                        {effect}:<input className='effects-input' type='checkbox' name='theName'></input>
                        </label>
                    ))}
                </div>
                <div className = 'flavors'>
                    <h3>choose some flavors</h3>
                    {allFlavors.map(flavor=>(
                        <label className = 'flavors-label'>
                            {flavor}:<input className = 'flavors-input' type='checkbox' ></input>
                        </label>
                    ))}
                </div>

                

            </form>
        </div>
    )
}


export default StrainFinder;
