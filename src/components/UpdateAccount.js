import React, {useState, useEffect, useContext} from 'react';
import * as yup from 'yup';
import {useHistory} from 'react-router-dom';
import axiosWithAuth from '../utils/axiosWithAuth';
import {appContext} from "../contexts/appContext"

const UpdateAccount = ({setEditing, setUser}) => {
    const currentUser = useContext(appContext).currentUser
    const setCurrentUser = useContext(appContext).setCurrentUser
    const [newInfo, setNewInfo] = useState({
        email: currentUser.email,
        firstName: currentUser.firstName,
        lastName: currentUser.lastName
    });
    const [buttonOff, setButtonOff] = useState(true);
    const {push} = useHistory();
    const [errors, setErrors] = useState({
        email: "",
        firstName: "", 
        lastName: ""

    });

    

    const formSchema = yup.object().shape({
        firstName: yup.string().required("Please enter your first name").min(3, "First name be at least 3 characters long"),
        lastName: yup.string().required("Please enter your last name").min(3, 'Last name must be at least 3 characters long '),
        email: yup
          .string()
          .email("Must be a valid email address")
          .required("Please enter an email address")
        
      });

      const handleChanges = e => {
        e.persist();
        e.preventDefault();
        setNewInfo({...newInfo, [e.target.name]: e.target.value });

        yup
      .reach(formSchema, e.target.name)
      .validate(e.target.value)
      .then(valid => {
        setErrors({ ...errors, [e.target.name]: "" });
      })
      .catch(err => setErrors({ ...errors, [e.target.name]: err.errors[0] }));
    }

    useEffect(() => {
        formSchema.isValid(newInfo).then(valid => {
          console.log("valid?", valid);
          setButtonOff(!valid);
        });
      }, [newInfo]);

    const updateInfo = e => {
        e.preventDefault();
        axiosWithAuth()
            .put(`/users/${currentUser.id}`, newInfo)
            .then(res => {
                console.log("update res", res)
                axiosWithAuth()
                    .get(`/users/${currentUser.id}`)
                    .then(res=>{
                    
                    setCurrentUser(res.data); 
                    setUser(res.data)                 
                    })
                    .catch(err=>console.log(err))
            })
            .catch(err=>console.log(err))
            setEditing(false);
            push(`/myaccount/${currentUser.id}`);
    }
    return (
        <div >
            <form  onSubmit={updateInfo} onKeyPress={(e)=>{
              
                if (e.key === "Enter" || e.key === "NumpadEnter") {
                  e.preventDefault();
                  console.log("Enter key was pressed. Run your function.");
                  updateInfo(e);
                }
            }}>
                <input type="text" name="firstName" placeholder="First Name" value={newInfo.firstName} onChange={handleChanges}/>
                {errors.firstName.length > 0 ? <p className="error">{errors.firstName}</p> : null}
                <input type="text" name="lastName" placeholder="Last Name" value={newInfo.lastName} onChange={handleChanges}/>
                {errors.lastName.length > 0 ? <p className="error">{errors.lastName}</p> : null}
                <input type="email" name="email" placeholder="Email Address" value={newInfo.email} onChange={handleChanges}/>
                {errors.email.length > 0 ? <p className="error">{errors.email}</p> : null}
                <div className="buttons">
                <button onClick={(e)=>{
                        e.preventDefault();
                        push(`/myaccount/${currentUser.id}`)
                        setEditing(false);
                    }}>Cancel</button>
                    <button disabled={buttonOff} type="submit">Update</button>
                </div>
            </form>
        </div>
    )
}

export default UpdateAccount;