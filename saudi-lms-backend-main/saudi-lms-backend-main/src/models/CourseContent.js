const { Schema, model } = require("mongoose");

const courseContentSchema = new Schema(
  {
    moduleId: {
      type: Schema.Types.ObjectId,
      ref: "CourseModule",
    },
    contentType: {
      type: String,
      required: true,
      enum: ["Lesson", "Resource"],
    },
    videoTitle: {
      type: String,
      trim: true,
      unique: true,
      lowercase: true,
    },
    videoUrl: {
      type: String,
      trim: true,
      unique: true,
    },
    serialNo: {
      type: Number,
    },
  },
  { versionKey: false, timestamps: true }
);

const CourseContent = model("CourseContent", courseContentSchema);

module.exports = CourseContent;
