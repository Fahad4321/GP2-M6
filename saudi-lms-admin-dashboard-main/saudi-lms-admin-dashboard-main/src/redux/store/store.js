import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../state/auth-slice";
import settingsReducer from "../state/setting-slice";
import rolesReducer from "../state/role-slice";
import permissionsReducer from "../state/permission-slice";
export default configureStore({
  reducer: {
    auth: authReducer,
    settings: settingsReducer,
    roles: rolesReducer,
    permissions: permissionsReducer,
  },
});
