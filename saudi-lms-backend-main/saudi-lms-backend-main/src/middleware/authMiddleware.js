const userService = require("../services/userService");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Role = require("../models/Role");
const authVerifyMiddleware = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized, Token Not Found" });
    }

    token = token.split(" ")[1];
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

    const user = await User.findById(decoded._id);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized, User Not Found" });
    }

    req.auth = user;
    next();
  } catch (e) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

function checkPermissions(permission) {
  return async function (req, res, next) {
    const userId = req.auth?._id;

    const user = await User.findById(userId).populate("roleId");

    if (user?.roleId.name === "superadmin") {
      return next();
    }
    const roles = await Role.findById(user?.roleId._id).populate("permissions");

    const authorized = roles?.permissions.some(
      (item) => item.name === permission
    );

    if (!authorized) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
}

const checkPermissionForFrontend = async (req, res, next) => {
  const userId = req.auth?._id;
  const permission = req.params.permission;

  const user = await User.findById(userId).populate("roleId");
  console.log({ userId, permission, user });

  if (user?.roleId.name === "superadmin") {
    return next();
  }
  const roles = await Role.findById(user?.roleId._id).populate("permissions");

  const authorized = roles?.permissions.some(
    (item) => item.name === permission
  );

  if (!authorized) {
    return res.status(403).json({ message: "Forbidden" });
  }
  next();
};

const isSuperAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.auth._id).populate("roleId");
    if (user?.roleId.name !== "superadmin") {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  } catch (e) {
    next(e);
  }
};

const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.auth._id).populate({
      path: "roleId",
      match: { $or: [{ name: { $nin: ["user", "teacher"] } }] },
    });

    if (user?.roleId === null) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  } catch (e) {
    next(e);
  }
};

module.exports = {
  authVerifyMiddleware,
  checkPermissions,
  isSuperAdmin,
  isAdmin,
  checkPermissionForFrontend,
};
