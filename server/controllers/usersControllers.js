import User from "../models/userModels.js";
import Post from "../models/postModel.js";
import Comment from "../models/commentModel.js";
import JWT from "jsonwebtoken";
//jwt
import { hashPassword, comparePassword } from "../utils/AUTH.js";
const JWT_EXPIRATION = { expiresIn: "1h" };

//token validation
export const TokenValid = (req, res) => {
    try {
        res.status(200).send({
            username: req.user.username,
        });
    } catch (error) {
        res.status(500).send({
            error: "Something went wrong. Please try again later.",
        });
    }
};

//create user
export const createNewUser = async (req, res) => {
    try {
        const { username, email, password, img, bio } = req.body; 
        if (!username || !password || !email) {
            return res
                .status(400)
                .send({ error: "email ,username and password are required" });
        }
        const existingUser = await User.findOne({
            $or: [{ username }, { email }],
        });
        if (existingUser) {
            return res
                .status(400)
                .json({ message: "Username or email already exists" });
        }

        const hashedPassword = await hashPassword(password);
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            img,  
            bio,  
        });

        await newUser.save();
        res.status(201).send({
            status: "success",
            message: "User registered successfully",
            data: newUser,
        });
    } catch (error) {
        res.status(500).send(error);
    }
};
//sign in
export const singInUser = async (req, res) => {
    const { username, email, password } = req.body;
    if (!password || (!email && !username)) {
        return res
            .status(400)
            .send({ error: "email/username and password is required" });
    }
    console.log("Request body:", req.body);
    try {
        const foundUser = await User.findOne({
            $or: [{ username: req.body.username }, { email: req.body.email }],
        });
        console.log("Found user:", foundUser);
        if (!foundUser) {
            return res
                .status(404)
                .send({ error: "Email or username not found." });
        }

        const isAuth = await comparePassword(password, foundUser.password);
        if (!isAuth) {
            return res.status(401).send({ error: "Invalid password." });
        }

        const { _id, username, email, createdAt } = foundUser;
        const filteredUser = { _id, username, email, createdAt };

        const token = JWT.sign(
            filteredUser,
            process.env.JWT_KEY,
            JWT_EXPIRATION
        );

        res.cookie("jwt", token, {
            httpOnly: false,
            secure: true,
            sameSite: "strict",
            maxAge: 3600000,
        });
        res.status(200).send({
            message: "Authentication successful",
            isAuth: true,
            username: username,
            _id: _id,
        });
    } catch (error) {
        console.error("Sign-in error:", error);
        res.status(500).send({
            error: "Something went wrong. Please try again later.",
        });
    }
};

export const logOut = (req, res) => {
    res.clearCookie("jwt", {
        httpOnly: false,
        secure: true,
        sameSite: "strict",
        path: "/login",
    });
    res.status(200).send({
        message: "Successfully logged out.",
    });
};

// Get all users
export const getAllUsers = async (req, res) => {
<<<<<<< HEAD
<<<<<<< HEAD
  try {
    const users = await User.find()
    .populate("friends", "username ")
    if (users.length === 0) {
      return res.status(404).json({ message: "No users found." });    
=======
=======
>>>>>>> b791943ad6b5d1f0d92337e8fcb7955f0f9685b5
    try {
        const users = await User.find().populate("friends", "username img ");
        if (users.length === 0) {
            return res.status(404).json({ message: "No users found." });
        }
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Unknown server error." });
<<<<<<< HEAD
>>>>>>> 4bb07bd8754834de7c119aa2ddfcca3e532b66da
=======
>>>>>>> b791943ad6b5d1f0d92337e8fcb7955f0f9685b5
    }
};

// Get a specific user by username
export const getUserByUsername = async (req, res) => {
<<<<<<< HEAD
<<<<<<< HEAD
  try {
    const user = await User.findOne({ username: req.params.username })
    .populate("friends", "username ")

    if (!user) {
      return res.status(404).json({ error: "User not found." });    
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error finding user by username:", error);
    res.status(500).json({ error: "Server error." });  
  }
};
=======
=======
>>>>>>> b791943ad6b5d1f0d92337e8fcb7955f0f9685b5
    try {
        const user = await User.findOne({
            username: req.params.username,
        }).populate("friends", "username ");
<<<<<<< HEAD
>>>>>>> 4bb07bd8754834de7c119aa2ddfcca3e532b66da
=======
>>>>>>> b791943ad6b5d1f0d92337e8fcb7955f0f9685b5

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
        const user = await User.findOne({
            username: req.params.username,
        }).populate("friends", "username email img"); //get the user, then get the data of his friends

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        res.status(200).json(user.friends);
    } catch (error) {
        console.error("Error fetching user's friends:", error);
        res.status(500).json({ error: "Server error." });
    }
};

// Add a friend
export const sendFriendRequest = async (req, res) => {
    const { targetUserId } = req.body;
    const userId = req.user._id;

    try {
        const user = await User.findById(userId);
        const targetUser = await User.findById(targetUserId);

        if (!user || !targetUser) {
            return res
                .status(404)
                .json({ error: "User or target user not found." });
        }
        if (user.friends.includes(targetUser._id)) {
            return res.status(400).json({ message: "Already friends." });
        }

        user.friends.push(targetUser._id);
        await user.save();

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
    const { targetUserId } = req.body;
    const userId = req.user._id;

    try {
        const user = await User.findById(userId);
        const targetUser = await User.findById(targetUserId);

        if (!user || !targetUser) {
            return res
                .status(404)
                .json({ error: "User or target user not found." });
        }

        if (!user.friends.includes(targetUser._id)) {
            return res.status(400).json({ message: "Not friends." });
        }

        user.friends = user.friends.filter(
            (friendId) => friendId.toString() !== targetUser._id.toString()
        );
        await user.save();

        targetUser.friends = targetUser.friends.filter(
            (friendId) => friendId.toString() !== user._id.toString()
        );
        await targetUser.save();

        res.status(200).json({ message: "Friend removed successfully." });
    } catch (error) {
        console.error("Error removing friend:", error);
        res.status(500).json({ error: "Server error." });
    }
};

// Update an existing user by username
export const updateUser = async (req, res) => {
    try {
        const { newUsername, newEmail, newImg, newBio } = req.body; 
        const id = req.user._id;
        const updateData = {};

        if (newUsername) updateData.username = newUsername;
        if (newEmail) updateData.email = newEmail;
        if (newImg) updateData.img = newImg;   
        if (newBio) updateData.bio = newBio;   

        const updatedUser = await User.findByIdAndUpdate(id, updateData, {
            new: true,
        });

        res.status(201).send({
            message: "User updated successfully",
            updatedUser,
        });
    } catch (error) {
        console.error("Error updating user", error);
        res.status(500).json({ error: "Server error" });
    }
};

// Delete a user by username
export const deleteUser = async (req, res) => {
    const id = req.user._id;

    try {
        await Comment.deleteMany({ userId: id });

        const userPosts = await Post.find({ posterId: id });

        await Comment.deleteMany({
            postId: { $in: userPosts.map((post) => post._id) },
        });

        await Post.deleteMany({ posterId: id });

        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ error: "User not found." });
        }

        res.status(200).json({
            message: "User and related posts and comments deleted successfully",
            user: deletedUser,
        });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ error: "Server error." });
    }
};
