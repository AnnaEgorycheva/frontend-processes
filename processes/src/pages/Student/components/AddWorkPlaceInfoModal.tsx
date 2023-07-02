import { practiceServiceAPI } from 'API/practice-service-api';
import { selectUserId } from 'Store/selectors/AuthSelector';
import { Form, Input, Modal, Select } from 'antd';
import { useSelector } from 'react-redux';
import React, { useCallback, useEffect, useState } from 'react';
import { companyAPI } from 'API/company-api';
import { ICompany } from 'Types/types';

const { TextArea } = Input;

interface IProps {
    onOk: () => void;
    onCancel: () => void;
    open: boolean;
    id: string;
}

interface ISelect {
    value: string,
    index: string,
}

const AddWorkPlaceInfoModal: React.FC<IProps> = ({ onCancel, onOk, open, id }) => {
    const [form] = Form.useForm();

    const [ companies, setCompanies ] = useState<ICompany[]>();
    const [ companySelect, setCompanySelect ] = useState<ISelect[]>();

    useEffect(() => {
        if (companies === undefined) {
            api();
        }
    }, []);

    const api = useCallback( async () => {
        const result = await companyAPI.getCompanies();
        setCompanies(result.companies);
        console.log(result.companies);
        const res = result.companies.map((item: ICompany) => {
            return {
                index: item.companyId,
                value: item.companyName,
            }
        })
        setCompanySelect(res);
    }, []);
    
    const handleOk = useCallback(async () => {
        const result = companySelect?.filter((item: any) => item.value === form.getFieldValue('company'))[0].index;
        if (form.getFieldValue('company') && result) {
            await practiceServiceAPI.createWorkPlaceInfo(id, result as unknown as number, form.getFieldValue('position'));
            form.setFieldsValue({});
            onOk();
        }
        console.log(companySelect, result, form.getFieldValue('company'));
    }, []);

    const handleCancel = useCallback(async () => {
        form.setFieldsValue({});
        onCancel();                             
    }, []);

    return (
        <Modal 
            title="Добавить место стажировки" 
            open={open} 
            onCancel={handleCancel}
            centered
            cancelText='Отменить'
            okText='Сохранить'
            onOk={handleOk}
        >
            <Form
                form={form}
                layout='vertical'
                name="workplace"
            >
                <Form.Item name='position' rules={[{ required: true, message: 'Заполните!' }]} label='Позиция'>
                    <Input placeholder='Позиция'/>
                </Form.Item>
                <Form.Item name='company' rules={[{ required: true, message: 'Заполните!' }]} label='Компания'>
                    <Select
                        allowClear
                        style={{ width: '100%' }}
                        placeholder="Выберите компанию"
                        options={companySelect}
                    />
                </Form.Item>
            </Form>
        </Modal>
    )
};

export default AddWorkPlaceInfoModal;