/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React from "react";
import { useRouter } from "next/router";
import { getEmail } from "../../helper/sessionStorage";

const Verify = () => {
  const [inputs, setInputs] = React.useState({});
  const router = useRouter();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const PushOTP = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_URL}/auth/${getEmail()}/${inputs.otp}`
      );
      router.push("/login");
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    PushOTP();
  };

  React.useEffect(() => {
    if (localStorage.getItem("token")) {
      router.push("/");
    }
  }, []);

  return (
    <div>
      <div className="mx-auto py-24 text-center">
        .<h1 className="text-4xl my-8">OTP Verification</h1>
        <form onSubmit={handleSubmit} action="">
          <label className="my-2">OTP code:</label>
          <input
            name="otp"
            value={inputs.otp || ""}
            onChange={handleChange}
            className="border-2 mx-4 p-2"
            type="number"
          />
          <button
            className="bg-blue-700 text-white px-8 py-2 my-2"
            type="submit"
          >
            Verify
          </button>
        </form>
        <p className="-mx-12 my-6">Pls verify Your Email Otp number.</p>
      </div>
    </div>
  );
};

export default Verify;
