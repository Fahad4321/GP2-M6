import React from 'react';
import DashboardHeader from "../../../../components/dashboard/layouts/DashboardHeader";
import Head from "next/head";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import LiveSessionListTable from '../../../../components/teacher/livesession/LiveSessionListTable';
import withAuth from "../../../../middleware/withAuth";

const Index = () => {
    return (
        <>
            <Head>
                <title>Live Session List | {process.env.NEXT_PUBLIC_APP_NAME}</title>
            </Head>
            <DashboardHeader>
                <h1 className='uppercase font-semibold text-orange-600'>Live Session List</h1>
            </DashboardHeader>
            <div className='p-4 h-screen'>
                <div className='bg-white shadow h-screen'>
                    <LiveSessionListTable/>
                </div>
            </div>
        </>
    );
};

export default withAuth(Index);