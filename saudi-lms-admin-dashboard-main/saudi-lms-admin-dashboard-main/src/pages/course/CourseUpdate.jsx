import React from "react";
import CourseUpdateForm from "../../components/course/CourseUpdateForm";
import title from "../../utils/title.js";

const CourseUpdate = () => {
  title("Course Update");
  return (
    <>
      <div>
        <CourseUpdateForm />
      </div>
    </>
  );
};

export default CourseUpdate;
