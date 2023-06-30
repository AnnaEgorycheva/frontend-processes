import { companyAPI } from 'API/company-api';
import { ICompany } from 'Types/types';
import { Button, Form, Input, Layout, List, Spin, message } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddCompanyModal from './components/AddCompanyModal';
import { useSelector } from 'react-redux';
import { selectUserRole } from 'Store/selectors/AuthSelector';

const Companies: React.FC = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const role = useSelector(selectUserRole);
    const [ companies, setCompanies ] = useState<ICompany[]>();
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        if (companies === undefined) {
            api();
        }
    }, []);

    const api = useCallback( async () => {
        const result = await companyAPI.getCompanies();
        setCompanies(result.companies);
    }, []);

    const onSearchCompany = useCallback(() => {
        const result = form.getFieldValue('company');
        if (result) {
            const resultSearch = companies?.filter(item => `${item.companyName}`.search(result) >= 0);
            setCompanies(resultSearch ?? []);
        } else {
            message.info('Для корректного поиска введите название компании!')
        }
    }, []);

    const onClear = useCallback(() => {
        api();
        form.setFieldValue('company', '');
    }, []);

    const onClick = useCallback((key: number) => {
        navigate(`/companies/${key}`);
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
        <Spin spinning={companies === undefined}>
            <Layout style={{ marginInline: 50, marginTop: 50 }}>
                {/* <Form
                    form={form}
                    layout='inline'
                    name="filterCompanies"
                    autoComplete="off"
                >
                    <Form.Item
                        name="company"
                        style={{ marginLeft: 50, width: 250 }}
                    >
                        <Input placeholder='Компания'/>                     
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" title='Найти' onClick={onSearchCompany}>
                            Найти
                        </Button>   
                    </Form.Item>
                    <Form.Item>
                        <Button title='Сбросить фильтр' onClick={onClear}>
                            Сбросить фильтр
                        </Button>   
                    </Form.Item>
                </Form> */}
                <List
                    itemLayout="horizontal"
                    header={
                        <div style={{ paddingInline: 50, paddingBlock: 15, fontWeight: 'bold', fontSize: '18px'}}>
                            Компании
                        </div>
                }
                    dataSource={companies ?? []}
                    pagination={{
                        pageSize: 10,
                    }}
                    renderItem={(item) => (
                        <List.Item style={{ paddingInline: 50, cursor: 'pointer' }} onClick={() => {onClick(item.companyId)}}>
                            {item.companyName}
                        </List.Item>
                    )}
                />
                {role === 'SCHOOL' ? (<div><Button title='Добавить компанию' type='primary' onClick={showModal}>
                    Добавить компанию
                </Button></div>) : null}
            </Layout>
            <AddCompanyModal
                onCancel={handleCancel}
                onOk={handleOk}
                open={isModalOpen}
            />
        </Spin>
    )
};

export default Companies;