import { NewPositionType } from 'Store/reducers/CreatingNewPositionReducer';
import { IntersipPositionCreationType } from 'Types/types';
import { Button, Form, Input, Modal, Space } from 'antd';
import React, { useState } from 'react';

type PropsType = {
    newPosition: NewPositionType,
    onChangeValues: (position : NewPositionType) => void,
    clearForm: () => void,
    createNewCompanyPosition: (newPositionToCreate: IntersipPositionCreationType) => Promise<any>
}

const AddingNewPositionButton: React.FC<PropsType> = (props) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [submittable, setSubmittable] = React.useState(false);

    const [form] = Form.useForm();
    const values = Form.useWatch([], form);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        props.clearForm()
        setIsModalOpen(false);
    };

    const createNewPosition = () => {
        props.createNewCompanyPosition({
            companyId: 3,
            intershipPositionName: values.intershipPositionName === undefined ? '' : values.intershipPositionName,
            intershipPositionDescription: values.intershipPositionDescription === undefined ? '' : values.intershipPositionDescription,
            intershipPositionCount: values.intershipPositionCount === undefined ? '' : values.intershipPositionCount,
        })
        setIsModalOpen(false);
    }

    React.useEffect(() => {
        form.validateFields({ validateOnly: true })
        .then(
          () => {setSubmittable(true);},
          () => {setSubmittable(false);},
        );
        // props.onChangeValues({
        //     name: values.name === undefined ? '' : values.name,
        //     description: values.description === undefined ? '' : values.description,
        //     skills: values.skills === undefined ? '' : values.skills,
        //     places: values.places === undefined ? '' : values.places
        // } )
      }, [values]);

    return (
        <>
            <Space wrap style={{ paddingInline: 50, paddingTop: 75}}>
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
                    <Form.Item name="intershipPositionName" label="Название" initialValue={props.newPosition.name} rules={[{ required: true, message: 'Введите название позиции' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="intershipPositionDescription" label="Описание" initialValue={props.newPosition.description}>
                        <Input />
                    </Form.Item>
                    {/* <Form.Item name="skills" label="Навыки" initialValue={props.newPosition.skills}>
                        <Input />
                    </Form.Item> */}
                    <Form.Item name="intershipPositionCount" label="Количество мест" initialValue={props.newPosition.places}>
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Space>
                        <Button type="primary" htmlType="button" disabled={!submittable} onClick={() => {createNewPosition()}}>
                             Создать
                        </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default AddingNewPositionButton;