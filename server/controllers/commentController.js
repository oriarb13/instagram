import Post from "../models/postModel.js";
import Comment from "../models/commentModel.js";

// Get all comments
export const getAllComments = async (req, res) => {
    try {
        const comments = await Comment.find().populate(
            "userId",
            "username email  img"
        ); //give user data too
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
        const comment = await Comment.findById(req.params.id).populate(
            "userId",
            "username email  img"
        );
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
    const { comContent, postId } = req.body;
    const userId = req.user._id;

    if (!comContent || !userId || !postId) {
        return res.status(400).json({ error: "Content, user, and postId are required." });
    }

    try {
        const newComment = new Comment({ comContent, userId, postId });
        await newComment.save();

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        if (!post.comments) {
            post.comments = [];
        }

        post.comments.push(newComment._id);
        await post.save();

        res.status(201).json({
            message: "Comment created successfully!",
            comment: newComment,
        });
    } catch (error) {
        console.error("Error saving new comment:", error);
        res.status(500).json({ error: "Server error." });
    }
};


// Update a comment
export const updateComment = async (req, res) => {
    const userId = req.user._id;

    try {
        const comment = await Comment.findById(req.params.id);
        if (!comment) {
            return res.status(404).json({ error: "Comment not found." });
        }

        if (comment.userId.toString() !== userId.toString()) {
            return res.status(403).json({
                error: "You are not authorized to update this comment.",
            });
        }

        const updatedComment = await Comment.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        res.status(200).json({
            message: "Comment updated successfully",
            comment: updatedComment,
        });
    } catch (error) {
        console.error("Error updating comment:", error);
        res.status(500).json({ error: "Server error." });
    }
};

// Delete a comment by ID
export const deleteComment = async (req, res) => {
    const userId = req.user._id;
    try {
        const commentToDelete = await Comment.findById(req.params.id);
        if (!commentToDelete) {
            return res.status(404).json({ error: "Comment not found." });
        }
        if (commentToDelete.userId.toString() !== userId.toString()) {
            return res.status(403).json({
                error: "You are not authorized to delete this comment.",
            });
        }
        const deletedComment = await Comment.findByIdAndDelete(req.params.id);
        res.status(200).json({
            message: "Comment deleted successfully",
            comment: deletedComment,
        });
    } catch (error) {
        console.error("Error deleting comment:", error);
        res.status(500).json({ error: "Server error." });
    }
};

// Get all comments of specific post
export const getCommentsByPostId = async (req, res) => {
    try {
        const comments = await Comment.find({ postId: req.params.id }).populate(
            "userId",
            "username email img"
        );

        if (comments.length === 0) {
            return res
                .status(404)
                .json({ message: "No comments found for this post." });
        }

        res.status(200).json(comments);
    } catch (error) {
        console.error("Error fetching comments by post ID:", error);
        res.status(500).json({ error: "Server error." });
    }
};
