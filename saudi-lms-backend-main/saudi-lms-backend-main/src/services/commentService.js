const Comment = require("../models/Comment");
const error = require("../helpers/error");

exports.postComment = async (comment) => {
  try {
    const newComment = await Comment.create(comment);
    return newComment;
  } catch (error) {
    throw error("Failed To Post comment", error.status);
  }
};

exports.getCommentsByLesson = async (courseId, moduleId, lessonId) => {
  try {
    const selectUserFields = { firstName: 1, lastName: 1, email: 1 };
    const comments = await Comment.find({ courseId, moduleId, lessonId })
      .populate({
        path: "user",
        model: "User",
        select: selectUserFields,
      })
      .populate({
        path: "replies.user",
        model: "User",
        select: selectUserFields,
      })
      .populate({
        path: "replies.replies.user",
        model: "User",
        select: selectUserFields,
      });

    return comments;
  } catch (error) {
    throw new Error("Failed to fetch comments by postId", error.status);
  }
};

exports.replyToACommentOrAnotherReply = async (commentId, replyData) => {
  try {
    const comment = await Comment.findOne({ _id: commentId });

    if (!comment) {
      throw error("Comment not found", 404);
    }

    let targetReply;
    let parentReply;
    let foundReply = false;

    comment.replies.forEach((reply) => {
      if (reply._id.equals(replyData.parentId)) {
        targetReply = reply;
        foundReply = true;
      } else {
        const nestedReply = reply.replies.find((nested) =>
          nested._id.equals(replyData.parentId)
        );
        if (nestedReply) {
          parentReply = reply;
          targetReply = nestedReply;
          foundReply = true;
        }
      }
    });

    if (!foundReply) {
      targetReply = comment;
    }

    targetReply.replies.push({
      user: replyData.userId,
      content: replyData.content,
    });

    await comment.save();

    return parentReply || comment;
  } catch (err) {
    throw error("Failed to reply", err.status);
  }
};

exports.deleteComment = async (commentId) => {
  try {
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return "No comment found for the provided commentId";
    }

    await Comment.findByIdAndDelete(commentId);
  } catch (error) {
    throw error("An error occurred while deleting comment.", 500);
  }
};

exports.updateComment = async (commentId, updatedContent) => {
  try {
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return "No comment found for the provided commentId.";
    }

    const result = await Comment.findByIdAndUpdate(commentId, {
      $set: { ...updatedContent },
    });
    return result;
  } catch (error) {
    throw error("An error occurred while editing comment.", 500);
  }
};

exports.updateReply = async (commentId, replyId, updatedContent) => {
  try {
    const comment = await Comment.findById(commentId);

    if (!comment) {
      return "No comment found for the provided commentId.";
    }

    const replyIndex = comment.replies.findIndex((reply) =>
      reply._id.equals(replyId)
    );

    if (replyIndex !== -1) {
      comment.replies[replyIndex].content = updatedContent.content;
    } else {
      comment.replies.forEach((reply) => {
        const nestedReplyIndex = reply.replies.findIndex((nestedReply) =>
          nestedReply._id.equals(replyId)
        );
        if (nestedReplyIndex !== -1) {
          reply.replies[nestedReplyIndex].content = updatedContent.content;
        }
      });
    }

    const result = await comment.save();
    return result;
  } catch (error) {
    throw new Error("An error occurred while editing reply.", 500);
  }
};

exports.deleteReply = async (commentId, replyId) => {
  try {
    const comment = await Comment.findById(commentId);

    if (!comment) {
      throw error("No comment found for the provided comment ID.", 404);
    }

    const deleteReplyRecursively = (replies) => {
      let replyDeleted = false;
      for (let i = 0; i < replies?.length; i++) {
        const reply = replies[i];
        if (reply._id.toString() === replyId) {
          replies.splice(i, 1);
          replyDeleted = true;
          break;
        } else if (reply.replies?.length > 0) {
          replyDeleted = deleteReplyRecursively(reply.replies);
          if (replyDeleted) break;
        }
      }
      return replyDeleted;
    };

    const replyDeleted = deleteReplyRecursively(comment.replies);

    if (replyDeleted) {
      await comment.save();
      return;
    } else {
      throw error("No reply found for the provided reply ID.", 404);
    }
  } catch (error) {
    console.log(error);
    throw error("An error occurred while deleting reply.", 500);
  }
};
