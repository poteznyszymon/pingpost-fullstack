import express from "express";
import { verifyAuth } from "../middleware/verifyAuth.js";
import { getSuggested } from "../controllers/users.controller.js";

const router = express.Router();

router.get("/get-suggested", verifyAuth, getSuggested);

export default router;
