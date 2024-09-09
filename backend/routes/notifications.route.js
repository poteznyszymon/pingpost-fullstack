import express from "express";
import {
  GetAllNotifications,
  setNotificationsReaded,
  deleteAll,
} from "../controllers/notifications.controller.js";
import { verifyAuth } from "../middleware/verifyAuth.js";

const router = express.Router();

router.get("/", verifyAuth, GetAllNotifications);
router.post("/", verifyAuth, setNotificationsReaded);
router.delete("/", verifyAuth, deleteAll);

export default router;
