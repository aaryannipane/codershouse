import React, {useState} from "react";
import styles from "./Register.module.css";
import StepPhoneEmail from "../Steps/StepPhoneEmail/StepPhoneEmail";
import StepOtp from "../Steps/StepOtp/StepOtp";
import StepName from "../Steps/StepName/StepName";
import StepAvatar from "../Steps/StepAvatar/StepAvatar";
import StepUsername from "../Steps/StepUsername/StepUsername";

// hash map for steps in register page
const steps = {
    1:StepPhoneEmail,
    2:StepOtp,
    3:StepName,
    4:StepAvatar,
    5:StepUsername
}



const Register = ()=>{

    // default step state
    const [step, setSteps] = useState(1);

    const onNext = ()=>{
        setSteps(step+1);
    }

    // getting component name from hash map or map :}
    const Step = steps[step];
 
    return (
        <div>
            <Step onNext={onNext} />
        </div>
    )
}

export default Register;