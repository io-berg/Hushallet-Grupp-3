import { createSlice, nanoid } from "@reduxjs/toolkit";
import { Avatar, Profile, User } from "../utils/type";
import { useRoute } from "@react-navigation/native";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ProfileState {
  id: string;
  user: {
    id: 0;
    username: "Mock User";
    email: "mock@mock.com";
  };
  role: "admin";
  avatar: Avatar;
  name: string;
}

/*const initialState: ProfileState = {
  id: 0,
  user: {
    id: 0,
    username: "Mock User",
    email: "mock@mock.com",
  },
  role: "admin",
  avatar: {
    color: "#f7ad71",
    icon: "🦊",
    token: false,
  },
  name: "Mock User",
};*/

/*const profileSlice = createSlice({
  name: "profile",
  initialState: [] as ProfileState[],
  reducers: {
    addProfile: {
      reducer: (state, action: PayloadAction<ProfileState>) => {
        state.push(action.payload);
      },
    },
  },
});

export default profileSlice.reducer;
export const {} = profileSlice.actions;*/
