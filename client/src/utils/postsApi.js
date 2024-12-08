import axios from "axios";

const base_url = "http://localhost:3000";

// all posts
export const getAllPosts = async () => {
    try {
        const response = await axios.get(`${base_url}/api/posts`);
        return response.data;
    } catch (error) {
        return {
            success: false,
            error: error.response?.data || error.message,
        };
    }
};

//post by id
export const getPostById = async (id) => {
    try {
        const response = await axios.get(`${base_url}/api/posts/${id}`);
        return response.data;
    } catch (error) {
        return {
            success: false,
            error: error.response?.data || error.message,
        };
    }
};

//posts of user by usename
export const getPostsByUsername = async (username) => {
    try {
        const response = await axios.get(
            `${base_url}/api/posts/user/${username}`
        );
        return response.data;
    } catch (error) {
        return {
            success: false,
            error: error.response?.data || error.message,
        };
    }
};

//posts of friends
export const getPostsFromFriends = async (username) => {
    try {
        const response = await axios.get(
            `${base_url}/api/posts/friends/${username}`
        );
        return response.data;
    } catch (error) {
        return {
            success: false,
            error: error.response?.data || error.message,
        };
    }
};

//who likes this post by post id
export const getUsersWhoLikedPost = async (id) => {
    try {
        const response = await axios.get(`${base_url}/api/posts/${id}/likes`);
        return response.data;
    } catch (error) {
        return {
            success: false,
            error: error.response?.data || error.message,
        };
    }
};

//   new post
export const createPost = async (postData) => {
    try {
        const response = await axios.post(`${base_url}/api/posts`, postData, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        return {
            success: false,
            error: error.response?.data || error.message,
        };
    }
};

//delete post
export const deletePost = async (id) => {
    try {
        const response = await axios.delete(`${base_url}/api/posts/${id}`, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        return {
            success: false,
            error: error.response?.data || error.message,
        };
    }
};

//toggle like from two directions
export const toggleLikePost = async (id) => {
    try {
        const response = await axios.post(
            `${base_url}/api/posts/${id}/like`,
            {},
            {
                withCredentials: true,
            }
        );
        return response.data;
    } catch (error) {
        return {
            success: false,
            error: error.response?.data || error.message,
        };
    }
};
