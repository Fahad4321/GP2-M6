import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import { useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import axiosInstance from "../../../helper/axiosInstance";

const CommentForm = ({ courseId, moduleId, lessonId, setRefetchComment }) => {
  const { currentUser } = useSelector((state) => state.auth);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmitComment = async () => {
    setLoading(true);
    const postData = {
      courseId,
      moduleId,
      lessonId,
      user: currentUser?._id,
      content: comment,
    };
    try {
      const response = await axiosInstance.post(
        `/comment/post-comment`,
        postData
      );
      if (response?.status === 201) {
        setLoading(false);
        setComment("");
        setRefetchComment((prev) => !prev);
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      setError(error?.message);
    } finally {
      setLoading(false);
      setError("");
      setComment("");
    }
  };
  return (
    <Form
      layout="vertical"
      style={{
        maxWidth: 500,
        display: "flex",
        flexDirection: "column",
        marginTop: "10px",
      }}
    >
      <Form.Item
        style={{ width: "100%" }}
        name="comment"
        rules={[
          {
            required: true,
            message: "Please write your comment!",
          },
        ]}
      >
        <Input.TextArea
          onChange={(e) => setComment(e.target.value)}
          placeholder="Leave a comment"
          value={comment}
        />
        {error && <p>{error}</p>}
      </Form.Item>

      <Form.Item className="-mt-5 flex justify-end">
        {loading ? (
          <Button className="bg-white cursor-not-allowed py-6 px-6 flex justify-center items-center">
            <Box sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          </Button>
        ) : (
          <Button
            className="bg-blue-500 py-4 px-6 flex justify-center items-center"
            type="primary"
            htmlType="submit"
            disabled={!comment.trim()}
            onClick={handleSubmitComment}
          >
            Post
          </Button>
        )}
      </Form.Item>
    </Form>
  );
};

export default CommentForm;
