import Post from "../models/postModel.js"; 
// import Comment from "../models/commentModel.js";
import User from "../models/userModels.js";

// Get all posts
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find(); 
    if (posts.length === 0) { 
      return res.status(404).json({ message: "No posts found." });     
    }
    res.status(200).json(posts); 
  } catch (error) {
    console.error("Error fetching posts:", error); 
    res.status(500).json({ error: "Unknown server error." });   
  }
};

// Get post by ID
export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("likedBy", "username email");

    if (!post) { 
      return res.status(404).json({ error: "Post not found." });     
    }
    res.status(200).json(post); 
  } catch (error) {
    console.error("Error finding post by ID:", error); 
    res.status(500).json({ error: "Server error." });   
  }
};

// Create post
export const createPost = async (req, res) => {
  const { content, photo, posterId } = req.body; 
  
  if (!content || !posterId) { 
    return res.status(400).json({ error: "Content and posterId are required." });     
  }
  
  try {
    const newPost = new Post({
      content,
      photo,
      posterId,
    });

    await newPost.save(); 
    
    const user = await User.findById(posterId);
    user.posts.push(newPost._id);
    await user.save();

    res.status(201).json({ message: "Post created successfully!", post: newPost });     
  } catch (error) {
    console.error("Error saving new post:", error); 
    res.status(500).json({ error: "Server error." });   
  }
};

// Update post by ID
export const updatePost = async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }); 
    if (!updatedPost) { 
      return res.status(404).json({ error: "Post not found." });     
    }

    res.status(200).json({ message: "Post updated successfully", post: updatedPost });     
  } catch (error) {
    console.error("Error updating post:", error); 
    res.status(500).json({ error: "Server error." });   
  }
};

// Delete a post by ID
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id); 

    if (!post) {
      return res.status(404).json({ error: "Post not found." });
    }

    res.status(200).json({ message: "Post deleted successfully", post });
  } catch (error) {
    console.error("Error deleting post:", error); 
    res.status(500).json({ error: "Server error." });   
  }
};


// posts by username
export const getPostsByUsername = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const posts = await Post.find({ posterId: user._id })
      .populate("likedBy", "username email"); //details about the likers

    if (posts.length === 0) {
      return res.status(404).json({ message: "No posts found for this user." });
    }

    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts by username:", error);
    res.status(500).json({ error: "Server error." });
  }
};

// users who liked 
export const getUsersWhoLikedPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('likedBy', 'username email');

    if (!post) {
      return res.status(404).json({ error: "Post not found." });
    }

    const usersWhoLiked = post.likedBy; //only the likers return

    res.status(200).json(usersWhoLiked);
  } catch (error) {
    console.error("Error fetching users who liked the post:", error);
    res.status(500).json({ error: "Server error." });
  }
};

// posts of friends 
export const getPostsFromFriends = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username }).populate("friends");//get the user 
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    const friendsIds = user.friends.map(friend => friend._id);//get his friends ids

    const posts = await Post.find({ posterId: { $in: friendsIds } })//if some poster id equal to some id of his friends
      .populate("likedBy", "username email"); //return 

    if (posts.length === 0) {
      return res.status(404).json({ message: "No posts found from friends." });
    }

    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts from friends:", error);
    res.status(500).json({ error: "Server error." });
  }
};
