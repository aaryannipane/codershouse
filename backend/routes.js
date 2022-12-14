import express from "express";
import AuthController from "./controllers/authController.js";
import ActivateController from "./controllers/activateController.js";
import authMiddleware from "./middlewares/authMiddleware.js";
import RoomController from "./controllers/roomController.js";

const router = express.Router();

router.post("/api/send-otp", AuthController.sendOtp);
router.post("/api/verify-otp", AuthController.verifyOtp);
router.post("/api/activate", authMiddleware, ActivateController.activate);
router.get("/api/refresh", AuthController.refresh);
router.post("/api/logout", authMiddleware, AuthController.logout);

router.post("/api/rooms", authMiddleware, RoomController.create);
router.get("/api/rooms", authMiddleware, RoomController.index);
router.get("/api/rooms/:roomId", authMiddleware, RoomController.show);

export default router;
