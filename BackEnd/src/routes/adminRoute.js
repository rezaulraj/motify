import { Router } from "express";
import { protactRoute, requireAdmin } from "../middleware/authMiddleware.js";
import adminCreate from "../controllers/adminController.js";
const { createSong, deleteSong, createAlbum, deleteAlbum, checkAdmin } =
  adminCreate;

const router = Router();

// use middleware to shorty handand
router.use(protactRoute, requireAdmin);

router.get("/check", checkAdmin);

// song api
router.post("/songs", createSong);
router.delete("/songs/:id", deleteSong);
// album api
router.post("/albums", createAlbum);
router.delete("/albums/:id", deleteAlbum);

export default router;
