import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { remove, save } from "../utils/localStorage";
import authSlice from "./authSlice";
import counterReducer from "./counterSlice";
import householdReducer from "./householdSlice";
import settingsSlice from "./settingsSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    household: householdReducer,
    auth: authSlice,
    settings: settingsSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: { warnAfter: 256 },
      serializableCheck: { warnAfter: 256 },
    }),
});

store.subscribe(() => {
  const token = store.getState().auth.token;
  token ? save("auth.token", token) : remove("auth.token");

  const expirationDate = store.getState().auth.expirationDate;
  expirationDate ? save("auth.expirationDate", expirationDate) : remove("auth.expirationDate");

  const user = store.getState().auth.user;
  user ? save("auth.user", JSON.stringify(user)) : remove("auth.user");

  const theme = store.getState().settings.theme;
  theme ? save("settings.theme", theme) : remove("settings.theme");
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
