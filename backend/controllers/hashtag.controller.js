import { Hashtag } from "../models/hashtag.model.js";

export const trendingHashtag = async (req, res) => {
  try {
    const trendingHashtags = await Hashtag.find({})
      .sort({ createdAt: -1 })
      .limit(4);
    res.status(200).json(trendingHashtags);
  } catch (error) {
    console.log("error in trending hashtag controller: ", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
