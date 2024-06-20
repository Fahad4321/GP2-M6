import React, { useState } from "react";
import { Menu, Layout } from "antd";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import { checkRole } from "../../../middleware/checkRole";
import Link from "next/link";
import { useRouter } from "next/router";
import LoginOutlined from "@mui/icons-material/LoginOutlined";
import {logOut} from "../../../helper/sessionStorage";

const { Sider } = Layout;

const logout = () => {
  logOut();
};

const items = [
  {
    key: "home",
    label: (
      <Link href={`/`} className="font-semibold">
        {process.env.NEXT_PUBLIC_APP_NAME}
      </Link>
    ),
    icon: "",
  },
  {
    key: "dashboard",
    label: <Link href={`/dashboard`}>Dashboard</Link>,
    icon: <SpaceDashboardIcon />,
  },
  checkRole("teacher") || checkRole("user")
    ? {
        key: "course",
        label: <Link href={`/dashboard/courses`}>My Course</Link>,
        icon: <LibraryBooksIcon />,
      }
    : "",
  {
    key: "logout",
    label: <Link href="/" onClick={logout}>
      Log Out
    </Link>,
    icon: <LoginOutlined/>,
  },
];

const SideMenuBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const { pathname } = router;
  return (
    <Sider
      theme="light"
      className="shadow-lg"
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <Menu
        theme="light"
        defaultSelectedKeys={pathname}
        items={items}
        mode="inline"
        className="mt-2"
      />
    </Sider>
  );
};

export default SideMenuBar;
