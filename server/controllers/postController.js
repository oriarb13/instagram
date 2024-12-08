import Post from "../models/postModel.js";
// import Comment from "../models/commentModel.js";
import User from "../models/userModels.js";

// Get all posts
export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find()
            .populate("likedBy", "username email img")
            .populate("posterId", "username img");
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
            .populate("likedBy", "username email img")
            .populate("posterId", "username img");

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
    const { content, photo } = req.body;

    if (!content) {
        return res.status(400).json({ error: "Content is required." });
    }
    const userId = req.user._id;
    const username = req.user.username;

    try {
        const newPost = new Post({
            content,
            photo,
            posterId: userId,
            username: username,
            likedBy: [],
        });

        const savedPost = await newPost.save();
        res.status(201).send({
            status: "Post successfully created",
            savedPost,
        });
    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).json({ error: "Server error. Could not create post." });
    }
};

// Delete a post by ID
export const deletePost = async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id;
    const postById = await Post.findById(id);
    if (!postById) {
        return res.status(404).send({ error: "post not found" });
    }
    if (userId.equals(postById.posterId)) {
        try {
            const deletePost = await Post.findByIdAndDelete(id);
            res.status(200).send({
                message: "post deleted successfully",
                deletePost,
            });
        } catch (error) {
            console.error("Error finding post by ID:", error);
            res.status(500).json({ error: "Server error" });
        }
    } else
        res.status(400).send({
            status: "failed",
            mes: "only user that created the post can delete him",
        });
};

// posts by username
export const getPostsByUsername = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username });

        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        const posts = await Post.find({ posterId: user._id })
            .populate("likedBy", "username email  img")
            .populate("posterId", "username  img");

        if (posts.length === 0) {
            return res
                .status(404)
                .json({ message: "No posts found for this user." });
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
        const post = await Post.findById(req.params.id).populate(
            "likedBy", "username email  img"
        );

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
        const user = await User.findOne({
            username: req.params.username,
        }).populate("friends"); //get the user

        if (!user) {
            return res.status(404).json({ error: "User not found." });
        }

        const friendsIds = user.friends.map((friend) => friend._id); //get his friends ids

        const posts = await Post.find({ posterId: { $in: friendsIds } }) //if some poster id equal to some id of his friends
            .populate("likedBy", "username email  img") //return
            .populate("posterId", "username  img");

        if (posts.length === 0) {
            return res
                .status(404)
                .json({ message: "No posts found from friends." });
        }

        res.status(200).json(posts);
    } catch (error) {
        console.error("Error fetching posts from friends:", error);
        res.status(500).json({ error: "Server error." });
    }
};

export const toggleLikePost = async (req, res) => {
    const { id } = req.params;
    const userId = req.user._id;

    try {
        const post = await Post.findById(id);

        if (!post) {
            return res.status(404).json({ error: "Post not found." });
        }

        if (post.likedBy.includes(userId)) {
            post.likedBy = post.likedBy.filter(
                (user) => user.toString() !== userId.toString()
            );
        } else {
            post.likedBy.push(userId);
        }

        await post.save();
        res.status(200).json({
            message: "Post like toggled successfully.",
            post, 
        });
    } catch (error) {
        console.error("Error toggling like:", error);
        res.status(500).json({ error: "Server error." });
    }
};
