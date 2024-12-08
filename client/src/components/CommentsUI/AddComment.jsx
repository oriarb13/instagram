import React from "react";

import {
    Box,
    Button,
    InputAdornment,
    FormControl,
    InputLabel,
    Input,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

import { createComment } from "../../utils/commentsApi";

export default function AddComment({ postId, onCommentAdded }) {
    // Add onCommentAdded as a prop
    const [input, setInput] = React.useState("");
    const [loading, setLoading] = React.useState(false);

    const handleCreateComment = async () => {
        if (!input.trim()) return;
        setLoading(true);

        try {
            const response = await createComment({ comContent: input, postId });
            console.log("API Response:", response);

            if (response.success) {
                console.log("Comment created successfully:", response.comment);
                setInput(""); // Clear input
                if (onCommentAdded) {
                    onCommentAdded(response.comment); // Notify parent about the new comment
                }
            } else {
                console.error("Error creating comment:", response.error);
            }
        } catch (error) {
            console.error("Unexpected error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={(e) => e.preventDefault()}
        >
            <FormControl sx={{ m: 1, width: "25ch" }} variant="standard">
                <InputLabel htmlFor="add-comment-input">
                    Add a comment...
                </InputLabel>
                <Input
                    id="add-comment-input"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    endAdornment={
                        input.trim() && (
                            <InputAdornment position="end">
                                <Button
                                    variant="text"
                                    onClick={handleCreateComment}
                                    disabled={loading}
                                    style={{ color: "blue" }}
                                >
                                    {loading ? (
                                        <CircularProgress size={16} />
                                    ) : (
                                        "Post"
                                    )}
                                </Button>
                            </InputAdornment>
                        )
                    }
                />
            </FormControl>
        </Box>
    );
}
