import { useState, useEffect } from "react";
import { getAllPosts } from "../../utils/postsApi";
import PostsList from "../../components/PostUI/Posts.jsx";

export default function DiscoveryPage() {
    const [allPosts, setAllPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        getAllPosts()
            .then((data) => {
                setAllPosts(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching posts:", err);
                setError("Failed to load posts. Please try again.");
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading posts...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>Discovery Page</h1>
            <PostsList posts={allPosts} />
        </div>
    );
}
