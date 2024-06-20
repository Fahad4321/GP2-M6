const CommentService = require("../services/commentService");

exports.postComment = async (req, res, next) => {
  try {
    const newComment = await CommentService.postComment(req.body);
    res.status(201).json(newComment);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.getCommentsByLesson = async (req, res, next) => {
  try {
    const courseId = req.params.courseId;
    const moduleId = req.params.moduleId;
    const lessonId = req.params.lessonId;
    const comments = await CommentService.getCommentsByLesson(
      courseId,
      moduleId,
      lessonId
    );
    res.status(200).json(comments);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.replyToACommentOrAnotherReply = async (req, res, next) => {
  try {
    const commentId = req.params.commentId;
    const newReply = await CommentService.replyToACommentOrAnotherReply(
      commentId,
      req.body
    );
    res
      .status(200)
      .json({ message: "Reply added successfully", data: newReply });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.deleteComment = async (req, res, next) => {
  try {
    const commentId = req.params.commentId;
    await CommentService.deleteComment(commentId);
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.updateComment = async (req, res, next) => {
  try {
    const commentId = req.params.commentId;
    const result = await CommentService.updateComment(commentId, req.body);
    res
      .status(200)
      .json({ message: "Comment update successfully", data: result });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

exports.updateReply = async (req, res, next) => {
  try {
    const commentId = req.params.commentId;
    const replyId = req.params.replyId;
    const result = await CommentService.updateReply(
      commentId,
      replyId,
      req.body
    );
    res
      .status(200)
      .json({ message: "Reply update successfully", data: result });
  } catch (error) {
    console.log({ error });
    next(error);
  }
};

exports.deleteReply = async (req, res, next) => {
  try {
    const commentId = req.params.commentId;
    const replyId = req.params.replyId;
    await CommentService.deleteReply(commentId, replyId);
    res.status(200).json({ message: "Reply deleted successfully" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
