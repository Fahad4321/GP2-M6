/* eslint-disable react-hooks/exhaustive-deps */
import { Provider } from "react-redux";
import { store } from "../redux/store";
import "../styles/globals.css";
import "../styles/accordion.css";
import Loader from "../components/loader";
import LoadingBar from "react-top-loading-bar";
import React from "react";
import { useRouter } from "next/router";
import { SnackbarProvider } from "notistack";
import DashboardLayout from "../components/dashboard/layouts/DashboardLayout";
import Layout from "../components/layout/Layout";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setProgress(40);
    });
    router.events.on("routeChangeComplete", () => {
      setProgress(100);
    });
  }, []);

  return (
    <>
      <SnackbarProvider maxSnack={3}>
        <Provider store={store}>
          <Loader />
          <LoadingBar
            color="#f11946"
            progress={progress}
            onLoaderFinished={() => setProgress(0)}
          />
          {router.pathname.includes("dashboard") ? (
            <DashboardLayout>
              <Component {...pageProps} />
            </DashboardLayout>
          ) : router.pathname.includes("users") ? (
            <Component {...pageProps} />
          ) : (
            <Layout>
              <Component {...pageProps} />
            </Layout>
          )}
        </Provider>
      </SnackbarProvider>
    </>
  );
}

export default MyApp;
