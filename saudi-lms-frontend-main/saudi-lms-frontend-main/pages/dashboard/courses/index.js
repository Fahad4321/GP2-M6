import axios from "axios";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import { getToken } from "../../../helper/sessionStorage";
import CourseCard from "../../../components/card/CourseCard";
import Link from "next/link";
import { useSelector } from "react-redux";
import { checkRole } from "../../../middleware/checkRole";
import DashboardHeader from "../../../components/dashboard/layouts/DashboardHeader";
import { Space, Button, Result, Skeleton, Row, Col } from "antd";
import axiosInstance from "../../../helper/axiosInstance";
import withAuth from "../../../middleware/withAuth";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    (async () => {
      if (checkRole("user")) {
        setLoading(true);
        const { data } = await axiosInstance.get(`/courses/my-course/1/20`);
        setLoading(false);
        setCourses(data?.rows);
      } else if (checkRole("teacher")) {
        setLoading(true);
        const { data } = await axiosInstance.get(`/courses/teacher/1/20/0`);
        setLoading(false);
        setCourses(data?.rows);
      }
    })();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsRendered(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Head>
        <title>Dashboard | My App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <DashboardHeader>
        {checkRole("teacher") ? (
          <Space>
            <Link href="/dashboard/courses/create-course">
              <Button type="default">Create Course</Button>
            </Link>

            <Link href="/dashboard/courses/create-module">
              <Button type="default">Create Module</Button>
            </Link>

            <Link href="/dashboard/courses/create-content">
              <Button type="default">Create Content</Button>
            </Link>
          </Space>
        ) : null}
      </DashboardHeader>
      {/* <Row gutter={18}>
        <Col span={}></Col>
      </Row>*/}
      {courses.length > 0 ? (
        <Row gutter={[24, 24]} className="p-8">
          {courses?.map((item, i) => (
            <Col
              key={item?._id}
              span={{
                xs: 24,
                sm: 24,
                md: 12,
                lg: 8,
              }}
            >
              <CourseCard key={item?._id} course={item} />
            </Col>
          ))}
        </Row>
      ) : (
        <div className="flex justify-center">
          <Skeleton loading={loading}>
            <Result
              status="404"
              title={
                checkRole("user")
                  ? "You have no enroll any course"
                  : "You have no course"
              }
              extra={
                <Link
                  href={
                    checkRole("user")
                      ? "/course"
                      : "/dashboard/courses/create-course"
                  }
                  className="bg-orange-400 py-3 px-4 rounded font-semibold hover:text-black hover:bg-orange-300 transition"
                >
                  {checkRole("user") ? "Enroll a Course" : "create a course"}
                </Link>
              }
            />
          </Skeleton>
        </div>
      )}
    </>
  );
};

export default withAuth(Courses);
