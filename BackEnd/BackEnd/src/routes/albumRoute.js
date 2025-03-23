import { Router } from "express";
import albumController from "../controllers/albumController.js";

const { getAllAlbums, getAlbumById } = albumController;
const router = Router();

router.get("/", getAllAlbums);
router.get("/:albumId", getAlbumById);
export default router;
