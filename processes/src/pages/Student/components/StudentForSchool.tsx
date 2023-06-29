import React, { useCallback, useEffect, useState } from 'react';
import { Button, Card, Col, Row, Table, Typography } from 'antd';
import { useSelector } from 'react-redux';
import { practiceServiceAPI } from 'API/practice-service-api';
import { IPeriod, IStudent } from 'Types/types';
import { userAPI } from 'API/user-api';
import { selectUserEmail } from 'Store/selectors/AuthSelector';

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
    const [ periods, setPeriods ] = useState<IPeriod[]>();
    const email = useSelector(selectUserEmail);
    const [ user, setUser ] = useState<IStudent>();

    useEffect(() => {
        if (periods === undefined) {
            api();
        }
    }, []);

    const api = useCallback( async () => {
        const result = await practiceServiceAPI.getPracticePeriodAndStudentPracticeProfile(id);
        setPeriods(result?.profilesAndPeriodsNames);

        const userResult = await userAPI.getUsersById(id);
        setUser(userResult);
    }, []);

    return (
        <>
            <Card style={{ margin: 20 }}>
                <Row>
                    <Col flex='auto'>
                        <Title level={3} style={{ marginTop: 0 }}>{user?.lastName} {user?.firstName} {user?.patronym}</Title>
                    </Col>
                    <Col flex='none'>
                        <div style={{ textAlign: 'right' }}><Button type="primary" title='Создать уведомление' onClick={()=>{}}>Создать уведомление</Button></div>
                    </Col>
                </Row>
                <Title level={5} style={{ marginTop: 0 }}>Группа: {user?.groupNumber}</Title>
                <Title level={5} style={{ marginTop: 0 }}>Место прохождения практики: {'пока нет'} </Title>
                <Title level={5} style={{ marginTop: 0 }}>Позиция: {'пока нет'} </Title>
            </Card>
            <Title level={5} style={{ marginTop: 20, marginLeft: 30 }}>Заявки на прохождения практики</Title>
                <Table 
                    dataSource={data} 
                    pagination={{
                        pageSize: 10,
                    }}
                    style={{ marginInline: 30 }}
                >
                    <Column dataIndex="name" key="name" title="Компания" width="300px" />
                    <Column dataIndex="position" key="position" title="Позиция" width="300px" />
                    <Column dataIndex="status" key="status" title="Статус" width="300px" />
                </Table>
            
            <Title level={5} style={{ marginTop: 20, marginLeft: 30 }}>Периоды практики:</Title>
            <Table 
                dataSource={periods} 
                pagination={{
                    pageSize: 10,
                }}
                style={{ marginInline: 30 }}
            >
                <Column dataIndex="practicePeriodName" key="practicePeriodName" title="Период" width="300px" />
                <Column dataIndex="startDate" key="startDate" title="Дата начала" width="300px" />
                <Column dataIndex="endDate" key="endDate" title="Дата окончания" width="300px" />
            </Table>
        </>
    )
};

export default StudentForSchool;