import express from 'express';
import { createTrainClass, deleteATrainClass, getATrainClass, getAllTrainClasses, updateATrainClass } from '../controller/trainClassController.js';
import { authMiddleware, isAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post("/", authMiddleware, isAdmin, createTrainClass);
router.put("/:id", authMiddleware, isAdmin, updateATrainClass);
router.get("/:id", getATrainClass);
router.get("/", getAllTrainClasses);
router.delete("/:id", authMiddleware, isAdmin, deleteATrainClass);

export default router;