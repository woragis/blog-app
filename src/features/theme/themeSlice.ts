import { createSlice } from "@reduxjs/toolkit";
import dark from "../../styles/themes/dark";
import light from "../../styles/themes/light";

interface ThemeSliceInterface {
  isDarkMode: boolean;
  theme: typeof dark;
}

const initialState: ThemeSliceInterface = {
  isDarkMode: true,
  theme: dark,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isDarkMode = !state.isDarkMode;
      state.theme = state.isDarkMode ? light : dark;
    },
    setLightTheme: (state) => {
      state.isDarkMode = false;
      state.theme = light;
    },
    setDarkTheme: (state) => {
      state.isDarkMode = true;
      state.theme = dark;
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
