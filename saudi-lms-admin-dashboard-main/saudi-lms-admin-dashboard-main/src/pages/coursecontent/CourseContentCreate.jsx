import React from "react";
import CourseCreateForm from "../../components/course/CourseCreateForm";
import title from "../../utils/title.js";
import CourseContentCreateForm from "../../components/coursecontent/CourseContentCreateForm.jsx";

const CourseContentCreate = () => {
  title("Create Course Content");
  return (
    <>
      <div
      >
        <CourseContentCreateForm />
      </div>
    </>
  );
};

export default CourseContentCreate;
