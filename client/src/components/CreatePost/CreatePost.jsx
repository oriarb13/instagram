import { useState } from "react";
import { useDispatch } from "react-redux";
import { createPost } from "../../utils/postsApi.js";
import {
    Box,
    TextField,
    Button,
    Typography,
    CircularProgress,
} from "@mui/material";


const CreatePost = () => {
    const [content, setContent] = useState("");
    const [photo, setPhoto] = useState(""); // Updated to handle a string (URL)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);


    const dispatch = useDispatch();


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess(false);


        const payload = { content };
        if (photo) payload.photo = photo; // Include the photo URL


        try {
            console.log("Sending API request with JSON payload:", payload);
            const result = await createPost(payload);
            console.log("API response received:", result);


            if (result.success !== false) {
                setSuccess(true);
                setContent("");
                setPhoto("");
                dispatch({ type: "ADD_POST", payload: result });
            } else {
                console.error("API returned an error:", result.error);
                throw new Error(result.error);
            }
        } catch (err) {
            console.error(
                "An error occurred during post creation:",
                err.message || err
            );
            setError(
                err.message || "An error occurred while creating the post."
            );
        } finally {
            setLoading(false);
        }
    };


    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                maxWidth: 600,
                margin: "auto",
                padding: 3,
                display: "flex",
                flexDirection: "column",
                gap: 2,
            }}
        >
            <Typography variant="h5">Create a New Post</Typography>


            {error && (
                <Typography color="error" variant="body2">
                    {error}
                </Typography>
            )}
            {success && (
                <Typography color="primary" variant="body2">
                    Post created successfully!
                </Typography>
            )}


            {/* Content Input */}
            <TextField
                label="Content"
                multiline
                rows={4}
                value={content}
                onChange={(e) => {
                    console.log("Content updated:", e.target.value);
                    setContent(e.target.value);
                }}
                required
            />


            {/* Photo URL Input */}
            <TextField
                label="Photo URL"
                value={photo}
                onChange={(e) => {
                    console.log("Photo URL updated:", e.target.value);
                    setPhoto(e.target.value);
                }}
                placeholder="Enter an image URL"
            />


            <Button type="submit" variant="contained" disabled={loading}>
                {loading ? <CircularProgress size={24} /> : "Post"}
            </Button>
        </Box>
    );
};


export default CreatePost;



