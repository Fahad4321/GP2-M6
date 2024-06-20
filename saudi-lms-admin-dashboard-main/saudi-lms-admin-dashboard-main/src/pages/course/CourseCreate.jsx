import React from "react";
import CourseCreateForm from "../../components/course/CourseCreateForm";
import title from "../../utils/title.js";

const CourseCreate = () => {
  title("Create A Course");
  return (
    <>
      <div
      >
        <CourseCreateForm />
      </div>
    </>
  );
};

export default CourseCreate;
