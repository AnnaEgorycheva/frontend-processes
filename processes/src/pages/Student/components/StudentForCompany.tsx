import React, { useCallback, useEffect, useState } from 'react';
import { Button, Card, Spin, Typography } from 'antd';
import AddCharacteristicModal from './AddCharacteristicModal';
import { userAPI } from 'API/user-api';
import { IStudent } from 'Types/types';
import { applicationServiceAPI } from 'API/application-service-api';

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

const StudentForCompany: React.FC<IProps> = ({ id }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [ user, setUser ] = useState<IStudent>();
    const [ company, setCompany ] = useState<string>();
    const [ position, setPosition ] = useState<string>();

    useEffect(() => {
        if (user === undefined) {
            api();
        }
    }, []);

    const api = useCallback( async () => {
        const userResult = await userAPI.getUsersById(id);
        setUser(userResult);

        const position = await applicationServiceAPI.getStudentApplicationsById(id);
        setPosition(position.position);
        setCompany(position.companyName);

    }, []);

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
            <Spin spinning={user === undefined || company === undefined || position === undefined}>
                <Card style={{ margin: 20 }}>
                    <Title level={3} style={{ marginTop: 0 }}>ФИО: {user?.lastName} {user?.firstName} {user?.patronym}</Title>   
                    <Title level={5} style={{ marginTop: 0 }}>Группа: {user?.groupNumber}</Title>
                    <Title level={5} style={{ marginTop: 0 }}>Место прохождения практики: {company ?? 'пока нет'} </Title>
                    <Title level={5} style={{ marginTop: 0 }}>Позиция: {position ?? 'пока нет'} </Title>
                    {/* <Paragraph style={{ marginTop: 15 }}>Характеристика: {'пока нет'} </Paragraph> */}
                    {/* <Button  type="primary" title='Загрузить характеристику студента' onClick={showModal}>Загрузить характеристику студента</Button> */}
            
                </Card>
            </Spin>
            <AddCharacteristicModal
                onCancel={handleCancel}
                onOk={handleOk}
                open={isModalOpen}
            />
        </>
    )
};

export default StudentForCompany;