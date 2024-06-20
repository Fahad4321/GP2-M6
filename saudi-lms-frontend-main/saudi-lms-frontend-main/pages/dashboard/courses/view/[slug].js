/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from "next/router";
import * as React from "react";
import Head from "next/head";
import DescriptionIcon from "@mui/icons-material/Description";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import axiosInstance from "../../../../helper/axiosInstance";
import { Col, Collapse, Row, Skeleton } from "antd";
import { useEffect, useState } from "react";
import DashboardHeader from "../../../../components/dashboard/layouts/DashboardHeader";
import VideoPlayer from "../../../../components/dashboard/courseView/VideoPlayer";
import { useSelector } from "react-redux";
import { checkRole } from "../../../../middleware/checkRole";
import withAuth from "../../../../middleware/withAuth";
import CommentView from "../../../../components/dashboard/courseView/CommentView";
import ResourceView from "../../../../components/dashboard/courseView/ResourceView";

const { Panel } = Collapse;

const ViewCoursePage = () => {
  const router = useRouter();
  const { courseId: dynamicCourseId } = router.query;
  const [loading, setLoading] = useState(false);
  const [course, setCourse] = useState({});
  const [video, setVideo] = useState(null);
  const [key, setKey] = useState(0);
  const [defaultModule, setDefaultModule] = useState("");
  const { currentUser } = useSelector((state) => state.auth);
  const [commentQueries, setCommentQueries] = useState({
    courseId: "",
    moduleId: "",
    lessonId: "",
  });

  const getFirstModuleFirstVideo = (modules, course) => {
    const getRunningVideo = JSON.parse(
      localStorage.getItem(`video${currentUser?._id}${course}`)
    );
    // if (getRunningVideo){

    setDefaultModule(getRunningVideo?.moduleId);
    const isMatch = modules.find(
      (module) => module?._id === getRunningVideo?.moduleId
    );
    if (isMatch) {
      setVideo(getRunningVideo);
    } else {
      const moduleNo1 = modules.find((module) => module?.moduleNo === 1);
      setDefaultModule(moduleNo1?._id);
      // Check if moduleNo 1 exists
      if (moduleNo1) {
        // Get the first content
        const firstContent = moduleNo1?.contents[0];
        // Check if the first content exists
        if (firstContent) {
          setVideo(firstContent);
        }
      }
    }
  };

  useEffect(() => {
    (async () => {
      if (checkRole("user")) {
        setLoading(true);
        const { data } = await axiosInstance.get(
          `/courses/my-course/${dynamicCourseId}`
        );
        console.log(data);
        setLoading(false);
        setCourse(data);

        // expose comment queries start
        const modules = data?.modules;
        const courseId = data?._id;
        const courseModule = modules?.length > 0 ? modules[0] : [];
        const moduleId = courseModule?._id;
        const contents = courseModule?.contents;
        const content = contents?.length > 0 ? contents[0] : [];
        const lessonId = content?._id;
        setCommentQueries({ courseId, moduleId, lessonId });
        // expose comment queries end

        getFirstModuleFirstVideo(data?.modules, data?._id);
      } else if (checkRole("teacher")) {
        setLoading(true);
        const { data } = await axiosInstance.get(
          `/courses/teacher/${dynamicCourseId}`
        );
        setLoading(false);
        setCourse(data);
        // expose comment queries start
        const modules = data?.modules;
        const courseId = data?._id;
        const courseModule = modules?.length > 0 ? modules[0] : [];
        const moduleId = courseModule?._id;
        const contents = courseModule?.contents;
        const content = contents?.length > 0 ? contents[0] : [];
        const lessonId = content?._id;
        setCommentQueries({ courseId, moduleId, lessonId });
        // expose comment queries end
        getFirstModuleFirstVideo(data?.modules, data?._id);
      }
    })();
  }, [dynamicCourseId, currentUser?._id]);
  const onChange = () => {};

  const videoChange = (content, course) => {
    // set the course, module and lesson id to fetch comments start
    const commentQuery = {
      courseId: course,
      moduleId: defaultModule,
      lessonId: content._id,
    };
    setCommentQueries(() => commentQuery);
    // set the course, module and lesson id to fetch comments end

    setVideo(content);
    setKey(key + 1);
    content.course = course;
    localStorage.setItem(
      `video${currentUser?._id}${course}`,
      JSON.stringify(content)
    );
  };

  return (
    <>
      <Head>
        <title>{`View Course ${process.env.NEXT_PUBLIC_APP_NAME}`}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <DashboardHeader />

      <Skeleton loading={loading}>
        <h3 className="text-orange-600 font-bold p-4 text-4xl">
          {course?.name}
        </h3>
        <Row className="p-4" gutter={20}>
          <Col span={16}>
            {video ? (
              <>
                {video?.contentType === "Lesson" && (
                  <VideoPlayer key={key} video={video} />
                )}
                {video?.contentType === "Resource" && (
                  <ResourceView key={key} video={video} />
                )}
              </>
            ) : (
              <div className="lg:py-32 md:py-20 py-10 flex justify-center items-center  bg-white lg:px-10 md:px-6 px-3">
                <h6 className="text-2xl font-semibold">
                  No content uploaded yet.
                </h6>
              </div>
            )}

            {/* comment view section  */}
            <CommentView commentQueries={commentQueries} />
          </Col>
          <Col span={8}>
            <Collapse defaultActiveKey={defaultModule} onChange={onChange}>
              {course?.modules?.map((module) => (
                <Panel header={`${module?.name}`} key={`${module?._id}`}>
                  {module?.contents
                    ?.sort((content) => content?.serialNo)
                    ?.map((content) => (
                      <p
                        key={content?._id}
                        onClick={() => videoChange(content, course?._id)}
                        className={`py-3 cursor-pointer hover:bg-gray-100 px-2 ${
                          video?.videoTitle === content?.videoTitle
                            ? "bg-gray-200"
                            : ""
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          {content?.videoTitle}
                          {content?.contentType === "Resource" ? (
                            <DescriptionIcon />
                          ) : (
                            <PlayCircleIcon />
                          )}
                        </div>
                      </p>
                    ))}
                </Panel>
              ))}
            </Collapse>
          </Col>
        </Row>
      </Skeleton>
    </>
  );
};
export default withAuth(ViewCoursePage);
