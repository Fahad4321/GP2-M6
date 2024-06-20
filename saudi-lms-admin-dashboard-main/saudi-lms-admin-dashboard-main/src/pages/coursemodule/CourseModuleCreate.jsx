import React from "react";
import CourseCreateForm from "../../components/course/CourseCreateForm";
import title from "../../utils/title.js";
import CourseModuleCreateForm from "../../components/coursemodule/CourseModuleCreateForm.jsx";

const CourseModuleCreate = () => {
  title("Create Course Module");
  return (
    <>
      <div
      >
        <CourseModuleCreateForm />
      </div>
    </>
  );
};

export default CourseModuleCreate;
