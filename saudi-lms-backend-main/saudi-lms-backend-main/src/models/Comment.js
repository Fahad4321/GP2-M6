const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
  {
    courseId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    moduleId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    lessonId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    content: {
      type: String,
      required: true,
    },
    replies: [
      {
        user: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: "User",
        },
        content: {
          type: String,
          required: true,
        },
        replies: [
          {
            user: {
              type: Schema.Types.ObjectId,
              required: true,
              ref: "User",
            },
            content: {
              type: String,
              required: true,
            },
          },
        ],
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

const Comment = model("Comment", commentSchema);

module.exports = Comment;
