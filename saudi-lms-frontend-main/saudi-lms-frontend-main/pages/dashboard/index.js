import Head from "next/head";
import withAuth from "../../middleware/withAuth";
import DashboardHeader from "../../components/dashboard/layouts/DashboardHeader";

function Dashboard() {
  return (
    <>
      <Head>
        <title>Dashboard | My App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <DashboardHeader></DashboardHeader>
    </>
  );
}

export default withAuth(Dashboard);
