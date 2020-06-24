import React from 'react';
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({component: Component, ...rest}) => {
    console.log('heyeey ', localStorage.getItem("token"))
    return (
        <Route {...rest} render={props => {
            if(localStorage.getItem("token")) {
                console.log("if statement came back true")
                return <Component {...props} />;
            } else {
                return <Redirect to="/identify" />;
            }
        }} />
    )
}

export default PrivateRoute;