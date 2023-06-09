import React, { useCallback, useEffect, useState } from 'react';
import { Button, Card, Col, Row, Spin, Table, Typography } from 'antd';
import { useSelector } from 'react-redux';
import { practiceServiceAPI } from 'API/practice-service-api';
import { IApplication, IPeriod, IStudent } from 'Types/types';
import { userAPI } from 'API/user-api';
import { useNavigate } from 'react-router-dom';
import { applicationServiceAPI } from 'API/application-service-api';
import { selectUserId } from 'Store/selectors/AuthSelector';
import AddWorkPlaceInfoModal from './AddWorkPlaceInfoModal';

const { Title } = Typography;
const { Column } = Table;

interface IProps {
    id: string,
};
const data = [
    {
        position: 'Java-разработчик',
        name: 'НТР',
        status: 'Подана заявка',
    },
    {
        position: 'Frontend-разработчик',
        name: 'Спортмастер',
        status: 'Подана заявка',
    },
    {
        position: 'ML',
        name: 'НТР',
        status: 'Отказ компании',
    },
];

const StudentForSchool: React.FC<IProps> = ({ id }) => {
    const navigate = useNavigate();
    const [ periods, setPeriods ] = useState<IPeriod[]>();
    const [ user, setUser ] = useState<IStudent>();
    const [ application, setApplication ] = useState<IApplication[]>();
    const [ position, setPosition ] = useState<string>();
    const [ company, setCompany ] = useState<string>();
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (periods === undefined || user === undefined || application === undefined) {
            api();
        }
    }, []);

    const api = useCallback( async () => {
        const result = await practiceServiceAPI.getPracticePeriodAndStudentPracticeProfile(id);
        setPeriods(result?.profilesAndPeriodsNames);

        const userResult = await userAPI.getUsersById(id);
        setUser(userResult);

        const applicationsResult = await applicationServiceAPI.getStudentApplicationsById(id);
        const res = applicationsResult.applications.map((item: any) => {return {
            companyName: item.companyName,
            position: item.position,
            status: item.status[item.status.length - 1],
            id: item.id,
        };});
        setApplication(res);

        const position = await applicationServiceAPI.getStudentApplicationsById(id);
        setPosition(position.position);
        setCompany(position.companyName);
    }, []);

    const showModal = useCallback(() => {
        setIsModalOpen(true);
    }, []);

    const handleOk = useCallback(() => {
        setIsModalOpen(false);
        api();
    }, []);

    const handleCancel = useCallback(() => {
        setIsModalOpen(false);
    }, []);

    return (
        <>
            <Spin spinning={user === undefined || company === undefined || position === undefined}>
                <Card style={{ margin: 20 }}>
                    <Row>
                        <Col flex='auto'>
                            <Title level={3} style={{ marginTop: 0 }}>ФИО: {user?.lastName} {user?.firstName} {user?.patronym}</Title>
                        </Col>
                        {/* <Col flex='none'>
                            <div style={{ textAlign: 'right' }}><Button type="primary" title='Создать уведомление' onClick={()=>{}}>Создать уведомление</Button></div>
                        </Col> */}
                    </Row>
                    <Title level={5} style={{ marginTop: 0 }}>Группа: {user?.groupNumber}</Title>
                    <Title level={5} style={{ marginTop: 0 }}>Место прохождения практики: {company ?? 'пока нет'} </Title>
                    <Title level={5} style={{ marginTop: 0 }}>Позиция: {position ?? 'пока нет'} </Title>
                </Card>
            </Spin>
            <Title level={5} style={{ marginTop: 20, marginLeft: 30 }}>Заявки на прохождения практики</Title>
                <Spin spinning={application === undefined}>
                    <Table 
                        dataSource={application} 
                        pagination={{
                            pageSize: 10,
                        }}
                        style={{ marginInline: 30 }}
                        // onRow={(record, rowIndex) => {
                        //     return {
                        //       onClick: (event) => {navigate(`/applications/${record.id}`)},
                        //     };
                        // }}
                    >
                        <Column dataIndex="companyName" key="companyName" title="Компания" width="300px" />
                        <Column dataIndex="position" key="position" title="Позиция" width="300px" />
                        <Column dataIndex="status" key="status" title="Статус" width="300px" />
                    </Table>
                </Spin>
            <Title level={5} style={{ marginTop: 20, marginLeft: 30 }}>Периоды практики:</Title>
            <Spin spinning={periods === undefined}>
            <Table 
                dataSource={periods} 
                pagination={{
                    pageSize: 10,
                }}
                style={{ marginInline: 30 }}
                onRow={(record, rowIndex) => {
                    return {
                      onClick: (event) => {navigate(`/practicePeriods/${record.practiceProfileId}`)},
                    };
                }}
            >
                <Column dataIndex="practicePeriodName" key="practicePeriodName" title="Период" width="300px" />
                <Column dataIndex="startDate" key="startDate" title="Дата начала" width="300px" />
                <Column dataIndex="endDate" key="endDate" title="Дата окончания" width="300px" />
            </Table>
            </Spin>
            <div><Button style={{ marginLeft: 30, marginBottom: 50 }} title='Добавить место стажировки' type='primary' onClick={showModal}>
                    Добавить место стажировки
                </Button></div>
            <AddWorkPlaceInfoModal
                onCancel={handleCancel}
                onOk={handleOk}
                open={isModalOpen}
                id={id}
            />
        </>
    )
};

export default StudentForSchool;