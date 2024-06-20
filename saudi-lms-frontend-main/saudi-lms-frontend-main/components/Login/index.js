import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ShowLoader, HideLoader } from "../../redux/store";
import { store } from "../../redux/store";
import { getToken, setToken } from "../../helper/sessionStorage";
import { useSnackbar } from "notistack";
import axiosInstance from "../../helper/axiosInstance";
import { Button, TextField } from "@mui/material";
import { setAuth } from "../../redux/slice/auth-slice";
import { Card } from "antd";

const LoginPage = () => {
  const [inputs, setInputs] = React.useState({});
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const PushLogin = async () => {
    try {
      store.dispatch(ShowLoader());
      const { data } = await axiosInstance.post(`/auth/login`, inputs);
      setToken(data?.token);
      store.dispatch(setAuth(data?.token));
      store.dispatch(HideLoader());
      window.location.href = "/";
    } catch (err) {
      store.dispatch(HideLoader());
      enqueueSnackbar("Login Fail", { variant: "error" });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    PushLogin();
  };

  React.useEffect(() => {
    if (getToken()) {
      router.push("/");
    }
  }, [router]);

  return (
    <div>
      <div className="truncate min-h-screen bg-gradient-to-r from-indigo-100 from-10% via-purple-200 via-30% to-emerald-100 to-100% pt-12">
        <div className="px-6 sm:w-2/3 sm:justify-center sm:m-auto md:w-2/4 lg:w-1/3 xl:w-1/3">
          <div className="logo"></div>
          <Card title="Login">
            <form onSubmit={handleSubmit} action="">
              <div className="my-12">
                <div>
                  <TextField
                    name="email"
                    label="Email Address"
                    value={inputs.email || ""}
                    onChange={handleChange}
                    type="email"
                    variant="standard"
                    fullWidth
                    required
                  />
                </div>
                <div className="my-6">
                  <TextField
                    name="password"
                    label="Password"
                    value={inputs.password || ""}
                    onChange={handleChange}
                    type="password"
                    variant="standard"
                    fullWidth
                    required
                  />
                </div>
                <div className="flex justify-between items-center text-sm">
                  <div>Rememeber me</div>
                  <div className="text-orange-600">
                    <button>
                      <Link href={"/users/recovery"}>Forget Password ?</Link>
                    </button>
                  </div>
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
                    Login
                  </Button>
                </div>
                {/* <div className="mt-4">
                <p className="text-center text-slate-400 font-semibold">
                  or continue with
                </p>
              </div>
              <div>
                <div className='flex justify-center'>
                  <p className='mx-2 text-3xl my-6 text-blue-700'><button><BsFacebook /></button></p>
                  <p className='mx-2 text-3xl my-6 text-slite-700'><button><AiFillGithub /></button></p>
                  <p className='mx-2 text-3xl my-6 text-red-500'><button><AiOutlineGoogle /></button></p>
                </div>
              </div> */}
              </div>
            </form>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
