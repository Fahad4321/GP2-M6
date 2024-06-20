import React from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { ShowLoader, HideLoader, store } from "./../../../redux/store";
import {
  getEmail,
  getOTP,
  removeSessions,

} from "./../../../helper/sessionStorage";
import { useSnackbar } from "notistack";

import { Button, TextField } from "@mui/material";

const ChangePassword = () => {
  const [inputs, setInputs] = React.useState({});
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const PushPasswordChange = async () => {
    try {
      store.dispatch(ShowLoader());
      await axios.patch(
        `${process.env.NEXT_PUBLIC_URL}/auth/${getEmail()}/${getOTP()}`,
        inputs
      );
      store.dispatch(HideLoader());
      enqueueSnackbar("Password change successfull", { variant: "success" });
      await router.push("/login");
      removeSessions();
    } catch (err) {
      console.log(err);
      store.dispatch(HideLoader());
      enqueueSnackbar("Password Change fail", { variant: "error" });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    PushPasswordChange();
  };

  return (
    <div>
      <div className="min-h-screen bg-gradient-to-r from-indigo-100 from-10% via-purple-200 via-30% to-emerald-100 to-100% pt-24">
        <div className="px-6 sm:w-2/3 sm:justify-center sm:m-auto md:w-2/4 lg:w-1/3 xl:w-1/4">
          <div className="logo">
          </div>
          <h3 className="text-3xl py-8 font-semibold text-center">
            Change Password
          </h3>
          <p className="text-center">
            If you are successfully OTP verify please change your password
          </p>
          <form onSubmit={handleSubmit} action="">
            <div className="my-12">
              <div>
                <TextField
                  name="password"
                  type="password"
                  label="Password"
                  className="mt-2"
                  value={inputs.password || ""}
                  onChange={handleChange}
                  variant="standard"
                  fullWidth
                  required
                />
              </div>
              <div>
                <TextField
                  name="confirmPassword"
                  type="password"
                  label="Confirm Password"
                  className="mt-2"
                  value={inputs.confirmPassword || ""}
                  onChange={handleChange}
                  variant="standard"
                  fullWidth
                  required
                />
              </div>
              <div>
                <Button
                  className="bg-[#9c27b0ba]"
                  variant="contained"
                  sx={{
                    width: "100%",
                    background: "#9c27b0ba",
                    "&:hover": { background: "#9c27b0" },
                    marginTop: 4,
                    padding: 1.5,
                    fontSize: "1rem",
                    fontWeight: "bold",
                  }}
                  type="submit"
                  disableElevation
                >
                  Change Password
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
