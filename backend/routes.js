import express from "express";
import AuthController from "./controllers/authController.js";
import ActivateController from "./controllers/activateController.js";
import authMiddleware from "./middlewares/authMiddleware.js";

const router = express.Router()

router.post("/api/send-otp", AuthController.sendOtp);
router.post("/api/verify-otp", AuthController.verifyOtp);
router.post("/api/activate", authMiddleware, ActivateController.activate);
router.get("/api/refresh", AuthController.refresh);
router.get("/api/solving", AuthController.solving);

export default router;