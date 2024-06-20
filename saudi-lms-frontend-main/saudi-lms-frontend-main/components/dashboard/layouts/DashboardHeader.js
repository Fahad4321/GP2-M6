import React, { useState } from "react";
import { Avatar, Dropdown, Space, theme, Layout, Row, Col } from "antd";
import {
  DownOutlined,
  KeyOutlined,
  UploadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { useSelector } from "react-redux";
import { logOut } from "../../../helper/sessionStorage";

const { Header } = Layout;

const logout = () => {
  logOut();
};

const items = [
  {
    key: "2",
    label: (
      <Link href="/dashboard/profile/changepassword">Change Password</Link>
    ),
    icon: <KeyOutlined rotate={-130} />,
  },
  {
    key: "3",
    label: (
      <Link href="/" onClick={logout}>
        Log Out
      </Link>
    ),
    icon: <UploadOutlined rotate={90} />,
  },
];

const UserList = ["U", "Lucy", "Tom", "Edward"];
const ColorList = ["#f56a00", "#7265e6", "#ffbf00", "#00a2ae"];
const GapList = [4, 3, 2, 1];

const DashboardHeader = ({ children }) => {
  const { currentUser } = useSelector((state) => state.auth);
  const [user, setUser] = useState(UserList[0]);
  const [color, setColor] = useState(ColorList[0]);
  const [gap, setGap] = useState(GapList[0]);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <>
      <Header
        style={{
          paddingLeft: "30px",
          background: colorBgContainer,
        }}
      >
        <div className='flex justify-between'>
          <div >{children}</div>
          <div >

            {
              currentUser?.picture?.secure_url && <Avatar
                    style={{
                      verticalAlign: "middle",
                      marginRight: "10px",
                    }}
                    size="large"
                    gap={gap}
                    src={currentUser?.picture?.secure_url}
                ></Avatar>
            }


            <Dropdown
              menu={{
                items,
              }}
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  {`${currentUser?.firstName} ${currentUser?.lastName}`}
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </div>
        </div>
      </Header>
    </>
  );
};

export default DashboardHeader;
