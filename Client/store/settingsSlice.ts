import { createSlice } from "@reduxjs/toolkit";

export interface SettingsState {
  theme: "dark" | "light" | "auto";
}

const initialState: SettingsState = {
  theme: "auto",
};

const settingsSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme =
        state.theme === "auto" ? "dark" : state.theme === "dark" ? "light" : "auto";
    },
    hydrateSettings: (state, action) => {
      state.theme = action.payload.theme;
    },
  },
});

export default settingsSlice.reducer;
export const { toggleTheme, hydrateSettings } = settingsSlice.actions;
