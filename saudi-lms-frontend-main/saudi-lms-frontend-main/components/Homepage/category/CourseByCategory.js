/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useRouter } from "next/router";
import React from "react";
import { getToken } from "../../../helper/sessionStorage";
import CourseCard from "../../Coursepage/CourseCard";
import ReactPaginate from "react-paginate";
import { Avatar, Box, Skeleton, Stack } from "@mui/material";

const CourseByCategory = () => {
  const [data, setData] = React.useState([]);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [perPage, setPerPage] = React.useState(10);
  const [totalCourse, setTotalCourse] = React.useState();
  const [totalPages, setTotalPages] = React.useState();
  const [loading, setLoading] = React.useState(true);

  const router = useRouter();
  const { id } = router.query;

  React.useEffect(() => {
    CourseList();
  }, [id, currentPage, perPage, totalPages]);

  const CourseList = async () => {
    try {
      const token = getToken();
      const AuthToken = { headers: { Authorization: `Bearer ${token}` } };
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_URL}/courses/${id}/category/?pageNo=${currentPage}&perPage=${perPage}`,
        AuthToken
      );
      setData(data.course);
      setTotalCourse(data?.totalCourse);
      setTotalPages(data?.totalPages);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handlePageClick = ({ selected }) => {
    const newPage = selected + 1;
    setCurrentPage(newPage);
  };

  return (
    <div>
      <h2 className="pt-10 pb-2 text-3xl text-[#140342] font-bold text-center font-roboto">
        Our Courses
      </h2>
      <h2 className="text-md text-gray-600 text-center font-roboto">
        Courses in your preferred category.
      </h2>
      <div className="  flex flex-wrap container md:px-28 my- mx-auto justify-center 2xl:justify-center ">
        {loading &&
          Array.from({ length: 6 }).map((item, index) => (
            <div
              className="first:ps-0 w-12/12 sm:w-6/12 lg:w-4/12 mt-9"
              key={index}
            >
              <Stack spacing={1} sx={{ width: "287px" }}>
                <Skeleton variant="rectangular" width={287} height={150} />
                <Skeleton variant="rounded" width={287} height={20} />
                <Skeleton variant="rounded" width={200} height={20} />
                <Stack direction="row" sx={{ justifyContent: "space-between" }}>
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
      </div>
      <div className=" flex flex-wrap container md:px-28 my-12 mx-auto justify-center 2xl:justify-center  font-roboto">
        {data?.map((item, index) => (
          <div key={index} className=" w-12/12 sm:w-6/12 lg:w-4/12 xl:w-4/12 ">
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
          nextLinkClassName={"page-link border rounded-full px-3 py-2 me-1"}
          breakClassName={"page-item"}
          breakLinkClassName={"page-link border rounded-full px-3 py-2 me-1"}
        />
      </div>
    </div>
  );
};

export default CourseByCategory;
