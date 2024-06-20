import React from 'react';
import {Card, Col, Row, Statistic} from "antd";

const ReportCard = () => {
    return (
        <>
            <Row gutter={16}>
                <Col span={4}>
                    <Card bordered={false}>
                        <Statistic
                            title={(<h6 className='fw-bold text-primary-color'>Total Courses</h6>)}
                            value={200}
                            precision={0}
                            valueStyle={{
                                color: '#3f8600',
                            }}
                        />
                    </Card>
                </Col>
                <Col span={4}>
                    <Card bordered={false}>
                        <Statistic
                            title={(<h6 className='fw-bold text-primary-color'>Total Students</h6>)}
                            value={600}
                            precision={0}
                            valueStyle={{
                                color: '#3f8600',
                            }}
                        />
                    </Card>
                </Col>

                <Col span={4}>
                    <Card bordered={false}>
                        <Statistic
                            title={(<h6 className='fw-bold text-primary-color'>Total Employee</h6>)}
                            value={5}
                            precision={0}
                            valueStyle={{
                                color: '#3f8600',
                            }}
                        />
                    </Card>
                </Col>

            </Row>
        </>
    );
};

export default ReportCard;