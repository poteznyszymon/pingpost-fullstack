import express from "express";
import { createPost } from "../controllers/posts.controller.js";
import { verifyAuth } from "../middleware/verifyAuth.js";

const router = express.Router();

router.post("/create-post", verifyAuth, createPost);

export default router;
