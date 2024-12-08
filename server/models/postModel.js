import mongoose, { Schema } from "mongoose";

const postSchema = new mongoose.Schema(
    {
        content: {
            type: String,
            required: true,
        },
        photo: {
            type: String,
        },
        posterId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        likedBy: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            },
        ],
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Post", postSchema);
