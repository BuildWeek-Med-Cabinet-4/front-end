import React, {useState, useEffect} from 'react';
import * as yup from 'yup';
import {useHistory} from 'react-router-dom'
import axios from 'axios';

const SignUpForm = () => {
  const {push} = useHistory();
    const initialFormState = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    }
    const [newUserInfo, setNewUserInfo] = useState(initialFormState);
    const [errors, setErrors] = useState(initialFormState);
    const [passwordsDontMatch, setPasswordsDontMatch] = useState(false);
    const [buttonOff, setButtonOff] = useState(true);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");

    const formSchema = yup.object().shape({
        firstName: yup.string().required("Please enter your first name").min(3, "First name be at least 3 characters long"),
        lastName: yup.string().required("Please enter your last name").min(3, 'Last name must be at least 3 characters long '),
        email: yup
          .string()
          .email("Must be a valid email address")
          .required("Please enter an email address"),
        password: yup.string().required("Please create a password").min(3, 'Password must be at least 6 characters long '),
        confirmPassword: yup.string().required("Please confirm your password")
      });

      const confirmPasswordSchema = yup.object().shape({
        confirmPassword: yup.string().required("Please confirm your password")
      });

      const confirmPasswordChanges = e => {
        e.persist();
        e.preventDefault();
        setConfirmPassword(e.target.value);
  
        yup
      .reach(confirmPasswordSchema, e.target.name)
      .validate(e.target.value)
      .then(valid => {
        setConfirmPasswordError("");
      })
      .catch(err => setConfirmPasswordError(err.errors[0] ));
    }

    const handleChanges = e => {
        e.persist();
        e.preventDefault();
        setNewUserInfo({...newUserInfo, [e.target.name]: e.target.value });

        yup
      .reach(formSchema, e.target.name)
      .validate(e.target.value)
      .then(valid => {
        setErrors({ ...errors, [e.target.name]: "" });
      })
      .catch(err => setErrors({ ...errors, [e.target.name]: err.errors[0] }));
    }

    useEffect(() => {
        formSchema.isValid(newUserInfo).then(valid => {
          console.log("valid?", valid);
          setButtonOff(!valid);
        });
      }, [newUserInfo]);

      const createUser = e => {
          e.preventDefault();
          if(newUserInfo.password !== confirmPassword) {
              setPasswordsDontMatch(true);
          } else {
              setPasswordsDontMatch(false);
              // axios post request to add user and push to strainsList page

          }
      }
    
    return (
        <div className="sign-up">
            <form onSubmit={createUser} className="signup-form">
                <input type="text" name="firstName" placeholder="First Name"  value={newUserInfo.firstName} onChange={handleChanges}/>
                {errors.firstName.length > 0 ? <p className="error">{errors.firstName}</p> : null}
                <input type="text" name="lastName" placeholder="Last Name" value={newUserInfo.lastName} onChange={handleChanges}/>
                {errors.lastName.length > 0 ? <p className="error">{errors.lastName}</p> : null}
                <input type="email" name="email" placeholder="Email Address" value={newUserInfo.email} onChange={handleChanges}/>
                {errors.email.length > 0 ? <p className="error">{errors.email}</p> : null}
                <input type="password" name="password" placeholder="Create a password" value={newUserInfo.password} onChange={handleChanges}/>
                {errors.password.length > 0 ? <p className="error">{errors.password}</p> : null}
                <input type="password" name="confirmPassword" placeholder="Re-type your password" value={confirmPassword} onChange={confirmPasswordChanges} />
                {confirmPasswordError.length > 0 ? <p className="error">{confirmPasswordError}</p> : null}
                {passwordsDontMatch ? <p>The passwords you entered do not match</p> : null}
                <div className="buttons">
                    <button onClick={(e)=>{
                        e.preventDefault();
                        //push back to home page
                        push("/")
                    }}>Cancel</button>
                    <button disabled={buttonOff} type="submit">Next</button>
                    
                </div>
            </form>
        </div>
    );
};

export default SignUpForm;