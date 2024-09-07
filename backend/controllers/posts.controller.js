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

    const populatedPost = await Post.findById(newPost._id).populate(
      "user",
      "-password"
    );

    res
      .status(200)
      .json({ message: "Post added successfully", post: populatedPost });
  } catch (error) {
    console.log("Error in create post controller: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const pageSize = 3;
    const cursor = req.query.cursor || null;

    const query = cursor ? { _id: { $lt: cursor } } : {};

    let posts = await Post.find(query)
      .sort({ createdAt: -1 })
      .limit(pageSize + 1)
      .populate("user", "-password");

    const hasNextPage = posts.length > pageSize;
    const nextCursor = hasNextPage ? posts[pageSize - 1]._id : null;

    if (hasNextPage) {
      posts = posts.slice(0, pageSize);
    }

    res.status(200).json({ posts, nextCursor });
  } catch (error) {
    console.log("error in getAllPosts controller: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user._id;

    const user = await User.findById(userId);
    const post = await Post.findById(postId);

    if (!user) return res.status(404).json({ error: "User not found" });
    if (!post) return res.status(404).json({ error: "Post not found" });

    if (post.user._id.toString() !== user._id.toString())
      return res
        .status(401)
        .json({ error: "Your are not authorized to delete this post" });

    if (post.img) {
      const imgId = post.img.split("/").pop().split(".")[0];
      v2.uploader.destroy(imgId);
    }

    const extractedHashtag = extractHashtag(post.text);
    for (const tag of extractedHashtag) {
      const currentHashtag = await Hashtag.findOneAndUpdate(
        { tag },
        { $inc: { count: -1 } }
      );

      if (currentHashtag && currentHashtag.count === 1) {
        await Hashtag.findOneAndDelete({ tag });
      }
    }

    await Post.findByIdAndDelete(postId);
    res.status(200).json({ message: "Post deleted successfully", post: post });
  } catch (error) {
    console.log("error in deletePost controller: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getFollowingPosts = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const following = user.following;
    const pageSize = 3;
    const cursor = req.query.cursor || null;

    const query = {
      user: { $in: following },
      ...(cursor ? { _id: { $lt: cursor } } : {}),
    };

    let posts = await Post.find(query)
      .sort({ createdAt: -1 })
      .limit(pageSize + 1)
      .populate("user", "-password");

    const hasNextPage = posts.length > pageSize;
    const nextCursor = hasNextPage ? posts[pageSize - 1]._id : null;

    if (hasNextPage) {
      posts = posts.slice(0, pageSize);
    }

    res.status(200).json({ posts, nextCursor });
  } catch (error) {
    console.log("error in getFollowingPosts controller: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const addPostToBookmarks = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user._id;

    const post = await Post.findById(postId);
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ error: "User not found" });
    if (!post) return res.status(404).json({ error: "Post not found" });

    if (user.bookmarks.includes(post._id))
      return res.status(400).json({ error: "Post already added to bookmarks" });

    await User.findByIdAndUpdate(userId, { $push: { bookmarks: postId } });
    return res
      .status(200)
      .json({ message: "Post added to bookmarks successfully", post: post });
  } catch (error) {
    console.log("error in addPostToBookmarks controller: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deletePostFromBookmarks = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user._id;

    const post = await Post.findById(postId);
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ error: "User not found" });
    if (!post) return res.status(404).json({ error: "Post not found" });

    if (!user.bookmarks.includes(post._id))
      return res
        .status(400)
        .json({ error: "Post already deleted from bookmarks" });

    await User.findByIdAndUpdate(userId, { $pull: { bookmarks: postId } });
    return res.status(200).json({
      message: "Post deleted from bookmarks successfully",
      post: post,
    });
  } catch (error) {
    console.log("error in addPostToBookmarks controller: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const likePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user._id;

    const post = await Post.findById(postId).populate("user", "-password");
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ error: "User not found" });
    if (!post) return res.status(404).json({ error: "Post not found" });

    //if (user.likedPosts.includes(post._id) || post.likes.includes(user._id))
    //    return res.status(400).json({ error: "Post already liked" });

    await User.findByIdAndUpdate(userId, { $push: { likedPosts: postId } });
    await Post.findByIdAndUpdate(postId, { $push: { likes: userId } });
    return res
      .status(200)
      .json({ message: "Post liked successfully", post: post });
  } catch (error) {
    console.log("error in likePost controller: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const unlikePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user._id;

    const post = await Post.findById(postId).populate("user", "-password");
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ error: "User not found" });
    if (!post) return res.status(404).json({ error: "Post not found" });

    //if (!user.likedPosts.includes(post._id) || !post.likes.includes(user._id))
    //  return res.status(400).json({ error: "Post already unliked" });

    await User.findByIdAndUpdate(userId, { $pull: { likedPosts: postId } });
    await Post.findByIdAndUpdate(postId, { $pull: { likes: userId } });

    return res.status(200).json({
      message: "Post unliked successfully",
      post: post,
    });
  } catch (error) {
    console.log("error in unlikePost controller: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getBookmarksPosts = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const following = user.following;
    const pageSize = 3;
    const cursor = req.query.cursor || null;

    const query = {
      _id: { $in: user.bookmarks },
      ...(cursor ? { _id: { $lt: cursor } } : {}),
    };

    let posts = await Post.find(query)
      .sort({ createdAt: -1 })
      .limit(pageSize + 1)
      .populate("user", "-password");

    const hasNextPage = posts.length > pageSize;
    const nextCursor = hasNextPage ? posts[pageSize - 1]._id : null;

    if (hasNextPage) {
      posts = posts.slice(0, pageSize);
    }

    res.status(200).json({ posts, nextCursor });
  } catch (error) {
    console.log("error in getFollowingPosts controller: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
