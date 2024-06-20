import { createSlice } from "@reduxjs/toolkit";
export const rolesSlice = createSlice({
  name: "roles",
  initialState: {
    list: [],
    totalRole: 0,
    roleId: "",
  },
  reducers: {
    setRoleList: (state, action) => {
      state.list = action.payload;
    },
    setTotalRole: (state, action) => {
      state.totalRole = action.payload;
    },
  },
});
export const { setRoleList, setTotalRole } = rolesSlice.actions;
export default rolesSlice.reducer;
