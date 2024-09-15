import { User } from "../models/user.model.js";
import { Post } from "../models/post.model.js";

export const createComment = async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.user._id;
    const { text } = req.body;

    if (!text) return res.status(400).json({ error: "Text is required" });

    const user = await User.findById(userId);
    const post = await Post.findById(postId);

    if (!user) return res.status(404).json({ error: "User not found" });
    if (!post) return res.status(404).json({ error: "Post not found" });

    const comment = {
      text,
      user: userId,
    };

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { $push: { comments: comment } },
      { new: true }
    )
      .populate("user", "-password")
      .populate("comments.user", "-password");

    return res.status(200).json({
      message: "Comment added successfully",
      post: updatedPost,
    });
  } catch (error) {
    console.log("Error in createComment controller: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.user._id;
    const commentId = req.params.commentId;

    const user = await User.findById(userId);
    const post = await Post.findById(postId);

    if (!user) return res.status(404).json({ error: "User not found" });
    if (!post) return res.status(404).json({ error: "Post not found" });

    const comment = post.comments.id(commentId);

    if (comment.user.toString() !== user._id.toString())
      return res
        .status(403)
        .json({ error: "You cannot delete not your comment" });

    await Post.findByIdAndUpdate(postId, {
      $pull: { comments: { _id: commentId } },
    });

    const updatedPost = await Post.findById(postId)
      .populate("user", "-password")
      .populate("comments.user", "-password");

    return res
      .status(200)
      .json({ message: "Comment deleted successfully", post: updatedPost });
  } catch (error) {
    console.log("Error in deleteComment controller: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
