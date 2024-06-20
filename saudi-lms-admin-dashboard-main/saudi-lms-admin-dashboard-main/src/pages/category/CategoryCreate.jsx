import React from "react";
import title from "../../utils/title.js";
import CategoryCreateForm from "../../components/category/CategoryCreateForm.jsx";

const CourseCreate = () => {
  title("Create Category");
  return (
    <>
      <div
      >
        <CategoryCreateForm />
      </div>
    </>
  );
};

export default CourseCreate;
