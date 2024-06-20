/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";
import { FieldTimeOutlined } from "@ant-design/icons";

const ClassJoining = () => {
  return (
    <div>
      <div className="flex justify-between items-center p-8 shadow rounded-lg font-roboto">
        <div className="left ">
          <div className="flex">
            <img
              src="https://cdn.ostad.app/https://cdn.ostad.app//public/upload/2023-01-15T05-55-09.406Z-live-icon3x.png"
              alt=""
              className="h-8 me-3"
            />
            <p className="text-xl font-bold">Live Class</p>
            <span class="relative flex h-4 w-4">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
            </span>
          </div>
          <p className="text-md font-medium mt-4">Course Name Here</p>
          <div className="flex pt-3">
            <p className="text-lg font-medium pe-2">Class Topic: </p>
            <p className="text-lg font-medium ">Live Class Title Here</p>
          </div>
        </div>
        <div className="right">
          <div className="flex">
            <FieldTimeOutlined className=" pe-2 text-lg" />
            <p className="pb-4 text-base pt-1">26 May 2023, 9:00 pm</p>
          </div>
          <p className="bg-[#140342] text-white py-3 text-base font-bold text-center rounded-lg hover:bg-[#0d0620]">
            Join Scrum{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ClassJoining;
