import React, { useState, useEffect } from "react";
import { getAllPosts } from "../../utils/postsApi.js";
import { getCommentsByPostId } from "../../utils/commentsApi.js";
import PostsList from "../../components/PostUI/Posts.jsx";

export default function DiscoveryPage() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                // 1. Get all posts
                // Ensure getAllPosts() returns an array of post objects.
                // If it returns { posts: [...] }, adjust accordingly:
                // const response = await getAllPosts();
                // const allPosts = response.posts || [];
                const allPosts = await getAllPosts();

                // 2. For each post, fetch its comments
                // Ensure getCommentsByPostId(postId) returns an array of comments.
                // If it returns { comments: [...] }, adjust accordingly:
                // const response = await getCommentsByPostId(post._id);
                // const comments = response.comments || [];

                const postsWithComments = await Promise.all(
                    allPosts.map(async (post) => {
                        const comments = await getCommentsByPostId(post._id);
                        // Make sure comments is an array. If not, default to empty array.
                        return {
                            ...post,
                            comments: Array.isArray(comments) ? comments : [],
                        };
                    })
                );

                setPosts(postsWithComments);
            } catch (err) {
                console.error("Error fetching posts or comments:", err);
                setError("Failed to load posts.");
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    if (loading) return <div>Loading posts...</div>;
    if (error) return <div>{error}</div>;

    // 3. Pass posts (with comments) to PostsList
    return (
        <div>
            <h1>Discovery Page</h1>
            <PostsList posts={posts} />
        </div>
    );
}
