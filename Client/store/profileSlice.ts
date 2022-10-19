import { createSlice } from "@reduxjs/toolkit";
import { Profile } from "../utils/type";

const initialState: Profile = {
  id: 1,
  user: {
    username: "Mock User",
    email: "mock@mock.com",
  },
  role: "admin",
  avatar: {
    color: "#ED5949",
    icon: "🐙",
    token: true,
  },
  name: "Mock User",
};

//use thunk to save profile

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    addProfile: (state, action) => {
      state = action.payload;
      console.log(state.name);
    },
  },
});

export default profileSlice.reducer;
export const { addProfile } = profileSlice.actions;
