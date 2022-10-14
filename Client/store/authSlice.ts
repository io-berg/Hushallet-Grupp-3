import { createSlice } from "@reduxjs/toolkit";
import { User } from "../utils/type";

export interface AuthState {
  user: User;
  token: string;
  exiration: string;
}

const initialState: AuthState = {
  user: {
    id: 0,
    username: "me",
    email: "email@email.com",
  },
  token: "1234567890",
  exiration: new Date(9999, 12, 31).toISOString(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});

export default authSlice.reducer;
export const {} = authSlice.actions;
