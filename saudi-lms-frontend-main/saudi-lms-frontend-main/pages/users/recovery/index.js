import React from "react";
import axios from 'axios';
import { useRouter } from 'next/router';
import { ShowLoader, HideLoader, store } from "./../../../redux/store";
import { setEmail } from "../../../helper/sessionStorage";

import { useSnackbar } from 'notistack';
import { Button, TextField } from "@mui/material";




const ForgetPassword = () => {
  const [inputs, setInputs] = React.useState({});
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();



  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };


  const pushRecovery = async () => {
    try {
      store.dispatch(ShowLoader())
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_URL}/auth/${inputs.email}`)
      setEmail(inputs.email)
      store.dispatch(HideLoader())
      enqueueSnackbar('OTP Sent Success', { variant: 'success' });
      await router.push('/users/recovery/verify');
    } catch (err) {
      store.dispatch(HideLoader())
      enqueueSnackbar('OTP Sent Fail', { variant: 'error' });
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    pushRecovery()
  };





  return (
    <div>
      <div className="min-h-screen bg-gradient-to-r from-indigo-100 from-10% via-purple-200 via-30% to-emerald-100 to-100% pt-24">
        <div className="px-6 sm:w-2/3 sm:justify-center sm:m-auto md:w-2/4 lg:w-1/3 xl:w-1/3">
          <div className="logo">
          </div>
          <h3 className="text-3xl py-8 font-semibold text-center">Forget Password</h3>
          <p className="text-center">
            If you forget your password
          </p>
          <form onSubmit={handleSubmit} action="">
            <div className="my-12">
              <div>
                <TextField
                  name="email"
                  type="email"
                  label="Email Address"
                  value={inputs.email || ""}
                  onChange={handleChange}
                  variant="standard"
                  fullWidth
                  required
                />
              </div>
              <div>
                <Button className="bg-[#9c27b0ba]" variant='contained' sx={{ width: '100%', background: '#9c27b0ba', '&:hover':{background: '#9c27b0'} ,marginTop: 4, padding: 1.5, fontSize: '1rem', fontWeight: 'bold' }} type='submit' disableElevation >Send OTP</Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
