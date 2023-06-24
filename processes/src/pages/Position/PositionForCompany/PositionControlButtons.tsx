import { Button, Col, Form, Input, Modal, Row, Space, Typography } from 'antd';
import React, { useState } from 'react';
import { checkIfUndefined } from 'shared/functions/Functions';
import { IntershipPositionType, IntersipPositionCreationType} from 'Types/types';

type PropsType = {
    currentPosition: IntershipPositionType,
    onChangeValues: (updatedPosition: IntersipPositionCreationType) => void,
    onDeletePositionBtnClick: () => void,
    updatePosition: (positionId: string) => Promise<any>
}

const PositionControlButtons: React.FC<PropsType> = (props) => {
    const currentPosition = props.currentPosition
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const [form] = Form.useForm();
    const values = Form.useWatch([], form);
    const [submittable, setSubmittable] = React.useState(false);
    const onReset = () => {
        form.resetFields();
    };
    const updatePosition = () => {
        props.updatePosition(currentPosition.intershipPositionId)
        setIsModalOpen(false)
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
                    companyId: currentPosition.companyId,
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
            <Row style={{paddingTop: 50}}>
                <Col span={24}>
                    <Button style={{marginRight: 10}} type="primary" onClick={showModal}>
                        Редактировать
                    </Button>
                    <Button type="primary" danger onClick={() => {props.onDeletePositionBtnClick()}}>
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
                    <Form.Item name="intershipPositionName" label="Название позиции" initialValue={currentPosition.intershipPositionName} rules={[{ required: true, message: 'Введите название позиции' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="intershipPositionDescription" label="Описание" initialValue={currentPosition.intershipPositionDescription}>
                        <Input />
                    </Form.Item>
                    {/* <Form.Item name="skills" label="Навыки" initialValue={props.position.skills}>
                        <Input />
                    </Form.Item> */}
                    <Form.Item name="intershipPositionCount" label="Количество мест" initialValue={currentPosition.intershipPositionCount}>
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" disabled={!submittable} style={{marginRight: 15}}
                                onClick={() => {updatePosition()}}
                            >
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

export default PositionControlButtons;