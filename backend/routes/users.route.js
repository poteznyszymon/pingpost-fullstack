import express from "express";
import { verifyAuth } from "../middleware/verifyAuth.js";
import {
  getSuggested,
  followUser,
  unfollowUser,
  getUser,
  editUser,
  searchAll,
} from "../controllers/users.controller.js";

const router = express.Router();

router.get("/search/:text", verifyAuth, searchAll);
router.get("/get-suggested", verifyAuth, getSuggested);
router.post("/follow/:id", verifyAuth, followUser);
router.post("/unfollow/:id", verifyAuth, unfollowUser);
router.post("/edit", verifyAuth, editUser);
router.get("/:username", verifyAuth, getUser);

export default router;
