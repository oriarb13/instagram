import Post from "../models/postModel.js"; 
import Comment from "../models/commentModel.js";
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
    const post = await Post.findById(req.params.id); 
    if (!post) { 
      return res.status(404).json({ error: "Post not found." });     
    }
    res.status(200).json(post); 
  } catch (error) {
    console.error("Error finding post by ID:", error); 
    res.status(500).json({ error: "Server error." });   
  }
};

// Create a new post
export const createPost = async (req, res) => {
  const { content, photo, posterId, comments } = req.body; 
  
  if (!content || !posterId) { 
    return res.status(400).json({ error: "Content and posterId are required." });     
  }
  
  try {
    const newPost = new Post({
      content,
      photo,
      comments: comments || [],
      posterId,
    });

    await newPost.save(); 
    
    // Update user with post ID
    const user = await User.findById(posterId);
    user.posts.push(newPost._id);
    await user.save();

    res.status(201).json({ message: "Post created successfully!", post: newPost });     
  } catch (error) {
    console.error("Error saving new post:", error); 
    res.status(500).json({ error: "Server error." });   
  }
};

// Update  post
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
    // post exist?
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ error: "Post not found." });
    }

    // Delete comments 
    await Comment.deleteMany({ postId: post._id });

    // Delete
    const deletedPost = await Post.findByIdAndDelete(req.params.id); 
    if (!deletedPost) { 
      return res.status(404).json({ error: "Post not found." });     
    }

    // Update user to remove postId (optional)
    const user = await User.findById(post.posterId);
    user.posts = user.posts.filter(postId => postId.toString() !== post._id.toString());
    await user.save();

    res.status(200).json({ message: "Post and related comments deleted successfully", post: deletedPost });     
  } catch (error) {
    console.error("Error deleting post:", error); 
    res.status(500).json({ error: "Server error." });   
  }
};
