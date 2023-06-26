import { PracticePeriodCreateUpdate } from '../../Types/types';
import { Button, DatePicker, DatePickerProps, Form, Input, Modal, Space } from 'antd';
import React, { useState } from 'react';
import { checkIfUndefined } from 'shared/functions/Functions';

type PropsType = {
    onChangeValues: (newPracticePeriodData : PracticePeriodCreateUpdate) => void,
    createNewPracticePeriod: () => Promise<any>
}

const AddingNewPracticePeriodButton: React.FC<PropsType> = (props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        form.resetFields();
        setIsModalOpen(false);
    };

    const [form] = Form.useForm();
    const values = Form.useWatch([], form);
    const [submittable, setSubmittable] = React.useState(false);
    const onReset = () => {
        form.resetFields();
    };
    const createNewPracticePeriod = () => {
        props.createNewPracticePeriod()
        form.resetFields();
        setIsModalOpen(false);
    }
    React.useEffect(() => {
        form.validateFields({ validateOnly: true })
        .then(
          () => {setSubmittable(true);},
          () => {setSubmittable(false);},
        )
        .then(() => {
            if(!!values){
                props.onChangeValues({
                    startDate: checkIfUndefined(values.startDate?.toISOString()),
                    endDate: checkIfUndefined(values.endDate?.toISOString()),
                    practiceOrder: checkIfUndefined(values.practiceOrder),
                    practicePeriodName: checkIfUndefined(values.practicePeriodName),
                })
            }
        });
    }, [values]);

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'end', paddingTop: 25}}>
                 <Button type="primary" onClick={showModal}>Добавить период практики</Button>
            </div>
            <Modal 
                title="Новый период практики" 
                open={isModalOpen} 
                onOk={handleOk} 
                onCancel={handleCancel} 
                centered
                style={{textAlign:'center'}}
                footer={[]}
                >
                <Form form={form} name="validateOnly" layout="vertical" autoComplete="off">
                    <Form.Item name="practicePeriodName" label="Название" rules={[{ required: true, message: 'Введите название периода практики' }]}>
                        <Input placeholder="Введите название периода практики"/>
                    </Form.Item>
                    <Form.Item name="startDate" label="Дата начала периода практики" 
                                rules={[{ required: true, message: 'Выберите дату начала периода практики' }]}
                                style={{textAlign:'start'}}>
                        <DatePicker placeholder="Выберите дату начала периода практики"
                                    format={'DD.MM.YYYY'}/>
                    </Form.Item>
                    <Form.Item name="endDate" label="Дата окончания периода практики" 
                                rules={[{ required: true, message: 'Выберите дату окончания периода практики' }]}
                                style={{textAlign:'start'}}>
                        <DatePicker placeholder="Выберите дату окончания периода практики"
                                    format={'DD.MM.YYYY'}/>
                    </Form.Item>
                    <Form.Item name="practiceOrder" label="Приказ" rules={[{ required: true, message: 'Введите ссылку на приказ, утверждающий период практики' }]}>
                        <Input placeholder="Введите ссылку на приказ, утверждающий период практики"/>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" disabled={!submittable} style={{marginRight: 15}}
                                onClick={createNewPracticePeriod}>
                            Добавить период практики
                        </Button>
                        <Button htmlType="button" onClick={onReset}>
                            Очистить поля формы
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default AddingNewPracticePeriodButton;