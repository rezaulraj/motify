import { Router } from "express";
import authController from "../controllers/authController.js";

const router = Router();

router.post("/callback", authController.userAuth);
export default router;
