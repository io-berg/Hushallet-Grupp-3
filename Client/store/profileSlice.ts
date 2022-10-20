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

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    updateProfile: (state, action) => {
      state.avatar.color = action.payload.avatar.color;
      state.avatar.icon = action.payload.avatar.icon;
      state.name = action.payload.name;
      console.log(state.name);
    },
  },
});

export default profileSlice.reducer;
export const { updateProfile } = profileSlice.actions;
