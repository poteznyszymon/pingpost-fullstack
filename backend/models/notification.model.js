import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ["follow", "like", "comment"],
  },
  content: {
    type: String,
  },
  read: {
    type: Boolean,
    default: false,
  },
});

export const Notification = mongoose.model("Notification", notificationSchema);
