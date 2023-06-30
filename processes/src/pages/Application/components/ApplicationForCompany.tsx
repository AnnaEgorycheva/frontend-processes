import { CheckCircleOutlined } from '@ant-design/icons';
import { Row, Col, Button, Timeline, Typography, Form } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import AnswerModalForCompany from './AnswerModalForCompany';
import ScheduleInterviewModal from './ScheduleInterviewModal';
import { applicationServiceAPI } from 'API/application-service-api';
import { IApplication } from 'Types/types';
import { userAPI } from 'API/user-api';

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
    
    const [ application, setApplication ] = useState<IApplication>();
    const [ status, setStatus ] = useState();
    const [ statusName, setStatusName ] = useState<string[]>();
    const [ student, setStudent ] = useState<string>();

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

        const student = await userAPI.getUsersById(result.studentId);
        setStudent(`${student.lastName} ${student.firstName} ${student.patronym}`);
    }, []);

    const showAnswerModal = useCallback(() => {
        setIsAnswerModalOpen(true);
    }, []);

    const handleOkAnswerModal = useCallback(async () => {
        await applicationServiceAPI.addStatusToApplication(id, 'OFFER_ISSUED');
        setIsAnswerModalOpen(false);
        api();
    }, []);

    const handleCancelAnswerModal = useCallback(async () => {
        await applicationServiceAPI.addStatusToApplication(id, 'REJECTED');
        setIsAnswerModalOpen(false);
        api();
    }, []);
    const handleCloseAnswerModal = useCallback(() => {
        setIsAnswerModalOpen(false);
        api();
    }, []);

    const showScheduleInterview = useCallback(() => {
        setIsScheduleInterviewModalOpen(true);
    }, []);

    const handleOkScheduleInterviewModal = useCallback(() => {
        setIsScheduleInterviewModalOpen(false);
        api();
    }, []);

    const handleCancelScheduleInterviewModal = useCallback(() => {
        setIsScheduleInterviewModalOpen(false);
        api();
    }, []);
    
    return (
        <>
            <Row>
                <Col span={12}>
                    <div style={{ marginLeft: 50, marginTop: 70 }}>
                        <Title level={5} style={{ marginTop: 0 }}>ФИО: {student}</Title>
                        <Title level={5} style={{ marginTop: 0 }}>Позиция: {application?.position}</Title>
                    </div>
                    <Paragraph style={{ marginLeft: 50, marginTop: 0 }}>Место собеседования: {(application?.interviews[0] && application?.interviews[0].location) ?? 'пока нет'}</Paragraph>
                    <Paragraph style={{ marginLeft: 50, marginTop: 0 }}>Дата собеседования: {(application?.interviews[0] && application?.interviews[0].date.substr(0, 10)) ?? 'пока нет'}</Paragraph>
                    <div style={{ marginLeft: 50, marginTop: 20 }}>
                        {statusName && (statusName[statusName?.length - 1] === 'Назначено собеседование' || statusName[statusName?.length - 1] === 'Подана заявка')? (<Button 
                            type='primary' 
                            onClick={showAnswerModal} 
                        >Дать ответ</Button>): null}
                        {statusName && statusName[statusName?.length - 1] === 'Подана заявка' ? (<Button 
                            type='primary' 
                            onClick={showScheduleInterview}
                            style={{ marginLeft: 20 }}
                        >Назначить собеседование</Button>): null}
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
                id={id}
            />
        </>
    )
};

export default ApplicationForCompany;

