import { createSlice } from "@reduxjs/toolkit";
export const permissionsSlice = createSlice({
  name: "permissions",
  initialState: {
    list: [],
    permissionByRole: [],
    checkedValues: [],
  },
  reducers: {
    setPermissionList: (state, action) => {
      state.list = action.payload;
    },
    setPermissionByRole: (state, action) => {
      state.permissionByRole = action.payload;
    },
    setCheckedValue: (state, action) => {
      state.checkedValues = action.payload;
    },
  },
});
export const { setPermissionList, setPermissionByRole, setCheckedValue } =
  permissionsSlice.actions;
export default permissionsSlice.reducer;
