import { Button, Form, Input, Layout, List, message } from 'antd';
import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const data = [
    {
        name: 'Иванов Иван Иванович',
        group: '100111',
        id: 1,
    },
    {
        name: 'Петрова Полина Петровна',
        group: '100110',
        id: 33,
    },
    {
        name: 'Петрова Полина',
        group: '100110',
        id: 1888,
    },
    {
        name: 'Иванов Иван Иванович',
        group: '100110',
        id: 17,
    },
    {
        name: 'Петрова Полина Петровна',
        group: '100110',
        id: 188,
    },
    {
        name: 'Петрова Полина',
        group: '100110',
        id: 16,
    },
    {
        name: 'Иванов Иван Иванович',
        group: '100110',
        id: 15,
    },
    {
        name: 'Петрова Полина Петровна',
        group: '100110',
        id: 14,
    },
    {
        name: 'Петрова Полина',
        group: '100110',
        id: 13,
    },
    {
        name: 'Иванов Иван Иванович',
        group: '100110',
        id: 12,
    },
    {
        name: 'Петрова Полина Петровна',
        group: '100110',
        id: 656,
    },
    {
        name: 'Петрова Полина',
        group: '100110',
        id: 454,
    },
    {
        name: 'Иванов Иван Иванович',
        group: '100110',
        id: 35,
    },
    {
        name: 'Петрова Полина Петровна',
        group: '100110',
        id: 5,
    },
    {
        name: 'Петрова Полина',
        group: '100110',
        id: 2,
    },
];

interface IStudent {
    name: string,
    id: number,
    group: string,
}

const Students: React.FC = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [ students, setStudents ] = useState<IStudent[]>(data);

    const onSearchName = useCallback(() => {
        const result = form.getFieldValue('username');
        if (result) {
            const resultSearch = students.filter(item => item.name.includes(result));
            setStudents(resultSearch);
        } else {
            message.info('Для корректного поиска введите ФИО!');
        }
    }, []);

    const onSearchGroup = useCallback(() => {
        const result = form.getFieldValue('group');
        if (result) {
            const resultSearch = students.filter(item => item.group.includes(result));
            setStudents(resultSearch);
        } else {
            message.info('Для корректного поиска введите номер группы!');
        }
    }, []);

    const onClear = useCallback(() => {
        setStudents(data);
        form.setFieldValue('username', '');
        form.setFieldValue('group', '');
    }, []);

    const onClick = useCallback((key: number) => {
        navigate(`/students/${key}`);
    }, []);

    return (
        <Layout style={{ marginInline: 50, marginTop: 50 }}>
            <Form
                form={form}
                layout='inline'
                name="filterStudent"
                autoComplete="off"
            >
                <Form.Item
                    name="username"
                    style={{ marginLeft: 50, width: 250 }}
                >
                    <Input placeholder='ФИО'/>                     
                </Form.Item>
                <Form.Item>
                    <Button type="primary" title='Найти' onClick={onSearchName}>
                        Найти
                    </Button>   
                </Form.Item>
                <Form.Item
                    name="group"
                    style={{ marginLeft: 50 }}
                >
                    <Input placeholder='Группа' type='number'/>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" title='Найти' onClick={onSearchGroup}>
                        Найти
                    </Button>   
                </Form.Item>
                <Form.Item>
                    <Button title='Сбросить фильтр' onClick={onClear}>
                        Сбросить фильтр
                    </Button>   
                </Form.Item>
            </Form>
            <List
                itemLayout="horizontal"
                header={
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingInline: 50, paddingBlock: 15, fontWeight: 'bold', fontSize: '18px'}}>
                        <div>ФИО</div>
                        <div>Группа</div>
                    </div>
            }
                dataSource={students}
                pagination={{
                    pageSize: 10,
                }}
                renderItem={(item) => (
                    <List.Item style={{ paddingInline: 50, cursor: 'pointer'  }} onClick={() => {onClick(item.id)}}>
                        <div>{item.name}</div>
                        <div>{item.group}</div>
                    </List.Item>
                )}
            />

        </Layout>
    )
};

export default Students;