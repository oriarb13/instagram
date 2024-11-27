import {createSlice} from "@reduxjs/toolkit"




const userSlice = createSlice({
  name: "user",
  initialState: { username:"", email:"", id:"" },
  reducers: {
    connectUser: (state, action) => {
      const existingUser = state.users.find(
        (user) => user.id === action.payload.id
      );

      if (!existingUser) {
        state.users.push(action.payload);
      } else {
        existingUser.quantity += action.payload.quantity
        existingUser.totalUserPrice += action.payload.totalUserPrice
      }


        state.totalQuantity += action.payload.quantity
        state.totalPrice += action.payload.totalUserPrice
    },
    
    removeUser: (state, action) => {
      // 1. Find User Index
      const userIndex = state.users.findIndex(
        (user) => user.id === action.payload
      );

      // 2. Filter Index
      const user = state.users[userIndex];
      state.totalQuantity -= user.quantity;
      state.totalPrice -= user.price * user.quantity;
      state.users.splice(user, 1);
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
