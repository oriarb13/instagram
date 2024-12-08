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

export default function AddComment({ postId }) {
    const [input, setInput] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const handleCreateComment = async () => {
        if (!input.trim()) return;
        setLoading(true);

        try {
            // Prepare the data to be sent to the API
            const response = await createComment({ comContent: input, postId });
            console.log("API Response:", response); // Log the full response

            // Check the response for success
            if (response.success) {
                console.log("Comment created successfully:", response.comment); // Log the created comment

                setInput(""); // Clear the input field after a successful submission
            } else {
                console.error("Error creating comment:", response.error); // Log any errors from the API
            }
        } catch (error) {
            console.error("Unexpected error:", error); // Handle unexpected errors
        } finally {
            setLoading(false); // Always reset loading state to false
        }
    };

    return (
        <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={(e) => {
                e.preventDefault();
            }}
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
                        input.trim() && ( // Conditionally render button
                            <InputAdornment position="end">
                                <Button
                                    variant="text"
                                    onClick={handleCreateComment}
                                    disabled={loading}
                                    style={{ color: "Blue" }}
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
