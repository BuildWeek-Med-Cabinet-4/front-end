import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import * as yup from 'yup';
import {Link} from 'react-router-dom';
import {appContext} from './contexts/appContext'





function StrainFinder() {

    //List of all Effects

//List of all Effects

const allEffects = [ 'happy', 'euphoric', 'relaxed', 'uplifted', 'sleepy', 'creative', 'energetic', 'focus', 'focus', 'hungry', 'talkative', 'uplift', 'tingly', 'giggly', 'relax', 'arouse', 'focused', 'aroused'];
//List of all Flavors
const allFlavors = ['earthy', 'sweet', 'citrus', 'pungent', 'berry', 'pine', 'flowery', 'woody', 'diesel', 'spicy', 'herbal', 'lemon', 'skunk', 'tropical', 'blueberry', 'grape', 'orange', 'cheese', 'pepper', 'lime', 'strawberry', 'minty', 'pineapple', 'sage', 'grapefruit', 'lavender', 'chemical', 'vanilla', 'mango', 'honey', 'tree', 'fruit', 'ammonia', 'nutty', 'coffee', 'menthol', 'butter', 'mint', ' tea ', 'apple', 'rise', 'blue', 'apricot', 'tobacco', 'violet', 'chestnut', ' tar ', 'peach', 'pear', 'plum']

//Setting form data slices of state
const [effectsArray, setEffectsArray] = useState([]);
const [flavorsArray, setFlavorsArray] = useState([]);
const initialForm = {
    UserID: 1000,
    Strain: "Hello",
    Type: '',
    Effects: "",
    Flavor: "",
    Description: ""
  }
const [formData, setFormData] = useState (initialForm);
const [errors, setErrors] = useState(initialForm);
const [buttonOff, setButtonOff] = useState(true);
const [gotResults, setGotResults] = useState(false);
const [recommendation, setRecommendation] = useState({});
const isLoggedIn = useContext(appContext).isLoggedIn
const addToMyStrains = useContext(appContext).addToMyStrains;

const formSchema = yup.object().shape({
    Type: yup
      .string()
      .required("Please select a strain type"),
    Effects: yup.string().required("Please select at least one  effect"),
    Flavor: yup.string().required("Please select at least one  flavor"),
    Description: yup.string().required("Please provide a description"),
    
  });

    useEffect(()=>{
        const addEffectName = (effectsList, nextEffect ) =>{
            return effectsList.concat(nextEffect + ", ")
        }
        setFormData({...formData, Effects: effectsArray.reduce(addEffectName, "")})
    }, [effectsArray])

    useEffect(()=>{
        const addFlavorName = (flavorsList, nextFlavor ) =>{
            return flavorsList.concat(nextFlavor + ", ")
        }
        setFormData({...formData, Flavor: flavorsArray.reduce(addFlavorName, "")})
    }, [flavorsArray])

    
    

  const updateEffects = (e) => {
    
    if(e.target.checked) {
        setEffectsArray([...effectsArray, e.target.name])
        
    } else {
        setEffectsArray(effectsArray.filter(effect => effect !== e.target.name))
    }   
    console.log("value of checckeed", e.target.checked)

    yup
      .reach(formSchema, "Effects")
      .validate(formData.Effects)
      .then(valid => {
        setErrors({ ...errors, Effects: "" });
      })
      .catch(err => setErrors({ ...errors, Effects: err.errors[0] }));
    

}

  const updateFlavors = (e) => {
     
    if(e.target.checked) {
        setFlavorsArray([...flavorsArray, e.target.name])
    } else {
        setFlavorsArray(flavorsArray.filter(flavor => flavor !== e.target.name))
    }   
    console.log("value of checckeed", e.target.checked)
    
  }

  useEffect(() => {
    formSchema.isValid(formData).then(valid => {
      console.log("valid?", valid);
      setButtonOff(!valid);
    });
  }, [formData]);
  


  const handleChanges = e => {
    e.persist();
    e.preventDefault();
    setFormData({...formData, [e.target.name]: e.target.value });
    console.log("updates",formData)

    yup
      .reach(formSchema, e.target.name)
      .validate(e.target.value)
      .then(valid => {
        setErrors({ ...errors, [e.target.name]: "" });
      })
      .catch(err => setErrors({ ...errors, [e.target.name]: err.errors[0] }));
}



    

      const getRecStrains = e => {
          e.preventDefault();
          console.log("user input", formData)
          console.log("effects array length", effectsArray)
          
          axios
                .post("https://best-med-cabinet.herokuapp.com/api/products/recommendations", formData )
                .then(res=>{
                  console.log("rec res", res)
                  setGotResults(true);
                  setRecommendation(res.data);
                })
                .catch(err=>console.log(err));
      }

    return (


        <div>
            < h2 className = 'browse-title'>Strain Finder
              <hr className = 'green-hr'></hr>
              <hr className = 'purple-hr'></hr>
              <hr className = 'orange-hr'></hr>
            </h2>

            <p>Welcome to Strain Finder!</p>

            <p><span className = 'redspan'>*All fields are required</span></p>

            <form onSubmit={getRecStrains}>

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
                    {errors.Flavor.length > 0 ? <p className="error">{errors.Flavor}</p> : null}
                    {allFlavors.map(flavor=>(
                        <label className = 'flavors-label' key={flavor}>
                            {flavor}:<input className = 'flavors-input' type='checkbox' name={flavor} onChange={updateFlavors}></input>
                        </label>
                    ))}
                </div>
                <h3>Please provide a brief description what you would like your strain to do for you:</h3>
                {errors.Description.length > 0 ? <p className="error">{errors.Description}</p> : null}
                <input type="textbox" name="Description" value={formData.Description} onChange={handleChanges}/>
                <button disabled={buttonOff}  type="submit" className="finder-button">Submit</button>

                

            </form>
            {gotResults ? <h3>This is the strain that we recommend for you:</h3> : null}
            {gotResults ? <div  className ='all-strains-child' >
                        <img className = 'strain-img' src= {recommendation.img_url} alt = 'something'></img>

                        <h6 ><span className = 'strain-span'>Strain Name: </span>{recommendation.strain_name}</h6>
                        <Link to={`/strain/${recommendation.id}`} style={{textDecoration: "none"}}>more info</Link>
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
            </div> : null}
        </div>
    )
}


export default StrainFinder;
