import { useState } from "react";
import { useDispatch } from "react-redux";
import { createPost } from "../utils/api"; // Adjust the path to your utils
import {
    Box,
    TextField,
    Button,
    Typography,
    CircularProgress,
} from "@mui/material";

const CreatePost = () => {
    const [content, setContent] = useState("");
    const [photo, setPhoto] = useState(null); // For handling image uploads
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess(false);

        // Prepare the data
        const formData = new FormData();
        formData.append("content", content);
        if (photo) formData.append("photo", photo);

        try {
            const result = await createPost(formData);
            if (result.success !== false) {
                setSuccess(true);
                setContent("");
                setPhoto(null);

                // Dispatch Redux action or handle success state
                dispatch({ type: "ADD_POST", payload: result });
            } else {
                throw new Error(result.error);
            }
        } catch (err) {
            setError(
                err.message || "An error occurred while creating the post."
            );
        } finally {
            setLoading(false);
        }
    };

    const handlePhotoChange = (e) => {
        setPhoto(e.target.files[0]);
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

            <TextField
                label="Content"
                multiline
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
            />

            <Button
                variant="outlined"
                component="label"
                sx={{ justifyContent: "flex-start" }}
            >
                Upload Photo
                <input
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={handlePhotoChange}
                />
            </Button>
            {photo && <Typography>{photo.name}</Typography>}

            <Button type="submit" variant="contained" disabled={loading}>
                {loading ? <CircularProgress size={24} /> : "Post"}
            </Button>
        </Box>
    );
};

export default CreatePost;
