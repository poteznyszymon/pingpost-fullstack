import { User } from "../models/user.model.js";
import { Notification } from "../models/notification.model.js";
import { v2 } from "cloudinary";
import bcrypt from "bcryptjs";

export const getSuggested = async (req, res) => {
  const userId = req.user._id;
  try {
    const currentUser = await User.findById(userId);
    if (!currentUser) return res.status(404).json({ error: "User not found" });

    const suggestedUsers = await User.aggregate([
      {
        $match: {
          _id: { $nin: currentUser.following, $ne: userId },
        },
      },
      {
        $sample: { size: 3 },
      },
      {
        $project: {
          password: 0,
        },
      },
    ]);

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

  if (userToFollowId !== user._id) {
    const notification = new Notification({
      from: user._id,
      to: userToFollowId,
      type: "follow",
    });
    await notification.save();
  }

  res
    .status(200)
    .json({ message: "User followed successfully", user: userToFollow });
  try {
  } catch (error) {
    console.log("Error in followUser controller: ", error);
    res.staus(500).json({ error: "Internal server error" });
  }
};

export const unfollowUser = async (req, res) => {
  const userToUnFollowId = req.params.id;
  const userId = req.user._id;

  const userToUnfollow = await User.findById(userToUnFollowId);
  const user = await User.findById(userId);

  if (!user || !userToUnfollow)
    return res.status(404).json({ error: "User not found" });

  if (userToUnFollowId.toString() === userId.toString()) {
    return res.status(400).json({ error: "You can't follow yourself" });
  }

  await User.findOneAndUpdate(
    { _id: userToUnfollow },
    { $pull: { followers: userId } }
  );

  await User.findOneAndUpdate(
    { _id: userId },
    { $pull: { following: userToUnFollowId } }
  );

  res
    .status(200)
    .json({ message: "User followed successfully", user: userToUnfollow });
  try {
  } catch (error) {
    console.log("Error in followUser controller: ", error);
    res.staus(500).json({ error: "Internal server error" });
  }
};

export const getUser = async (req, res) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({ username }).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });

    res.status(200).json(user);
  } catch (error) {
    console.log("Error in getUser controller", error);
  }
};

export const editUser = async (req, res) => {
  try {
    const { displayName, email, newPassword, currentPassword, bio } = req.body;
    let { profileImg, coverImg } = req.body;
    const userId = req.user._id;

    let user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    if (profileImg) {
      if (user.profileImg) {
        const imgId = user.profileImg.split("/").pop().split(".")[0];
        v2.uploader.destroy(imgId);
      }
      const uploadResponse = await v2.uploader.upload(profileImg);
      profileImg = uploadResponse.secure_url;
    }

    if (coverImg) {
      if (user.coverImg) {
        const imgId = user.coverImg.split("/").pop().split(".")[0];
        v2.uploader.destroy(imgId);
      }
      const uploadResponse = await v2.uploader.upload(coverImg);
      coverImg = uploadResponse.secure_url;
    }

    if (
      (currentPassword && !newPassword) ||
      (!currentPassword && newPassword)
    ) {
      return res
        .status(400)
        .json({ error: "Both current and new password is required" });
    }

    if (currentPassword && newPassword) {
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: "Current password is incorrect" });
      }
      if (newPassword.length < 6) {
        return res
          .status(400)
          .json({ error: "Password must be at least 6 characters long" });
      }
      const salt = bcrypt.genSalt(10);
      user.password = bcrypt.hash(newPassword, salt);
    }

    user.displayName = displayName || user.displayName;
    user.email = email || user.email;
    user.bio = bio || user.bio;
    user.profileImg = profileImg || user.profileImg;
    user.coverImg = coverImg || user.coverImg;

    user = await user.save();
    return res
      .status(200)
      .json({ message: "User profile updated successfully" });
  } catch (error) {
    console.log("Error in editUser controller: ", error);
    res.status(500).json({ error: "Interal server error" });
  }
};
