import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginRequest, registerRequest } from "../utils/api";
import { ErrorResponse, LoginResponse, RegisterResponse, User } from "../utils/type";

export interface AuthState {
  user: User | null;
  token: string | null;
  expirationDate: string | null;
  loginErrors: ErrorResponse | null;
  registerErrors: ErrorResponse | null;
  loading: boolean;
  registerSuccess: boolean;
}

const initialState: AuthState = {
  user: {
    username: "Mock User",
    email: "mock@mock.com",
  },
  token: "1234567890",
  expirationDate: new Date(9999, 12, 31).toISOString(),
  loginErrors: null,
  registerErrors: null,
  registerSuccess: false,
  loading: false,

  // FÖR ATT SE LOGIN, ÄNDRA TILL NULL
  // user: null,
  // token: "",
  // expirationDate: "",
  // loginErrors: null,
  // registerErrors: null,
  // loading: false,
  // registerSuccess: false,
};

export const login = createAsyncThunk<
  LoginResponse | ErrorResponse,
  { username: string; password: string }
>("auth/login", async (data, { rejectWithValue }) => {
  try {
    const response = await loginRequest(data.username, data.password);
    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const register = createAsyncThunk<
  RegisterResponse | ErrorResponse,
  { username: string; email: string; password: string }
>("auth/register", async (data, { rejectWithValue }) => {
  try {
    const response: RegisterResponse = await registerRequest(
      data.username,
      data.email,
      data.password
    );
    return response;
  } catch (error) {
    return rejectWithValue(error);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    hydrateAuth: (state, action) => {
      state.loginErrors = null;
      state.registerErrors = null;
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.expirationDate = action.payload.expirationDate;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.expirationDate = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      const data = action.payload as LoginResponse;
      state.expirationDate = data.expiration;
      state.token = data.token;
      state.user = data.user;
      state.registerSuccess = false;
      state.loginErrors = null;
      state.registerErrors = null;
    });
    builder.addCase(login.rejected, (state, error) => {
      state.loading = false;
      state.loginErrors = error.payload as ErrorResponse;
    });
    builder.addCase(register.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(register.fulfilled, (state) => {
      state.loading = false;
      state.registerSuccess = true;
      state.loginErrors = null;
      state.registerErrors = null;
    });
    builder.addCase(register.rejected, (state, error) => {
      state.loading = false;
      state.registerErrors = error.payload as ErrorResponse;
    });
  },
});

export default authSlice.reducer;
export const { hydrateAuth, logout } = authSlice.actions;
