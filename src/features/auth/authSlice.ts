import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  AuthState,
  AuthUserInterface,
  LoginInterface,
  RegisterInterface,
} from "../../types/auth.types";
import { loginAPI, registerAPI } from "./authAPI";

const initialState: AuthState = {
  user: null,
  loggedIn: false,
  status: "idle",
  error: null,
};

export const login = createAsyncThunk(
  "auth/login",
  async (credentials: LoginInterface, { rejectWithValue }) => {
    try {
      const data = await loginAPI(credentials);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (details: RegisterInterface, { rejectWithValue }) => {
    try {
      const data = await registerAPI(details);
      return data;
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Register failed"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.loggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload as AuthUserInterface;
        state.loggedIn = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = (action.payload as string) || null;
      })
      // Register cases
      .addCase(register.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload as AuthUserInterface;
        state.loggedIn = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
        state.error = (action.payload as string) || null;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
