import { StudentPracticeProfileType } from "Store/reducers/PracticeProfileReducer";
import { Button, Form, Input, Modal } from "antd";
import Title from "antd/es/typography/Title";
import React, { useState } from "react";

type PropsType = {
    studentPracticeProfile: StudentPracticeProfileType,
    editProfile: (practiceProfileId: string, practiceDiary: string | null) => Promise<any>
}

const PracticeProfilePage: React.FC<PropsType> = (props) => {
    const student = props.studentPracticeProfile.student
    const company = props.studentPracticeProfile.companyInfo
    const practicePeriod = props.studentPracticeProfile.practicePeriodInfo

    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        form.resetFields();
        setIsModalOpen(false);
    };

    const [form] = Form.useForm();
    const diary = Form.useWatch('practiceDiary', form)
    const [submittable, setSubmittable] = React.useState(false)
    const onDownloadPracticeDiaryBtmClick = () => {
        props.editProfile(props.studentPracticeProfile.practiceProfileId, diary)
        handleCancel()
    }
    React.useEffect(() => {
        form.validateFields({ validateOnly: true })
        .then(
          () => {setSubmittable(true);},
          () => {setSubmittable(false);},
        )
    }, [diary]);
    return (
        <>
            <Title level={3} style={{ marginTop: 0, marginBottom: 30 }}>
                {student.lastName} {student.firstName} {student?.patronym}
            </Title>
            <Title level={5} style={{ marginTop: 0, marginBottom: 8 }}>{practicePeriod.practicePeriodName}</Title>
            <Title level={5} style={{ marginTop: 0, marginBottom: 30 }}>Приказ: {props.studentPracticeProfile.practicePeriodInfo.practiceOrder}</Title>
            <Title level={5} style={{ marginTop: 0, marginBottom: 8  }}>Компания: {company?.companyName}</Title>
            <Title level={5} style={{ marginTop: 0, marginBottom: 30  }}>Позиция: {props.studentPracticeProfile.position}</Title>
            <Title level={5} style={{ marginTop: 0, marginBottom: '0.15em', color: '#666666' }}>Ссылка на дневник практики:</Title>
            {
                props.studentPracticeProfile.practiceDiary === ''
                ?  
                    <>
                        {
                            !isModalOpen &&
                            <Title level={5} style={{ marginTop: 0, marginBottom: 10, color: '#009EF8', cursor: 'pointer' }}
                            onClick={() => setIsModalOpen(true)}>
                                загрузить дневник практики
                            </Title>
                        }
                        <Modal 
                            title="Загрузить дневник практики" 
                            open={isModalOpen} 
                            onOk={handleOk} 
                            onCancel={handleCancel} 
                            centered
                            style={{textAlign:'center'}}
                            footer={[]}
                        >
                            <Form form={form} name="validateOnly" layout="vertical" autoComplete="off">
                                <Form.Item name="practiceDiary" label="Ссылка на дневник практики" 
                                        rules={[{ required: true, message: 'Введите ссылку на дневник практики' }]}
                                        style={{marginTop: 20}}>
                                    <Input placeholder="Введите ссылку на дневник практики"/>
                                </Form.Item>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit" disabled={!submittable}
                                            onClick={onDownloadPracticeDiaryBtmClick}>
                                        Загрузить
                                    </Button>
                                </Form.Item>
                            </Form>
                        </Modal>
                    </>
                : 
                    <Title level={5} style={{ marginTop: 0, marginBottom: 10  }}>
                        {props.studentPracticeProfile.practiceDiary}
                    </Title>
            }
            <Title level={5} style={{ marginTop: 0, marginBottom: '0.15em', color: '#666666' }}>Ссылка на характеристику от компании:</Title>
            <Title level={5} style={{ marginTop: 0 }}>
                {
                    props.studentPracticeProfile.characteristic === ''
                    ?  'На данный момент нет характеристики студента от компании по итогам прохождения практики.'
                    :  props.studentPracticeProfile.characteristic
                }
            </Title>
        </>
    )
}

export default PracticeProfilePage