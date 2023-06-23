import React, { useCallback, useEffect, useState } from 'react';
import { Button, Form, Input, Spin } from 'antd';
import { useSelector } from 'react-redux';
import { selectUserEmail } from 'Store/selectors/AuthSelector';
import { userAPI } from 'API/user-api';

const Profile: React.FC = () => {
    const [form] = Form.useForm();
    const email = useSelector(selectUserEmail);
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
                <Button type="primary" onClick={onSave}>Редактировать профиль</Button>
            </Form>
            </div>
        </Spin>
    )
};

export default Profile;