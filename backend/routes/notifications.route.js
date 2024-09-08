import express from "express";
import { GetAllNotifications, setNotificationsReaded } from "../controllers/notifications.controller.js";
import { verifyAuth } from "../middleware/verifyAuth.js";

const router = express.Router();

router.get("/", verifyAuth, GetAllNotifications);
router.post("/:userId", verifyAuth, setNotificationsReaded)

export default router;
