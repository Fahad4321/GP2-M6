import React from "react";
import title from "../../utils/title.js";
import CategoryListTable from "../../components/category/CategoryListTable.jsx";

const CategoryList = () => {
  title("Course List");
  return (
    <>
      <CategoryListTable />
    </>
  );
};

export default CategoryList;
