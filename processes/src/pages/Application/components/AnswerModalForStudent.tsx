import { Button, Modal } from 'antd';
import React from 'react';
import { useLocation } from 'react-router-dom';

interface IProps {
    onOk: () => void;
    onCancel: () => void;
    onClose: () => void;
    open: boolean;
}

const AnswerModalForStudent: React.FC<IProps> = ({ onCancel, onOk, open, onClose }) => {
    return (
        <Modal 
            title="Ответ студента" 
            open={open} 
            onCancel={onClose}
            centered
            width={292}
            footer={[
                <div>
                    <Button type="primary" danger onClick={onCancel}>Отказать</Button>
                    <Button type='primary' onClick={onOk}>Принять оффер</Button>
                </div>
            ]}
        />
    )
};

export default AnswerModalForStudent;