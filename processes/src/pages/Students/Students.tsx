import { companyAPI } from 'API/company-api';
import { userAPI } from 'API/user-api';
import { selectCompanyId, selectUserRole } from 'Store/selectors/AuthSelector';
import { IStudent } from 'Types/types';
import { useSelector } from 'react-redux';
import { Button, Form, Input, Layout, List, Spin, message } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddStudentModal from './components/AddStudentModal';

const Students: React.FC = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [ students, setStudents ] = useState<IStudent[]>();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const role = useSelector(selectUserRole);
    const companyId = useSelector(selectCompanyId);
    useEffect(() => {
        if (students === undefined) {
            api();
        }
    }, []);

    const api = useCallback( async () => {
        if (role === 'SCHOOL') {
            const result = await userAPI.getUsersByRole('STUDENT');
            setStudents(result);
        } else {
            console.log(companyId);
            const result = await companyAPI.getCompanyStudents(companyId as number);
            setStudents(result);
        }
    }, []);

    const onSearchName = useCallback(() => {
        const result = form.getFieldValue('username');
        if (result) {
            console.log(result);
            const resultSearch = students?.filter(item => `${item.lastName} ${item.firstName} ${item.patronym}`.search(result) >= 0);

            setStudents(resultSearch ?? []);
        } else {
            message.info('Для корректного поиска введите ФИО!');
        }
    }, []);

    const onSearchGroup = useCallback(() => {
        const result = form.getFieldValue('group');
        if (result) {
            const resultSearch = students?.filter(item => item.groupNumber.includes(result));
            setStudents(resultSearch);
        } else {
            message.info('Для корректного поиска введите номер группы!');
        }
    }, []);

    const onClear = useCallback(() => {
        api();
        form.setFieldValue('username', '');
        form.setFieldValue('group', '');
    }, []);

    const onClick = useCallback((key: string) => {
        navigate(`/students/${key}`);
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
        <Layout style={{ marginInline: 50, marginTop: 50 }}>
            <Form
                form={form}
                layout='inline'
                name="filterStudent"
                autoComplete="off"
            >
                {/* <Form.Item
                    name="username"
                    style={{ marginLeft: 50, width: 250 }}
                >
                    <Input placeholder='ФИО'/>                     
                </Form.Item>
                <Form.Item>
                    <Button type="primary" title='Найти' onClick={onSearchName}>
                        Найти
                    </Button>   
                </Form.Item> */}
                {/* <Form.Item
                    name="group"
                    style={{ marginLeft: 50 }}
                >
                    <Input placeholder='Группа' type='number'/>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" title='Найти' onClick={onSearchGroup}>
                        Найти
                    </Button>   
                </Form.Item> */}
                {/* <Form.Item>
                    <Button title='Сбросить фильтр' onClick={onClear}>
                        Сбросить фильтр
                    </Button>   
                </Form.Item> */}
            </Form>
            <Spin spinning={students === undefined}>
                <List
                    itemLayout="horizontal"
                    header={
                        <div style={{ display: 'flex', justifyContent: 'space-between', paddingInline: 50, paddingBlock: 15, fontWeight: 'bold', fontSize: '18px'}}>
                            <div>ФИО</div>
                            <div>{role === 'SCHOOL' ? 'Группа' : 'Позиция'}</div>
                        </div>
                }
                    dataSource={students}
                    pagination={{
                        pageSize: 10,
                    }}
                    renderItem={(item) => (
                        <List.Item style={{ paddingInline: 50, cursor: 'pointer'  }} onClick={() => {onClick(item.userId)}}>
                            <div>{item.lastName} {item.firstName} {item.patronym}</div>
                            {/* <div>{item.groupNumber}</div> */}
                            <div>{role === 'SCHOOL' ? item.groupNumber : item.position}</div>
                        </List.Item>
                    )}
                />
                {role === 'SCHOOL' ? (<div><Button style={{ marginLeft: 30}} title='Добавить студента' type='primary' onClick={showModal}>
                    Добавить студента
                </Button></div>) : null}
                <AddStudentModal
                    onCancel={handleCancel}
                    onOk={handleOk}
                    open={isModalOpen}
                />
            </Spin>
        </Layout>
    )
};

export default Students;