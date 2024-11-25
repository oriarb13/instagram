import express from "express"; 
import { 
  getAllComments, 
  getCommentById, 
  createComment, 
  updateComment, 
  deleteComment 
} from "../controllers/commentController.js"; 

const router = express.Router(); 

//get all
router.get("/", getAllComments);
//by id
router.get("/:id", getCommentById); 
//create
router.post("/", createComment); 
//edit
router.patch("/:id", updateComment); 
//delete
router.delete("/:id", deleteComment); 

export default router; 
