/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import moment from "moment";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ImageIcon from "@mui/icons-material/Image";

import { FaStar, FaStarHalfAlt } from "react-icons/fa";

const CourseCard = ({ item, index }) => {
  const [courseReviews, setCourseReviews] = React.useState([]);

  const startingDate = moment(item?.startingDate);
  const currentDate = moment();
  const daysLeft = startingDate.diff(currentDate, "days");
  const courseId = item?._id;

  const CourseReview = async () => {
    try {
      const token = getToken();
      const AuthToken = { headers: { Authorization: `Bearer ${token}` } };
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_URL}/course/${id}/reviews?page=1&limit=3`,
        AuthToken
      );
      setCourseReviews(data.reviews);
    } catch (err) {
      console.log(err);
    }
  };

  const generateStars = (reviews) => {
    const stars = [];
    for (let i = 1; i <= reviews; i++) {
      stars.push(
        <FaStar key={i} className="text-yellow-500 inline-block mr-1" />
      );
    }
    return stars;
  };

  return (
    <>
      <div className="mb-10 mx-10 sm:mx-2 border bg-white-800 rounded-md hover:shadow-lg duration-300">
        {item?.thumbnail?.secure_url ? (
          <img
            className="w-full rounded-t-md"
            src={item?.thumbnail?.secure_url}
            alt="Course Image"
          />
        ) : (
          <ImageIcon style={{ height: "215px", width: "100%" }} />
        )}

        <Link href={`/course/published/${courseId}`}>
          <p className="text-[#140342] text-lg font-medium my-2 px-2 hover:text-green-500 text-start capitalize  cursor-pointer  transition duration-300 ease-in-out">
            {item?.name && item.name.length > 60
              ? item.name.substring(0, 60) + "..."
              : item?.name}
          </p>
        </Link>
        <h1 className="-mt-1 text-sm text-gray-500 text-start ps-2">
          {item?.categoryId?.name}
        </h1>
        <p className="bg-gray-200 h-[0.5px] w-full my-3"></p>
        <div className="flex items-center justify-between px-4 pb-3 inset-x-0 bottom-0">
          <div className="flex items-center">
            {item?.teacherId?.picture?.secure_url ? (
              <img
                src={item?.teacherId?.picture?.secure_url}
                alt="BAYC"
                className="h-8 w-8 border border-white rounded-full mr-2"
              />
            ) : (
              <AccountCircleIcon className="text-4xl mr-2" />
            )}

            <div className="text-gray-400 text-[12px]">
              <div className="">
                <a
                  target="_black"
                  rel="no-opener"
                  className="text-black font-bold capitalize"
                >
                  {item?.teacherId?.firstName} {item?.teacherId?.lastName}
                </a>
              </div>
            </div>
          </div>
          <div className=" font-normal text-sm">
            <p className="font-bold text-lg py-1">Free</p>

          </div>
        </div>
      </div>
    </>
  );
};

export default CourseCard;
