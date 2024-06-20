const router = require("express").Router();
const CommentController = require("../controllers/commentController");

router.post("/comment/post-comment", CommentController.postComment);

router.get(
  "/comments/:courseId/:moduleId/:lessonId",
  CommentController.getCommentsByLesson
);

router.post(
  "/comment/reply-to/:commentId",
  CommentController.replyToACommentOrAnotherReply
);

router.delete("/comment/delete/:commentId", CommentController.deleteComment);

router.patch("/comment/update/:commentId", CommentController.updateComment);

router.delete(
  "/comment/reply/delete/:commentId/:replyId",
  CommentController.deleteReply
);
router.patch(
  "/comment/reply/update/:commentId/:replyId",
  CommentController.updateReply
);

module.exports = router;
