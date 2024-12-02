import express from "express"; 
import { 
  getAllComments, 
  getCommentById, 
  createComment, 
  updateComment, 
  deleteComment, 
  getCommentsByPostId 
} from "../controllers/commentController.js"; 

const router = express.Router(); 

// Get all comments
router.get("/", getAllComments);

// Get comment by ID
router.get("/:id", getCommentById);

// Get all comments by post ID
router.get("/post/:id", getCommentsByPostId);

// Create a new comment
router.post("/", createComment); 

// Update an existing comment
router.patch("/:id", updateComment); 

// Delete a comment by ID
router.delete("/:id", deleteComment); 

export default router;
