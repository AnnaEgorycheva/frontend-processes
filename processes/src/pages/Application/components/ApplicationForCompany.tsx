import { CheckCircleOutlined } from '@ant-design/icons';
import { Row, Col, Button, Timeline, Typography, Form } from 'antd';
import React, { useCallback, useState } from 'react';
import AnswerModalForCompany from './AnswerModalForCompany';
import ScheduleInterviewModal from './ScheduleInterviewModal';

const { Title, Paragraph } = Typography;
interface IProps {
    id: string,
};
const data = {
    position: 'IOS разработчик',
    name: 'Иванов Иван Иванович',
    resume: 'текстgggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg',
    interview: 'текст',
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
];

const ApplicationForCompany: React.FC<IProps> = ({ id }) => {
    console.log(id);
    const [isAnswerModalOpen, setIsAnswerModalOpen] = useState(false);
    const [isScheduleInterviewModalOpen, setIsScheduleInterviewModalOpen] = useState(false);

    const showAnswerModal = useCallback(() => {
        setIsAnswerModalOpen(true);
    }, []);

    const handleOkAnswerModal = useCallback(() => {
        setIsAnswerModalOpen(false);
    }, []);

    const handleCancelAnswerModal = useCallback(() => {
        setIsAnswerModalOpen(false);
    }, []);
    const handleCloseAnswerModal = useCallback(() => {
        setIsAnswerModalOpen(false);
    }, []);

    const showScheduleInterview = useCallback(() => {
        setIsScheduleInterviewModalOpen(true);
    }, []);

    const handleOkScheduleInterviewModal = useCallback(() => {
        setIsScheduleInterviewModalOpen(false);
    }, []);

    const handleCancelScheduleInterviewModal = useCallback(() => {
        setIsScheduleInterviewModalOpen(false);
    }, []);
    
    return (
        <>
            <Row>
                <Col span={12}>
                    <div style={{ marginLeft: 50, marginTop: 70 }}>
                        <Title level={5} style={{ marginTop: 0 }}>ФИО: {data.name}</Title>
                        <Title level={5} style={{ marginTop: 0 }}>Позиция: {data.position}</Title>
                    </div>
                    <Paragraph style={{ marginLeft: 50, marginTop: 0 }}>{data.resume}</Paragraph>
                    <Paragraph style={{ marginLeft: 50, marginTop: 0 }}>{data.interview}</Paragraph>
                    <div style={{ marginLeft: 50, marginTop: 20 }}>
                        <Button type='primary' onClick={showAnswerModal}>Дать ответ</Button>
                        <Button type='primary' onClick={showScheduleInterview} style={{ marginLeft: 20 }}>Назначить собеседование</Button>
                    </div>
                </Col>
                <Col span={12}>
                    <Title level={5} style={{ marginLeft: 100, marginTop: 70 }}>Статусы заявки</Title>
                    <Timeline
                        items={status}
                        style={{ marginLeft: 100, marginTop: 20 }}
                    />
                </Col>
            </Row>
            <AnswerModalForCompany
                onCancel={handleCancelAnswerModal}
                onOk={handleOkAnswerModal}
                open={isAnswerModalOpen}
                onClose={handleCloseAnswerModal}
            />
            <ScheduleInterviewModal
                onCancel={handleCancelScheduleInterviewModal}
                onOk={handleOkScheduleInterviewModal}
                open={isScheduleInterviewModalOpen}
            />
        </>
    )
};

export default ApplicationForCompany;

