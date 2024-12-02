import express from "express"; 
import { 
  getAllUsers, 
  getUserByUsername, 
  createUser, 
  updateUser, 
  deleteUser,
  getUserFriends,
  sendFriendRequest,
  removeFriend
} from "../controllers/usersControllers.js"; 

const router = express.Router(); 

// Get all users
router.get("/", getAllUsers);

// Get user by username
router.get("/:username", getUserByUsername); 

// Get user friends by username
router.get("/:username/friends", getUserFriends); 

// Send a friend request
router.post("/:username/friend", sendFriendRequest);

// Remove a friend
router.delete("/:username/friend", removeFriend);

// Create a new user
router.post("/", createUser); 

// Update a user by username
router.patch("/:username", updateUser); 

// Delete a user by username
router.delete("/:username", deleteUser); 

export default router; 
