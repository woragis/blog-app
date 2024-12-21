import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  name: string | null;
  email: string | null;
  token: string | null;
  loggedIn: boolean;
}

const initialState: UserState = {
  name: null,
  email: null,
  token: null,
  loggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: { payload: UserState }) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.loggedIn = true;
    },
    register: (state, action: { payload: UserState }) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.loggedIn = true;
    },
    logout: (state) => {
      state.token = null;
      state.token = null;
      state.token = null;
      state.loggedIn = false;
    },
  },
});

export const { login, register, logout } = userSlice.actions;
export default userSlice.reducer;
