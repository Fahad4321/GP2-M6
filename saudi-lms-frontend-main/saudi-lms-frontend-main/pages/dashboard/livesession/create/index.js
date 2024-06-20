import React from 'react';
import DashboardHeader from "../../../../components/dashboard/layouts/DashboardHeader";
import Head from "next/head";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";
import LiveSessionCreateForm from '../../../../components/teacher/livesession/LiveSessionCreateForm';
import withAuth from "../../../../middleware/withAuth";

const Index = () => {
    return (
        <>
            <Head>
                <title>Live Session Create | {process.env.NEXT_PUBLIC_APP_NAME}</title>
            </Head>
            <DashboardHeader>
                <h1 className='uppercase font-semibold text-orange-600'>Live Session Create</h1>
            </DashboardHeader>
            <div className='p-4 h-screen'>
                <div className='bg-white shadow h-screen'>
                    <LiveSessionCreateForm/>
                </div>
            </div>
        </>
    );
};

export default withAuth(Index);