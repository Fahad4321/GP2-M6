import toast from "react-hot-toast";
import store from "../redux/store/store.js";
import { setAuth } from "../redux/state/auth-slice";
import axiosInstance from "../utils/axiosInstance.js";
export const loginRequest = async (email, password) => {
  try {
    const { data } = await axiosInstance.post("/auth/login", {
      email,
      password,
    });
    toast.success("Login success");
    store.dispatch(setAuth(data.token));
    return true;
  } catch (e) {
    console.log(e);
    if (e.response.status === 500) {
      toast.error("Server error occurred");

      return false;
    } else {
      toast.error(e.response.data.error);
      return false;
    }
  }
};

export const setPasswordRequest = async (token, body) => {
  try {
    const { data } = await axiosInstance.patch(
      "/auth/setpassword/" + token,
      body
    );
    if (data.result.modifiedCount > 0) {
      toast.success(data.message);
      return true;
    }
    toast.error("Password not set");
    return false;
  } catch (e) {
    if (e?.response?.status === 500) {
      toast.error("Server error occurred");
      return false;
    } else {
      toast.error(e.response.data.error);
      return false;
    }
  }
};

export const verifyEmailRequest = async (email, otp) => {
  try {
    const { data } = await axiosInstance.get(`/auth/${email}/${otp}`);
    toast.success(data.message);
    return true;
  } catch (e) {
    if (e.response.status === 500) {
      toast.error("Server error occurred");
      return false;
    } else {
      toast.error(e.response.data.error);
      return false;
    }
  }
};

export const sendOtpRequest = async (email) => {
  try {
    const { data } = await axiosInstance.get(`/auth/${email}`);
    toast.success(data.message);
    return true;
  } catch (e) {
    if (e.response.status === 500) {
      toast.error("Server error occurred");
      return false;
    } else {
      toast.error(e.response.data.error);

      return false;
    }
  }
};

export const getProfileRequest = async () => {
  try {
    const { data } = await axiosInstance.get(`/users`);
    return data;
  } catch (e) {
    if (e.response.status === 500) {
      toast.error("Server error occurred");
    } else {
      toast.error(e.response.data.error);
    }
  }
};

export const resetPasswordRequest = async (
  email,
  otp,
  password,
  confirmPassword
) => {
  try {
    const { data } = await axiosInstance.patch(`/auth/${email}/${otp}`, {
      password,
      confirmPassword,
    });
    if (data.result.modifiedCount > 0) {
      toast.success(data.message);
      return true;
    }
  } catch (e) {
    if (e.response.status === 500) {
      toast.error("Server error occurred");
      return false;
    } else {
      toast.error(e.response.data.error);
      return false;
    }
  }
};

export const updateProfileRequest = async (userData) => {
  try {
    const { data } = await axiosInstance.patch("/users", userData);

    if (data.result.modifiedCount > 0) {
      toast.success("Profile update successfully");
      return true;
    }
  } catch (e) {
    if (e.response.status === 500) {
      toast.error("Server error occurred");
      return false;
    } else {
      toast.error(e.response.data.error);
      return false;
    }
  }
};

export const passwordChangeRequest = async (values) => {
  try {
    const { data } = await axiosInstance.patch("/auth/password", values);
    console.log(data);
    if (data.result.modifiedCount > 0) {
      toast.success(data.message);
      return true;
    }
  } catch (e) {
    if (e.response.status === 500) {
      toast.error("Server error occurred");
      return false;
    } else {
      toast.error(e.response.data.error);
      return false;
    }
  }
};
