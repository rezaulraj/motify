import { Router } from "express";
import songController from "../controllers/songController.js";
import { protactRoute, requireAdmin } from "../middleware/authMiddleware.js";
const { getALlSongs, getFeaturedSongs, getMadeForYouSongs, getTrandingSongs } =
  songController;
const router = Router();

router.get("/", protactRoute, requireAdmin, getALlSongs);
router.get("/featured", getFeaturedSongs);
router.get("/made-for-you", getMadeForYouSongs);
router.get("/tranding", getTrandingSongs);
export default router;
