import express from "express";
import AuthController from "./controllers/authController.js";

const router = express.Router()

router.post("/api/send-otp", AuthController.sendOtp);
router.post("/api/verify-otp", AuthController.verifyOtp);

export default router;