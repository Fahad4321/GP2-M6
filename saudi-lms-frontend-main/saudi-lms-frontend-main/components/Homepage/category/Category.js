/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import {
  FaCode,
  FaEnvira,
  FaReact,
  FaAws,
  FaNodeJs,
  FaPhp,
} from "react-icons/fa";
import { getToken } from "../../../helper/sessionStorage";
import axios from "axios";
import { Skeleton } from "antd";
import axiosInstance from "../../../helper/axiosInstance";
import Link from "next/link";
const Category = () => {
  const [categories, setCategories] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [perPage, setPerPage] = React.useState(10);
  const [searchKeyword, setSearchKeyword] = React.useState("0");
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      CategoryList();
    })();
  }, [currentPage, perPage, searchKeyword]);

  const CategoryList = async () => {
    try {
      const token = getToken();
      const AuthToken = { headers: { Authorization: `Bearer ${token}` } };
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_URL}/courses/all-categories/${currentPage}/${perPage}`,
        AuthToken
      );
      setCategories(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <section className=" font-roboto my-14">
        <p className="text-center text-3xl font-semibold text-[#140342]">
          Top Categories
        </p>
        <p className="text-center mt-2 font-normal text-gray-500">
          Our popular Categories, You can take whatever you want
        </p>
        <div className=" flex flex-wrap justify-center items-center ">
          {loading &&
            Array.from({ length: 6 }).map((item, index) => (
              <div
                className="h-60 w-36 2xl:h-72 2xl:w-44 group inline-block pb-4 bg-gray-200 overflow-hidden rounded-2xl shadow ms-4 2xl:pt-4 py-4 mt-32 "
                key={index}
              >
                <div className="flex justify-center my-8">
                  <Skeleton.Avatar active shape="circle"></Skeleton.Avatar>
                </div>
                <div className=" justify-center w-28 mx-auto space-y-6">
                  <Skeleton active title={{ width: "300" }} paragraph={false} />
                  <Skeleton active title={{ width: "300" }} paragraph={false} />
                </div>
              </div>
            ))}
        </div>
        <div className="flex flex-wrap space-x- 2xl:space-x-10 space-y-3 justify-center items-center p-8 mt-9 ">
          {categories?.map((cat, i) => (
            <Link key={i} href={`/category/${cat?._id}`}>
              <div
                key={i}
                className="h-60 w-36 2xl:h-72 2xl:w-44 group inline-block pb-4 bg-gray-200 text-black hover:text-white overflow-hidden rounded-2xl hover:bg-[#140342] shadow hover:shadow-md transition ease-in-out delay-50 ms-4 2xl:pt-4 py-4 mt-4 cursor-pointer"
              >
                <figure className=" overflow-hidden place-content-center grid 2xl:py-9  py-6">
                  <div className="bg-white rounded-full w-fit h-20">
                    <FaCode className=" w-20 mx-auto h-20 p-4 text-[#140342] object-cover transition ease-in-out delay-150 group-hover:scale-" />
                  </div>
                </figure>
                <div className="px-2">
                  <h3 className="text-xl font-normal text-center capitalize">
                    {cat?.name}{" "}
                  </h3>
                  <p className="font-light text-sm mt-2 text-center">
                    {cat?.courseCount} course
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Category;
