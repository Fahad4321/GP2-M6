/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
const image =
  "https://images.pexels.com/photos/5212340/pexels-photo-5212340.jpeg?auto=compress&cs=tinysrgb&w=600";
import {
  FaUserAlt,
  FaStar,
  FaPlay,
  FaFacebook,
  FaLinkedinIn,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";

const TeacherCard = ({ t, i }) => {
  return (
    <div>
      <div className=" shadow hover:shadow-lg rounded-lg ">
        <img
          className="h-100 w-full object-cover rounded-t-lg h-60 "
          src={t?.picture?.secure_url || image}
          alt=""
        />
        <div className=" px-2">
          <h2 className="pt-3 text-xl text-[#140342] capitalize">
            {t?.firstName} {t?.lastName}
          </h2>
          <h2 className="py-1 text-md text-[#140342]">
            Qualification: {t?.qualification}
          </h2>
          <div className="flex items-center justify-between pb-3">
            <div className="flex items-center">
              <div className="text-[#140342a4] text-sm">
                <FaUserAlt />
              </div>
              <a
                target="_black"
                rel="no-opener"
                className=" text-sm font-normal ps-2 text-[#140342]"
              >
                {" "}
                {t?.students} Students
              </a>
            </div>
            <div className="flex items-center">
              <Link
                href={`/teacher/${t._id}`}
                rel="no-opener"
                className="cursor-pointer border border-[#140342] hover:bg-[#140342] hover:text-white transition duration-500 ease-in-out rounded-lg px-2 py-1 text-sm font-normal ps-2 text-[#140342]"
              >
                View Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherCard;
