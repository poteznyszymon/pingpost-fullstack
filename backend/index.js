import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.route.js";
import usersRoute from "./routes/users.route.js";
import { connectDatabse } from "./db/connectDatabse.js";

import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoute);

app.listen(PORT, () => {
  console.log("server running on port:", PORT);
  connectDatabse();
});
