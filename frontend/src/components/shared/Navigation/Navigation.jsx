import React from "react";
import { Link } from 'react-router-dom';
// it is used to use module class in this file
import styles from './Navigation.module.css';
 
const Navigation = ()=>{

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

    return (
        <nav className={`${styles.navbar} container`}>
            {/* Link tag is used to create a link that will not refresh the page on clicking the link*/}
            {/* we can't use module css style on Link element so we use inline style for element */}
            <Link to="/" style={brandStyle}>
                <img src="/images/logo.png" alt="logo" />
                <span style={logoText}>codershouse</span>
            </Link>
        </nav>
    );
}


export default Navigation;