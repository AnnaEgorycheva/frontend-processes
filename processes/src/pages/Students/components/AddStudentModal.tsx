import { userAPI } from 'API/user-api';
import { Form, Input, Modal } from 'antd';
import React, { useCallback } from 'react';

const { TextArea } = Input;

interface IProps {
    onOk: () => void;
    onCancel: () => void;
    open: boolean;
}

const AddStudentModal: React.FC<IProps> = ({ onCancel, onOk, open }) => {
    const [form] = Form.useForm();
    
    const onSave = useCallback(async () => {
        if (form.getFieldValue('lastName') && form.getFieldValue('firstName') && form.getFieldValue('groupNumber') && form.getFieldValue('patronym') && form.getFieldValue('email') && form.getFieldValue('password')) {
            await userAPI.createUser(null, form.getFieldValue('email'), form.getFieldValue('firstName'), form.getFieldValue('groupNumber'), form.getFieldValue('lastName'), form.getFieldValue('password'), form.getFieldValue('patronym'), 'STUDENT');
            form.setFieldsValue({
                lastName: null,
                firstName: null,
                patronym: null,
                email: null,
                password: null,
                groupNumber: null,
            });
            onOk();
        } else {
            form.validateFields();
        }
    }, []);

    const onClose = useCallback(() => {
        form.setFieldsValue({
            lastName: null,
            firstName: null,
            patronym: null,
            email: null,
            password: null,
            groupNumber: null,
        });
        onCancel();
    }, []);

    return (
        <Modal 
            title="Добавить студента" 
            open={open} 
            onCancel={onClose}
            centered
            cancelText='Отменить'
            okText='Добавить'
            onOk={onSave}
        >
            <Form
                form={form}
                layout='vertical'
                name="company"
            >
                <Form.Item name='lastName' label='Фамилия' rules={[{ required: true, message: 'Заполните!' }]}>
                    <Input placeholder='Фамилия'/>
                </Form.Item>
                <Form.Item name='firstName' label='Имя' rules={[{ required: true, message: 'Заполните!' }]}> 
                    <Input placeholder='Имя'/>
                </Form.Item>
                <Form.Item name='patronym' label='Отчество' rules={[{ required: true, message: 'Заполните!' }]}>
                    <Input placeholder='Отчество'/>
                </Form.Item>
                <Form.Item name='groupNumber' label='Номер группы' rules={[{ required: true, message: 'Заполните!' }]}>
                    <Input placeholder='Номер группы'/>
                </Form.Item>
                <Form.Item name='email' label='email' rules={[{ required: true, message: 'Заполните!' }, { pattern: new RegExp('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$'), message: 'Введите корректный email'}]}>
                    <Input placeholder='email'/>
                </Form.Item>
                <Form.Item name='password' label='Пароль' rules={[{ required: true, message: 'Заполните!' }]}>
                    <Input placeholder='Пароль' type='password'/>
                </Form.Item>
            </Form>
        </Modal>
    )
};

export default AddStudentModal;