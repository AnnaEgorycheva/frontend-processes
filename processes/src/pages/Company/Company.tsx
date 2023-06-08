import React, { useEffect, useState } from 'react';
import { Card, Table, Typography } from 'antd';
import { useLocation } from 'react-router-dom';

const { Title } = Typography;
const { Column } = Table;


const data = {
    name: 'НТР',
    description: 'описание',
    address: 'пр. Развития 3',
    contacts: '88888888888'
};

const position = [
    {
        name: 'Java-разработчик',
        places: 2,
        number: 10,
    },
    {
        name: 'Frontend-разработчик',
        places: 4,
        number: 6,
    },
    {
        name: 'ML',
        places: 1,
        number: 2,
    },
];

const user = {
    role: 'school',
};

const Company: React.FC = () => {
    const location = useLocation();
    const id = location.pathname.split('/')[2];
    const [ numberColumn, setNumberColumn ] = useState<number>(1);

    useEffect(() => {
        if (numberColumn === 1 && user.role === 'school') {
            setNumberColumn(3);
        } else if (numberColumn === 1 && user.role === 'student') {
            setNumberColumn(2);
        }
    })

    return (
        <>
            <Card style={{ margin: 30 }}>
                <Title level={3} style={{ marginTop: 0 }}>{data.name}</Title>
                <Title level={5} style={{ marginTop: 0 }}>Описание: {data.description}</Title>
                <Title level={5} style={{ marginTop: 0 }}>Адрес: {data.address}</Title>
                <Title level={5} style={{ marginTop: 0 }}>Контакт: {data.contacts}</Title>
            </Card>
            <Title level={4} style={{ marginTop: 0, marginLeft: 30 }}>Актуальные позиции</Title>
            <Table 
                dataSource={position} 
                pagination={{
                    pageSize: 10,
                }}
                style={{ marginInline: 30 }}
            >
                <Column dataIndex="name" key="name" title="Позиция" width="300px" />
                <Column dataIndex="places" key="places" title="Количество мест" width="300px" />
                {user.role === 'school' ? <Column dataIndex="number" key="number" title="Количество заявок" width="300px" /> : null}
            </Table>
        </>
    )
};

export default Company;