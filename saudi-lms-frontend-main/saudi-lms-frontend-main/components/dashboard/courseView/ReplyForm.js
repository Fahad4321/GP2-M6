import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import { useSelector } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import axiosInstance from "../../../helper/axiosInstance";

const ReplyForm = ({ parentId, setRefetchComment, setIsReply, commentId }) => {
  const { currentUser } = useSelector((state) => state.auth);
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmitReply = async () => {
    setLoading(true);
    const replyData = {
      parentId: parentId,
      userId: currentUser._id,
      content: reply,
    };
    try {
      const response = await axiosInstance.post(
        `comment/reply-to/${commentId}`,
        replyData
      );
      if (response?.status === 200) {
        setLoading(false);
        setReply("");
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
      setReply("");
    }
  };
  return (
    <Form
      style={{
        maxWidth: 300,
        display: "flex",
        flexDirection: "column",
        gap: "0",
        marginTop: "10px",
      }}
    >
      <Form.Item
        name="reply"
        rules={[
          {
            required: true,
            message: "Please write your reply!",
          },
        ]}
      >
        <Input.TextArea
          onChange={(e) => setReply(e.target.value)}
          placeholder="Leave a reply"
          value={reply}
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
              onClick={() => setIsReply(false)}
            >
              Cancel
            </button>
            <Button
              className="bg-blue-500 flex justify-center items-center"
              type="primary"
              htmlType="submit"
              disabled={!reply.trim()}
              onClick={handleSubmitReply}
            >
              Reply
            </Button>
          </div>
        )}
      </Form.Item>
    </Form>
  );
};

export default ReplyForm;
