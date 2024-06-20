import React from "react";
import axios from 'axios';
import { useRouter } from 'next/router';
import { ShowLoader, HideLoader, store } from "./../../../redux/store";
import { getEmail, setOTP } from "./../../../helper/sessionStorage";
import { useSnackbar } from 'notistack';
import { Button, TextField } from "@mui/material";




const VerifyPasswword = () => {
    const [inputs, setInputs] = React.useState({});
    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();



    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs((values) => ({ ...values, [name]: value }));
    };


    const PushVerify = async () => {
        try {
            store.dispatch(ShowLoader())
            await axios.get(`${process.env.NEXT_PUBLIC_URL}/auth/${getEmail()}/${inputs.otp}`)
            setOTP(inputs.otp)
            store.dispatch(HideLoader())
            enqueueSnackbar('OTP verification success', { variant: 'success' });
            router.push('/users/recovery/changepassword');
        } catch (err) {
            store.dispatch(HideLoader())
            enqueueSnackbar('OTP verification Fail', { variant: 'error' });
        }
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        PushVerify()
    };





    return (
        <div>
            <div className="min-h-screen bg-gradient-to-r from-indigo-100 from-10% via-purple-200 via-30% to-emerald-100 to-100% pt-24">
                <div className="px-6 sm:w-2/3 sm:justify-center sm:m-auto md:w-2/4 lg:w-1/3 xl:w-1/4">
                    <div className="logo">

                    </div>
                    <h3 className="text-3xl py-8 font-semibold text-center">Verify Your OTP code</h3>
                    <p className="text-center">
                        If you not OTP verification email try again later
                    </p>
                    <form onSubmit={handleSubmit} action="">
                        <div className="my-12">
                            <div>
                                <TextField
                                    name="otp"
                                    type="text"
                                    label="OTP Number"
                                    color='secondary'
                                    value={inputs.otp || ""}
                                    onChange={handleChange}
                                    variant="standard"
                                    fullWidth
                                    required
                                />
                            </div>
                            <div>
                            <Button className="bg-[#9c27b0ba]" variant='contained' sx={{ width: '100%', background: '#9c27b0ba', '&:hover':{background: '#9c27b0'} ,marginTop: 4, padding: 1.5, fontSize: '1rem', fontWeight: 'bold' }} type='submit' disableElevation >Verify</Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default VerifyPasswword;
