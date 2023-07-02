import { PracticePeriodCreateUpdate, SelectOptionType, PracticePeriodGroupType, PracticePeriod } from '../../Types/types';
import { Button, Col, DatePicker, Form, Input, Modal,Select, Space, } from 'antd';
import React, { useState } from 'react';
import { checkIfUndefined } from 'shared/functions/Functions';
import moment from "moment"

type PropsType = {
    currentInfo: PracticePeriod ,
    onChangeValues: (updatedPracticePeriodData : PracticePeriodCreateUpdate) => void,
    updatePracticePeriod: (practicePeriodId: string) => Promise<any>,
    options: Array<SelectOptionType>
}

const makeAPracticePeriodGroupTypeArray = (groupNums: Array<SelectOptionType>) => {
    let PracticePeriodGroupTypeArray: Array<PracticePeriodGroupType> = [];
    if (!!groupNums) {
        groupNums.map(groupNum => {
            PracticePeriodGroupTypeArray.push({
                groupNumber: groupNum.value
            })
        })
        return PracticePeriodGroupTypeArray
    }
    else {
        return null
    }
}
const makeACurrentPracticePeriodGroupsSelectOptionsArray = (groups: Array<PracticePeriodGroupType> | null | undefined) => {
    let currrentGroupsOptions: Array<SelectOptionType> = []
    if(!!groups) {
        groups.map(group => {
            currrentGroupsOptions.push({
                value: group.groupNumber,
                label: group.groupNumber  
            })
        })
    }
    return currrentGroupsOptions
}

const UpdatingPracticePeriodBtn: React.FC<PropsType> = (props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        form.resetFields();
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
    const updatePracticePeriod = () => {
        props.updatePracticePeriod(props.currentInfo.id)
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
                    groups: makeAPracticePeriodGroupTypeArray(values.groups)
                })
            }
        });
    }, [values]);

    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'start', paddingTop: 25}}>
                 <Button type="primary" onClick={showModal}>Редактировать</Button>
            </div>
            <Modal 
                title="Редактирование информации о периоде практики" 
                open={isModalOpen} 
                onOk={handleOk} 
                onCancel={handleCancel} 
                centered
                style={{textAlign:'center'}}
                footer={[]}
                >
                <Form form={form} name="validateOnly" layout="vertical" autoComplete="off">
                    <Form.Item name="practicePeriodName" label="Название" 
                               rules={[{ required: true, message: 'Введите название периода практики' }]}
                               initialValue={props.currentInfo.practicePeriodName}>
                        <Input placeholder="Введите название периода практики"/>
                    </Form.Item>
                    <Form.Item label="Даты начала и окончания периода практики"
                               name='dates' 
                               rules={[{ required: true }]}>
                        <Space.Compact style={{ width: '100%' }}>
                            <Form.Item name="startDate" label="Дата начала" 
                                    rules={[{ required: true, message: 'Введите дату начала' }]}
                                    noStyle
                                    initialValue={moment(props.currentInfo.startDate)}
                                    >
                                <DatePicker placeholder="Введите дату начала"
                                            format={'DD.MM.YYYY'}
                                            style={{ width: '50%' }}
                                />
                            </Form.Item>
                            <Form.Item name="endDate" label="Дата окончания" 
                                    rules={[{ required: true, message: 'Введите дату окончания' }]}
                                    noStyle
                                    initialValue={moment(props.currentInfo.endDate)}
                                    >
                                <DatePicker placeholder="Введите дату окончания"
                                            format={'DD.MM.YYYY'}
                                            style={{ width: '50%' }}
                                />
                            </Form.Item>
                        </Space.Compact>
                    </Form.Item>
                    <Form.Item name="groups" label="Группы"
                               rules={[{ required: true, message: 'Выберите одну или более групп' }]}
                               initialValue={makeACurrentPracticePeriodGroupsSelectOptionsArray(props.currentInfo.groups)}>
                        <Select
                            mode="multiple"
                            allowClear
                            style={{ width: '100%' }}
                            placeholder="Выберите группу(ы)"
                            options={props.options}
                        />
                    </Form.Item>
                    <Form.Item name="practiceOrder" label="Приказ" 
                               rules={[{ required: true, message: 'Введите ссылку на приказ, утверждающий период практики' }]}
                               initialValue={props.currentInfo.practiceOrder}>
                        <Input placeholder="Введите ссылку на приказ, утверждающий период практики"/>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" disabled={!submittable} style={{marginRight: 15}}
                                onClick={updatePracticePeriod}>
                            Редактировать
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

export default UpdatingPracticePeriodBtn;