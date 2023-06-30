import { CheckCircleOutlined } from '@ant-design/icons';
import { Button, Col, Row, Spin, Timeline, Typography } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import AnswerModalForStudent from './AnswerModalForStudent';
import { applicationServiceAPI } from 'API/application-service-api';
import { IApplication } from 'Types/types';

const { Title, Paragraph } = Typography;
interface IProps {
    id: string,
};

const data = {
    position: 'IOS разработчик',
    company: 'red_mad_robot',
    date: '12.06.2023',
    resume: 'текст',
}

const status = [
    {
        dot: <CheckCircleOutlined />,
        children: 'Create a services site 2015-09-01',
    },
    {
        dot: <CheckCircleOutlined />,
        children: 'Solve initial network problems 2015-09-01',
    },
    {
        dot: <CheckCircleOutlined />,
        children: 'Technical testing 2015-09-01',
    },
    {
        dot: <CheckCircleOutlined />,
        children: 'Network problems being solved 2015-09-01',
    },
];

const ApplicationForStudent: React.FC<IProps> = ({ id }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [ application, setApplication ] = useState<IApplication>();
    const [ status, setStatus ] = useState();
    const [ statusName, setStatusName ] = useState<string[]>();

    useEffect(() => {
        if (application === undefined) {
            api();
        }
    }, []);

    const api = useCallback( async () => {
        const result = await applicationServiceAPI.getApplicationById(id);
        setApplication(result)
        setStatusName(result.status);
        const statusResult = result.status.map((item: string) => {
            return {
                dot: <CheckCircleOutlined />,
                children: item,
            }
        });
        setStatus(statusResult);
        console.log(result, statusResult[statusResult.length - 1].children);
    }, []);

    const showModal = useCallback(() => {
        setIsModalOpen(true);
    }, []);

    const handleOk = useCallback(async () => {
        await applicationServiceAPI.addStatusToApplication(id, 'OFFER_ACCEPTED');
        setIsModalOpen(false);
    }, []);

    const handleCancel = useCallback(async () => {
        await applicationServiceAPI.addStatusToApplication(id, 'OFFER_REJECTED');
        setIsModalOpen(false);
    }, []);

    const handleClose = useCallback(() => {
        setIsModalOpen(false);
    }, []);
    return (
        <>
            <Row>
                <Col span={12}>
                    <Spin spinning={application === undefined}>
                        <div style={{ marginLeft: 50, marginTop: 70 }}>
                            <Title level={5} style={{ marginTop: 0 }}>Позиция: {application?.position}</Title>
                            <Title level={5} style={{ marginTop: 0 }}>Компания: {application?.companyName} </Title>
                        </div>
                        <Title level={5} style={{ marginLeft: 50, marginTop: 0 }} hidden={!application?.interviews[0]}>Дата собеседования: {application?.interviews[0]?.date}</Title>
                        {/* <Paragraph style={{ marginLeft: 50, marginTop: 0 }}>{data.resume}</Paragraph> */}
                        <div style={{ marginLeft: 50, marginTop: 20 }}>
                            {statusName && statusName[statusName?.length - 1] === 'Предложен оффер' ? (<Button 
                                type='primary' 
                                onClick={showModal} 
                            >Дать ответ</Button>): null}
                        </div>
                    </Spin>
                </Col>
                <Col span={12}>
                    <Title level={5} style={{ marginLeft: 100, marginTop: 70 }}>Статусы заявки</Title>
                    <Spin spinning={status === undefined}>
                        <Timeline
                            items={status}
                            style={{ marginLeft: 100, marginTop: 20 }}
                        />
                    </Spin>
                </Col>
            </Row>
            <AnswerModalForStudent
                onCancel={handleCancel}
                onOk={handleOk}
                open={isModalOpen}
                onClose={handleClose}
            />
        </>
    )
};

export default ApplicationForStudent;