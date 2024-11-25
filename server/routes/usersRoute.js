import express from "express"; 
import { 
  getAllUsers, 
  getUserById, 
  createUser, 
  updateUser, 
  deleteUser 
} from "../controllers/usersControllers.js"; 

const router = express.Router(); 

//get all
router.get("/", getAllUsers);
//by id
router.get("/:id", getUserById); 
//create+
router.post("/", createUser); 
//edit
router.patch("/:id", updateUser); 
//delete
router.delete("/:id", deleteUser); 

export default router; 
