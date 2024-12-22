import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  AuthState,
  LoginInterface,
  RegisterInterface,
} from "../../types/auth.types";
import { loginAPI, registerAPI } from "./authAPI";
import Cookies from "js-cookie";

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
      const token: string = await loginAPI(credentials);
      console.log("Login response: ", token);
      Cookies.set("auth_token", token, { expires: 7 });
      return token;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (details: RegisterInterface, { rejectWithValue }) => {
    try {
      const token: string = await registerAPI(details);
      console.log("Register response: ", token);
      Cookies.set("auth_token", token, { expires: 7 });
      return token;
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

      // Login cases
      .addCase(login.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(login.fulfilled, (state) => {
        state.status = "succeeded";
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
      .addCase(register.fulfilled, (state) => {
        state.status = "succeeded";
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
