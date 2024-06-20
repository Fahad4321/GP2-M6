import {Button, Form, Input, InputNumber, Modal, Space} from "antd";
import {MinusCircleOutlined, PlusOutlined} from "@ant-design/icons";
import React, {useEffect} from "react";
import {updateModulebyID} from "../../../../APIRequest/courseModuleApiRequest";


const validateMessages = {
    required: '${label} is required!'
};
const CourseModuleModal = ({open, onCreate, onCancel, contents}) => {
    const [form] = Form.useForm();

    const handleInputChange = (key) => {
        // console.log(key);
    };

    useEffect(()=>{
        form.setFieldsValue({
                title: contents?.name,
                moduleNo: contents?.moduleNo
            }
        )
    }, [contents])



    return (
        <Modal
            open={open}
            title="Edit Course Module"
            okText={(<p className='text-green-600 hover:text-green-600'>Update</p>)}
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {

                        (async () => {
                            const result = await updateModulebyID(contents._id, values)
                            if(result){
                                onCreate();
                                form.resetFields();
                            }
                        })()

                        // console.log('updateValues', values)
                    })
                    .catch((info) => {
                        // console.log('Validate Failed:', info);
                    });
            }}
        >

            <Form
                form={form}
                // name="edit-module"
                layout='vertical'
                // onFinish={onClickSubmit}
                // initialValues={contents}
                validateMessages={validateMessages}
            >

                <Form.Item
                    name={'title'}
                    label={'Module Title'}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input placeholder='Module Name'/>
                </Form.Item>
                <Form.Item
                    name={'moduleNo'}
                    label={'Module No'}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <InputNumber placeholder='Module No'/>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default CourseModuleModal;