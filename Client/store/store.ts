import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
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

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
