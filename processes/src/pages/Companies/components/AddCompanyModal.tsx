import { companyAPI } from 'API/company-api';
import { Form, Input, Modal } from 'antd';
import React, { useCallback } from 'react';

const { TextArea } = Input;

interface IProps {
    onOk: () => void;
    onCancel: () => void;
    open: boolean;
}

const AddCompanyModal: React.FC<IProps> = ({ onCancel, onOk, open }) => {
    const [form] = Form.useForm();
    
    const onSave = useCallback(async () => {
        if (form.getFieldValue('companyName') && form.getFieldValue('companyDescription') && form.getFieldValue('companyContacts') && form.getFieldValue('companyAddress')) {
            await companyAPI.createCompany(form.getFieldValue('companyName'), form.getFieldValue('companyDescription'), form.getFieldValue('companyContacts'), form.getFieldValue('companyAddress'));
            form.setFieldsValue({
                companyName: null,
                companyDescription: null,
                companyContacts: null,
                companyAddress: null,
            });
            onOk();
        } else {
            form.validateFields();
        }
    }, []);

    const onClose = useCallback(() => {
        form.setFieldsValue({
            companyName: null,
            companyDescription: null,
            companyContacts: null,
            companyAddress: null,
        });
        onCancel();
    }, []);

    return (
        <Modal 
            title="Добавить компанию" 
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
                <Form.Item name='companyName' label='Название' rules={[{ required: true, message: 'Заполните!' }]}>
                    <Input placeholder='Название'/>
                </Form.Item>
                <Form.Item name='companyDescription' label='Описание' rules={[{ required: true, message: 'Заполните!' }]}> 
                    <Input placeholder='Описание'/>
                </Form.Item>
                <Form.Item name='companyContacts' label='Контакты' rules={[{ required: true, message: 'Заполните!' }]}>
                    <Input placeholder='Контакты'/>
                </Form.Item>
                <Form.Item name='companyAddress' label='Адрес' rules={[{ required: true, message: 'Заполните!' }]}>
                    <Input placeholder='Адрес'/>
                </Form.Item>
            </Form>
        </Modal>
    )
};

export default AddCompanyModal;