/* eslint-disable @next/next/no-img-element */
import React from "react";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";

const MyCourse = () => {
  return (
    <div>
      <div className=" m-4">
        <div className="">
          <h2 className="text-3xl font-bold">My Course</h2>
        </div>
        <div className="card bg-white border rounded-lg p-4 mt-4">
          <h3 className="text-xl font-bold mb-4">Courses</h3>
          <div className="flex flex-wrap justify-start ">
            {Array.from({ length: 3 }).map((item, i) => (
              <div key={i} className="card lg:w-4/12 sm:w-6/12 w-12/12 p-2">
                <div className="rounded-lg border hover:shadow-lg">
                  <img
                    src="https://cdn.ostad.app/course/photo/2022-08-07T06-52-58.087Z-Popular%20Courses%20Content%20(54).jpg"
                    alt="Image"
                    className="rounded-t-lg"
                  />
                  <div className="mx-4">
                    <p className="text-xl font-bold my-4">
                      This is My Course Name .
                    </p>
                    <button className="text-md font-bold hover:bg-[#140342] bg-[#110829] rounded-lg py-2 my-4 text-white w-full mx-auto">
                      LETS MOVE ON <ArrowRightAltIcon />{" "}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCourse;
