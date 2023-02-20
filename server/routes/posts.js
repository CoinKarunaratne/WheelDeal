import express from "express";
import {
  getFeedPosts,
  getFilteredPosts,
  getUserPosts,
  savePost,
  savedPosts,
} from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

//READ
router.get("/", verifyToken, getFeedPosts);
router.get("/filter", verifyToken, getFilteredPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);
router.get("/:userId/saves", verifyToken, savedPosts);

//UPDATE
router.patch("/:userId/:postId", verifyToken, savePost);

export default router;
