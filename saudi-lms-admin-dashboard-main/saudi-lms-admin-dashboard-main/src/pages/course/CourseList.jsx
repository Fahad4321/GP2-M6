import React from "react";
import CourseListTable from "../../components/course/CourseListTable";
import title from "../../utils/title.js";

const CourseList = () => {
  title("Course List");
  return (
    <>
      <CourseListTable />
    </>
  );
};

export default CourseList;
