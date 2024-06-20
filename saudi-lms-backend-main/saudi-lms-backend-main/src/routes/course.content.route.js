const authMiddleware = require("../middleware/authMiddleware");
const { permissions } = require("../dbSeed/projectPermissions");
const courseContentController = require("../controllers/course/courseContentController");
const {
  uploadCourseContentResource,
  uploadCourseContentResourceToCloudinary,
} = require("../middleware/cloudinaryUpload");
const router = require("express").Router();

router.get(
  "/courses/contents/:pageNo/:perPage/:searchKeyword",
  courseContentController.getContent
);
router.get(
  "/courses/contents/:moduleId",
  courseContentController.getContentsbyID
);
router.get("/courses/contents", courseContentController.dropDownModules);
router.post(
  "/courses/contents",
  authMiddleware.authVerifyMiddleware,
  authMiddleware.checkPermissions(permissions.courseContent.can_create_content),
  courseContentController.createContent
);
router.patch(
  "/courses/contents/:id",
  authMiddleware.authVerifyMiddleware,
  authMiddleware.checkPermissions(permissions.courseContent.can_edit_course),
  courseContentController.updateContent
);

// upload course content resources to cloudinary
router.post(
  "/courses/contents/upload-resource",
  uploadCourseContentResource.array("resources"),
  uploadCourseContentResourceToCloudinary,
  courseContentController.uploadContentResource
);

module.exports = router;
