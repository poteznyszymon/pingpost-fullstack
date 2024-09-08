import { Notification } from "../models/notification.model.js";
import { User } from "../models/user.model.js";

export const GetAllNotifications = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const notifications = await Notification.find({ to: user._id }).populate(
      "from",
      "-password"
    );

    return res.status(200).json(notifications);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
