import React from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { ShowLoader, HideLoader } from "../../redux/store";
import { store } from "../../redux/store";
import { setEmail } from "../../helper/sessionStorage";
import {
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { Card } from "antd";
import validatePassword from "../../helper/checkStrongPassword";

const SignupPage = () => {
  const [inputs, setInputs] = React.useState({});
  const [signupRole, setSignupRole] = React.useState("user");
  const [radioError, setRadioError] = React.useState("");
  const router = useRouter();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const PushSignup = async () => {

    if (!signupRole){
      setRadioError('Select a role')
      return
    }

    inputs.role = signupRole;
    try {
      store.dispatch(ShowLoader());
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/auth/register`,
        inputs
      );
      setEmail(inputs.email);
      store.dispatch(HideLoader());
      router.push("/verifyotp");
    } catch (err) {
      console.error(err);
      store.dispatch(HideLoader());
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    PushSignup();
  };

  const handleSignupRoleChange = (event) => {
    setSignupRole(event.target.value);
  };

  return (
    <div>
      <div className="truncate bg-gradient-to-r from-indigo-100 from-10% via-purple-200 via-30% to-emerald-100 to-100% py-12">
        <div className="px-6 sm:w-2/3 sm:justify-center sm:m-auto md:w-2/4 lg:w-1/3 xl:w-1/3">
          <Card title="Sign Up">
            <form onSubmit={handleSubmit} action="">
              <div className="">
                <FormControl className="w-full">
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={signupRole}
                    defaultValue={signupRole}
                    onChange={handleSignupRoleChange}
                    className=" text-gray-600"
                    required
                  >
                    <FormControlLabel
                      value="user"
                      control={<Radio />}
                      label="Student"
                    />
                    <FormControlLabel
                      value="teacher"
                      control={<Radio />}
                      label="Teacher"
                    />
                  </RadioGroup>
                </FormControl>
                {
                    radioError && <p className='text-orange-600'>{radioError}</p>
                }

                <div className="my-6">
                  <TextField
                    name="firstName"
                    label="First Name"
                    variant="standard"
                    value={inputs.firstName || ""}
                    onChange={handleChange}
                    type="text"
                    required
                    fullWidth
                  />
                </div>
                <div className="my-6">
                  <TextField
                    name="lastName"
                    label="Last Name"
                    variant="standard"
                    value={inputs.lastName || ""}
                    onChange={handleChange}
                    type="text"
                    required
                    fullWidth
                  />
                </div>
                <div className="my-6">
                  <TextField
                    name="email"
                    label="Email"
                    variant="standard"
                    value={inputs.email || ""}
                    onChange={handleChange}
                    type="text"
                    required
                    fullWidth
                  />
                </div>
                <div className="my-6">
                  <TextField
                    name="password"
                    label="Password"
                    variant="standard"
                    value={inputs.password || ""}
                    onChange={handleChange}
                    type="password"
                    required
                    fullWidth
                  />
                  {inputs.password && !validatePassword(inputs.password) && (
                    <p className="text-red-500">
                      Password must contain at least 8 characters long, <br />{" "}
                      one uppercase letter, one lowercase letter, <br /> one
                      digit and one special character
                    </p>
                  )}
                </div>
                <div className="my-6">
                  <TextField
                    name="confirmPassword"
                    label="Confirm Password"
                    variant="standard"
                    value={inputs.confirmPassword || ""}
                    onChange={handleChange}
                    type="password"
                    required
                    fullWidth
                  />
                  {inputs.password &&
                    inputs.confirmPassword &&
                    inputs.password !== inputs.confirmPassword && (
                      <p className="text-red-500">Password does not match</p>
                    )}
                </div>
                <div>
                  <Button
                    className="bg-black"
                    color="primary"
                    variant="contained"
                    sx={{
                      width: "100%",
                      background: "black",
                      "&:hover": { background: "black" },
                      marginTop: 4,
                      padding: 1.5,
                      fontSize: "1rem",
                      fontWeight: "bold",
                    }}
                    type="submit"
                    disableElevation
                  >
                    Signup
                  </Button>
                </div>
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
