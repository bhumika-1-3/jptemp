import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    img: {
      type: String,
    },
    subscribers: {
      type: Number,
      default: 0,
    },
    subscribedUsers: {
      type: [String],
    },
    fromGoogle: {
      type: Boolean,
      default: false,
    },
    school: {
      type: String,
    },
    grade: {
      type: Number,
    },
    isverified: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      default: "user",
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);