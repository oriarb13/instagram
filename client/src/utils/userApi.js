import axios from "axios";
import Cookies from "js-cookie";

const base_url = `http://localhost:3000`;
//sign up
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
//sign in
export const signIn = async (user) => {
    try {
        const response = await axios.post(
            `${base_url}/api/users/signIn`,
            user,
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
//log out
export const logOut = async () => {
    try {
        const token = Cookies.get("jwt");
        if (token) {
            const response = await fetch(
                "http://localhost:3000/api/users/logOut",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (!response.ok) {
                throw new Error("Logout failed.");
            }

            Cookies.remove("jwt");

            return await response.json();
        } else {
            throw new Error("No token found");
        }
    } catch (error) {
        console.error("Error logging out:", error);
        throw error;
    }
};

//token
export const isUserValid = async () => {
    try {
        const jwt = Cookies.get("jwt");
        const response = await axios.get(
            `${base_url}/api/users/validateToken`,
            {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            }
        );

        return response.data;
    } catch (error) {
        return {
            userLogout: true,
            error: error.response?.data || error.message,
        };
    }
};

//update
export const updateUser = async (updatedUser) => {
    try {
        const response = await axios.patch(
            `${base_url}/api/users/updateUser`,
            updatedUser,
            {
                withCredentials: true,
            }
        );
        return response.data;
    } catch (error) {
        return { success: false, error: error.response?.data || error.message };
    }
};

//delete
export const deleteUser = async () => {
    try {
        const response = await axios.delete(`${base_url}/api/users/delete`, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        return { success: false, error: error.response?.data || error.message };
    }
};

//user by username
export const getUserByUsername = async (username) => {
    try {
        const response = await axios.get(`${base_url}/api/users/${username}`);
        return response.data;
    } catch (error) {
        return { success: false, error: error.response?.data || error.message };
    }
};

//users friends by username
export const getUserFriends = async (username) => {
    try {
        const response = await axios.get(
            `${base_url}/api/users/${username}/friends`
        );
        return response.data;
    } catch (error) {
        return { success: false, error: error.response?.data || error.message };
    }
};

//add friend
export const sendFriendRequest = async (targetUserId) => {
    try {
        const response = await axios.post(
            `${base_url}/api/users/sendFriendRequest`,
            { targetUserId },
            { withCredentials: true }
        );
        return response.data;
    } catch (error) {
        return { success: false, error: error.response?.data || error.message };
    }
};

//remove
export const removeFriend = async (targetUserId) => {
    try {
        const response = await axios.post(
            `${base_url}/api/users/removeFriend`,
            { targetUserId },
            { withCredentials: true }
        );
        return response.data;
    } catch (error) {
        return { success: false, error: error.response?.data || error.message };
    }
};
