import React from "react";
import title from "../../utils/title.js";
import CategoryUpdateForm from "../../components/category/CategoryUpdateForm.jsx";

const CategoryUpdate = () => {
  title("Course Update");
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <CategoryUpdateForm />
      </div>
    </>
  );
};

export default CategoryUpdate;
