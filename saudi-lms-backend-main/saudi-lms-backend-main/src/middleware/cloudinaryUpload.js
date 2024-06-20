const multer = require("multer");
const cloudinary = require("cloudinary").v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure multer storage
const storage = multer.diskStorage({});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only images are allowed"));
    }
  },
  limits: 2 * 1024 * 1024,
});

const uploadToCloudinary = (req, res, next) => {
  try {
    if (!req.file) {
      return next();
    }

    cloudinary.uploader.upload(req.file.path, (error, result) => {
      if (error) {
        return res
          .status(500)
          .send({ error: "Error uploading file to Cloudinary" });
      }

      req.file.cloudinaryId = result.public_id;
      req.file.cloudinaryUrl = result.secure_url;
      next();
    });
  } catch (err) {
    next(err);
  }
};

const deleteFile = async (publicId) => {
  try {
    const response = await cloudinary.uploader.destroy(publicId);
    return response;
  } catch (err) {
    throw new Error(err.message);
  }
};

const uploadCourseContentResource = multer({
  storage,
  fileFilter: (req, file, cb) => {
    cb(null, true);
  },
  limits: { fileSize: 5 * 1024 * 1024 },
});

const uploadCourseContentResourceToCloudinary = (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return next();
    }

    const uploadedFilesPromises = req.files.map((file) => {
      return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(
          file.path,
          { resource_type: "raw" },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              const fileExtension = file?.originalname?.split(".").pop();
              const secure_urlWithExtension = `${result.secure_url}.${fileExtension}`;
              file.cloudinaryId = result.public_id;
              file.cloudinaryUrl = secure_urlWithExtension;
              resolve();
            }
          }
        );
      });
    });

    // Wait for all files to be uploaded to Cloudinary
    Promise.all(uploadedFilesPromises)
      .then(() => {
        next();
      })
      .catch((error) => {
        console.error("Error uploading files to Cloudinary:", error);
        res.status(500).send({ error: "Error uploading files to Cloudinary" });
      });
  } catch (err) {
    console.error(err);
    next(err);
  }
};

module.exports = {
  upload,
  uploadToCloudinary,
  deleteFile,
  uploadCourseContentResource,
  uploadCourseContentResourceToCloudinary,
};
