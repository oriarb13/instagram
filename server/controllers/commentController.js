import Post from "../models/postModel.js"; 
import Comment from "../models/commentModel.js";
import User from "../models/userModels.js";

// Get all comments
export const getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find(); 
    if (comments.length === 0) { 
      return res.status(404).json({ message: "No comments found." });     
    }
    res.status(200).json(comments); 
  } catch (error) {
    console.error("Error fetching comments:", error); 
    res.status(500).json({ error: "Unknown server error." });   
  }
};

// Get comment by ID
export const getCommentById = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id); 
    if (!comment) { 
      return res.status(404).json({ error: "Comment not found." });     
    }
    res.status(200).json(comment); 
  } catch (error) {
    console.error("Error finding comment by ID:", error); 
    res.status(500).json({ error: "Server error." });   
  }
};

// Create a new comment
export const createComment = async (req, res) => {
  const { comContent, comLikes, userId, postId } = req.body; 
  if (!comContent || !userId || !postId) { 
    return res.status(400).json({ error: "Content, user, and postId are required." });     
  }
  
  try {
    const newComment = new Comment({
      comContent,
      comLikes,
      userId,
      postId,
    });

    await newComment.save();

    const post = await Post.findById(postId);
    post.comments.push(newComment._id);    ////////////////////////////////////
    await post.save();   /////////////

    res.status(201).json({ message: "Comment created successfully!", comment: newComment });     
  } catch (error) {
    console.error("Error saving new comment:", error); 
    res.status(500).json({ error: "Server error." });   
  }
};

// Update an existing comment
export const updateComment = async (req, res) => {
  try {
    const updatedComment = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }); 
    if (!updatedComment) { 
      return res.status(404).json({ error: "Comment not found." });     
    }
    res.status(200).json({ message: "Comment updated successfully", comment: updatedComment });     
  } catch (error) {
    console.error("Error updating comment:", error); 
    res.status(500).json({ error: "Server error." });   
  }
};

// Delete a comment by ID
export const deleteComment = async (req, res) => {
  try {
    const commentToDelete = await Comment.findById(req.params.id);
    if (!commentToDelete) { 
      return res.status(404).json({ error: "Comment not found." });     
    }

    // Get the post
    const post = await Post.findById(commentToDelete.postId);

    // Remove comment from the post 
    post.comments = post.comments.filter(commentId => commentId.toString() !== commentToDelete._id.toString());
    await post.save();

    // Delete the comment
    const deletedComment = await Comment.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Comment deleted successfully", comment: deletedComment });     
  } catch (error) {
    console.error("Error deleting comment:", error); 
    res.status(500).json({ error: "Server error." });   
  }
};
