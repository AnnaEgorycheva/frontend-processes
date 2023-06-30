import { applicationServiceAPI } from 'API/application-service-api';
import { DatePicker, Form, Input, Modal } from 'antd';
import React, { useCallback } from 'react';


interface IProps {
    onOk: () => void;
    onCancel: () => void;
    open: boolean;
    id: string;
}

const ScheduleInterviewModal: React.FC<IProps> = ({ onCancel, onOk, open, id }) => {
    const [form] = Form.useForm();
    
    const onSave = useCallback(async () => {
        await applicationServiceAPI.createApplicationInterview(id, form.getFieldValue('date'), form.getFieldValue('place'));
        onOk();
    }, []);

    const onClose = useCallback(() => {
        form.setFieldsValue({});
        onCancel();
    }, []);

    return (
        <Modal 
            title="Назначить собеседование" 
            open={open} 
            onCancel={onClose}
            centered
            cancelText='Отменить'
            okText='Сохранить'
            onOk={onSave}
        >
            <Form
                form={form}
                layout='vertical'
                name="scheduleInterview"
            >
                <Form.Item name='date' rules={[{ required: true, message: 'Выберите дату!' }]} label='Дата собеседования'>
                    <DatePicker placeholder='Выберите дату' />
                </Form.Item>
                <Form.Item name='place' rules={[{ required: true, message: 'Введите место!' }]} label='Место собеседования'>
                    <Input placeholder='Введите место'/>
                </Form.Item>
            </Form>
        </Modal>
    )
};

export default ScheduleInterviewModal;