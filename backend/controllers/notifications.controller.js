import { Notification } from "../models/notification.model.js";
import { User } from "../models/user.model.js";

export const GetAllNotifications = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const notifications = await Notification.find({ to: user._id })
      .sort({ createdAt: -1 })
      .populate("from", "-password");

    return res.status(200).json(notifications);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const setNotificationsReaded = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json("User not found");

    await Notification.updateMany({ to: user._id }, { read: true });
    return res
      .status(200)
      .json({ message: "Notifications set to readed successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteAll = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json("User not found");

    await Notification.deleteMany({ to: user._id });
    return res
      .status(200)
      .json({ message: "Notifications deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
