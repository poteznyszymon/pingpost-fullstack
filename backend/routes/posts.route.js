import express from "express";
import {
  createPost,
  getAllPosts,
  deletePost,
  getFollowingPosts,
  addPostToBookmarks,
  deletePostFromBookmarks,
  likePost,
  unlikePost,
} from "../controllers/posts.controller.js";
import { verifyAuth } from "../middleware/verifyAuth.js";

const router = express.Router();

router.post("/create-post", verifyAuth, createPost);
router.get("/get-all", verifyAuth, getAllPosts);
router.get("/get/following", verifyAuth, getFollowingPosts);
router.post("/add-to-bookmarks/:id", verifyAuth, addPostToBookmarks);
router.post("/like/:id", verifyAuth, likePost);
router.post("/unlike/:id", verifyAuth, unlikePost);

router.post("/delete-from-bookmarks/:id", verifyAuth, deletePostFromBookmarks);

router.delete("/delete/:id", verifyAuth, deletePost);

export default router;
