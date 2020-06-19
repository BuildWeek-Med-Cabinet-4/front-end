import React, {useState, useEffect} from 'react';
import * as yup from 'yup';

const SignUpForm = () => {
    const initialFormState = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    }
    const [newUserInfo, SetNewUserInfo] = useState(initialFormState);
    const [errors, setErrors] = useState(initialFormState);
    const [passwordsDontMatch, setPasswordsDontMatch] = useState(false);
    const [buttonOff, setButtonOff] = useState(true);

    const formSchema = yup.object().shape({
        firstName: yup.string().required("Please enter your first name"),
        lastName: yup.string().required("Please enter your last name"),
        email: yup
          .string()
          .email("Must be a valid email address")
          .required("Please enter an email address"),
        password: yup.string().required("Please create a password"),
        confirmPassword: yup.string().required("Please confirm your password")
      });

    const handleChanges = e => {
        e.persist();
        e.preventDefault();
        SetNewUserInfo({...newUserInfo, [e.target.name]: e.target.value });

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
          if(newUserInfo.password !== newUserInfo.confirmPassword) {
              setPasswordsDontMatch(true);
          } else {
              setPasswordsDontMatch(false);
              // axios post request to add user and push to strainsList page
          }
      }
    
    return (
        <div className="sign-up">
            <h2>Welcome, enter your information below to create an account</h2>
            <form onSubmit={createUser} className="signup-form">
                <input type="text" name="firstName" placeholder="First Name"  value={newUserInfo.firstName} onChange={handleChanges}/>
                {errors.firstName.length > 0 ? <p className="error">{errors.firstName}</p> : null}
                <input type="text" name="lastName" placeholder="Last Name" value={newUserInfo.lastName} onChange={handleChanges}/>
                {errors.lastName.length > 0 ? <p className="error">{errors.lastName}</p> : null}
                <input type="email" name="email" placeholder="Email Address" value={newUserInfo.email} onChange={handleChanges}/>
                {errors.email.length > 0 ? <p className="error">{errors.email}</p> : null}
                <input type="password" name="password" placeholder="Create a password" value={newUserInfo.password} onChange={handleChanges}/>
                {errors.password.length > 0 ? <p className="error">{errors.password}</p> : null}
                <input type="password" name="confirmPassword" placeholder="Re-type your password" value={newUserInfo.confirmPassword} onChange={handleChanges} />
                {errors.confirmPassword.length > 0 ? <p className="error">{errors.confirmPassword}</p> : null}
                {passwordsDontMatch ? <p>The passwords you entered do not match</p> : null}
                <div className="buttons">
                    <button>Cancel</button>
                    <button disabled={buttonOff} type="submit">Next</button>  
                </div>
            </form>
            <div>
                <p>Already have an account? 
                    <span><a href="#"> Log in</a></span>
                </p>
            </div>
        </div>
    );
};

export default SignUpForm;