import { Form, Input, Modal } from 'antd';
import React from 'react';

const { TextArea } = Input;

interface IProps {
    onOk: () => void;
    onCancel: () => void;
    open: boolean;
}

const AddCharacteristicModal: React.FC<IProps> = ({ onCancel, onOk, open }) => {
    const [form] = Form.useForm();
    
    console.log(form.getFieldsValue());
    return (
        <Modal 
            title="Характеристика студента" 
            open={open} 
            onCancel={onCancel}
            centered
            cancelText='Отменить'
            okText='Сохранить'
            onOk={onOk}
        >
            <Form
                form={form}
                layout='vertical'
                name="Characteristic"
            >
                <Form.Item name='characteristic' rules={[{ required: true, message: 'Заполните характеристику!' }]} label='Характеристика'>
                    <TextArea placeholder='Характеристика'/>
                </Form.Item>
            </Form>
        </Modal>
    )
};

export default AddCharacteristicModal;