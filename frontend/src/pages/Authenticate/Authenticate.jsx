import React, {useState} from "react";
// import styles from "./Authenticate.module.css";
import StepPhoneEmail from "../Steps/StepPhoneEmail/StepPhoneEmail";
import StepOtp from "../Steps/StepOtp/StepOtp";

// we also have steps in Authenticate 
const steps = {
    1:StepPhoneEmail,
    2:StepOtp,
}


const Authenticate = ()=>{

    // default step state
    const [step, setSteps] = useState(1);

    const onNext = ()=>{
        setSteps(step+1);
    }

    // getting component name from hash map or map :}
    const Step = steps[step];

    return (
        <>
            <Step onNext={onNext} />  
        </>
    )
}

export default Authenticate;