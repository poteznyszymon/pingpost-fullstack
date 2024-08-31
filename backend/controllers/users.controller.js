import { User } from "../models/user.model.js";

export const getSuggested = async (req, res) => {
  const userId = req.user._id;
  try {
    const currentUser = await User.findById(userId);
    if (!currentUser) return res.status(404).json({ error: "User not found" });

    const suggestedUsers = await User.find({
      _id: { $nin: currentUser.following, $ne: userId },
    })
      .limit(3)
      .select("username displayName profileImg");

    return res.status(200).json(suggestedUsers);
  } catch (error) {
    console.log("Error in get suggested controller: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
