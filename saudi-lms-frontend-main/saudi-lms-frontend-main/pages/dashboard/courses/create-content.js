import React from 'react'
import Head from "next/head";
import DashboardHeader from "../../../components/dashboard/layouts/DashboardHeader";
import {checkRole} from "../../../middleware/checkRole";
import {Space, Button} from "antd";
import Link from "next/link";
import CourseContentCreateForm from "../../../components/teacher/courseContent/CourseContentCreateForm";
import withAuth from "../../../middleware/withAuth";

const CreateContent = ()=> {
    return (
        <>

            <Head>
                <title>Create Course Content | My App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <DashboardHeader>
                { checkRole('teacher') ?
                    (
                        <Space>

                            <Link href='/dashboard/courses/create-course'>
                                <Button type='default'>
                                    Create Course
                                </Button>
                            </Link>


                            <Link href='/dashboard/courses/create-module'>
                                <Button type='default'>
                                    Create Module
                                </Button>
                            </Link>


                            <Link href='/dashboard/courses/create-content'>
                                <Button type='default'>
                                    Create Content
                                </Button>
                            </Link>

                        </Space>
                    )

                    : null }
            </DashboardHeader>

            <div className='flex justify-center py-3'>

               <CourseContentCreateForm/>

            </div>
        </>
    )
}

export default withAuth(CreateContent)
