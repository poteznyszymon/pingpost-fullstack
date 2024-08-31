import express from "express";
import {
  registerUser,
  logoutUser,
  loginUser,
  getMe,
} from "../controllers/auth.controller.js";
import { verifyAuth } from "../middleware/verifyAuth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/get-me", verifyAuth, getMe);

export default router;
