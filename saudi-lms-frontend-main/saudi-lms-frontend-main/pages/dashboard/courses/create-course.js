import React from 'react'
import Head from "next/head";
import CourseCreateForm from '../../../components/teacher/course/CourseCreateForm'
import {Space, Button} from "antd";
import DashboardHeader from "../../../components/dashboard/layouts/DashboardHeader";
import {checkRole} from "../../../middleware/checkRole";
import Link from "next/link";
import withAuth from "../../../middleware/withAuth";

const CreateCourse = ()=> {
    return (
        <>
            <Head>
                <title>Create Course | My App</title>
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

                   <CourseCreateForm/>

           </div>

        </>
    )
}


export default withAuth(CreateCourse)