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

//  all posts
router.get("/", getAllPosts);

// post by id
router.get("/:id", getPostById);

// post by username
router.get("/user/:username", getPostsByUsername);

//  posts of friends
router.get("/friends/:username", getPostsFromFriends);

//  users  liked 
router.get("/:id/likes", getUsersWhoLikedPost);

// Create a new post
router.post("/", createPost);

// Update a post by ID
router.patch("/:id", updatePost);

// Delete a post by ID
router.delete("/:id", deletePost);

export default router;
