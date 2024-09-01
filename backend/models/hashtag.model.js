import mongoose from "mongoose";

const hashtagSchema = new mongoose.Schema({
  tag: {
    type: String,
    required: true,
    unique: true,
  },
  count: {
    type: Number,
    default: 1,
  },
});

export const Hashtag = mongoose.model("Hashtag", hashtagSchema);
