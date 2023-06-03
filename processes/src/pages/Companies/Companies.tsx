import { Button, Form, Input, Layout, List, message } from 'antd';
import React, { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const data = [
    {
        name: 'Спортмастер',
        id: 131,
    },
    {
        name: 'Тинькофф',
        id: 121,
    },
    {
        name: 'НТР',
        id: 6561,
    },
    {
        name: 'НТР',
        id: 4541,
    },
    {
        name: 'Спортмастер',
        id: 13,
    },
    {
        name: 'Тинькофф',
        id: 12,
    },
    {
        name: 'НТР',
        id: 656,
    },
    {
        name: 'НТР',
        id: 454,
    },
];

interface ICompany {
    name: string,
    id: number,
}

const Companies: React.FC = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [ companies, setCompanies ] = useState<ICompany[]>(data);

    const onSearchCompany = useCallback(() => {
        const result = form.getFieldValue('company');
        if (result) {
            const resultSearch = companies.filter(item => item.name.includes(result));
            setCompanies(resultSearch);
        } else {
            message.info('Для корректного поиска введите название компании!')
        }
    }, []);

    const onClick = useCallback((key: number) => {
        navigate(`/companies/${key}`);
    }, []);

    return (
        <Layout style={{ marginInline: 50, marginTop: 50 }}>
            <Form
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
            </Form>
            <List
                itemLayout="horizontal"
                header={
                    <div style={{ paddingInline: 50, paddingBlock: 15, fontWeight: 'bold', fontSize: '18px'}}>
                        Компании
                    </div>
            }
                dataSource={companies}
                pagination={{
                    pageSize: 10,
                }}
                renderItem={(item) => (
                    <List.Item style={{ paddingInline: 50 }} onClick={() => {onClick(item.id)}}>
                        {item.name}
                    </List.Item>
                )}
            />

        </Layout>
    )
};

export default Companies;