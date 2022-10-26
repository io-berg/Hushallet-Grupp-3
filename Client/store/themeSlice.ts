import { createSlice } from "@reduxjs/toolkit";
import { Theme } from "react-native-paper";
import { lightTheme, darkTheme } from "../utils/theme";

export interface ThemeState {
  theme: Theme;
}

const initialState: ThemeState = {
  theme: lightTheme,
};

const themeSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    lightMode: (state) => {
      state.theme = lightTheme;
    },
    darkMode: (state) => {
      state.theme = darkTheme;
    },
  },
});

export default themeSlice.reducer;
export const { lightMode, darkMode } = themeSlice.actions;
