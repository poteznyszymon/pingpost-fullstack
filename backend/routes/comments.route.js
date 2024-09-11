import express from "express";
import { verifyAuth } from "../middleware/verifyAuth.js";
import {
  deleteComment,
  createComment,
} from "../controllers/comments.controller.js";

const router = express.Router();

router.post("/create/:postId", verifyAuth, createComment);
router.delete("/:postId/:commentId", verifyAuth, deleteComment);

export default router;
