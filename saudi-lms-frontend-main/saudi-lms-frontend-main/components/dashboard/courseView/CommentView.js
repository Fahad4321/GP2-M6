import React, { useCallback, useEffect, useState } from "react";
import CommentCard from "../../card/CommentCard";
import calculateTotalComments from "../../../utils/calculateTotalComments";
import CommentSkeleton from "./CommentSkeleton";
import axiosInstance from "../../../helper/axiosInstance";
import CommentForm from "./CommentForm";

const CommentView = ({ commentQueries }) => {
  const [viewRelies, setViewReplies] = useState([]);
  const [viewNestedRelies, setViewNestedReplies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refetchComment, setRefetchComment] = useState(true);
  const [commentData, setCommentData] = useState([]);
  const { courseId, moduleId, lessonId } = commentQueries;

  const handleViewReply = useCallback((index, replyType) => {
    if (replyType === "reply") {
      setViewReplies((prev) => [...prev, index]);
    } else if (replyType === "nReply") {
      setViewNestedReplies((prev) => [...prev, index]);
    }
  }, []);

  // fetch comment for this specific lesson
  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const { data } = await axiosInstance.get(
          `/comments/${courseId}/${moduleId}/${lessonId}`
        );
        if (data) {
          setCommentData(data);
          setLoading(false);
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.log({
          message: "Error to fetch comments",
          error: error.message,
        });
        setLoading(false);
      }
    })();
  }, [courseId, moduleId, lessonId, refetchComment]);

  return (
    <div className="my-16">
      <div className="">
        <h5 className="text-3xl font-bold">
          Comments ({calculateTotalComments(commentData)})
        </h5>
        <CommentForm
          courseId={courseId}
          moduleId={moduleId}
          lessonId={lessonId}
          setRefetchComment={setRefetchComment}
        />
      </div>
      {loading ? (
        <CommentSkeleton loading={loading} />
      ) : (
        <div className=" flex flex-col gap-5">
          {commentData?.map((cmt, index1) => (
            <div className="shadow-sm p-3 rounded-md" key={cmt._id}>
              <CommentCard
                comment={cmt}
                isReplyable={true}
                topLevelCommentId={cmt._id}
                setRefetchComment={setRefetchComment}
                isComment={true}
              />
              {cmt?.replies?.length > 0 && !viewRelies.includes(index1) && (
                <button
                  onClick={() => handleViewReply(index1, "reply")}
                  className="text-blue-500 underline"
                >
                  View all {cmt.replies.length} replies
                </button>
              )}

              {viewRelies.includes(index1) && (
                <div className="ml-5">
                  {cmt.replies.length > 0 &&
                    cmt.replies.map((reply, index2) => (
                      <div key={reply._id}>
                        <CommentCard
                          comment={reply}
                          isReplyable={true}
                          topLevelCommentId={cmt._id}
                          setRefetchComment={setRefetchComment}
                          isComment={false}
                        />
                        {reply?.replies?.length > 0 &&
                          !viewNestedRelies.includes(index2) && (
                            <button
                              onClick={() => handleViewReply(index2, "nReply")}
                              className="text-blue-500 underline"
                            >
                              View all {reply.replies.length} replies
                            </button>
                          )}
                        {viewNestedRelies.includes(index2) && (
                          <div className="ml-5">
                            {reply?.replies?.length > 0 &&
                              reply.replies.map((nestedReply) => (
                                <CommentCard
                                  key={nestedReply._id}
                                  comment={nestedReply}
                                  isReplyable={false}
                                  topLevelCommentId={cmt._id}
                                  setRefetchComment={setRefetchComment}
                                  isComment={false}
                                />
                              ))}
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentView;
