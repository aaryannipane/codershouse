import React from "react";
import { Link } from 'react-router-dom';
import { logout } from "../../../http";
// it is used to use module class in this file
import styles from './Navigation.module.css';
import {useDispatch, useSelector} from "react-redux"
import {setAuth} from "../../../store/authSlice.js";
 
const Navigation = ()=>{

    const dispatch = useDispatch();
    const {isAuth} = useSelector(state => state.auth);

    // this object is used for inline css 
    const brandStyle = {
        color:"#fff",
        textDecoration:"none",
        fontWeight:"bold",
        fontSize:"22px",
        display:"flex",
        alignItems:"center",
    }

    const logoText = {
        marginLeft:"10px",
    }

    async function logoutUser(){
        try{
            const {data} = await logout();
            dispatch(setAuth(data));
        } catch (err) {
            console.log(err);
        }

    }

    return (
        <nav className={`${styles.navbar} container`}>
            {/* Link tag is used to create a link that will not refresh the page on clicking the link*/}
            {/* we can't use module css style on Link element so we use inline style for element */}
            <Link to="/" style={brandStyle}>
                <img src="/images/logo.png" alt="logo" />
                <span style={logoText}>codershouse</span>
            </Link>
            {isAuth && <button onClick={logoutUser}>Logout</button>}
        </nav>
    );
}


export default Navigation;