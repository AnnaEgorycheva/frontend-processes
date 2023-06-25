import React from 'react';
import { Button, Card, Col, Row, Table, Typography } from 'antd';

const { Title } = Typography;
const { Column } = Table;

interface IProps {
    id: string,
};
const user = {
    name: 'Иванов Иван Иванович',
    groupNumber: 100110,
    company: null,
    position: undefined,
}

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
    console.log(id);
    return (
        <>
            <Card style={{ margin: 20 }}>
                <Row>
                    <Col flex='auto'>
                        <Title level={3} style={{ marginTop: 0 }}>{user.name}</Title>
                    </Col>
                    <Col flex='none'>
                        <div style={{ textAlign: 'right' }}><Button type="primary" title='Создать уведомление' onClick={()=>{}}>Создать уведомление</Button></div>
                    </Col>
                </Row>
                <Title level={5} style={{ marginTop: 0 }}>Группа: {user.groupNumber}</Title>
                <Title level={5} style={{ marginTop: 0 }}>Место прохождения практики: {user.company ?? 'пока нет'} </Title>
                <Title level={5} style={{ marginTop: 0 }}>Позиция: {user.position ?? 'пока нет'} </Title>
            </Card>
            {user.company ? 
            (<>
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
            </>) : 
            (<>
                <Title level={5} style={{ marginTop: 20, marginLeft: 30 }}>Периоды практики:</Title>
                <Table 
                    dataSource={data} 
                    pagination={{
                        pageSize: 10,
                    }}
                    style={{ marginInline: 30 }}
                >
                    <Column dataIndex="name" key="name" title="Период" width="300px" />
                    <Column dataIndex="position" key="position" title="Дата начала" width="300px" />
                    <Column dataIndex="status" key="status" title="Дата окончания" width="300px" />
                </Table>
            </>)}

            <Title level={5} style={{ marginTop: 0, marginLeft: 30 }}>Архив заявок</Title>
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
        </>
    )
};

export default StudentForSchool;