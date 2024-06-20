/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import CourseCard from "../../Coursepage/CourseCard";
import Link from "next/link";
import { getToken } from "../../../helper/sessionStorage";
import axios from "axios";
import { Avatar, Box, Skeleton, Stack } from "@mui/material";

const Courses = () => {
  const [data, setData] = React.useState([]);

  const [perPage, setPerPage] = React.useState(10);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    CourseList();
  }, []);

  const CourseList = async () => {
    try {
      const token = getToken();
      const AuthToken = { headers: { Authorization: `Bearer ${token}` } };
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/courses/published?pageNo=${currentPage}&perPage=${perPage}`,
        AuthToken
      );
      setData(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <section className="font-roboto bg-white pb-9">
        <div className="justify-center items-center pt-20 pb-5">
          <p className="text-center text-3xl font-bold">
            Our Most Popular Courses
          </p>
          <p className="text-center text-gray-500">
            10+ unique online course list designs
            <Link
              href="/course"
              className="mt-3 text-indigo-500 inline-flex items-center text-sm pl-2 cursor-pointer font-medium"
            >
              {" "}
              See More
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-3 h-3 animate-ping  ml-2"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7"></path>
              </svg>
            </Link>
          </p>
        </div>
        <div className=" flex flex-wrap container md:px-28 mt- mx-auto 2xl:justify-start ">
          {loading &&
            Array.from({ length: 4 }).map((item, index) => (
              <div
                className=" w-12/12 sm:w-6/12 lg:w-4/12 xl:w-3/12 "
                key={index}
              >
                <Stack
                  spacing={1}
                  sx={{ width: "250px", border: "1px solid #E9E9E9" }}
                >
                  <Skeleton variant="rectangular" width={250} height={150} />
                  <Skeleton variant="rounded" width={250} height={20} />
                  <Skeleton variant="rounded" width={250} height={20} />
                  <Stack
                    direction="row"
                    sx={{ justifyContent: "space-between" }}
                  >
                    <Skeleton
                      loading={loading}
                      sx={{ margin: 1 }}
                      variant="circular"
                    >
                      <Avatar />
                    </Skeleton>
                    <Skeleton
                      sx={{ marginTop: 2, ml: -6 }}
                      variant="rounded"
                      width={70}
                      height={20}
                    />
                    <Box>
                      <Skeleton variant="rounded" width={70} height={20} />
                      <Skeleton
                        sx={{ marginTop: 1 }}
                        variant="rounded"
                        width={70}
                        height={20}
                      />
                    </Box>
                  </Stack>
                </Stack>
              </div>
            ))}
        </div>
        <div className=" flex flex-wrap container md:px-28 my-12 mx-auto justify-center 2xl:justify-center ">
          {data?.course?.slice(0, 8)?.map((item, index) => (
            <div
              key={index}
              className=" w-12/12 sm:w-6/12 lg:w-4/12 xl:w-4/12 "
            >
              <CourseCard item={item} index={index} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Courses;
