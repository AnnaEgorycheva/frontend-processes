import React, { useCallback, useEffect, useState } from 'react';
import { Button, Form, Input, Spin } from 'antd';
import { useSelector } from 'react-redux';
import { selectUserEmail, selectUserRole } from 'Store/selectors/AuthSelector';
import { userAPI } from 'API/user-api';
import { IStudent } from 'Types/types';

const Profile: React.FC = () => {
    const [form] = Form.useForm();
    const email = useSelector(selectUserEmail);
    const role = useSelector(selectUserRole);
    const [ user, setUser ] = useState();

    useEffect(() => {
        if (user === undefined) {
            api();
        }
    }, []);

    const api = useCallback( async () => {
        const result = await userAPI.getUsersByEmail(email);
        setUser(result);
        form.setFieldsValue(result);
    }, []);

    const onSave = useCallback(() => {
        const result = form.getFieldsValue();
        setUser(result);
        console.log(result);
      }, [ form ]);

    console.log((user as unknown as IStudent)?.groupNumber);
    return (
        <Spin spinning={user === undefined}>
            <div>
            <Form
                form={form}
                name="basic"
                layout='vertical'
                initialValues={{ remember: true }}
                style={{ marginTop: 40, marginLeft: 20, maxWidth: 500 }}
            >
               <Form.Item
                    label="Фамилия"
                    name="lastName"
                    rules={[{ required: true, message: 'Заполните фамилию!' }]}>
                    <Input placeholder='Фамилия' type='STRING'/>
                </Form.Item>
                <Form.Item
                    label="Имя"
                    name="firstName"
                    rules={[{ required: true, message: 'Заполните имя!' }]}>
                    <Input placeholder='Имя' type='STRING'/>
                </Form.Item>
                <Form.Item
                    label="Отчество"
                    name="patronym"
                    rules={[{ required: true, message: 'Заполните отчество!' }]}>
                    <Input placeholder='Отчество' type='STRING'/>
                </Form.Item>
                <Form.Item
                    label="email"
                    name="email"
                    rules={[{ required: true, message: 'Заполните email!' }]}>
                    <Input placeholder='email' type='STRING'/>
                </Form.Item>
                {role === 'STUDENT' ? (<Form.Item
                    label="Номер группы"
                    name="groupNumber"
                    hidden={!(user as unknown as IStudent)?.groupNumber}
                    rules={[{ required: true, message: 'Заполните номер группы!' }]}>
                    <Input placeholder='Номер группы' type='STRING'/>
                </Form.Item>) : null}
                {role === 'STUDENT' ? (<Form.Item
                    label="Место прохождения практики"
                    name="place"
                    hidden={!(user as unknown as IStudent)?.groupNumber}
                    rules={[{ required: true, message: 'Заполните место прохождения практики!' }]}>
                    <Input placeholder='Место прохождения практики' type='STRING'/>
                </Form.Item>) : null}
                {role === 'STUDENT' ? (<Form.Item
                    label="Позиция"
                    name="position"
                    hidden={!(user as unknown as IStudent)?.groupNumber}
                    rules={[{ required: true, message: 'Заполните позицию!' }]}>
                    <Input placeholder='Позиция' type='STRING'/>
                </Form.Item>) : null}
                <Button type="primary" onClick={onSave}>Редактировать профиль</Button>
            </Form>
            </div>
        </Spin>
    )
};

export default Profile;