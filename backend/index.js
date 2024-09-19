import express from "express";
import dotenv from "dotenv";
import { v2 } from "cloudinary";
import path from "path";

import authRoutes from "./routes/auth.route.js";
import usersRoute from "./routes/users.route.js";
import postsRoute from "./routes/posts.route.js";
import hashtagRoute from "./routes/hashtag.route.js";
import notificationsRoute from "./routes/notifications.route.js";
import commentsRoute from "./routes/comments.route.js";

import { connectDatabse } from "./db/connectDatabse.js";

import cookieParser from "cookie-parser";

dotenv.config();
v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoute);
app.use("/api/posts", postsRoute);
app.use("/api/hashtags", hashtagRoute);
app.use("/api/notifications", notificationsRoute);
app.use("/api/comments", commentsRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log("server running on port:", PORT);
  connectDatabse();
});
