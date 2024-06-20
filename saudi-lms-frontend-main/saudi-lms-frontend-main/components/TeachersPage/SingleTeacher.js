/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import Image from "next/image";
import React, { useState } from "react";
import { getTeacherRequestDetails } from "../../APIRequest/teacherAPIRequest";
import { useRouter } from "next/router";
const image =
  "https://images.pexels.com/photos/5212340/pexels-photo-5212340.jpeg?auto=compress&cs=tinysrgb&w=600";

const SingleTeacher = () => {
  const [teacherDetails, setTeacherDetails] = useState({});

  const router = useRouter();
  const { id } = router.query;

  React.useEffect(() => {
    TeachersDetails();
  }, [id]);

  const TeachersDetails = async () => {
    const data = await getTeacherRequestDetails(id);
    setTeacherDetails(data);
  };
  console.log("teacDDD", teacherDetails);

  return (
    <div>
      <div className="container h-full w-8/12 mx-auto md:flex my-28 rounded-lg shadow font-roboto">
        <div className=" flex-none bg-cover text-center mx-auto overflow-hidden rounded-t-lg md:rounded-l-lg h-100 bg-white">
          <img
            src={teacherDetails?.picture?.secure_url || image}
            alt="Woman holding a mug"
            style={{ objectFit: "cover" }}
            className=" mx-auto h-[280px] w-[280px]"
          />
        </div>
        <div className="rounded-r-lg w-full bg-white p-4 lg:ps-8 flex flex-col justify-center leading-normal">
          <div className="mb-">
            <div className="text-gray-900 font-bold text-3xl mb-1 capitalize flex">
              {" "}
              {teacherDetails?.firstName} {teacherDetails?.lastName}
            </div>
            <div className="text-gray-700 font-medium mb-2 text-2xl">
              {" "}
              {teacherDetails?.qualification}
            </div>
            <p className="text-gray-700 mb-2 text-lg">
              {teacherDetails?.about}
            </p>
          </div>
          <div className="text-gray-700 font-medium text-lg flex">
            <p className="pe-2 "> Helpline: </p> {teacherDetails?.mobile}
          </div>
          <div className="text-gray-700 font-medium text-lg flex">
            <p className="pe-2"> Email: </p>{" "}
            <span className="break-all">{teacherDetails?.email}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleTeacher;
