const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");
const app = express();
require("dotenv").config();
const { readdirSync } = require("fs");
const RoleModel = require("./src/models/Role");
const projectRoles = require("./src/dbSeed/projectRoles");
const PermissionModel = require("./src/models/Permission");
const { permissionsDocuments } = require("./src/dbSeed/projectPermissions");
const multer = require("multer");
const rolePermissionService = require("./src/services/rolePermissionService");
const userService = require("./src/services/userService");
const {
  adminCreateService,
} = require("./src/services/userManage/manageUserService");

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
const allowedOrigins = [
    'http://localhost:3000',
    'https://saudilms.webdesignstall.com',
    'https://saudilmsadmin.webdesignstall.com'
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));
// Handle preflight requests
app.options('*', cors());
app.use(xss());
app.use(morgan("dev"));

const limiter = rateLimit({
  windowMs: 2 * 60 * 1000, // 2 minutes
  max: 1000,
});
app.use(limiter);

app.get("/", (req, res) => {
  res.send(
    `<div style="text-align: center"><h3>Welcome to Lead Educare LMS Backend. <a href="${process.env.FONTEND_URL}">Visit our site</a></h3></div>`
  );
});

readdirSync("./src/routes").map((r) =>
  app.use("/api/v1", require("./src/routes/" + r))
);

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // Multer error occurred during file upload
    console.log("multer err", err);
    const message = "Error uploading file";
    const status = 400; // or any appropriate status code
    res.status(status).json({ error: message });
  } else if (err && err.message === "Only images are allowed") {
    // Custom error from fileFilter callback
    const message = err.message;
    const status = 400; // or any appropriate status code
    res.status(status).json({ error: message });
  } else if (err && err.message === "Only zip files are allowed") {
    // Custom error from fileFilter callback
    const message = err.message;
    const status = 400; // or any appropriate status code
    res.status(status).json({ error: message });
  } else {
    console.log(err);
    const message = err.message ? err.message : "Server Error Occurred";
    const status = err.status ? err.status : 500;
    res.status(status).json({
      error: status === 500 ? "Server Error Occurred" : message,
    });
  }
});

const port = process.env.PORT || 8000;

mongoose
  .connect(process.env.DATABASE)
  .then(async () => {
    console.log("DB Connected");

    projectRoles.map(async (role) => {
      await RoleModel.updateOne(
        { name: role.name },
        { $set: { name: role.name } },
        { upsert: true }
      );
    });
    permissionsDocuments.map(async (permission) => {
      await PermissionModel.updateOne(
        { name: permission.name },
        { $set: { name: permission.name } },
        { upsert: true }
      );
    });
    const superAdmin = {
      firstName: process.env.SUPER_ADMIN_FIRST_NAME,
      lastName: process.env.SUPER_ADMIN_LAST_NAME,
      email: process.env.SUPER_ADMIN_EMAIL,
      mobile: process.env.SUPER_ADMIN_MOBILE,
    };

    const isMatch = await userService.findUserByProperty(
      "email",
      superAdmin.email
    );
    if (!isMatch) {
      const role = await rolePermissionService.roleFindByProperty(
        "name",
        "superadmin"
      );
      await adminCreateService(
        {
          email: superAdmin.email,
          firstName: superAdmin.firstName,
          lastName: superAdmin.lastName,
          mobile: superAdmin.mobile,
          roleId: role?._id,
          createdBy: null,
        },
        superAdmin
      );
    }

    app.listen(port, () => {
      console.log(`Server run success on port ${port}`);
    });
  })
  .catch((err) => console.log(err));

module.exports = app;
