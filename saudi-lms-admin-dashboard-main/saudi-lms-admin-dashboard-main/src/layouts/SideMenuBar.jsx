import React, { useState } from "react";
import { Menu, Layout } from "antd";
import { NavLink } from "react-router-dom";
import {
  AntDesignOutlined,
  DashboardOutlined,
  FormOutlined,
  OrderedListOutlined,
} from "@ant-design/icons";
import store from "../redux/store/store.js";
import { checkPermission } from "../utils/checkPermission.js";

const { Sider } = Layout;
const auth = store.getState().auth;
const items = [
  {
    key: "dashboard",
    label: <NavLink to="/admin/dashboard">Dashboard</NavLink>,
    icon: <DashboardOutlined />,
  },

  checkPermission("can_create_teacher", auth.currentUser?.permissions) ||
  checkPermission("can_view_teacher", auth.currentUser?.permissions)
    ? {
        key: "teacher",
        label: "Teachers",
        icon: <AntDesignOutlined />,
        children: [
          checkPermission("can_create_teacher", auth.currentUser?.permissions)
            ? {
                key: "teacher-create",
                label: <NavLink to="/admin/teacher/create">Create</NavLink>,
                icon: <FormOutlined />,
              }
            : "",
          checkPermission("can_view_teacher", auth.currentUser?.permissions)
            ? {
                key: "teacher-applied",
                label: <NavLink to="/admin/teacher/list">List</NavLink>,
                icon: <OrderedListOutlined />,
              }
            : "",
        ],
      }
    : "",

  checkPermission("can_create_category", auth.currentUser?.permissions) ||
  checkPermission("can_view_category", auth.currentUser?.permissions)
    ? {
        key: "category",
        label: "Category",
        icon: <AntDesignOutlined />,
        children: [
          checkPermission("can_create_category", auth.currentUser?.permissions)
            ? {
                key: "category-create",
                label: <NavLink to="/admin/category/create">Create</NavLink>,
                icon: <FormOutlined />,
              }
            : "",
          checkPermission("can_view_category", auth.currentUser?.permissions)
            ? {
                key: "category-list",
                label: <NavLink to="/admin/category/list">List</NavLink>,
                icon: <OrderedListOutlined />,
              }
            : "",
        ],
      }
    : "",

  checkPermission("can_create_course", auth.currentUser?.permissions) ||
  checkPermission("can_view_course", auth.currentUser?.permissions)
    ? {
        key: "course",
        label: "Course",
        icon: <AntDesignOutlined />,
        children: [
          checkPermission("can_create_course", auth.currentUser?.permissions)
            ? {
                key: "course-create",
                label: <NavLink to="/admin/course/create">Create</NavLink>,
                icon: <FormOutlined />,
              }
            : "",
          checkPermission("can_view_course", auth.currentUser?.permissions)
            ? {
                key: "course-list",
                label: <NavLink to="/admin/course/list">List</NavLink>,
                icon: <OrderedListOutlined />,
              }
            : "",
        ],
      }
    : "",

  checkPermission("can_create_course", auth.currentUser?.permissions) ||
  checkPermission("can_view_course", auth.currentUser?.permissions)
    ? {
        key: "course-module",
        label: "Course Module",
        icon: <AntDesignOutlined />,
        children: [
          checkPermission("can_create_course", auth.currentUser?.permissions)
            ? {
                key: "module-create",
                label: (
                  <NavLink to="/admin/coursemodule/create">Create</NavLink>
                ),
                icon: <FormOutlined />,
              }
            : "",
        ],
      }
    : "",

  checkPermission("can_create_course", auth.currentUser?.permissions) ||
  checkPermission("can_view_course", auth.currentUser?.permissions)
    ? {
        key: "course-content",
        label: "Course Content",
        icon: <AntDesignOutlined />,
        children: [
          checkPermission("can_create_course", auth.currentUser?.permissions)
            ? {
                key: "content-create",
                label: (
                  <NavLink to="/admin/coursecontent/create">Create</NavLink>
                ),
                icon: <FormOutlined />,
              }
            : "",
        ],
      }
    : "",

  checkPermission("can_create_role", auth.currentUser?.permissions) ||
  checkPermission("can_view_role", auth.currentUser?.permissions)
    ? {
        key: "role-manage",
        label: <NavLink to="/admin/role-management">Role Management</NavLink>,
        icon: <AntDesignOutlined />,
      }
    : "",
];

const SideMenuBar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Sider
      theme="dark"
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <Menu
        theme="dark"
        defaultSelectedKeys={window.location.pathname}
        items={items}
        mode="inline"
        className="mt-2"
      />
    </Sider>
  );
};

export default SideMenuBar;
