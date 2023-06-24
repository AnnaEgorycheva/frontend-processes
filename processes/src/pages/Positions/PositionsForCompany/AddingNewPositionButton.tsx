import { IntersipPositionCreationType } from 'Types/types';
import { Button, Form, Input, Modal, Space } from 'antd';
import React, { useState } from 'react';
import { checkIfUndefined } from 'shared/functions/Functions';

type PropsType = {
    newPosition: IntersipPositionCreationType,
    onChangeValues: (position : IntersipPositionCreationType) => void,
    clearForm: () => void,
    createNewCompanyPosition: () => Promise<any>
}

const AddingNewPositionButton: React.FC<PropsType> = (props) => {
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
    const createNewPosition = () => {
        props.createNewCompanyPosition()
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
                    companyId: 3,
                    intershipPositionName: checkIfUndefined(values.intershipPositionName),
                    intershipPositionDescription: checkIfUndefined(values.intershipPositionDescription),
                    intershipPositionskills: '',
                    intershipPositionCount: checkIfUndefined(values.intershipPositionCount),
                })
            }
        });
    }, [values]);

    return (
        <>
            <Space wrap style={{ paddingInline: 50, paddingTop: 50}}>
                 <Button type="primary" onClick={showModal}>Добавить новую позицию</Button>
            </Space>
            <Modal 
                title="Создание новой позиции" 
                open={isModalOpen} 
                onOk={handleOk} 
                onCancel={handleCancel} 
                centered
                style={{textAlign:'center'}}
                footer={[]}
                >
                <Form form={form} name="validateOnly" layout="vertical" autoComplete="off">
                    <Form.Item name="intershipPositionName" label="Название" rules={[{ required: true, message: 'Введите название позиции' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="intershipPositionDescription" label="Описание" >
                        <Input />
                    </Form.Item>
                    {/* <Form.Item name="skills" label="Навыки" >
                        <Input />
                    </Form.Item> */}
                    <Form.Item name="intershipPositionCount" label="Количество мест" >
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" disabled={!submittable} style={{marginRight: 15}}
                                onClick={() => {createNewPosition()}}>
                            Создать
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

export default AddingNewPositionButton;