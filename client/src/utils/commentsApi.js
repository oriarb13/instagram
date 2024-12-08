import axios from 'axios';

const base_url = 'http://localhost:3000';  // בחר את ה-API שלך

//comments of specific post
export const getCommentsByPostId = async (postId) => {
  try {
      const response = await axios.get(`${base_url}/api/comments/post/${postId}`);
      return {
          success: true,
          comments: response.data, 
      };
  } catch (error) {
      return {
          success: false,
          error: error.response?.data || error.message,
      };
  }
};
  

  //delete comment
export const deleteComment = async (id) => {
    try {
      const response = await axios.delete(`${base_url}/api/comments/${id}`, {
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
  
  //create comment
  export const createComment = async (commentData) => {
    try {
        const response = await axios.post(`${base_url}/api/comments`, commentData, { withCredentials: true });
        return response.data; 
    } catch (error) {
        return { success: false, error: error.response?.data || error.message };
    }
};

  