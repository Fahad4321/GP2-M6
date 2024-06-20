import { createBrowserRouter } from "react-router-dom";
import AdminMain from "../layouts/AdminMain";
import DashboardPage from "../pages/dashboard/DashboardPage";
import LoginPage from "../pages/auth/LoginPage";
import ForgotPasswordPage from "../pages/auth/ForgotPasswordPage";
import VerifyOtpPage from "../pages/auth/VerifyOtpPage";
import NewPasswordPage from "../pages/auth/NewPasswordPage";
import PrivateRoute from "./privateRoute.jsx";
import UpdatePasswordPage from "../pages/auth/UpdatePasswordPage";
import Main from "../layouts/Main.jsx";
import CheckPermissionRoute from "./CheckPermissionRoute";
import CourseList from "../pages/course/CourseList";
import CourseCreate from "../pages/course/CourseCreate";
import CourseUpdate from "../pages/course/CourseUpdate";
import RoleManage from "../pages/roleManage/RoleManage.jsx";
import PermissionCheckBox from "../components/roleManage/PermissionCheckBox.jsx";
import CategoryCreate from "../pages/category/CategoryCreate.jsx";
import CategoryList from "../pages/category/CategoryList.jsx";
import CategoryUpdate from "../pages/category/CategoryUpdate.jsx";
import CourseModuleCreate from "../pages/coursemodule/CourseModuleCreate.jsx";
import CourseContentCreate from "../pages/coursecontent/CourseContentCreate.jsx";
import CreateTeacher from "../pages/teacher/CreateTeacher.jsx";
import TeacherList from "../pages/teacher/TeacherList.jsx";
import NotFoundPage from "../pages/404Page/404Page.jsx";
import SetPasswordPage from "../pages/auth/SetPasswordPage";

const router = createBrowserRouter([
  {
    path: "/admin",
    element: (
      <PrivateRoute>
        <AdminMain />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/admin/dashboard",
        element: <DashboardPage />,
      },

      {
        path: "/admin/category/create",
        element: (
          <CheckPermissionRoute permission="can_create_category">
            {" "}
            <CategoryCreate />
          </CheckPermissionRoute>
        ),
      },
      {
        path: "/admin/category/list",
        element: (
          <CheckPermissionRoute permission="can_view_category">
            {" "}
            <CategoryList />{" "}
          </CheckPermissionRoute>
        ),
      },
      {
        path: "/admin/category/update",
        element: (
          <CheckPermissionRoute permission="can_edit_course_category">
            {" "}
            <CategoryUpdate />
          </CheckPermissionRoute>
        ),
      },
      {
        path: "/admin/course/create",
        element: (
          <CheckPermissionRoute permission="can_create_course">
            {" "}
            <CourseCreate />{" "}
          </CheckPermissionRoute>
        ),
      },
      {
        path: "/admin/course/update",
        element: (
          <CheckPermissionRoute permission="can_update_course">
            {" "}
            <CourseUpdate />{" "}
          </CheckPermissionRoute>
        ),
      },
      {
        path: "/admin/course/list",
        element: (
          <CheckPermissionRoute permission="can_view_course">
            {" "}
            <CourseList />{" "}
          </CheckPermissionRoute>
        ),
      },

      {
        path: "/admin/coursemodule/create",
        element: (
          <CheckPermissionRoute permission="can_create_course">
            {" "}
            <CourseModuleCreate />
          </CheckPermissionRoute>
        ),
      },
      {
        path: "/admin/coursecontent/create",
        element: (
          <CheckPermissionRoute permission="can_create_content">
            {" "}
            <CourseContentCreate />
          </CheckPermissionRoute>
        ),
      },

      {
        path: "/admin/role-management",
        element: (
          <CheckPermissionRoute permission="can_create_role">
            <RoleManage />
          </CheckPermissionRoute>
        ),
      },
      {
        path: "/admin/assign-permission/:name",
        element: (
          <CheckPermissionRoute permission="can_create_role">
            <PermissionCheckBox />
          </CheckPermissionRoute>
        ),
      },
      {
        path: "/admin/password-update",
        element: <UpdatePasswordPage />,
      },
      {
        path: "/admin/teacher/create",
        element: <CreateTeacher />,
      },
      {
        path: "/admin/teacher/list",
        element: <TeacherList />,
      },
    ],
  },
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <LoginPage />,
      },
      {
        path: "/send-otp",
        element: <ForgotPasswordPage />,
      },
      {
        path: "/verify-otp",
        element: <VerifyOtpPage />,
      },
      {
        path: "/reset-password",
        element: <NewPasswordPage />,
      },
      {
        path: "/set-password",
        element: <SetPasswordPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
