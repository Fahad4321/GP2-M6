import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "../../utils/jwtDecode.js";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    currentUser: jwtDecode(localStorage.getItem("token")),
  },
  reducers: {
    setAuth: (state, action) => {
      localStorage.setItem("token", action.payload);
    },
    logOut: (state) => {
      localStorage.removeItem("token");
      window.location = "/";
    },
  },
});

export const { setAuth, logOut } = authSlice.actions;
export default authSlice.reducer;
