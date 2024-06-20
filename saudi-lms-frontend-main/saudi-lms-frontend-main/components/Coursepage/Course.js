/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import CourseCard from "./CourseCard";
import { getToken } from "../../helper/sessionStorage";
import axios from "axios";
import { Avatar, Box, Skeleton, Stack } from "@mui/material";

const Course = () => {
  const [courses, setCourses] = React.useState([]);
  const [categories, setCategories] = React.useState([]);
  const [courseType, setCourseType] = React.useState("");
  const [currentPage, setCurrentPage] = React.useState(1);
  const [perPage, setPerPage] = React.useState(6);
  const [totalCourse, setTotalCourse] = React.useState();
  const [totalPages, setTotalPages] = React.useState();
  const [searchKeyword, setSearchKeyword] = React.useState("0");
  const [selectedCategories, setSelectedCategories] = React.useState([]);

  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    CourseList();
    CategoryList();
  }, [
    currentPage,
    perPage,
    searchKeyword,
    totalPages,
    selectedCategories,
    courseType,
  ]);

  const CourseList = async () => {
    try {
      const token = getToken();
      const AuthToken = { headers: { Authorization: `Bearer ${token}` } };
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/courses/published?pageNo=${currentPage}&perPage=${perPage}`,
        { category: selectedCategories, courseType: courseType },
        AuthToken
      );
      setLoading(false);
      setCourses(data);
      setTotalCourse(data?.totalCourse);
      setTotalCourse(data?.totalCourse);
      setTotalPages(data?.totalPages);
    } catch (err) {
      console.log(err);
    }
  };

  const CategoryList = async () => {
    try {
      const token = getToken();
      const AuthToken = { headers: { Authorization: `Bearer ${token}` } };
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_URL}/courses/categories`,
        AuthToken
      );
      setCategories(data);
      CourseList();
    } catch (err) {
      console.log(err);
    }
  };

  const handlePageClick = ({ selected }) => {
    const newPage = selected + 1;
    setCurrentPage(newPage);
  };

  const [open, setOpen] = useState(false);

  const handleAccordionToggle = () => {
    setOpen(!open);
  };
  const [pOpen, setPOpen] = useState(false);

  const handleAccordionToggleP = () => {
    setPOpen(!pOpen);
  };

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedCategories([...selectedCategories, value]);
    } else {
      setSelectedCategories(selectedCategories.filter((cat) => cat !== value));
    }
  };

  const handleCourseTypeChange = (event) => {
    setCourseType(event.target.value);
  };

  const Reset = () => {
    setSelectedCategories([]);
    setCourseType("");
  };

  return (
    <>
      <div className="font-roboto">
        <h2 className="pt-10 pb-2 text-3xl text-[#140342] font-bold text-center">
          Our Courses
        </h2>
        <h2 className="text-md text-gray-600 text-center">
          Write an introductory description of the category.
        </h2>
        <div className="w-11/12 md:flex mt-12 mx-auto ">
          <div className="md:w-3/12 my-4 ms-4">
            <div>
              <ul className="space-x-2">
                <h3 className="text-2xl w-full" onClick={handleAccordionToggle}>
                  <button
                    className="flex w-full px-2 py-2 text-left items-center justify-between"
                    aria-expanded={!open}
                  >
                    Categories
                    <span className="pe-8 mt-1 text-sm">
                      {open ? (
                        <FiChevronUp className="text-2xl" />
                      ) : (
                        <FiChevronDown className="text-2xl" />
                      )}
                    </span>
                  </button>
                </h3>
                {loading && (
                  <>
                    <Skeleton active={true} width={220} />
                    <Skeleton active={true} width={270} />
                    <Skeleton active={true} width={250} />
                    <Skeleton active={true} width={220} />
                    <Skeleton active={true} width={250} />
                    <Skeleton active={true} width={220} />
                    <Skeleton active={true} width={270} />
                    <Skeleton active={true} width={250} />
                    <Skeleton active={true} width={220} />
                    <Skeleton active={true} width={250} />
                    <Skeleton active={true} width={220} />
                    <Skeleton active={true} width={270} />
                    <Skeleton active={true} width={250} />
                    <Skeleton active={true} width={220} />
                    <Skeleton active={true} width={250} />
                  </>
                )}
                {categories.map((category, i) => (
                  <div
                    key={i}
                    className="ms-4 cursor-pointer first:ms-2"
                    aria-labelledby="accordion-title"
                    hidden={open}
                  >
                    <label className="capitalize">
                      <input
                        style={{ height: "14px", width: "14px" }}
                        className="me-2 bg-light"
                        type="checkbox"
                        value={category?._id}
                        checked={selectedCategories.includes(category?._id)}
                        onChange={handleCategoryChange}
                      />
                      {category?.name}
                    </label>
                  </div>
                ))}
              </ul>

              <div className="text-start md:text-center my-6 w-full">
                <a
                  onClick={Reset}
                  className=" w-full px-20 md:px-14 lg:px-24 cursor-pointer border-2 border-[#140342] hover:bg-[#140342] text-[#140342] hover:text-white py-2 rounded-sm duration-300"
                >
                  Reset
                </a>
              </div>
            </div>
          </div>
          <div className="w-full md:w-9/12 px-2 md:px-0 text-center justify-center mx-auto">
            <div className="flex justify-between mx-4 mb-2">
              <p className="text-center ">Total Course {totalCourse} </p>
              <p className="text-center ">
                Page {courses?.currentPage} of {courses?.totalPages}{" "}
              </p>
            </div>
            <div className=" min-h-screen flex flex-wrap  mx-auto 2xl:justify-start ">
              {loading &&
                Array.from({ length: 6 }).map((item, index) => (
                  <div
                    className="first:ps-0 w-12/12 sm:w-6/12 lg:w-4/12"
                    key={index}
                  >
                    <Stack spacing={1} sx={{ width: "287px" }}>
                      <Skeleton
                        variant="rectangular"
                        width={287}
                        height={150}
                      />
                      <Skeleton variant="rounded" width={287} height={20} />
                      <Skeleton variant="rounded" width={200} height={20} />
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
                        <Box>
                          <Skeleton variant="rounded" width={100} height={20} />
                          <Skeleton
                            sx={{ marginTop: 1 }}
                            variant="rounded"
                            width={100}
                            height={20}
                          />
                        </Box>
                      </Stack>
                    </Stack>
                  </div>
                ))}
              {courses?.course?.length > 0 &&
                courses?.course?.map((item, index) => (
                  <div
                    className="first:ps-0 w-12/12 sm:w-6/12 lg:w-4/12"
                    key={index}
                  >
                    <CourseCard item={item} index={index} />
                  </div>
                ))}
            </div>
            <div className="flex justify-center my-12">
              <ReactPaginate
                previousLabel={"<"}
                nextLabel={">"}
                breakLabel={"..."}
                pageCount={totalPages}
                pageRangeDisplayed={2}
                marginPagesDisplayed={1}
                onPageChange={handlePageClick}
                activeClassName="active"
                containerClassName={"pagination flex justify-center"}
                pageClassName={"page-item"}
                pageLinkClassName={
                  "page-link rounded-full px-3 w-14 bg-blue-100 p-2 mr-2 hover:text-white hover:bg-[#140342] duration-300"
                }
                previousClassName={"page-item"}
                previousLinkClassName={"page-link rounded-full px-3 py-2 me-1"}
                nextClassName={"page-item"}
                nextLinkClassName={
                  "page-link border rounded-full px-3 py-2 me-1"
                }
                breakClassName={"page-item"}
                breakLinkClassName={
                  "page-link border rounded-full px-3 py-2 me-1"
                }
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Course;
