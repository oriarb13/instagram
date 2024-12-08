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

        setLikedBy(updatedLikes);

        const isUserLike = !alreadyLiked;

        try {
            const response = await toggleLikePost(postId);
            if (response.post) {
                setLikedBy(response.post.likedBy); 
                onUpdate?.(response.post.likedBy); 
            }
        } catch (error) {
            console.error("Error toggling like:", error);
            setLikedBy(alreadyLiked ? likedBy : updatedLikes);
        } finally {
            setLikeLoading(false);
        }
    };

    const isUserLike = likedBy.includes(currentUserId);

    return (
        <IconButton
            aria-label="like or unlike"
            onClick={handleToggleLike}
            disabled={likeLoading}
        >
            <FavoriteIcon
                sx={{
                    color: isUserLike ? "red" : "gray", 
                }}
            />
        </IconButton>
    );
}
