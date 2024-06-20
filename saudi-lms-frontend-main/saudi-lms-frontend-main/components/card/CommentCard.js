import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import moment from "moment";
import ReplyIcon from "@mui/icons-material/Reply";
import ReplyForm from "../dashboard/courseView/ReplyForm";
import { useSelector } from "react-redux";
import axiosInstance from "../../helper/axiosInstance";
import CommentOrReplyEditForm from "../dashboard/courseView/CommentOrReplyEditForm";
import Swal from "sweetalert2";

const CommentCard = ({
  comment,
  isReplyable,
  topLevelCommentId,
  setRefetchComment,
  isComment,
}) => {
  const { currentUser } = useSelector((state) => state.auth);
  const [isReply, setIsReply] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [updatableCommentContent, setUpdatableCommentContent] = useState({
    commentId: "",
    content: "",
  });
  const [updatableReplyContent, setUpdatableReplyContent] = useState({
    commentId: "",
    replyId: "",
    content: "",
  });

  const handleDelete = () => {
    // if it's comment, call the comment api to delete, els call reply api
    if (isComment) {
      const url = `/comment/delete/${comment?._id}`;
      handleDeleteCommentOrReply(url);
    } else {
      const url = `/comment/reply/delete/${topLevelCommentId}/${comment?._id}`;
      handleDeleteCommentOrReply(url);
    }
  };

  const handleEdit = async () => {
    if (isComment) {
      setIsUpdate(true);
      setUpdatableCommentContent({
        commentId: comment?._id,
        content: comment?.content,
      });
    } else {
      setIsUpdate(true);
      setUpdatableReplyContent({
        commentId: topLevelCommentId,
        replyId: comment?._id,
        content: comment?.content,
      });
    }
  };

  const handleDeleteCommentOrReply = (url) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axiosInstance.delete(url);
          if (response?.status === 200) {
            Swal.fire({
              title: "Deleted!",
              text: "Your content has been deleted.",
              icon: "success",
            });
            setRefetchComment((prev) => !prev);
          }
        } catch (error) {
          Swal.fire({
            title: "Opps!",
            text: error?.message || "Something went wrong",
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <div
      className="shadow-sm group p-3 flex justify-between items-start rounded-md mt-1 bg-gray-50"
      key={comment?._id}
    >
      <div>
        <div className="flex gap-3 items-center">
          <div>
            <FaUserCircle className="text-4xl" />
          </div>
          <div>
            <h6 className="capitalize">
              {comment?.user?.firstName} {comment?.user?.lastName}
            </h6>
            <p>
              {" "}
              {comment?.createdAt ? moment(comment?.createdAt).fromNow() : null}
            </p>
          </div>
        </div>
        <p className="mt-3 ml-1">{comment?.content}</p>
        {!isReply && isReplyable && (
          <button
            className="text-blue-400 underline mt-2 ml-1"
            onClick={() => setIsReply(true)}
          >
            Reply
            <ReplyIcon />
          </button>
        )}

        {isReply && isReplyable && (
          <ReplyForm
            parentId={comment?._id}
            setIsReply={setIsReply}
            commentId={topLevelCommentId}
            setRefetchComment={setRefetchComment}
          />
        )}
        {isUpdate && (
          <CommentOrReplyEditForm
            prevData={
              updatableCommentContent.content || updatableReplyContent.content
            }
            setIsUpdate={setIsUpdate}
            updatableCommentContent={updatableCommentContent}
            updatableReplyContent={updatableReplyContent}
            isComment={isComment}
            setRefetchComment={setRefetchComment}
          />
        )}
      </div>
      {currentUser._id === comment?.user?._id && (
        <div className="hidden gap-2 group-hover:block">
          <button
            onClick={handleEdit}
            class="bg-blue-500 hover:bg-blue-700 mr-2 text-white font-bold py-2 px-4 rounded"
          >
            Edit
          </button>

          <button
            onClick={handleDelete}
            class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default CommentCard;
