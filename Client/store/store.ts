import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { remove, save } from "../utils/localStorage";
import authSlice from "./authSlice";
import counterReducer from "./counterSlice";
import householdReducer from "./householdSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    household: householdReducer,
    auth: authSlice,
  },
});

store.subscribe(() => {
  store.getState().auth.token
    ? save("auth.token", store.getState().auth.token)
    : remove("auth.token");
  store.getState().auth.expirationDate
    ? save("auth.expirationDate", store.getState().auth.expirationDate)
    : remove("auth.expirationDate");
  store.getState().auth.user
    ? save("auth.user", JSON.stringify(store.getState().auth.user))
    : remove("auth.user");
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
