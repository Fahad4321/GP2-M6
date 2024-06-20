import store from "../redux/store/store.js";

export const checkPermission = (permission, permissionArray = []) => {
  const auth = store.getState().auth;
  if (auth.currentUser?.role?.name === "superadmin") {
    return true;
  }

  return permissionArray.some((item) => item.name === permission);
};
