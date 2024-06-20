/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import { getToken } from "../../helper/sessionStorage";
import axios from "axios";
import Checkout from "../checkout/Checkout";
import { Button, Result, Skeleton } from "antd";

const Cart = () => {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  const subtotal = data?.courses
    ?.map((item) => item?.price)
    ?.reduce((acc, curr) => acc + curr, 0);

  React.useEffect(() => {
    CartList();
  }, []);

  const CartList = async () => {
    try {
      const token = getToken();
      const AuthToken = { headers: { Authorization: `Bearer ${token}` } };
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_URL}/get-cart`,
        AuthToken
      );
      setData(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleRemove = async (itemId) => {
    try {
      const token = getToken();
      const AuthToken = { headers: { Authorization: `Bearer ${token}` } };
      await axios.delete(
        `${process.env.NEXT_PUBLIC_URL}/cart/${itemId}`,
        AuthToken
      );
      CartList();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="container mx-auto mt-10 font-roboto">
        {loading && (
          <div className="flex flex-col md:flex-row mb-40">
            <div className="flex justify-between w-full md:w-3/4 pe-12">
              <div className="flex">
                <Skeleton.Image active />
                <Skeleton
                  active
                  size={100}
                  title={false}
                  paragraph={true}
                  className="mt-5 w-56 ms-4"
                />
              </div>

              <Skeleton.Button active className="mt-5" />
              <Skeleton.Button
                active
                height={500}
                width={200}
                className="mt-5"
              />
            </div>
            <div className="w-full md:w-1/4 ">
              <Skeleton
                active
                size={300}
                title={true}
                paragraph={false}
                className="my-3 w-40 ms-4"
              />
              <div className="flex justify-between mx-4">
                <Skeleton.Button active className="mt-2" />
                <Skeleton.Button
                  active
                  height={500}
                  width={200}
                  className="mt-2"
                />
              </div>
              <div className="flex justify-between mx-4">
                <Skeleton.Button active className="mt-2" />
                <Skeleton.Button
                  active
                  height={500}
                  width={200}
                  className="mt-2"
                />
              </div>
              <Skeleton
                active
                size={300}
                title={true}
                paragraph={false}
                className="my-5 w-full px-4"
              />
              <div className="flex justify-between mx-4">
                <Skeleton.Button active className="mt-2" />
                <Skeleton.Button
                  active
                  height={500}
                  width={200}
                  className="mt-2"
                />
              </div>
              <Skeleton
                active
                size={300}
                title={true}
                paragraph={false}
                className="mt-16 w-full px-4"
              />
              <Skeleton
                active
                size={300}
                title={true}
                paragraph={false}
                className="my-5 w-full px-4"
              />
              <Skeleton
                active
                size={300}
                title={true}
                paragraph={false}
                className="my-5 w-full px-4"
              />
            </div>
          </div>
        )}
        {data?.courses?.length ? (
          <div className="flex flex-col md:flex-row my-10">
            <div className="w-full md:w-3/4 bg-gray-100 px-3 py-4 border h-fit">
              <div className="flex justify-between border-b pb-4">
                <h1 className="font-semibold text-2xl">My Cart</h1>

                <h2 className="font-medium text-2xl">
                  {data?.courses?.length} Item
                </h2>
              </div>
              <div className=" md:overflow-x-auto overflow-x-scroll">
                <div className="flex mt-4 mb-5 justify-between md:overflow-x-hidden w-[150%] md:w-auto">
                  <h3 className="font-semibold text-gray-600 text-xs uppercase ps-2 md:ps-8 w-2/4">
                    Product Details
                  </h3>
                  <h3 className="font-semibold text-gray-600 text-xs uppercase w-1/4 text-center">
                    Remove
                  </h3>
                </div>

                {data?.courses?.map((item, index) => (
                  <div
                    key={index}
                    className="cart-item flex items-center rounded-lg hover:bg-gray-200 mb-3 px-2 md:px-6 py-5 md:shadow justify-between md:overflow-x-hidden w-[150%] md:w-auto"
                  >
                    <div className="flex w-2/4">
                      <div className="w-20">
                        <img
                          className="h-20 shadow rounded-lg"
                          style={{ height: "80px", width: "80px" }}
                          src={item?.course?.thumbnail?.secure_url}
                          alt="Image"
                        />
                      </div>
                      <div className="flex flex-col justify-around ml-4 flex-grow">
                        <span className="font-bold text-sm">
                          {item?.course?.name}
                        </span>
                        <span className=" text-xs">Software</span>
                      </div>
                    </div>
                    <div className="text-center w-1/4">
                      <button
                        onClick={() => handleRemove(item._id)}
                        className="font-semibold hover:text-red-600 hover:bg-red-200 px-2 rounded text-red-500 text-[14px]"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                href="/course"
                className="flex font-semibold text-[#140342] text-sm mt-10 w-fit"
              >
                <svg
                  className="fill-current mr-2 text-[#140342] w-4"
                  viewBox="0 0 448 512"
                >
                  <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
                </svg>
                Continue Enroll
              </Link>
            </div>

            {/* Cart <Summary */}
            <div
              id="summary"
              className="w-full md:w-1/4 h-full md:ms-2 mt-4 md:mt-0 "
            >
              <div className="py-5  bg-gray-200">
                <h1 className="font-semibold text-2xl px-6">Enroll Summary</h1>
                <hr className="py-2" />
                <div className="flex justify-between mb-3 pt-4 px-6 border-t border-[#140342] text-gray-600">
                  <span className="font-semibold text-sm uppercase">
                    Course
                  </span>
                  <span className="font-semibold text-sm">{data?.courses?.length}</span>
                </div>
              </div>
              <Checkout />
            </div>
          </div>
        ) : (
          <div className=" my-20">
            <Result
              title="You don't have any course add to cart"
              extra={
                <Button
                  href="/course"
                  type=""
                  key="console"
                  className="bg-[#140342] hover:bg-[#110927] hover:text-white text-white w-fit rounded-lg"
                >
                  View Course
                </Button>
              }
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
