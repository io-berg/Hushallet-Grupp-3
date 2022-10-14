import { createSlice } from "@reduxjs/toolkit";
import { User } from "../utils/type";

export interface AuthState {
  user: User | null;
  token: string | null;
  expirationDate: string | null;
}

const initialState: AuthState = {
  //   user: {
  //     id: 0,
  //     username: "me",
  //     email: "email@email.com",
  //   },
  //   token: "1234567890",
  //   expirationDate: new Date(9999, 12, 31).toISOString(),
  user: null,
  token: null,
  expirationDate: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});

export default authSlice.reducer;
export const {} = authSlice.actions;
