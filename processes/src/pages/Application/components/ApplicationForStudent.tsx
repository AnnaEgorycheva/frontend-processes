import { CheckCircleOutlined } from '@ant-design/icons';
import { Button, Col, Row, Timeline, Typography } from 'antd';
import React, { useCallback, useState } from 'react';
import AnswerModalForStudent from './AnswerModalForStudent';

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

    const showModal = useCallback(() => {
        setIsModalOpen(true);
    }, []);

    const handleOk = useCallback(() => {
        setIsModalOpen(false);
    }, []);

    const handleCancel = useCallback(() => {
        setIsModalOpen(false);
    }, []);

    const handleClose = useCallback(() => {
        setIsModalOpen(false);
    }, []);
    return (
        <>
            <Row>
                <Col span={12}>
                    <div style={{ marginLeft: 50, marginTop: 70 }}>
                        <Title level={5} style={{ marginTop: 0 }}>Позиция: {data.position}</Title>
                        <Title level={5} style={{ marginTop: 0 }}>Компания: {data.company} </Title>
                    </div>
                    <Title level={5} style={{ marginLeft: 50, marginTop: 0 }} hidden={!data.date}>Дата собеседования: {data.date}</Title>
                    <Paragraph style={{ marginLeft: 50, marginTop: 0 }}>{data.resume}</Paragraph>
                    <div style={{ marginLeft: 50, marginTop: 20 }}><Button type='primary' onClick={showModal}>Дать ответ</Button></div>
                </Col>
                <Col span={12}>
                    <Title level={5} style={{ marginLeft: 100, marginTop: 70 }}>Статусы заявки</Title>
                    <Timeline
                        items={status}
                        style={{ marginLeft: 100, marginTop: 20 }}
                    />
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