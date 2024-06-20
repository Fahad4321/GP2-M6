const userService = require("../userService");
const error = require("../../helpers/error");
const sendEmail = require("../../helpers/sendEmail");
const rolePermissionService = require("../rolePermissionService");
const newUserEmailTemplate = require("../../emailTemplate/forNewUser");
const newAccountEmailTemplate = require("../../emailTemplate/newAccountEmail");
const jwt = require("jsonwebtoken");

const userCreateService = async ({
  email,
  firstName,
  lastName,
  password,
  confirmPassword,
  roleId,
  createdBy,
}) => {
  const isMatch = await userService.findUserByProperty("email", email);
  if (isMatch) throw error("Email already taken", 400);
  const role = await rolePermissionService.roleFindByProperty("_id", roleId);
  if (!role) throw error("provide a valid role", 400);

  const send = await sendEmail(
    email,
    newUserEmailTemplate,
    `${process.env.APP_NAME} email verification`
  );

  if (send[0].statusCode === 202) {
    return await userService.createNewUser({
      email,
      firstName,
      lastName,
      password,
      confirmPassword,
      roleId,
    });
  }
};

const adminCreateService = async (
  { email, firstName, lastName, mobile, roleId, createdBy },
  authUser
) => {
  const isMatch = await userService.findUserByProperty("email", email);
  if (isMatch) throw error("Email already taken", 400);
  const role = await rolePermissionService.roleFindByProperty("_id", roleId);
  if (!role) throw error("provide a valid role", 400);

  const token = jwt.sign(
    { email: email, role: role?.name },
    process.env.TOKEN_SECRET,
    {
      expiresIn: process.env.PASSWORD_TOKEN_EXPIRE,
    }
  );

  const decoded = jwt.decode(token);
  const expiresAt = new Date(decoded.exp * 1000);
  const expireDate = new Date(expiresAt);

  // Email Send
  const send = await sendEmail(
    email,
    newAccountEmailTemplate({
      createdUser: `${authUser?.firstName} ${authUser?.lastName}`,
      mobile: `${authUser?.mobile}`,
      token,
      expireDate,
    }),
    `${process.env.APP_NAME} registration`
  );

  if (send[0].statusCode === 202) {
    const createUser = await userService.createNewUser({
      email,
      firstName,
      lastName,
      roleId,
      createdBy,
      mobile,
      confirmationToken: token,
      confirmationTokenExpires: expireDate,
    });

    if (!createdBy) {
      await userService.userUpdateService(
        { _id: createUser?._id },
        { createdBy: createUser?._id }
      );
    }
    return createUser;
  } else {
    throw error("Server error occurred", 5000);
  }
};

module.exports = {
  userCreateService,
  adminCreateService,
};
