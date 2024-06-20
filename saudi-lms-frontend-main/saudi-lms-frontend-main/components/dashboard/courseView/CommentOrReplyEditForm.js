import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import axiosInstance from "../../../helper/axiosInstance";

const CommentOrReplyEditForm = ({
  prevData,
  setIsUpdate,
  isComment,
  updatableCommentContent,
  updatableReplyContent,
  setRefetchComment,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [updatedData, setUpdatedData] = useState(prevData);
  const handleSubmit = () => {
    const body = {
      content: updatedData,
    };
    if (isComment) {
      setLoading(true);
      const url = `/comment/update/${updatableCommentContent.commentId}`;
      handleUpdateData(url, body);
    } else {
      const url = `comment/reply/update/${updatableReplyContent.commentId}/${updatableReplyContent.replyId}`;
      handleUpdateData(url, body);
    }
  };

  const handleUpdateData = async (url, body) => {
    try {
      const response = await axiosInstance.patch(url, body);
      if (response?.status === 200) {
        setLoading(false);
        setUpdatedData("");
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
      setUpdatedData("");
    }
  };

  return (
    <Form
      style={{
        width: 500,
        display: "flex",
        flexDirection: "column",
        gap: "0",
        marginTop: "10px",
      }}
    >
      <Form.Item style={{ width: "100%" }} name="content">
        <Input.TextArea
          onChange={(e) => setUpdatedData(e.target.value)}
          placeholder="Leave a reply"
          value={updatedData}
          defaultValue={prevData}
          className="w-full"
          rows={3}
          cols={10}
        />
        {error && <p>{error}</p>}
      </Form.Item>

      <Form.Item className="-mt-5 flex justify-end">
        {loading ? (
          <Button className="bg-white cursor-not-allowed py-1 px-2 flex justify-center items-center">
            <Box sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          </Button>
        ) : (
          <div className="flex gap-2">
            <button
              className="flex px-2 rounded-md justify-center items-center border"
              onClick={() => setIsUpdate(false)}
            >
              Cancel
            </button>
            <Button
              className="bg-blue-500 flex justify-center items-center"
              type="primary"
              htmlType="submit"
              disabled={!updatedData.trim()}
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </div>
        )}
      </Form.Item>
    </Form>
  );
};

export default CommentOrReplyEditForm;
