import User from "../models/userModels.js";
import Post from "../models/postModel.js";
import Comment from "../models/commentModel.js";

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find(); 
    if (users.length === 0) { 
      return res.status(404).json({ message: "No users found." });     
    }
    res.status(200).json(users); 
  } catch (error) {
    console.error("Error fetching users:", error); 
    res.status(500).json({ error: "Unknown server error." });   
  }
};

// Get a specific user by username
export const getUserByUsername = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username }); 
    if (!user) { 
      return res.status(404).json({ error: "User not found." });     
    }
    res.status(200).json(user); 
  } catch (error) {
    console.error("Error finding user by username:", error); 
    res.status(500).json({ error: "Server error." });   
  }
};

// Get a specific user's friends by username
export const getUserFriends = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username }).populate('friends', 'username email');
    
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json(user.friends);
  } catch (error) {
    console.error("Error fetching user's friends:", error); 
    res.status(500).json({ error: "Server error." });
  }
};

// Add a friend (send a friend request)
export const sendFriendRequest = async (req, res) => {
  const { targetUsername } = req.body;
  const { username } = req.params;

  try {
    const user = await User.findOne({ username });
    const targetUser = await User.findOne({ username: targetUsername });

    if (!user || !targetUser) {
      return res.status(404).json({ error: "User or target user not found." });
    }

    // Check if already friends
    if (user.friends.includes(targetUser._id)) {
      return res.status(400).json({ message: "Already friends." });
    }

    // Add target user to the friends list of the current user
    user.friends.push(targetUser._id);
    await user.save();

    // Optionally: Add the current user to the target user's friends as well (mutual friendship)
    targetUser.friends.push(user._id);
    await targetUser.save();

    res.status(200).json({ message: "Friend request sent successfully." });
  } catch (error) {
    console.error("Error sending friend request:", error);
    res.status(500).json({ error: "Server error." });
  }
};

// Remove a friend (unfriend)
export const removeFriend = async (req, res) => {
  const { targetUsername } = req.body;
  const { username } = req.params;

  try {
    const user = await User.findOne({ username });
    const targetUser = await User.findOne({ username: targetUsername });

    if (!user || !targetUser) {
      return res.status(404).json({ error: "User or target user not found." });
    }

    // Check if they are friends
    if (!user.friends.includes(targetUser._id)) {
      return res.status(400).json({ message: "Not friends." });
    }

    // Remove target user from the current user's friends list
    user.friends = user.friends.filter(friendId => friendId.toString() !== targetUser._id.toString());
    await user.save();

    // Remove the current user from the target user's friends list
    targetUser.friends = targetUser.friends.filter(friendId => friendId.toString() !== user._id.toString());
    await targetUser.save();

    res.status(200).json({ message: "Friend removed successfully." });
  } catch (error) {
    console.error("Error removing friend:", error);
    res.status(500).json({ error: "Server error." });
  }
};

// Create a new user
export const createUser = async (req, res) => {
  const { username, email, password } = req.body;  
  
  if (!username || !email || !password) { 
    return res.status(400).json({ error: "Username, email, and password are required." });     
  }
  
  try {
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ error: "Username or email already exists." });
    }

    const newUser = new User({
      username,
      email,
      password,
    });

    await newUser.save(); 
    res.status(201).json({ message: "User created successfully!", user: newUser });     
  } catch (error) {
    console.error("Error saving new user:", error); 
    res.status(500).json({ error: "Server error." });   
  }
};

// Update an existing user by username
export const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { username: req.params.username },
      req.body,
      { new: true, runValidators: true }
    ); 
    
    if (!updatedUser) { 
      return res.status(404).json({ error: "User not found." });     
    }

    if (req.body.username) {
      await Post.updateMany({ posterUsername: req.params.username }, { $set: { "posterUsername": updatedUser.username } });
      await Comment.updateMany({ userUsername: req.params.username }, { $set: { "userUsername": updatedUser.username } });
    }

    res.status(200).json({ message: "User updated successfully", user: updatedUser });     
  } catch (error) {
    console.error("Error updating user:", error); 
    res.status(500).json({ error: "Server error." });   
  }
};

// Delete a user by username
export const deleteUser = async (req, res) => {
  try {
    // Delete user's comments
    await Comment.deleteMany({ userUsername: req.params.username });

    // Get all posts of the user
    const userPosts = await Post.find({ posterUsername: req.params.username });

    // Delete comments related to the user's posts
    await Comment.deleteMany({ postId: { $in: userPosts.map(post => post._id) } });

    // Delete the user's posts
    await Post.deleteMany({ posterUsername: req.params.username });

    // Delete the user
    const deletedUser = await User.findOneAndDelete({ username: req.params.username }); 
    
    if (!deletedUser) { 
      return res.status(404).json({ error: "User not found." });     
    }
    
    res.status(200).json({ message: "User and related posts and comments deleted successfully", user: deletedUser });     
  } catch (error) {
    console.error("Error deleting user:", error); 
    res.status(500).json({ error: "Server error." });   
  }
};
