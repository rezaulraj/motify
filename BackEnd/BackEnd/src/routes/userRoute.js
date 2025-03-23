import { Router } from "express";
import { protactRoute } from "../middleware/authMiddleware.js";
import userController from "../controllers/userController.js";
const { getAllUsers } = userController;
const router = Router();

router.get("/", protactRoute, getAllUsers);
//todo : getMessage

export default router;
