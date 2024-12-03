import express from "express";
import { 
  getAllPosts, 
  getPostById, 
  createPost, 
  deletePost, 
  getPostsByUsername, 
  getPostsFromFriends,
  getUsersWhoLikedPost,
  toggleLikePost
} from "../controllers/postController.js";

import verifyToken from "../middleware/auth.js";

const router = express.Router();

//  all posts
router.get("/", getAllPosts); 

// post by post id
router.get("/:id", getPostById); 

// posts by username
router.get("/user/:username", getPostsByUsername); 

//  posts of friends
router.get("/friends/:username", getPostsFromFriends); 

//  users who liked
router.get("/:id/likes", getUsersWhoLikedPost); 

// Create a new post
router.post("/", verifyToken, createPost); 

// Delete a post by ID
router.delete("/:id", verifyToken, deletePost); 

// Toggle like on a post
router.post("/:id/like", verifyToken, toggleLikePost); 

export default router;
