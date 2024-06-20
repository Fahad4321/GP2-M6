import Head from 'next/head';
import React from 'react';
import SingleCourse from '../../../components/Coursepage/SingleCourse';

const CourseId = () => {
    return (
        <div>
            <Head>
                <title>Single Course</title>
            </Head>

            <SingleCourse/>
            
        </div>
    );
};

export default CourseId;