import React, { useCallback, useState } from 'react';
import { Button, Card, Typography } from 'antd';
import AddCharacteristicModal from './AddCharacteristicModal';

const { Title, Paragraph } = Typography;

interface IProps {
    id: string,
};

const user = {
    name: 'Иванов Иван Иванович',
    groupNumber: 100110,
    company: 'НТР',
    position: undefined,
    description: undefined,
}

const StudentForCompany: React.FC<IProps> = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = useCallback(() => {
        setIsModalOpen(true);
    }, []);

    const handleOk = useCallback(() => {
        setIsModalOpen(false);
    }, []);

    const handleCancel = useCallback(() => {
        setIsModalOpen(false);
    }, []);
    
    return (
        <>
            <Card style={{ margin: 20 }}>
                <Title level={3} style={{ marginTop: 0 }}>{user.name}</Title>
                <Title level={5} style={{ marginTop: 0 }}>Группа: {user.groupNumber}</Title>
                <Title level={5} style={{ marginTop: 0 }}>Место прохождения практики: {user.company ?? 'пока нет'} </Title>
                <Title level={5} style={{ marginTop: 0 }}>Позиция: {user.position ?? 'пока нет'} </Title>
                <Paragraph style={{ marginTop: 15 }}>Характеристика: {user.description ?? 'пока нет'} </Paragraph>
                <Button  type="primary" title='Загрузить характеристику студента' onClick={showModal}>Загрузить характеристику студента</Button>
            </Card>
            <AddCharacteristicModal
                onCancel={handleCancel}
                onOk={handleOk}
                open={isModalOpen}
            />
        </>
    )
};

export default StudentForCompany;