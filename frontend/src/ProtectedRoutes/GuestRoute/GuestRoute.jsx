import React from "react";
import { Navigate } from "react-router";

const GuestRoute = ({isAuth, Component})=>{
    
    if(isAuth){
        return <Navigate to="/rooms" />
    }

    return (
        <Component />
    )
}

export default GuestRoute;