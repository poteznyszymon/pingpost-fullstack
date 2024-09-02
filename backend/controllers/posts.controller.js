import { User } from "../models/user.model.js";
import { Post } from "../models/post.model.js";
import { Hashtag } from "../models/hashtag.model.js";
import { v2 } from "cloudinary";
import { extractHashtag } from "../utils/extractHashtag.js";

export const createPost = async (req, res) => {
  try {
    const userId = req.user._id;
    const text = req.body.text;
    let img = req.body.img;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    if (!text && !img)
      return res.status(400).json({ error: "Text or image must be provided" });

    if (img) {
      const imageResponse = await v2.uploader.upload(img);
      img = imageResponse.secure_url;
    }

    const newPost = new Post({
      user: userId,
      text,
      img,
    });

    await newPost.save();

    const hashtags = extractHashtag(newPost.text);
    for (const tag of hashtags) {
      await Hashtag.findOneAndUpdate(
        { tag },
        { $inc: { count: 1 } },
        { upsert: true }
      );
    }
    res.status(200).json({ message: "Post added successfully", post: newPost });
  } catch (error) {
    console.log("Error in create post controller: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const allPosts = await Post.find({})
      .sort({ createdAt: -1 })
      .populate("user", "-password");
    res.status(200).json(allPosts);
  } catch (error) {
    console.log("error in getAllPosts controller: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
