import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    car: {
      type: String,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    suburb: String,
    city: String,
    description: String,
    userPicturePath: String,
    picturePath: String,
    saves: {
      type: Array,
      default: [],
    },
    createdDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
