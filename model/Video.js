import mongoose from "mongoose";

const VideoSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: false,
    },
    imgUrl: {
      type: String,
      required: false,
    },
    videoUrl: {
      type: String,
      required: true,
    },
    prevUrl: {
      type: String,
      required: false,
    },
    nextUrl: {
      type: String,
      required: false,
    },
    views: {
      type: Number,
      default: 0,
    },
    tags: {
      type: [String],
      default: [],
    },
    lang: {
      type: [String],
      default: [],
    },
    likes: {
      type: [String],
      default: [],
    },
    dislikes: {
      type: [String],
      default: [],
    },
    grade:{
      type: Number,
    }
  },
  { timestamps: true }
);

export default mongoose.model("Video", VideoSchema);