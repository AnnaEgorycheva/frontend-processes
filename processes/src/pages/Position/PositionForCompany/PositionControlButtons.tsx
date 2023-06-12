import { Button, Col, Form, Input, Modal, Row, Space, Typography } from 'antd';
import React, { useState } from 'react';
import { PositionType } from 'Types/types';

type PropsType = {
    position: PositionType,
    onChangeValues: (updatedPosition: PositionType) => void
}

const PositionControlButtons: React.FC<PropsType> = (props) => {
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
        setIsModalOpen(false);
    };

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
            <Row style={{paddingTop: 50}}>
                <Col span={24}>
                    <Button style={{marginRight: 10}} type="primary" onClick={showModal}>
                        Редактировать
                    </Button>
                    <Button type="primary" danger>
                        Удалить
                    </Button>
                </Col>
            </Row>
            <Modal 
                title="Редактировать данные о позиции" 
                open={isModalOpen} 
                onOk={handleOk} 
                onCancel={handleCancel} 
                centered
                style={{textAlign:'center'}}
                footer={[]}
            >
                <Form form={form} name="validateOnly" layout="vertical" autoComplete="off">
                    <Form.Item name="name" label="Название позиции" initialValue={props.position.name} rules={[{ required: true, message: 'Введите название позиции' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="description" label="Описание" initialValue={props.position.description}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="skills" label="Навыки" initialValue={props.position.skills}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="places" label="Количество мест" initialValue={props.position.places}>
                        <Input />
                    </Form.Item>
                    <Form.Item>
                    <Space>
                        <Button type="primary" htmlType="submit" disabled={!submittable}>
                             Редактировать
                        </Button>
                    </Space>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    )
}

export default PositionControlButtons;