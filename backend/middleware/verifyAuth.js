import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyAuth = async (req, res, next) => {
  const authToken = req.cookies.authToken;
  try {
    if (!authToken)
      return res.status(401).json({ error: "Unauthorized: No token provided" });

    const validToken = jwt.verify(authToken, process.env.JWT_SECRET);
    if (!validToken)
      return res.status(401).json({ error: "Unauthorized: Invalid token" });

    const user = await User.findById(validToken.userId).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });

    req.user = user;
    next();
  } catch (error) {
    console.log("Error in protectedRoute middleware: ", error.message);
    return res.status(500).json({ error: "Internal server error" });
  }
};
