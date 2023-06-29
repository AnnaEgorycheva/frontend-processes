import React, { useCallback, useEffect, useState } from 'react';
import { Button, Col, Form, Input, Row, Spin } from 'antd';
import { useSelector } from 'react-redux';
import { selectUserEmail, selectUserRole } from 'Store/selectors/AuthSelector';
import { userAPI } from 'API/user-api';
import { IStudent } from 'Types/types';
import { companyAPI } from 'API/company-api';

const Profile: React.FC = () => {
    const [form] = Form.useForm();
    const [formCompany] = Form.useForm();
    const email = useSelector(selectUserEmail);
    const role = useSelector(selectUserRole);
    const [ user, setUser ] = useState<IStudent>();
    const [ company, setCompany ] = useState();

    useEffect(() => {
        if (user === undefined || company === undefined) {
            api();
        }
    }, []);

    const api = useCallback( async () => {
        const result = await userAPI.getUsersByEmail(email);
        setUser(result);
        form.setFieldsValue(result);

        if (result?.companyId) {
            console.log(result?.companyId);
            const companyRes = await companyAPI.getCompany(result?.companyId as string);
            console.log(companyRes);
            setCompany(companyRes);
            formCompany.setFieldsValue(companyRes);
        }
    }, []);

    const onSave = useCallback(async () => {
        const result = form.getFieldsValue();
        setUser(result);
        
        const resultId = await userAPI.getUsersByEmail(email);
        
        console.log(resultId, result);
        await userAPI.updateUser(resultId.userId, resultId.companyId, result.email, result.firstName, resultId.groupNumber, result.lastName, result.patronym, resultId.role)
    }, [ form ]);
    
    console.log(user);
    const onSaveCompany = useCallback(async () => {
        formCompany.validateFields();
        const result = formCompany.getFieldsValue();
        setCompany(result);
        
        const resultId = await userAPI.getUsersByEmail(email);
        if (resultId?.companyId) {
            console.log(user?.companyId);
            await companyAPI.putCompany(resultId.companyId as unknown as number, result.companyName, result.companyDescription, result.companyContacts, result.companyAddress)
        }
    }, [ form ]);

    return (
        <Spin spinning={user === undefined || company === undefined}>
            <div>
                    <Row>
                        <Col   flex='none' style={{ minWidth: 400}}>
                            <Form
                                form={form}
                                name="basic"
                                layout='vertical'
                                initialValues={{ remember: true }}
                                style={{ marginTop: 40, marginLeft: 20, maxWidth: 400 }}
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
                                    name="patronym">
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
                                    <Input placeholder='Номер группы' type='STRING' disabled/>
                                </Form.Item>) : null}
                                {role === 'STUDENT' ? (<Form.Item
                                    label="Место прохождения практики"
                                    name="place"
                                    hidden={!(user as unknown as IStudent)?.groupNumber}
                                    rules={[{ required: true, message: 'Заполните место прохождения практики!' }]}>
                                    <Input placeholder='Место прохождения практики' type='STRING' disabled/>
                                </Form.Item>) : null}
                                {role === 'STUDENT' ? (<Form.Item
                                    label="Позиция"
                                    name="position"
                                    hidden={!(user as unknown as IStudent)?.groupNumber}
                                    rules={[{ required: true, message: 'Заполните позицию!' }]}>
                                    <Input placeholder='Позиция' type='STRING' disabled/>
                                </Form.Item>) : null}
                                <Button type="primary" onClick={onSave}>Редактировать профиль</Button>
                            </Form>
                        </Col>
                        {role === 'COMPANY' ? (<Col  flex='auto' style={{ minWidth: 400}}>
                            <Form
                                form={formCompany}
                                name="basic"
                                layout='vertical'
                                initialValues={{ remember: true }}
                                style={{ marginTop: 40, marginLeft: 20, maxWidth: 400 }}
                            >                   
                                <Form.Item
                                    label="Название компании"
                                    name="companyName"
                                    rules={[{ required: true, message: 'Заполните!' }]}>
                                    <Input placeholder='Название компании' type='STRING'/>
                                </Form.Item>
                                <Form.Item
                                    label="Описание компании"
                                    name="companyDescription"
                                    rules={[{ required: true, message: 'Заполните!' }]}>
                                    <Input placeholder='Описание компании' type='STRING'/>
                                </Form.Item>
                                <Form.Item
                                    label="Контакты компании"
                                    name="companyContacts"
                                    rules={[{ required: true, message: 'Заполните!' }]}>
                                    <Input placeholder='Контакты компании' type='STRING'/>
                                </Form.Item>
                                <Form.Item
                                    label="Адрес компании"
                                    name="companyAddress"
                                    rules={[{ required: true, message: 'Заполните!' }]}>
                                    <Input placeholder='Адрес компании' type='STRING'/>
                                </Form.Item>
                                <Button type="primary" onClick={onSaveCompany}>Редактировать информацию о компании</Button>
                            </Form>
                        </Col>) : null}
                    </Row>
            </div>
        </Spin>
    )
};

export default Profile;