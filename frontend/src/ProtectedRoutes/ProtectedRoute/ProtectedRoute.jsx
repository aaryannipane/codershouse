import React from "react";
import { Navigate } from "react-router";

const ProtectedRoute = ({isAuth, Component, activated})=>{

    if(!isAuth){
        return <Navigate to="/" />
    }

    if(isAuth && !activated){
        return <Navigate to="/activate" />;
    }

    return (
        <Component/>
    )
}

export default ProtectedRoute;