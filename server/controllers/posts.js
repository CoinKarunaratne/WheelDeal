import Post from "../models/Post.js";
import User from "../models/User.js";

export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath, car, year } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      car,
      year,
      suburb: user.suburb,
      city: user.city,
      description,
      userPicturePath: user.picturePath,
      picturePath,
    });
    await newPost.save();

    const post = await Post.find();
    res.status(201).json(post);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

export const getFeedPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getFilteredPosts = async (req, res) => {
  try {
    const { suburb, city } = req.body;
    const posts = await Post.find({ suburb, city });
    res.status(200).json(posts);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await Post.find({ userId });
    res.status(200).json(posts);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const savePost = async (req, res) => {
  try {
    const { userId, postId } = req.params;
    const post = await Post.findById(postId);
    const user = await User.findById(userId);

    if (post.saves.includes(userId)) {
      post.saves = post.saves.filter((id) => id !== userId);
      user.savedPosts = user.savedPosts.filter((id) => id !== postId);
    } else {
      post.saves.push(userId);
      user.savedPosts.push(postId);
    }

    await post.save();
    await user.save();

    const newPosts = await new Promise(
      user.savedPosts.map((id) => Post.findById(id))
    );

    const formattedPosts = newPosts.map(
      ({ _id, car, year, suburb, city, description }) => {
        return { _id, car, year, suburb, city, description };
      }
    );

    res.status(200).json(formattedPosts);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const savedPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    const posts = await Promise.all(
      user.savedPosts.map((id) => Post.findById(id))
    );
    const formattedPosts = posts.map(
      ({ _id, car, year, suburb, city, description }) => {
        return { _id, car, year, suburb, city, description };
      }
    );
    res.status(200).json(formattedPosts);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
