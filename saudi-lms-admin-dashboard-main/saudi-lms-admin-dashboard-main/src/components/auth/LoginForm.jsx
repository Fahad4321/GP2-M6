import React from 'react';
import { Button, Form, Input } from "antd";
import { Link } from "react-router-dom";
import { loginRequest } from "../../APIRequest/authApi";


const LoginForm = () => {
    const onFinish = (values) => {
        loginRequest(values.email, values.password).then(res => {
            if (res) {
                window.location.href = '/admin/dashboard'
            }
        })
    };

    return (
        <Form
            className='shadow-sm rounded p-4'
            name="basic"
            layout='vertical'
            onFinish={onFinish}
            autoComplete="off"
        >
            <Form.Item
                label="Email"
                name="email"
                rules={[
                    {
                        required: true,
                        message: 'Please input your email!',
                    },
                ]}
            >
                <Input size='large' style={{ width: '100%' }} />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input your password!' }]}
                className='p-0 m-0'
            >
                <Input.Password size='large' />
            </Form.Item>
            <div className='d-flex justify-content-between'>
                <p></p>
                <Link to='/send-otp' className=''>Forgot password</Link>
            </div>


            <Form.Item
            >
                <Button type='ghost' htmlType="submit" className='d-block w-100 mt-4 bg-info text-white'>
                    Login
                </Button>
            </Form.Item>
        </Form>

    );
};

export default LoginForm;