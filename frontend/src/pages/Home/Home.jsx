import React from "react";
import styles from "./Home.module.css";
import {Link, useNavigate} from "react-router-dom"
import Card from "../../components/shared/Card/Card";
import Button from "../../components/shared/Button/Button";



const Home = ()=>{

    const signInStyle = {
        color:"#0077ff",
        fontWeight:"bold",
        textDecoration:"none",
        marginLeft:"10px"
    }

    // navigate hook from react router dom use for page redirect 
    const navigate = useNavigate();
    const startRegister = ()=>{
        // navigate page to register page
        navigate("/register");
    }

    return (
        <div className={styles.cardWrapper}>

            <Card title="Welcome to Codershouse!" icon="logo">
                {/* below elementts is passed as children props in a component */}
                <p className={styles.text}>
                    We're working hard to get Codershouse ready for everyone! While
                    we wrap up the finishing youches, we're adding people gradually
                    to make sure nothing breaks
                </p>
                <div>
                    {/* we are passing onClick as a prop cause Button here used is component */}
                    <Button onClick={startRegister} text="Get your username" />
                </div>
                <div className={styles.signinWrapper}>
                    <span className={styles.hasInvite}>Have an invite text?</span>
                    <Link to="/login" style={signInStyle}>Sign in</Link>
                </div>
            </Card>
            
        </div>
    )
};


export default Home;