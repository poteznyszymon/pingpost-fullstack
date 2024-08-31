import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";

export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password)
      return res.status(400).json({ error: "All fields are required" });

    const usernameExists = await User.findOne({ username });
    const emailExits = await User.findOne({ email });

    if (usernameExists)
      return res.status(400).json({ error: "Username already taken" });
    if (emailExits)
      return res.status(400).json({ error: "Email already taken" });

    if (password.length < 6)
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters long" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      generateTokenAndSetCookie(res, newUser._id);
      await newUser.save();
      res
        .status(201)
        .json({ success: "True", message: "User created successfullly" });
    } else {
      return res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in register controller", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    generateTokenAndSetCookie(res, user._id);
    res.status(200).json({ message: "User logged in successfullly" });
  } catch (error) {}
};

export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("authToken");
    res.status(200).json({ message: "User logout successfullly" });
  } catch (error) {
    console.log("Error in logout controller", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getMe = async (req, res) => {
  const userId = req.user._id;
  try {
    const user = await User.findById(userId).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.status(200).json(user);
  } catch (error) {
    console.log("error in getme controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
