import express from "express";
import {
  createUser,
  deleteaUser,
  forgotPasswordToken,
  getATrainReservation,
  getAllTrainReservations,
  getAllUsers,
  getaUser,
  handleRefreshToken,
  loginAdmin,
  loginUserCtrl,
  logout,
  resetPassword,
  updatePassword,
  updateAUser,
  blockAUser,
  unblockAUser,
} from "../controller/userController.js";
import { authMiddleware, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

//
router.post("/register", createUser);
router.post("/login", loginUserCtrl);
router.post("/forgot-password-token", forgotPasswordToken);
router.put("/reset-password/:token", resetPassword);
router.post("/admin-login", loginAdmin);
//

//
router.delete("/:id", authMiddleware, isAdmin, deleteaUser);
//

//
router.get("/refresh", authMiddleware, handleRefreshToken);
router.get("/logout", logout);
router.get("/all-users", authMiddleware, isAdmin, getAllUsers);
router.get(
  "/get-all-reservations",
  getAllTrainReservations
);
router.get("/:id", authMiddleware, getaUser);
router.get("/get-reservation/:id", authMiddleware, getATrainReservation);
//

//
// router.put("/:id", updateaUser);
router.put("/update-user", authMiddleware, updateAUser);
router.put("/block-user/:id", authMiddleware, isAdmin, blockAUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockAUser);
router.put("/reset-password", authMiddleware, updatePassword);
//

export default router;
