import User from "../models/userModels.js";
import Post from "../models/postModel.js";
import Comment from "../models/commentModel.js";

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find(); 
    if (users.length === 0) { 
      return res.status(404).json({ message: "Add a new user to see the users." });     
    }
    res.status(200).json(users); 
  } catch (error) {
    console.error("Error fetching users:", error); 
    res.status(500).json({ error: "Unknown server error." });   
  }
};

// Get a specific user by ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id); 
    if (!user) { 
      return res.status(404).json({ error: "User not found." });     
    }
    res.status(200).json(user); 
  } catch (error) {
    console.error("Error finding user by ID:", error); 
    res.status(500).json({ error: "Server error." });   
  }
};

// Create a new user
export const createUser = async (req, res) => {
  const { username, email } = req.body; 
  
  if (!username || !email) { 
    return res.status(400).json({ error: "Username and email are required." });     
  }
  
  try {
    // username /email  exist
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ error: "Username or email already exists." });
    }

    const newUser = new User({
      username,
      email,
    });

    await newUser.save(); 
    res.status(201).json({ message: "User created successfully!", user: newUser });     
  } catch (error) {
    console.error("Error saving new user:", error); 
    res.status(500).json({ error: "Server error." });   
  }
};

// Update an existing user
export const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }); 
    if (!updatedUser) { 
      return res.status(404).json({ error: "User not found." });     
    }

    if (req.body.username) {
      await Post.updateMany({ posterId: req.params.id }, { $set: { "posterId": updatedUser._id } });
      await Comment.updateMany({ userId: req.params.id }, { $set: { "userId": updatedUser._id } });
    }

    res.status(200).json({ message: "User updated successfully", user: updatedUser });     
  } catch (error) {
    console.error("Error updating user:", error); 
    res.status(500).json({ error: "Server error." });   
  }
};

// Delete a user by ID
export const deleteUser = async (req, res) => {
  try {
    //delete all comments
    await Comment.deleteMany({ userId: req.params.id });
    //  get  posts 
    const userPosts = await Post.find({ posterId: req.params.id });

    // Delete comments of the post
    await Comment.deleteMany({ postId: { $in: userPosts.map(post => post._id) } });

    //  delete the posts
    await Post.deleteMany({ posterId: req.params.id });

    //delete the user
    const deletedUser = await User.findByIdAndDelete(req.params.id); 
    if (!deletedUser) { 
      return res.status(404).json({ error: "User not found." });     
    }
    
    res.status(200).json({ message: "User and related posts and comments deleted successfully", user: deletedUser });     
  } catch (error) {
    console.error("Error deleting user:", error); 
    res.status(500).json({ error: "Server error." });   
  }
};
