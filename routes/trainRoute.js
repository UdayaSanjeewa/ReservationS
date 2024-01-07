import express from 'express';
import {authMiddleware, isAdmin} from '../middlewares/authMiddleware.js';
import { createTrain, deleteATrain, getATrain, getAllTrains, getAllTrainsList, searchTrains, updateATrain } from '../controller/trainController.js';

const router = express.Router();
router.get("/alltrains", getAllTrainsList);

router.post("/", authMiddleware, isAdmin, createTrain);
router.put("/:id", authMiddleware, isAdmin, updateATrain);
router.get("/search-train", searchTrains);
router.get("/:id", getATrain);
router.get("/", authMiddleware, isAdmin, getAllTrains);
router.delete("/:id", authMiddleware, isAdmin, deleteATrain);

export default router;