import React, {useState, useEffect} from 'react';
import * as yup from 'yup';


const Login = () => {

    const initialFormState = {
        email: "",
        password: ""
    }

    const [credentials, setCredentials] = useState(initialFormState);
    const [errors, setErrors] = useState(initialFormState);
    const [buttonOff, setButtonOff] = useState(true);
 

    const formSchema = yup.object().shape({
        email: yup
          .string()
          .email("Must be a valid email address")
          .required("Please enter an email address"),
        password: yup.string().required("Please enter your password"),
        
      });

      const handleChanges = e => {
        e.persist();
        e.preventDefault();
        setCredentials({...credentials, [e.target.name]: e.target.value });

        yup
      .reach(formSchema, e.target.name)
      .validate(e.target.value)
      .then(valid => {
        setErrors({ ...errors, [e.target.name]: "" });
      })
      .catch(err => setErrors({ ...errors, [e.target.name]: err.errors[0] }));
    }

    useEffect(() => {
        formSchema.isValid(credentials).then(valid => {
          console.log("valid?", valid);
          setButtonOff(!valid);
        });
      }, [credentials]);

      const logUserIn = e => {
          e.preventDefault();
        //axios post request and push to strainsList
      }

    return (
        <div className="login">
            <form className="login-form">
                <input type="email" name="email" placeholder="Email Address" value={credentials.email} onChange={handleChanges}/>
                {errors.email.length > 0 ? <p className="error">{errors.email}</p> : null}
                <input type="password" name="password" placeholder="Create a password" value={credentials.password} onChange={handleChanges}/>
                {errors.password.length > 0 ? <p className="error">{errors.password}</p> : null}
                <div className="buttons">
                <button onClick={(e)=>{
                        e.preventDefault();
                        //push back to home page
                    }}><a href="#">Go Back</a></button>
                    <button disabled={buttonOff} type="submit"><a href="#">Log in</a></button>  
                </div>
            </form>
        </div>
    )
}

export default Login;