import React, {useEffect, useState} from "react";
import {Button, Card, Form, Input, InputNumber, message, Select,} from "antd";
import useSWR from "swr";
import axiosInstance from "../../../helper/axiosInstance";
import toast from "react-hot-toast";
import {createCourseModuleRequest} from "../../../APIRequest/courseModuleApiRequest";
import {getCoursesDropDownByTeacher} from "../../../APIRequest/courseAPIRequest";

const validateMessages = {
    required: '${label} is required!'
};
const CourseModuleCreateForm = () => {
    const [loading,setLoading] = useState(false);
    const [form] = Form.useForm();
    const [courses, setCourses] = useState([]);

    useEffect(()=>{
        (async ()=>{
            const course = await getCoursesDropDownByTeacher();
            setCourses(course)
        })()
    }, [])


    const onFinish = async (values) => {
        setLoading(true);
        const result = await createCourseModuleRequest(values)
        setLoading(false);
        if (result){
            form.resetFields()
        }
    }


    return (
        <Card title='Create a new module'>
            <Form
                form={form}
                name="create-module"
                layout='vertical'
                onFinish={onFinish}
                style={{
                    width: '600px',
                }}
                validateMessages={validateMessages}

            >

                <Form.Item
                    name="courseId"
                    label="Select a course"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >

                    <Select
                        showSearch
                        placeholder="Select a Course"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }
                        options={courses}
                    />
                </Form.Item>

                <Form.Item
                    name={"title"}
                    label="Module Name"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input
                        placeholder={'module name'}
                    />
                </Form.Item>


                <Form.Item
                    name={"moduleNo"}
                    label="Module No"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <InputNumber min={0}
                                 placeholder={'module number'}
                    />
                </Form.Item>


                <Form.Item
                >
                    <Button
                        loading={loading}
                        type="default" htmlType="submit" className='mt-8'>
                        Create Module
                    </Button>
                </Form.Item>
            </Form>
        </Card>
    )
};
export default CourseModuleCreateForm;