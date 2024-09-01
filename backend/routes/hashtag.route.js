import express from "express";
import { trendingHashtag } from "../controllers/hashtag.controller.js";
import { verifyAuth } from "../middleware/verifyAuth.js";

const router = express.Router();

router.get("/trending", verifyAuth, trendingHashtag);

export default router;
