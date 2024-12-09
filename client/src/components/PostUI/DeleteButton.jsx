import React from "react";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteComment } from "../../utils/commentsApi.js";
import { deletePost } from "../../utils/postsApi.js";


const DeleteButton = ({ type, id, onDeleteSuccess }) => {
    const handleDelete = async () => {
        const confirmMessage =
            type === "post"
                ? "Are you sure you want to delete this post?"
                : "Are you sure you want to delete this comment?";


        if (window.confirm(confirmMessage)) {
            try {
                console.log(`Deleting ${type} with ID:`, id); // Debugging log


                if (type === "post") {
                    await deletePost(id?.toString()); // Ensure correct ID format
                } else {
                    await deleteComment(id?.toString());
                }
                onDeleteSuccess(id);
            } catch (error) {
                console.error(`Error deleting ${type}:`, error);
                alert(`Failed to delete ${type}. Please try again.`);
            }
        }
    };


    return (
        <IconButton onClick={handleDelete} color="error">
            <DeleteIcon />
        </IconButton>
    );
};


export default DeleteButton;



