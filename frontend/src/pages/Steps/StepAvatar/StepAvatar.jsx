import React from "react";
import Card from "../../../components/shared/Card/Card";
import Button from "../../../components/shared/Button/Button";
import styles from "./StepAvatar.module.css";
import {useSelector} from "react-redux";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {setAvatar} from "../../../store/activateSlice";
import { setAuth } from "../../../store/authSlice";
import { activate } from "../../../http";
import { Loader } from "../../../components/shared/Loader/Loader";
import { useEffect } from "react";

const StepAvatar = ({onNext})=>{
    
    const dispatch = useDispatch();
    const {name, avatar} = useSelector((state)=> state.activate);
    const [image, setImage] = useState('/images/monkey-avatar.png');
    const [loading, setLoading] = useState(false);
    const [unMounted, setUnMounted] = useState(false);


    function captureImage(e){
        const file = e.target.files[0];
        console.log(file)
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function (){
            setImage(reader.result);
            dispatch(setAvatar(reader.result));
        }
    }

    const submit = async ()=>{
        setLoading(true);
        try {
            const {data} = await activate({name, avatar});
            if(data.auth){
                // check component is mounted or not
                if(!unMounted){
                    dispatch(setAuth(data));
                }
            }
        } catch (error) {
            console.log(error)
        } finally {
            // always run this block
            setLoading(false);
        }
    }

    useEffect(()=>{
        // clean up function for removing event listeners
        return ()=>{
            // this function runs when the component is unmounted
            setUnMounted(true);
        }
    }, [])
    

    if(loading) return <Loader message="Activation in progress..." />; 

    return (
        <>
            <Card title={`Okay, ${name}!`} icon="monkey-emoji">
                <p className={styles.subHeading}>How's this photo?</p>
                <div className={styles.avatarWrapper}>
                    <img src={image} className={styles.avatarImage} alt="avatar" />
                </div>
                <div>
                    <label htmlFor="avatarInput" className={styles.avatarLabel}>Choose a different photo</label>
                    <input id="avatarInput" type="file" onChange={(e)=>{captureImage(e)}} className={styles.avatarInput} accept="image/*" hidden />
                </div>
                <div>
                    <Button text="Next" onClick={submit} />
                </div>
            </Card>
        </>
    )
}

export default StepAvatar; 