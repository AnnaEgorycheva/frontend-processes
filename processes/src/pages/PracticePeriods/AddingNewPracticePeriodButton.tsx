import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { PracticePeriodCreateUpdate, SelectOptionType, PracticePeriodGroupType } from '../../Types/types';
import { Button, Col, DatePicker, DatePickerProps, Form, Input, Modal, Row, Select, Space, Typography } from 'antd';
import React, { useState } from 'react';
import { checkIfUndefined } from 'shared/functions/Functions';

type PropsType = {
    onChangeValues: (newPracticePeriodData : PracticePeriodCreateUpdate) => void,
    createNewPracticePeriod: () => Promise<any>,
    options: Array<SelectOptionType>
}

const makeAPracticePeriodGroupTypeArray = (groupNums: Array<string>) => {
    let PracticePeriodGroupTypeArray: Array<PracticePeriodGroupType> = [];
    if (!!groupNums) {
        groupNums.map(groupNum => {
            PracticePeriodGroupTypeArray.push({
                groupNumber: groupNum
            })
        })
        return PracticePeriodGroupTypeArray
    }
    else {
        return null
    }
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
        console.log(values)
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
                    groups: makeAPracticePeriodGroupTypeArray(values.groups)
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
                    <Form.Item label="Даты начала и окончания периода практики"
                               name='dates' 
                               rules={[{ required: true }]}>
                        <Space.Compact style={{ width: '100%' }}>
                            <Form.Item name="startDate" label="Дата начала" 
                                    rules={[{ required: true, message: 'Введите дату начала' }]}
                                    noStyle>
                                <DatePicker placeholder="Введите дату начала"
                                            format={'DD.MM.YYYY'}
                                            style={{ width: '50%' }}
                                />
                            </Form.Item>
                            <Form.Item name="endDate" label="Дата окончания" 
                                    rules={[{ required: true, message: 'Введите дату окончания' }]}
                                    noStyle>
                                <DatePicker placeholder="Введите дату окончания"
                                            format={'DD.MM.YYYY'}
                                            style={{ width: '50%' }}
                                />
                            </Form.Item>
                        </Space.Compact>
                    </Form.Item>
                    <Form.Item name="groups" label="Группы">
                        <Select
                            mode="multiple"
                            allowClear
                            style={{ width: '100%' }}
                            placeholder="Выберите группу(ы)"
                            options={props.options}
                        />
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
