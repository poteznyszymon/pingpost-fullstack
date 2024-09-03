import express from "express";
import { verifyAuth } from "../middleware/verifyAuth.js";
import {
  getSuggested,
  followUser,
  unfollowUser,
} from "../controllers/users.controller.js";

const router = express.Router();

router.get("/get-suggested", verifyAuth, getSuggested);
router.post("/follow/:id", verifyAuth, followUser);
router.post("/unfollow/:id", verifyAuth, unfollowUser);

export default router;
