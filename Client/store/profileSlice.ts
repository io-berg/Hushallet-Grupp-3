import { createSlice } from "@reduxjs/toolkit";
import { Profile } from "../utils/type";

interface ProfileState {
  profile: Profile | null;
}
const initialState: ProfileState = {
  profile: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, action) => {
      state.profile = { ...action.payload.profile };
      console.log(state.profile?.name);
    },
    updateProfile: (state, action) => {
      if (state.profile) {
        state.profile.avatar.color = action.payload.avatar.color;
        state.profile.avatar.icon = action.payload.avatar.icon;
        state.profile.name = action.payload.name;
        console.log(state.profile.name);
      }
    },
  },
});

export default profileSlice.reducer;
export const { setProfile, updateProfile } = profileSlice.actions;
