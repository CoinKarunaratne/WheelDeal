import express from "express";
import {
  getFeedPosts,
  getUserPosts,
  savePost,
  savedPosts,
  deletePost,
} from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

//READ
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);
router.get("/:userId/saves", verifyToken, savedPosts);

//UPDATE
router.patch("/:userId/save", verifyToken, savePost);
router.patch("/:postId/delete", verifyToken, deletePost);

export default router;
