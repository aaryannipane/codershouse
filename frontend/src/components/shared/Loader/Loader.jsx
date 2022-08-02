import React from 'react'
import Card from '../Card/Card'
import styles from "./Loader.module.css";

export const Loader = ({message}) => {
  return (
    <div className='cardWrapper'>
        <Card title="" icon="">
           <span className={styles.message}>{message}</span>         
        </Card>
    </div>  
  )
}
