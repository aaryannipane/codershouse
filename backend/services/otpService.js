import crypto from "crypto";
import twilio from "twilio";
import dotenv from "dotenv";
import HashService from "./hashService.js";
dotenv.config();

const smsSid = process.env.SMS_SID;
const smsAuthToken = process.env.SMS_AUTH_TOKEN;
// const tw = require("twilio")(smsSid, smsAuthToken)
const tw = twilio(smsSid, smsAuthToken);

class OtpService {
  static generateOtp = async () => {
    const otp = crypto.randomInt(1000, 9999);
    return otp;
  };

  static sendBySms = async (phone, otp) => {
    return await tw.messages.create({
      to: phone,
      from: process.env.SMS_FROM_NUMBER,
      body: `Your codershouse OTP is ${otp}`,
    });
  };

  static verifyOtp = async (hashedOtp, data) => {
    const computedHashed = HashService.hashOtp(data);

    return computedHashed === hashedOtp;
  };
}

export default OtpService;
