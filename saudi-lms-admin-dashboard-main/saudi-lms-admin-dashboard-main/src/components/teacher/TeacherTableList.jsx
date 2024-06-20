import React, {useEffect, useState} from 'react';
import {Button, Select, Space, Table, Input, Image} from "antd";
import {getAllTeacherRequest} from "../../APIRequest/teacherAPIRequest.js";

const {Search} = Input;

const TeacherTableList = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0,
        onChange: (page, pageSize) => {
            fetchData(page, pageSize);
        },
    });

    const fetchData = async (page, pageSize, keyword) => {
        setLoading(true)
        const response = await getAllTeacherRequest(page, pageSize, keyword);
        setLoading(false)
        setData(response.teachers?.rows);
        setPagination({
            ...pagination,
            current: page,
            pageSize: pageSize,
            total: response.teachers?.total,
        });

    };

    useEffect(() => {
        fetchData(pagination.current, pagination.pageSize);

    }, []);

    const uniqueData = data?.reduce((acc, obj) => {
        const isDuplicate = acc?.some(item => {
            return item?.createdBy?.mobile === obj?.createdBy?.mobile
        } );
        if (!isDuplicate) {
            acc.push(obj);
        }
        return acc;
    }, []);

    const filter = () => {
        return uniqueData?.reduce((acc, currentValue) => {
            return [...acc, {
                text: (<>
                    <p>{currentValue.createdBy.firstName} {!currentValue.createdBy.middleName ? '' : currentValue.createdBy.middleName} {currentValue.createdBy.lastName}</p>
                    <p>{currentValue.createdBy?.mobile}</p>
                </>),
                value: currentValue.createdBy?.mobile
            }]
        }, [])
    }
    const viewStudentHandler = (createdId) => {
        alert(createdId)
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'firstName',
            key: 'firstName',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.email.length - b.email.length,
            render: (name, data) => `${data.firstName} ${data.lastName}`

        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.email.length - b.email.length,
        },
        {
            title: 'Mobile',
            dataIndex: 'mobile',
            key: 'mobile',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.mobile - b.mobile,
        },
        {
            title: 'Created By',
            dataIndex: 'createdBy',
            key: 'createdBy',
            render: (name, data) => (
                <>
                    <p>{data.createdBy.firstName} {data.createdBy.lastName}</p>
                    <p>{data.createdBy?.mobile}</p>
                </>
            ),
            filters: filter(),
        },
        {
            title: 'Photo',
            dataIndex: 'picture',
            key: 'picture',
            render: (name, data) => (
                <>
                    <Image src={data?.picture?.secure_url} className='rounded border img-fluid' style={{width: '80px', height: '60px'}}/>
                </>
            ),
            filters: filter(),
        },
        {
            title: 'Action',
            dataIndex: '_id',
            render: (value) => {
                return (
                    <Space wrap key={value}>
                        <Button type="default" className='bg-primary-color text-white'
                                onClick={() => viewStudentHandler(value)}>Edit</Button>
                    </Space>
                );
            },
        },
    ]
    const handleChange = (value) => {
        fetchData(1, value)
    }
    const onSearch = async (value) => {
        if (!value) {
            fetchData(1, pagination.pageSize, '0')
        } else {
            fetchData(1, pagination.pageSize, value)
        }
    }

    return (
        <>
            <div className='d-flex justify-content-between my-4'>
                <div></div>
                <div className='d-flex justify-content-between align-items-center gap-3'>
                    <Select
                        defaultValue="10 Per Page"
                        style={{
                            width: 120,
                        }}
                        onChange={handleChange}
                        options={[
                            {
                                value: 10,
                                label: '10 Per Page',
                                key: 10,
                            },
                            {
                                value: 20,
                                label: '20 Per Page',
                                key: 20,
                            },
                            {
                                value: 50,
                                label: '50 Per Page',
                                key: 50,
                            },
                            {
                                value: 100,
                                label: '100 Per Page',
                                key: 100,
                            },
                            {
                                value: 200,
                                label: '200 Per Page',
                                key: 200,
                            },

                        ]}
                    />
                    <Search placeholder="search" rootClassName='' onSearch={onSearch} enterButton/>
                </div>
            </div>
            <Table
                dataSource={data}
                pagination={pagination}
                columns={columns}
                loading={loading}
            />

        </>
    )
};

export default TeacherTableList;