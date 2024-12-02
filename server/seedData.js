import mongoose from "mongoose";
import User from "./models/userModels.js";
import Post from "./models/postModel.js";
import Comment from "./models/commentModel.js";

// MongoDB connection string for Atlas
const mongoURI = "mongodb+srv://oriarb13690:oriarb13690@cluster0.ys1qc.mongodb.net/project?retryWrites=true&w=majority&appName=Cluster0"; // שים לב שהקישור שלך הוא לאותו הפורמט

// Create dummy data for seeding
const createDummyData = async () => {
  try {
    // Connect to the database
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected to the database");

    // Clear existing data to avoid duplicates
    await User.deleteMany({});
    await Post.deleteMany({});
    await Comment.deleteMany({});

    // Create 5 users
    const users = [
      { username: "user1", email: "user1@example.com", password: "password123" },
      { username: "user2", email: "user2@example.com", password: "password123" },
      { username: "user3", email: "user3@example.com", password: "password123" },
      { username: "user4", email: "user4@example.com", password: "password123" },
      { username: "user5", email: "user5@example.com", password: "password123" },
    ];

    const userDocs = await User.insertMany(users);

    // Create friendships (for simplicity, users 1, 2, and 3 are friends)
    userDocs[0].friends.push(userDocs[1]._id, userDocs[2]._id);
    userDocs[1].friends.push(userDocs[0]._id, userDocs[2]._id);
    userDocs[2].friends.push(userDocs[0]._id, userDocs[1]._id);
    await userDocs[0].save();
    await userDocs[1].save();
    await userDocs[2].save();

    // Create 2 posts for each user
    const posts = [];
    for (let i = 0; i < userDocs.length; i++) {
      const postContent1 = `Post 1 from ${userDocs[i].username}`;
      const postContent2 = `Post 2 from ${userDocs[i].username}`;
      
      const post1 = new Post({ content: postContent1, posterId: userDocs[i]._id });
      const post2 = new Post({ content: postContent2, posterId: userDocs[i]._id });
      
      await post1.save();
      await post2.save();
      
      posts.push(post1, post2);
    }

    // Add likes to posts (randomly choosing users to like posts)
    for (let i = 0; i < posts.length; i++) {
      const likedBy = [];
      const randomUsers = userDocs.sort(() => 0.5 - Math.random()).slice(0, 3);
      randomUsers.forEach(user => likedBy.push(user._id));
      
      posts[i].likedBy = likedBy;
      await posts[i].save();
    }

    // Create comments on posts
    const comments = [];
    for (let i = 0; i < posts.length; i++) {
      const post = posts[i];
      const randomUser = userDocs[Math.floor(Math.random() * userDocs.length)];
      const commentContent = `This is a comment on post "${post.content}" by ${randomUser.username}`;
      
      const comment = new Comment({
        comContent: commentContent,
        userId: randomUser._id,
        postId: post._id,
      });

      comments.push(comment);
      await comment.save();
    }

    console.log("Dummy data created successfully!");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error creating dummy data:", error);
    mongoose.connection.close();
  }
};

createDummyData();
