import React from "react";
import Card from "../../../components/shared/Card/Card";
import TextInput from "../../../components/shared/TextInput/TextInput";
import Button from "../../../components/shared/Button/Button"; 
import styles from "./StepName.module.css";
import { useState } from "react";
import {useDispatch} from "react-redux";
import { setName } from "../../../store/activateSlice";
import { useSelector } from "react-redux";

const StepName = ({onNext})=>{

    const dispatch = useDispatch();
    const {name} = useSelector((state)=> state.activate);
    const [fullname, setFullname] = useState(name);

    function nextStep(){
        if(!fullname){
            return;
        }
        dispatch(setName(fullname));

        onNext();
    }

    return (
        <>
            <Card title="What's your full name?" icon="goggle-emoji">
                <TextInput value={fullname} onChange={(e)=> setFullname(e.target.value)} />
                <p className={styles.paragraph}>
                    People use real names at codershouse :) ! 
                </p>
                <div>
                    <div className={styles.actionButtonWrap}>
                        <Button text="Next" onClick={nextStep} />
                    </div>
                </div>
            </Card>
        </>    
    )
}

export default StepName; 