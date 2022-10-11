import React from "react";
import { useState } from "react";
import Button from "../../../../components/shared/Button/Button";
import Card from "../../../../components/shared/Card/Card";
import TextInput from "../../../../components/shared/TextInput/TextInput";
import { sendOtp } from "../../../../http";
import styles from "../StepPhoneEmail.module.css";
import { useDispatch } from "react-redux";
import { setOtp } from "../../../../store/authSlice";

const Phone = ({ onNext }) => {
  const [phoneNumber, setPhoneNumber] = useState("+91");
  const dispatch = useDispatch();

  async function submit() {
    if (
      !phoneNumber ||
      !phoneNumber.startsWith("+91") ||
      isNaN(phoneNumber) ||
      phoneNumber.length !== 13
    ) {
      alert("Enter 10 digit phone number starting with +91 country code");
      console.log("Enter 10 digit phone number starting with +91 country code");
      return;
    }

    // server request
    const { data } = await sendOtp({ phone: phoneNumber });

    console.log(data);

    dispatch(setOtp({ phone: data.phone, hash: data.hash }));

    onNext();
  }

  return (
    <Card title="Enter your phone number" icon="phone">
      <TextInput
        value={phoneNumber}
        onChange={(e) => {
          setPhoneNumber(e.target.value);
        }}
      />
      <div>
        <div className={styles.actionButtonWrap}>
          <Button text="Next" onClick={submit} />
        </div>
        <p className={styles.bottomParagraph}>
          By entering your number, you're agreeing to our Terms of Service and
          Privacy Policy. Thanks!
        </p>
      </div>
    </Card>
  );
};

export default Phone;
