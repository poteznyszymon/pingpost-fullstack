import express from "express";
import {
  createPost,
  getAllPosts,
  deletePost,
  getFollowingPosts,
} from "../controllers/posts.controller.js";
import { verifyAuth } from "../middleware/verifyAuth.js";

const router = express.Router();

router.post("/create-post", verifyAuth, createPost);
router.get("/get-all", verifyAuth, getAllPosts);
router.get("/get/following", verifyAuth, getFollowingPosts);
router.delete("/delete/:id", verifyAuth, deletePost);

export default router;
