import { createSlice } from "@reduxjs/toolkit";
import { Avatar } from "../utils/type";

export interface ProfileState {
  user: {
    id: 0;
    username: "Mock User";
    email: "mock@mock.com";
  };
  role: "admin";
  avatar: {
    color: "#ED5949";
    icon: "🐙";
    token: true;
  };
  name: string;
}

const initialState: ProfileState = {
  user: {
    id: 0,
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
    addProfile: (state) => {
      state.name;
    },
  },
});

export default profileSlice.reducer;
export const {} = profileSlice.actions;
