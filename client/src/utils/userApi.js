import axios from "axios";
import Cookies from "js-cookie";

const base_url = `http://localhost:3000`;
export const signUp = async (user) => {
  try {
    const response = await axios.post(`${base_url}/api/users/signup`, user);
    console.log(response.data);
    return response.data;
  } catch (error) {
    return {
      success: false,
      error: error.response?.data || error.message,
    };
  }
};

export const signIn = async (user) => {
  try {
    const response = await axios.post(`${base_url}/api/users/signIn`, user, {
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

export const isUserValid = async () => {
  try {
    const jwt = Cookies.get("jwt");
    const response = await axios.get(`${base_url}/api/users/validateToken`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    return response.data;
  } catch (error) {
    return {
      userLogout: true,
      error: error.response?.data || error.message,
    };
  }
};


