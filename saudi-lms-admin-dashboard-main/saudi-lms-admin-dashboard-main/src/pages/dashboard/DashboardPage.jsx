import React from "react";
import Dashboard from "../../components/dashboard/Dashboard";
import title from "../../utils/title.js";

const DashboardPage = () => {
  title("Admin Dashboard");
  return (
    <div>
      <Dashboard />
    </div>
  );
};

export default DashboardPage;
