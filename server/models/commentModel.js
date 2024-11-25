import mongoose, { Schema } from "mongoose";

const commentSchema = new mongoose.Schema({
comContent: {
  type: String,
  required: true
},
userId: {
  type: Schema.Types.ObjectId,
  ref: 'User',
  required: true
},
postId: {
  type: Schema.Types.ObjectId,
  ref: 'Post',
  required: true
},
likedBy: [{
  type: Schema.Types.ObjectId,
  ref: 'User'
}]
}, {
timestamps: true
});

export default mongoose.model("Comment", commentSchema);

