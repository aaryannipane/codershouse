import React, { useReducer } from "react";
import { Navigate } from "react-router";

const SemiProtectedRoute = ({isAuth, activated, Component})=>{


    // when user is not confirmed otp
    if(!isAuth){
        return <Navigate to="/" />
    }

    // when user confirmed otp but not activated account info like name and avatar
    if(isAuth && !activated){
        console.log("not activated");
        return <Component />
    }

    // when user is confirmed otp and setup the profile
    return (
        <Navigate to="/rooms" />
    )
}

export default SemiProtectedRoute;