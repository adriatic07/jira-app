import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: null,
    userToken: null,
  },
  reducers: {
    loggedInUser: (state, action) => {
      state.userData = action.payload;
    },
    userToken: (state, action) => {
      state.userToken = action.payload;
    },
  },
});

export const { loggedInUser, userToken } = userSlice.actions;
export default userSlice.reducer;
