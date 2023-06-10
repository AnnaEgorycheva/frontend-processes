import { Button, Modal } from 'antd';
import React from 'react';
import { useLocation } from 'react-router-dom';


interface IProps {
    onOk: () => void;
    onCancel: () => void;
    onClose: () => void;
    open: boolean;
}

const AnswerModalForCompany: React.FC<IProps> = ({ onCancel, onOk, open, onClose }) => {
    return (
        <Modal 
            title="Ответ компании" 
            open={open} 
            onCancel={onClose}
            centered
            width={304}
            footer={[
                <div>
                    <Button type="primary" danger onClick={onCancel}>Отказать</Button>
                    <Button type='primary' onClick={onOk}>Предложить оффер</Button>
                </div>
            ]}
        />
    )
};

export default AnswerModalForCompany;