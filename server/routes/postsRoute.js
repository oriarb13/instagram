import express from "express";
import { 
  getAllPosts, 
  getPostById, 
  createPost, 
  updatePost, 
  deletePost, 
  getPostsByUsername, 
  getPostsFromFriends,
  getUsersWhoLikedPost 
} from "../controllers/postController.js";

const router = express.Router();

// Get all posts
router.get("/", getAllPosts);

// Get a post by ID
router.get("/:id", getPostById);

// Get all posts by a specific username
router.get("/user/:username", getPostsByUsername);

// Get all posts from friends of a specific user
router.get("/friends/:username", getPostsFromFriends);

// Get all users who liked a post
router.get("/:id/likes", getUsersWhoLikedPost);

// Create a new post
router.post("/", createPost);

// Update a post by ID
router.patch("/:id", updatePost);

// Delete a post by ID
router.delete("/:id", deletePost);

export default router;
