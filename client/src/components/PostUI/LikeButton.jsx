import React from "react";
import { IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { toggleLikePost } from "../../utils/postsApi.js";

export default function LikeButton({
    postId,
    initialLikedBy,
    currentUserId,
    onUpdate,
}) {
    const [likedBy, setLikedBy] = React.useState(initialLikedBy || []);
    const [likeLoading, setLikeLoading] = React.useState(false);

    const handleToggleLike = async () => {
        setLikeLoading(true);

        const alreadyLiked = likedBy.includes(currentUserId);
        const updatedLikes = alreadyLiked
            ? likedBy.filter((userId) => userId !== currentUserId)
            : [...likedBy, currentUserId];

        setLikedBy(updatedLikes); // Optimistically update

        try {
            const response = await toggleLikePost(postId);
            if (response.post) {
                setLikedBy(response.post.likedBy); // Sync with server response
                onUpdate?.(response.post.likedBy); // Notify parent if needed
            }
        } catch (error) {
            console.error("Error toggling like:", error);
            // Revert on failure
            setLikedBy(
                alreadyLiked ? [...likedBy, currentUserId] : updatedLikes
            );
        } finally {
            setLikeLoading(false);
        }
    };

    return (
        <IconButton
            aria-label="like or unlike"
            onClick={handleToggleLike}
            disabled={likeLoading}
        >
            <FavoriteIcon
                sx={{
                    color: likedBy.includes(currentUserId) ? "red" : "grey",
                }}
            />
        </IconButton>
    );
}
