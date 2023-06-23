import React, { useEffect, useState } from 'react';
import { Card, Spin, Table, Typography } from 'antd';
import { useLocation } from 'react-router-dom';
import { companyAPI } from 'API/company-api';
import { useSelector } from 'react-redux';
import { selectUserRole } from 'Store/selectors/AuthSelector';
import { ICompany, IPosition } from 'Types/types';

const { Title } = Typography;
const { Column } = Table;

const Company: React.FC = () => {
    const location = useLocation();
    const id = location.pathname.split('/')[2];
    const [ company, setCompany ] = useState<ICompany>();
    const [ position, setPosition ] = useState<IPosition[]>();
    const role = useSelector(selectUserRole);

    useEffect(() => {
        if (company === undefined) {
            setTimeout(async () => {
                const result = await companyAPI.getCompany(id);
                setCompany(result);

                const resultPosition = await companyAPI.getCompanyIntershipPositions(id);
                setPosition(resultPosition.intershipPositions);
            }, 3);
        }
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
                    {role === 'SCHOOL' ? <Column dataIndex="intershipPositionCount" key="intershipPositionCount" title="Количество заявок" width="300px" /> : null}
                </Table>
            </Spin>
        </>
    )
};

export default Company;