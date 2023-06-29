import { Button, Modal, Space, Typography } from 'antd';
import React, { useState } from 'react';
const { Text} = Typography;

type PropsType = {
    isStudentApplyedAnApplication: boolean,
    createApplication: () => void
}

const SubmitApplicationModal: React.FC<PropsType> = (props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const onCreateApplicationBtnClick = () => {
        props.createApplication()
        setIsModalOpen(false);
    }

    return (
        <>
            <Space wrap style={{paddingTop: 50}}>
                <Button type="primary" disabled={props.isStudentApplyedAnApplication} onClick={showModal}>
                    {
                        props.isStudentApplyedAnApplication
                        ? <Text>Заявка подана</Text>
                        : <Text style={{color: 'white'}}>Подать заявку</Text>
                    }
                </Button>
            </Space>
            <Modal 
                title="Заявка на прохождение практики" 
                open={isModalOpen} 
                onOk={handleOk} 
                onCancel={handleCancel} 
                centered
                style={{textAlign:'center'}}
                footer={[]}
            >
                <div style={{marginTop: 30, marginBottom: 30 }}>Вы уверены, что хотите подать заявку на позицию?</div>
                <Button type="primary" htmlType="submit" onClick={onCreateApplicationBtnClick}>
                    Подать заявку
                </Button>
            </Modal>
        </>
    )
}

export default SubmitApplicationModal;