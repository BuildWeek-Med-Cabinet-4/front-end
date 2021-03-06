import React, {useState, useEffect, useContext} from 'react';
import * as yup from 'yup';
import {useHistory} from 'react-router-dom';
import {appContext} from '../contexts/appContext';
import axios from 'axios';



const Login = () => {
  

  const {push} = useHistory();
  const setCurrentUser = useContext(appContext).setCurrentUser;

    const initialFormState = {
        email: "",
        password: ""
    }

    const [credentials, setCredentials] = useState(initialFormState);
    const [errors, setErrors] = useState(initialFormState);
    const [buttonOff, setButtonOff] = useState(true);
    const setIsLoggedIn = useContext(appContext).setIsLoggedIn;
    const [isLoading, setIsLoading] = useState(false); 
 

    const formSchema = yup.object().shape({
        email: yup
          .string()
          .email("Must be a valid email address")
          .required("Please enter an email address"),
        password: yup.string().required("Please enter your password").min(6, "must be at least 6 characters long"),
        
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
          console.log("user info to login", credentials)
          setIsLoading(true);
        //axios post request and push to strainsList
        axios
                .post("https://best-med-cabinet.herokuapp.com/api/auth/login", credentials )
                .then(res=>{
                  console.log("login res", res)
                  setIsLoggedIn(true);
                  setCurrentUser(res.data.logged_user)
                  localStorage.setItem("Logged in", true)
                  localStorage.setItem("Current user", res.data.logged_user.id)
                  localStorage.setItem("token", res.data.token)
                  push("/");
                  setIsLoading(false)
                })
                .catch(err=>{
                  console.log(err)
                  setIsLoading(false);
                });
      }

    return (
        <div className="login">
            <form className="login-form" onSubmit={logUserIn} onKeyPress={(e)=>{
              
                if (e.key === "Enter" || e.key === "NumpadEnter") {
                  e.preventDefault();
                  console.log("Enter key was pressed. Run your function.");
                  logUserIn(e);
                }
            }}>
                <input type="email" name="email" placeholder="Email Address" value={credentials.email} onChange={handleChanges}/>
                {errors.email.length > 0 ? <p className="error">{errors.email}</p> : null}
                <input type="password" name="password" placeholder="Password" value={credentials.password} onChange={handleChanges}/>
                {errors.password.length > 0 ? <p className="error">{errors.password}</p> : null}
                <div className="buttons">
                <button onClick={(e)=>{
                        e.preventDefault();
                        //push back to home page
                        push("/")
                    }}>Go Back</button>
                    <button disabled={buttonOff} type="submit">Log in</button>
                    {isLoading ? <p>One moment...</p> : null}  
                </div>
            </form>
        </div>
    )
}

export default Login;