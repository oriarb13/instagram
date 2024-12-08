import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        username: "", // Initial username is empty
    },
    reducers: {
        setUser: (state, action) => {
            // Update username from action payload
            state.username = action.payload.username || action.payload; // Handle both structured and direct payloads
        },
        clearUser: (state) => {
            state.username = ""; // Clear username on logout or reset
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
