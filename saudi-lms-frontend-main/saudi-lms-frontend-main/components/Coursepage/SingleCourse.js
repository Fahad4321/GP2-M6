/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Footer from "../layout/Footer";
import Header from "../layout/Header";
import axios from "axios";
import Link from "next/link";
import { getToken } from "../../helper/sessionStorage";
import {
  FaHeart,
  FaCartArrowDown,
  FaUserClock,
  FaClock,
  FaStar,
} from "react-icons/fa";
import { TiTick } from "react-icons/ti";
import { useRouter } from "next/router";
import BorderColorOutlinedIcon from "@mui/icons-material/BorderColorOutlined";

import { useSnackbar } from "notistack";
import moment from "moment";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import { Box } from "@mui/material";
import { HideLoader, ShowLoader, store } from "../../redux/store";
import { Empty, Skeleton, message } from "antd";
import { toast } from "react-hot-toast";
import { jwtDecode } from "../../helper/jwtDecode";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  backgroundColor: "#14034211",
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  display: "flex",
  justifyContent: "space-between",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginRight: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const SingleCourse = () => {
  const [data, setData] = React.useState([]);
  const [expanded, setExpanded] = React.useState("panel1");
  const [comment, setComment] = React.useState("");
  const [rating, setRating] = React.useState(0);
  const [ratingUpdate, setRatingUpdate] = React.useState(0);
  const [review, setReview] = React.useState("");
  const [courseReviews, setCourseReviews] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [expandedComments, setExpandedComments] = React.useState([]);

  const toggleComment = (index) => {
    setExpandedComments((prevExpandedComments) => {
      const newExpandedComments = [...prevExpandedComments];
      newExpandedComments[index] = !newExpandedComments[index];
      return newExpandedComments;
    });
  };

  const startingDate = moment(data?.startingDate);
  const currentDate = moment();
  const daysLeft = startingDate.diff(currentDate, "days");

  // console.log("rating", rating)
  const { enqueueSnackbar } = useSnackbar();

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const router = useRouter();
  const { id } = router.query;
  const token = getToken();
  const tokenDecode = jwtDecode(token);

  React.useEffect(() => {
    CourseList();
    CourseReview();
  }, [id, token]);

  const CourseList = async () => {
    try {
      const token = getToken();
      const AuthToken = { headers: { Authorization: `Bearer ${token}` } };
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_URL}/courses/published/${id}`,
        AuthToken
      );
      setData(data.course);
      // console.log("data",data)
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  const CourseReview = async () => {
    try {
      const token = getToken();
      const AuthToken = { headers: { Authorization: `Bearer ${token}` } };
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_URL}/course/${id}/reviews?page=1&limit=3`,
        AuthToken
      );
      setCourseReviews(data.reviews);
      console.log("Course review", data.reviews);
    } catch (err) {
      console.log(err);
    }
  };

  const AddToCart = async (event) => {
    event.preventDefault();
    try {
      const token = getToken();
      const AuthToken = { headers: { Authorization: `Bearer ${token}` } };
      if (!token) {
        enqueueSnackbar(`Login First`, { variant: "error" });
        router.push("/login");
        return;
      }
      store.dispatch(ShowLoader());
      await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/add-cart`,
        { courseId: data._id },
        AuthToken
      );
      store.dispatch(HideLoader());
      enqueueSnackbar("Course added to cart", { variant: "success" });
    } catch (err) {
      console.error(err);
      store.dispatch(HideLoader());
      enqueueSnackbar(err?.response?.data, { variant: "error" });
    }
  };

  const AddToWishlist = async (event) => {
    event.preventDefault();
    try {
      const token = getToken();
      const AuthToken = { headers: { Authorization: `Bearer ${token}` } };
      if (!token) {
        enqueueSnackbar(`Login First`, { variant: "error" });
        router.push("/login");
        return;
      }
      store.dispatch(ShowLoader());
      await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/wishlist`,
        { courseId: data._id },
        AuthToken
      );
      store.dispatch(HideLoader());

      enqueueSnackbar("Course Favorite Success", { variant: "success" });
    } catch (err) {
      console.error(err);
      store.dispatch(HideLoader());
      enqueueSnackbar(err?.response?.data, { variant: "error" });
    }
  };

  const handleRatingChange = (event) => {
    setRating(parseInt(event.target.value));
  };
  const handleRatingUpdate = (event) => {
    setRatingUpdate(parseInt(event.target.value));
  };

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const AddComment = async (event) => {
    event.preventDefault();
    try {
      const token = getToken();
      const AuthToken = { headers: { Authorization: `Bearer ${token}` } };
      if (!token) {
        toast.error(`Login First`, { variant: "error" });
        router.push("/login");
        return;
      }
      store.dispatch(ShowLoader());
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_URL}/courses/${id}/reviews`,
        { comment: review, rating: rating },
        AuthToken
      );
      store.dispatch(HideLoader());
      setRating(0);
      setReview("");
      enqueueSnackbar("Review Success", { variant: "success" });
    } catch (err) {
      console.error(err);
      store.dispatch(HideLoader());
      enqueueSnackbar(err?.response?.data?.error, { variant: "error" });
    }
  };
  const UpdateReview = async (reviewId) => {
    console.log("reviewId", reviewId);
    try {
      const token = getToken();
      const AuthToken = { headers: { Authorization: `Bearer ${token}` } };
      store.dispatch(ShowLoader());
      const { data } = await axios.put(
        `${process.env.NEXT_PUBLIC_URL}/courses/${reviewId}/reviews`,
        { comment: comment, rating: ratingUpdate },
        AuthToken
      );
      store.dispatch(HideLoader());
      setExpandedComments([]);
      CourseReview();
      CourseList();
      setRating(0);
    } catch (err) {
      console.error(err);
      store.dispatch(HideLoader());
      enqueueSnackbar(err?.response?.data, { variant: "error" });
    }
  };

  const generateStars = (reviews) => {
    const stars = [];
    for (let i = 1; i <= reviews; i++) {
      stars.push(
        <FaStar key={i} className="text-yellow-500 inline-block mr-1" />
      );
    }
    return stars;
  };

  const colors = [
    "bg-[#140342]",
    "bg-green-500",
    "bg-orange-500",
    "bg-purple-500",
    "bg-red-700",
    "bg-blue-600",
    "bg-pink-600",
    "bg-red-600",
  ];
  const contentsLength = data?.modules?.reduce(
    (total, module) => total + module.contents.length,
    0
  );

  const [activeLink, setActiveLink] = React.useState("");

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <div>
      {loading && (
        <div className="relative container flex flex-col content-center px-4 lg:px-20 mx-auto leading-6 md:flex-row max-w-8xl">
          <div className="box-border w-full text-black border-solid md:w-7/12 py-12">
            <Skeleton
              active
              size={300}
              title={false}
              paragraph={true}
              className="mt-16 w-full px-4"
            />
            <Skeleton
              active
              size={300}
              title={true}
              paragraph={false}
              className="mt-16 w-full px-4"
            />
            <Skeleton
              active
              size={300}
              title={false}
              paragraph={true}
              className="mt-4 w-full px-4"
            />
            <div className="flex justify-between mx-4 mt-12">
              <Skeleton.Button active className="mt-2" />
              <Skeleton.Button active className="mt-2" />
              <Skeleton.Button active className="mt-2" />
              <Skeleton.Button active className="mt-2" />
              <Skeleton.Button active className="mt-2" />
              <Skeleton.Button active className="mt-2" />
            </div>
          </div>
          <div className="w-full max-w-md mx-auto text-center my-4 md:w-5/12 px-4 py-20">
            <Skeleton.Input active size={300} className="" />
            <Skeleton
              active
              size={300}
              title={true}
              paragraph={false}
              className="mt-4 w-full px-16"
            />
            <div className="flex justify-between  px-16 mt-4 ">
              <Skeleton.Button active className="mt-2" />
              <Skeleton.Button active className="mt-2" />
              <Skeleton.Button active className="mt-2" />
            </div>
            <Skeleton
              active
              size={300}
              title={true}
              paragraph={false}
              className="mt-4 w-full px-16"
            />
            <Skeleton
              active
              size={300}
              title={true}
              paragraph={false}
              className="mt-4 w-60 px-16"
            />
          </div>
        </div>
      )}
      <div className="relative container flex flex-col content-center px-4 lg:px-20 mx-auto leading-6 md:flex-row max-w-8xl font-roboto">
        <div className="box-border w-full text-black border-solid md:w-7/12 py-10 md:py-20">
          <div className="">
            <h1 className="font-bold text-5xl leading-tight capitalize">
              {data?.name}
            </h1>
            <p className="mt-4 font- text-md">
              Hands on experience with real life projects live, live
              masterclassNamees from industry experts, job market guidelines,
              job/internship opportunities - all together now live, with
              masters.
            </p>
          </div>
          {/* Nav Section */}
          <div className="course mt-10 sticky top-12  bg-gray-100 z-10">
            <ul className="flex flex-wrap py-4">
              <li className="mt-6">
                <a
                  href="#study-plan"
                  className={`px-3 py-2 border me-2 rounded-lg ${
                    activeLink === "study-plan"
                      ? "bg-[#140342] text-white border-none"
                      : ""
                  }`}
                  onClick={() => handleLinkClick("study-plan")}
                >
                  Study Plan
                </a>
              </li>
              <li className="mt-6">
                <a
                  href="#instructor"
                  className={`px-3 py-2 border me-2 rounded-lg ${
                    activeLink === "instructor"
                      ? "bg-[#140342] text-white border-none"
                      : ""
                  }`}
                  onClick={() => handleLinkClick("instructor")}
                >
                  Instructor
                </a>
              </li>
              <li className="mt-6">
                <a
                  href="#about"
                  className={`px-3 py-2 border me-2 rounded-lg ${
                    activeLink === "about"
                      ? "bg-[#140342] text-white border-none"
                      : ""
                  }`}
                  onClick={() => handleLinkClick("about")}
                >
                  About
                </a>
              </li>
              <li className="mt-6">
                <a
                  href="#help"
                  className={`px-3 py-2 border me-2 rounded-lg ${
                    activeLink === "help"
                      ? "bg-[#140342] text-white border-none"
                      : ""
                  }`}
                  onClick={() => handleLinkClick("help")}
                >
                  Help
                </a>
              </li>

              <li className="mt-6">
                <a
                  href="#reviews"
                  className={`px-3 py-2 border me-2 rounded-lg ${
                    activeLink === "reviews"
                      ? "bg-[#140342] text-white border-none"
                      : ""
                  }`}
                  onClick={() => handleLinkClick("reviews")}
                >
                  Reviews
                </a>
              </li>
            </ul>
          </div>

          {/* Study Plan Section */}
          <div id="study-plan" className="mt-4">
            <div className="flex items-center">
              <h1 className="font-bold text-xl">Study Plan</h1>
              <p className="ms-14 px-2 text-sm">
                {data?.modules?.length} modules
              </p>
              <p> | </p>
              <p className="px-2 text-sm">{contentsLength} Classes</p>
            </div>
            <hr className="my-4" />

            {data?.modules?.map((item, i) => (
              <Accordion
                expanded={expanded === i}
                onChange={handleChange(i)}
                key={i}
                className="rounded-lg my-2 "
              >
                <AccordionSummary
                  aria-controls="panel1d-content"
                  id="panel1d-header"
                >
                  <div className=" text-[#140342] flex justify-between items-center cursor-pointer">
                    <div className="flex items-center">
                      <div
                        className={`flex flex-wrap justify-center items-center h-16 w-16 p-2 ${
                          colors[i % colors.length]
                        } rounded-lg`}
                      >
                        <h1 className="text-white text-sm">Module</h1>
                        <h1 className="text-white text-md font-bold">
                          {" "}
                          {item?.moduleNo}
                        </h1>
                      </div>
                      <p className="py-2 ps-2 font-semibold font-xl flex">
                        {item.name}
                      </p>
                    </div>
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                  <Box>
                    {Array.from(item.contents).map((list, i) => (
                      <Box
                        className="md:p-3 flex items-center hover:border-r-2 hover:border-[#14034280]  md:px-6 cursor-default"
                        key={i}
                      >
                        <img
                          className="w-12 h-12"
                          src="https://images.unsplash.com/photo-1611162616475-46b635cb6868?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
                          alt=""
                        />
                        <div variant="body2" className="px-3">
                          <div className="">
                            <p className="px-3 text-gray-600">Day {i + 1}</p>
                            <p className="px-3 text-gray-800 font-semibold">
                              {list.videoTitle}
                            </p>
                          </div>
                        </div>
                      </Box>
                    ))}
                  </Box>
                </AccordionDetails>
              </Accordion>
            ))}
          </div>

          {/* Instructor Section */}
          <div id="instructor" className="mt-12">
            <h1 className="font-bold text-xl ">Instructor</h1>
            <hr className="my-4" />
            <div className="bg-white hover:bg-gray-200 rounded border-x-2 border-[#140342]">
              <div className="flex items-center justify-start px-6 py-3">
                <img
                  src={data?.teacher?.avatar}
                  alt=""
                  className="w-16 h-16 rounded-full"
                />
                <div className="ml-4">
                  <h2 className="font-bold text-lg">
                    {data?.teacher?.firstName} {data?.teacher?.lastName}
                  </h2>
                  <p className="text-gray-500">{data?.teacher?.designation}</p>
                </div>
              </div>
            </div>
          </div>

          {/* About Section */}
          <div id="about" className="mt-20">
            <h1 className="font-bold text-xl ">About the course</h1>
            <hr className="my-4" />
            <p className="text-gray-700">{data?.description}</p>
          </div>

          <div id="help" className="mt-12">
            <h1 className="font-bold text-xl ">Help</h1>
            <hr className="my-4" />
            <p className="">
              For any batch information call{" "}
              <span className="font-bold underline cursor-pointer">
                +966 XX XX XX XX
              </span>
              (10 am to 10 pm)
            </p>
          </div>



          {/* Review Section */}
          {courseReviews?.length > 0 ? (
            <div id="reviews">
              <h1 className="font-bold text-xl mt-12">Reviews</h1>
              <hr className="my-4" />

              <>
                {courseReviews?.map((r, i) => (
                  <div key={i} className="flex flex-col sm:flex-row mb-4">
                    <img
                      src={
                        r?.user?.picture?.secure_url ||
                        "http://localhost:3000/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Feducare.868efafa.png&w=96&q=75"
                      }
                      alt="BAYC"
                      className="h-16 w-16 border border-white rounded-full mr-6"
                    />
                    <div
                      key={i}
                      className="border rounded-lg px-3 my-2 py-2 w-full"
                    >
                      <div className="flex text-gray-500 justify-between">
                        <p className="capitalize">
                          {r?.user?.firstName} {r?.user?.lastName}
                        </p>
                        {r?.user?._id == tokenDecode?._id && (
                          <div className="">
                            <BorderColorOutlinedIcon
                              className="text-gray-400 text-sm cursor-pointer"
                              onClick={() => toggleComment(i)}
                            />
                          </div>
                        )}
                      </div>
                      {expandedComments[i] ? (
                        <>
                          <div className="flex pt-2">
                            {[1, 2, 3, 4, 5].map((star, i) => (
                              <label
                                key={i}
                                htmlFor={`stars-${star}`}
                                className="cursor-pointer "
                              >
                                <input
                                  type="radio"
                                  id={`stars-${star}`}
                                  name="rating"
                                  value={star}
                                  checked={ratingUpdate === star}
                                  onChange={handleRatingUpdate}
                                  className="sr-only"
                                />
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  className={`h-5 w-5 fill-current ${
                                    ratingUpdate >= star
                                      ? "text-yellow-500"
                                      : "text-gray-400"
                                  }`}
                                >
                                  <path d="M12 2L9.44 8.12l-6.34.92a1 1 0 0 0-.55 1.7l4.59 4.72L6.81 22a1 1 0 0 0 1.45.95l5.94-3.13 5.94 3.13a1 1 0 0 0 1.45-.95l-1.08-6.44 4.59-4.72a1 1 0 0 0-.55-1.7l-6.34-.92L12 2zm2.6 14.25l1.98 1.04-.37-2.25 1.54-1.59-2.14-.31L12 8.56l-.61 1.58-2.14.31 1.54 1.59-.37 2.25 1.98-1.04z" />
                                </svg>
                              </label>
                            ))}
                          </div>
                          <div className="flex">
                            <textarea
                              autoFocus={true}
                              className=" w-full mt-2 text-gray-700 bg-gray-100 focus-visible:outline-none"
                              defaultValue={r?.comment}
                              onChange={(e) => {
                                setComment(e.target.value);
                              }}
                            ></textarea>
                            <button
                              onClick={UpdateReview.bind(this, r?._id)}
                              className="bg-[#140342] h-fit text-white text-sm mt-2 py-1 px-2 rounded-lg transition duration-500 ease-in-out"
                            >
                              Update
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="">{generateStars(r?.rating)}</div>
                          <p className=" text-gray-700 mt-2">{r?.comment}</p>
                        </>
                      )}
                      <p className="text-gray-400 text-sm py-2">
                        {moment(comment?.createdAt).format("Do MMM YYYY")}
                      </p>
                    </div>
                  </div>
                ))}
              </>
            </div>
          ) : (
            ""
          )}

          {/* Rating Section */}
          {courseReviews?.find(
            (item) => item.user?._id !== tokenDecode?._id
          ) && (
            <div id="rating" className="w-full sm:w-full mx-auto  mt-12">
              <h1 className="font-bold text-xl ">Write a Review</h1>
              <hr className="my-4" />
              <div className="flex items-start mb-4">
                <label htmlFor="rating" className="mr-4">
                  Rating:
                </label>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star, i) => (
                    <label
                      key={i}
                      htmlFor={`star-${star}`}
                      className="cursor-pointer ms-1"
                    >
                      <input
                        type="radio"
                        id={`star-${star}`}
                        name="rating"
                        value={star}
                        checked={rating === star}
                        onChange={handleRatingChange}
                        className="sr-only"
                      />
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className={`h-5 w-5 fill-current ${
                          rating >= star ? "text-yellow-500" : "text-gray-400"
                        }`}
                      >
                        <path d="M12 2L9.44 8.12l-6.34.92a1 1 0 0 0-.55 1.7l4.59 4.72L6.81 22a1 1 0 0 0 1.45.95l5.94-3.13 5.94 3.13a1 1 0 0 0 1.45-.95l-1.08-6.44 4.59-4.72a1 1 0 0 0-.55-1.7l-6.34-.92L12 2zm2.6 14.25l1.98 1.04-.37-2.25 1.54-1.59-2.14-.31L12 8.56l-.61 1.58-2.14.31 1.54 1.59-.37 2.25 1.98-1.04z" />
                      </svg>
                    </label>
                  ))}
                </div>
              </div>
              <div className="mb-4 space-y-4">
                <label htmlFor="review ">Review Content</label>
                <textarea
                  id="review"
                  name="review"
                  value={review}
                  onChange={handleReviewChange}
                  placeholder="Give your opinion about the post...."
                  className="border border-gray-300 bg-gray-100 h-24 block w-full px-5 py-3 focus-visible:outline-none focus-visible:border-[#14034256] rounded-md "
                ></textarea>
              </div>
              <button
                onClick={AddComment}
                className="bg-[#140342] text-white border border-transparent hover:bg-transparent hover:border hover:text-[#140342]  hover:border-[#140342] font-semibold py-2 mt-2 px-8 rounded-lg transition duration-500 ease-in-out"
              >
                Submit
              </button>
            </div>
          )}
        </div>

        {/* Right Side Section  */}

        <div className=" w-full max-w-md mx-auto text-center my-4 md:w-5/12 px-4 pb-10 pt-4 md:py-20">
          <div className=" sticky top-0 border shadow rounded-lg">
            <img
              src={data?.thumbnail?.secure_url}
              className="w-full rounded-t-lg"
              alt="thumbnail"
            />

            <p className="text-[#140342] text-lg font-medium my-2 px-4 text-start cursor-default capitalize">
              {data?.name}
            </p>

            <hr className="my-4" />
            <div className="flex justify-between px-4 items-center">
              <div className="font-extrabold text-md me-4">
                <p className="font-bold text-2xl">Free</p>
                {/* {data?.sellPrice == 0 ? (
                  <p className="font-bold text-2xl">Free</p>
                ) : (
                  <>
                    <del className="text-red-400 ">
                      <span className="font-bold">৳</span> {data?.regularPrice}
                      /-
                    </del>
                    <p className="">
                      <span className="font-extrabold">৳</span>{" "}
                      {data?.sellPrice}/-
                    </p>
                  </>
                )} */}
              </div>
              <a
                onClick={AddToWishlist}
                className="font-medium items-center text-red-500 cursor-pointer text-2xl p-2"
              >
                {" "}
                <FaHeart />
              </a>
              <a
                onClick={AddToCart}
                className=" bg-[#140342] hover:bg-[#12082c] px-3 py-2 rounded-lg cursor-pointer text-white flex font-medium"
              >
                {" "}
                <FaCartArrowDown className="me-2 mt-1" /> Add to Cart
              </a>
            </div>
            <hr className="my-4" />
            <div className="text-start my-3 mx-4">
              <h1 className="font-bold">In this course you get</h1>
              <div className="">
                <ul className="flex flex-wrap w-full pb-2 text-start">
                  {data?.benefit?.map((item, i) => (
                    <li
                      key={i}
                      className="w-6/12 flex text-xs mt-4 mx-auto text-start"
                    >
                      {" "}
                      <TiTick className="mt-0.5 text-gray-600 border text-sm me-2 border-gray-600 rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleCourse;
