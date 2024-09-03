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

export const followUser = async (req, res) => {
  const userToFollowId = req.params.id;
  const userId = req.user._id;

  const userToFollow = await User.findById(userToFollowId);
  const user = await User.findById(userId);

  if (!user || !userToFollow)
    return res.status(404).json({ error: "User not found" });

  if (userToFollowId.toString() === userId.toString()) {
    return res.status(400).json({ error: "You can't follow yourself" });
  }

  await User.findOneAndUpdate(
    { _id: userToFollow },
    { $push: { followers: userId } }
  );

  await User.findOneAndUpdate(
    { _id: userId },
    { $push: { following: userToFollowId } }
  );

  res.status(200).json({ message: "User followed successfully" });
  try {
  } catch (error) {
    console.log("Error in followUser controller: ", error);
    res.staus(500).json({ error: "Internal server error" });
  }
};

export const unfollowUser = async (req, res) => {
  const userToFollowId = req.params.id;
  const userId = req.user._id;

  const userToFollow = await User.findById(userToFollowId);
  const user = await User.findById(userId);

  if (!user || !userToFollow)
    return res.status(404).json({ error: "User not found" });

  if (userToFollowId.toString() === userId.toString()) {
    return res.status(400).json({ error: "You can't follow yourself" });
  }

  await User.findOneAndUpdate(
    { _id: userToFollow },
    { $pull: { followers: userId } }
  );

  await User.findOneAndUpdate(
    { _id: userId },
    { $pull: { following: userToFollowId } }
  );

  res.status(200).json({ message: "User unfollowed successfully" });
  try {
  } catch (error) {
    console.log("Error in followUser controller: ", error);
    res.staus(500).json({ error: "Internal server error" });
  }
};
