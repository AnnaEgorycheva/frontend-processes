import React, { useCallback, useEffect, useState } from 'react';
import { Button, Card, Spin, Table, Typography } from 'antd';
import { useLocation } from 'react-router-dom';
import { companyAPI } from 'API/company-api';
import { useSelector } from 'react-redux';
import { selectUserRole } from 'Store/selectors/AuthSelector';
import { ICompany, IPosition } from 'Types/types';
import AddCompanyUserModal from './components/AddCompanyUser';

const { Title } = Typography;
const { Column } = Table;

const Company: React.FC = () => {
    const location = useLocation();
    const id = location.pathname.split('/')[2];
    const [ company, setCompany ] = useState<ICompany>();
    const [ position, setPosition ] = useState<IPosition[]>();
    const role = useSelector(selectUserRole);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (company === undefined) {
            api();
        }
    }, []);

    const api = useCallback( async () => {
        const result = await companyAPI.getCompany(id);
        setCompany(result);

        const resultPosition = await companyAPI.getCompanyIntershipPositions(id);
        setPosition(resultPosition.intershipPositions);
    }, []);

    const showModal = useCallback(() => {
        setIsModalOpen(true);
    }, []);

    const handleOk = useCallback(() => {
        setIsModalOpen(false);
        api();
    }, []);

    const handleCancel = useCallback(() => {
        setIsModalOpen(false);
    }, []);
    
    return (
        <>
            <Spin spinning={company === undefined}>
                <Card style={{ margin: 30 }}>
                    <Title level={3} style={{ marginTop: 0 }}>Название: {company?.companyName}</Title>
                    <Title level={5} style={{ marginTop: 0 }}>Описание: {company?.companyDescription}</Title>
                    <Title level={5} style={{ marginTop: 0 }}>Адрес: {company?.companyAddress}</Title>
                    <Title level={5} style={{ marginTop: 0 }}>Контакт: {company?.companyContacts}</Title>
                </Card>
            </Spin>
            <Title level={5} style={{ marginTop: 0, marginLeft: 30 }}>Актуальные позиции</Title>
            <Spin spinning={position === undefined}>
                <Table 
                    dataSource={position} 
                    pagination={{
                        pageSize: 10,
                    }}
                    style={{ marginInline: 30 }}
                >
                    <Column dataIndex="intershipPositionName" key="intershipPositionName" title="Позиция" width="300px" />
                    <Column dataIndex="intershipPositionCount" key="intershipPositionCount" title="Количество мест" width="300px" />
                    {role === 'SCHOOL' ? <Column dataIndex="intershipApplicationsCount" key="intershipApplicationsCount" title="Количество заявок" width="300px" /> : null}
                </Table>
            </Spin>
            {role === 'SCHOOL' ? (<div><Button style={{ marginLeft: 30}} title='Добавить представителя компании' type='primary' onClick={showModal}>
                    Добавить представителя компании
                </Button></div>) : null}
            <AddCompanyUserModal
                onCancel={handleCancel}
                onOk={handleOk}
                open={isModalOpen}
                companyId={id}
            />
        </>
    )
};

export default Company;