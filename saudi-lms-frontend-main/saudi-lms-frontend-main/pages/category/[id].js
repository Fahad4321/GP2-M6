import Head from 'next/head';
import React from 'react';
import CourseByCategory from '../../components/Homepage/category/CourseByCategory';

const CategoryId = () => {
    return (
        <div>
            <Head>
                <title>Course By Category</title>
            </Head>

            <CourseByCategory/>
            
        </div>
    );
};

export default CategoryId;