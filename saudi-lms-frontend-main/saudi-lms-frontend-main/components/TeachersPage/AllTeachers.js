/* eslint-disable react-hooks/exhaustive-deps */
import { Pagination, Skeleton, Space } from "antd";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getAllTeacherRequest } from "../../APIRequest/teacherAPIRequest";
import TeacherCard from "./TeacherCard";

const AllTeachers = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 8,
    total: 0,
    onChange: (page, pageSize) => {
      fetchData(page, pageSize);
    },
  });

  const fetchData = async (page, pageSize, keyword) => {
    setLoading(true);
    const response = await getAllTeacherRequest(page, pageSize, keyword);
    setLoading(false);
    setData(response.teachers?.rows);
    setPagination({
      ...pagination,
      current: page,
      pageSize: pageSize,
      total: response.teachers?.total,
    });
  };

  useEffect(() => {
    fetchData(pagination.current, pagination.pageSize);
  }, []);

  const onSearch = async (value) => {
    if (!value) {
      fetchData(1, pagination.pageSize, "0");
    } else {
      fetchData(1, pagination.pageSize, value);
    }
  };

  return (
    <div className='h-[70vh]'>
      <section className="mx-auto w-fit mb-8 font-roboto">
        <div className="my-4 h-full">
          <div>
            <h2 className=" pb-2 text-4xl text-[#140342] font-bold text-start">
              Meet Our Teachers
            </h2>
            <h2 className="text-md text-gray-600 text-start">
              Learn from the best instructors
            </h2>
          </div>
        </div>
        <div className="flex flex-wrap w-11/12 md:px-8 px-0 2xl:px-20 mx-auto">
          {loading &&
            Array.from({ length: 4 }).map((item, index) => (
              <div
                className=" p-4 md:w-3/6 lg:w-2/6 sm:w-1/2 xl:w-1/4 w-full h-fit group py-4 mx-auto"
                key={index}
              >
                <Skeleton.Input active size={240} />
                <Skeleton
                  active
                  size={100}
                  title={{ width: "240" }}
                  paragraph={false}
                  className="my-2"
                />
                <Skeleton
                  active
                  size={100}
                  title={{ width: "240" }}
                  paragraph={false}
                  className="my-2"
                />
                <div className="flex justify-between">
                  <Skeleton.Button active />
                  <Skeleton.Button active />
                </div>
              </div>
            ))}
        </div>
        <div className="flex flex-wrap w-11/12 md:px-8 px-0 pt-12 2xl:px-20 mx-auto justify-start items-start">
          {data?.map((t, i) => (
            <div
              key={i}
              className=" p-4 md:w-3/6 lg:w-2/6 sm:w-1/2 xl:w-1/4 w-full h-fit group py-4 mx-auto"
            >
              <TeacherCard t={t} i={i} />
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <Pagination defaultCurrent={1} {...pagination} />
        </div>
      </section>
    </div>
  );
};

export default AllTeachers;
