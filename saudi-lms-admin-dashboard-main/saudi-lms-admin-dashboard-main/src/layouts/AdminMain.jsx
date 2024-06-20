import React from "react";
import { Button, Layout } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import SideMenuBar from "./SideMenuBar";
import AppHeader from "./AppHeader";
import AppFooter from "./AppFooter";
import { IoArrowBackOutline } from "react-icons/io5";
const { Content } = Layout;

const AdminMain = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        <SideMenuBar />

        <Layout className="site-layout">
          <AppHeader />

          <span style={{ marginLeft: "20px", marginTop: "20px" }}>
            <Button onClick={goBack} className=" fw-bold text-primary-color">
              {" "}
              <IoArrowBackOutline /> <span>Back</span>{" "}
            </Button>
          </span>

          <Content
            style={{
              margin: "20px",
              padding: "20px",
            }}
          >
            <Outlet />
          </Content>
          <AppFooter />
        </Layout>
      </Layout>
    </>
  );
};

export default AdminMain;
