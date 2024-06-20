import React from "react";
import { Layout } from "antd";
import SideMenuBar from "./SideMenuBar";
const { Content } = Layout;
const DashboardLayout = ({ children }) => {
  return (
    <>
      <Layout
        style={{
          minHeight: "100vh",
        }}
      >
        <SideMenuBar />

        <Layout className="site-layout">
          <Content>{children}</Content>
        </Layout>
      </Layout>
    </>
  );
};

export default DashboardLayout;
