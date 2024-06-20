import React, { useState } from "react";
import { Avatar, Dropdown, Space, theme, Layout, Row, Col } from "antd";
import {
  DownOutlined,
  KeyOutlined,
  UploadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import store from "../redux/store/store.js";
import { logOut } from "../redux/state/auth-slice.js";

const { Header } = Layout;

const logout = () => {
  store.dispatch(logOut());
};

const items = [
  {
    key: "1",
    label: <Link to="/dashboard/profile">Profile</Link>,
    icon: <UserOutlined />,
  },
  {
    key: "2",
    label: <Link to="/admin/password-update">Change Password</Link>,
    icon: <KeyOutlined rotate={-130} />,
  },
  {
    key: "3",
    label: (
      <a href="/" onClick={logout}>
        Log Out
      </a>
    ),
    icon: <UploadOutlined rotate={90} />,
  },
];

const UserList = ["U", "Lucy", "Tom", "Edward"];
const ColorList = ["#f56a00", "#7265e6", "#ffbf00", "#00a2ae"];
const GapList = [4, 3, 2, 1];

const AppHeader = () => {
  const { currentUser } = useSelector((state) => state.auth);
  console.log(currentUser);
  const [color, setColor] = useState(ColorList[0]);
  const [gap, setGap] = useState(GapList[0]);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <>
      <Header
        style={{
          padding: 0,
          background: colorBgContainer,
        }}
      >
        <Row>
          <Col span={2} offset={22}>
            <Avatar
              style={{
                backgroundColor: color,
                verticalAlign: "middle",
                marginRight: "10px",
              }}
              size="large"
              gap={gap}
            ></Avatar>
            <Dropdown
              menu={{
                items,
              }}
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  {currentUser?.firstName}
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </Col>
        </Row>
      </Header>
    </>
  );
};

export default AppHeader;
