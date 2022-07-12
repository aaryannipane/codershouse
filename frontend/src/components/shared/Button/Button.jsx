import React from "react";
import styles from "./Button.module.css";

const Button = ({text, onClick})=>{
    return (
        <button onClick={onClick} className={styles.button}>
            <span>{text}</span>
            <img src="/images/arrow-forward.png" alt="arrow-forward" className={styles.arrow} />
        </button>
    )
}

export default Button;