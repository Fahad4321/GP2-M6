import React from 'react';
import Head from 'next/head'
import SingleTeacher from '../../components/TeachersPage/SingleTeacher';

const SingleTeacherPage = () => {
    return (
        <div>
            <Head>
                <title>Single Blog</title>
            </Head>
            <SingleTeacher/>
        </div>
    );
};

export default SingleTeacherPage;