import { Router } from "express";
import { protactRoute, requireAdmin } from "../middleware/authMiddleware.js";
import statisticsController from "../controllers/statisticsController.js";
const {getStats} = statisticsController;
const router = Router();

router.get("/", protactRoute, requireAdmin, getStats);
export default router;
