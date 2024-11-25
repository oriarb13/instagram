import express from "express"; 
import { 
  getAllPosts, 
  getPostById, 
  createPost, 
  updatePost, 
  deletePost 
} from "../controllers/postController.js"; 

const router = express.Router(); 

//get all
router.get("/", getAllPosts);
//by id
router.get("/:id", getPostById); 
//create
router.post("/", createPost); 
//edit
router.patch("/:id", updatePost); 
//delete
router.delete("/:id", deletePost); 

export default router; 
