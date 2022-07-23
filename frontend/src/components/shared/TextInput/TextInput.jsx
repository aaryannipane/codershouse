import React from "react";
import styles from "./TextInput.module.css";

const TextInput = (props)=>{
    return (
        <input className={styles.input} type="text" {...props} />
    )
}

export default TextInput;