const {upload, uploadToCloudinary} = require("../middleware/cloudinaryUpload");
const authMiddleware = require("../middleware/authMiddleware");
const userController = require("../controllers/userController");

const router = require('express').Router();

router.patch('/users', upload.single('picture'), uploadToCloudinary, authMiddleware.authVerifyMiddleware, userController.patchUser);
router.get('/users', authMiddleware.authVerifyMiddleware, userController.getUserProfile);

module.exports = router;
