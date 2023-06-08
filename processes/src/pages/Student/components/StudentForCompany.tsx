import React from 'react';
import { Button, Card, Col, Row, Table, Typography } from 'antd';

const { Title } = Typography;

interface IProps {
    id: string,
};

const user = {
    name: 'Иванов Иван Иванович',
    groupNumber: 100110,
    company: 'НТР',
}

const StudentForCompany: React.FC<IProps> = () => {
    
    return (
        <>
            <Card style={{ margin: 20 }}>
                <Title level={3} style={{ marginTop: 0 }}>{user.name}</Title>
                <Title level={5} style={{ marginTop: 0 }}>Группа: {user.groupNumber}</Title>
                <Title level={5} style={{ marginTop: 0 }}>Место прохождения практики: {user.company ?? 'пока нет'} </Title>
            </Card>
        </>
    )
};

export default StudentForCompany;