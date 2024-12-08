import express from "express";
import {
  getAllUsers,
  getUserByUsername,
  createNewUser,
  singInUser,
  updateUser,
  TokenValid,
  deleteUser,
  getUserFriends,
  sendFriendRequest,
  removeFriend,
  logOut
} from "../controllers/usersControllers.js";



import verifyToken from "../middleware/auth.js"


const router = express.Router();


// verifyToken
router.get("/validateToken", verifyToken, TokenValid);


// Get all users
router.get("/", getAllUsers);


// Get user by username
router.get("/:username", getUserByUsername);


// Get user friends by username
router.get("/:username/friends", getUserFriends);


// Send a friend request
router.post("/sendFriendRequest", verifyToken, sendFriendRequest);


// Remove a friend
router.post("/removeFriend", verifyToken, removeFriend);


//create user
router.post("/signup", createNewUser);  


//connect to user
router.post("/signIn", singInUser);  

//logout
router.post("/logOut",verifyToken,logOut);  



// Update a user
router.patch("/updateUser",verifyToken, updateUser);


// Delete a user by username
router.delete("/delete",verifyToken, deleteUser);


export default router;



