import React from "react";
import { getToken } from "../../helper/sessionStorage";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useRouter } from "next/router";

const Checkout = () => {
  const [carts, setCarts] = React.useState([]);
  const [clientToken, setClientToken] = React.useState("");
  const [instance, setInstance] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (token) {
        getClientToken();
        CartList();
      }
    }
  }, []);

  const CartList = async () => {
    try {
      const token = getToken();
      const AuthToken = { headers: { Authorization: `Bearer ${token}` } };
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_URL}/get-cart`,
        AuthToken
      );
      setCarts(data);
    } catch (err) {
      console.log(err);
    }
  };

  const getClientToken = async () => {
    try {
      const token = getToken();
      const AuthToken = { headers: { Authorization: `Bearer ${token}` } };
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_URL}/client-token`,
        AuthToken
      );
      setClientToken(data.token);
    } catch (err) {
      console.log(err);
    }
  };

  const handleBuy = async () => {
    try {
      setLoading(true);
      const token = getToken();
      const AuthToken = { headers: { Authorization: `Bearer ${token}` } };
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/checkout/braintree`,
        {},
        AuthToken
      );

      if (data?.isAlreadyEnrolled) {
        enqueueSnackbar(data?.message, { variant: "error" });
        setLoading(false);
        return;
      }

      setLoading(false);
      router.push("/success");
      enqueueSnackbar("Payment Success", { variant: "success" });
      CartList();
    } catch (err) {
      console.log(err);
      enqueueSnackbar("Something Want Wrong", { variant: "error" });
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleBuy}
        className="bg-[#140342] hover:bg-[#140933] w-full text-white rounded-lg text-md py-3 px-4 mt-2"
      >
        {loading ? "Processing..." : "Enroll Now"}
      </button>
    </div>
  );
};

export default Checkout;
