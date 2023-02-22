import Post from "../models/Post.js";
import User from "../models/User.js";

export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath, car, year } = req.body;
    console.log(req.body);
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

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    delete user.password;
    delete user.email;
    res.status(200).json(user);
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
      ({ _id, car, year, suburb, city, userId, picturePath }) => {
        return { _id, car, year, suburb, city, userId, picturePath };
      }
    );

    res.status(200).json(formattedPosts);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const savePost = async (req, res) => {
  try {
    const { userId } = req.params;
    const { postId } = req.body;

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

    const updatedPosts = await Post.find();
    const updatedUser = await User.findById(userId);

    const posts = await Promise.all(
      updatedUser.savedPosts.map((id) => Post.findById(id))
    );
    const formattedPosts = posts.map(
      ({ _id, car, year, suburb, city, userId, picturePath }) => {
        return { _id, car, year, suburb, city, userId, picturePath };
      }
    );

    res.status(201).json({ updatedPosts, updatedUser, formattedPosts });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId);
    const users = await Promise.all(post.saves.map((id) => User.findById(id)));
    const userUpdate = await Promise.all(
      users.map((user) =>
        User.findOneAndUpdate(
          { _id: user._id },
          { $pull: { savedPosts: postId } }
        )
      )
    );

    if (post && userUpdate) {
      await Post.findByIdAndDelete(postId);
      const posts = await Post.find();
      res.status(200).json(posts);
    } else {
      res.status(404).json({ message: "Post not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
