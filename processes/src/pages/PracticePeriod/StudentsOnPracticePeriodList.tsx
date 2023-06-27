import React, { useState } from "react";
import {StudentType} from '../../Types/types'
import { List, Space } from "antd";
import Title from "antd/es/typography/Title";
import { DownOutlined, UpOutlined } from "@ant-design/icons";

type PropsType = {
    students: Array<StudentType>
}

const StudentsOnPracticePeriodList: React.FC<PropsType> = (props) => {
    const [isListOpen, setIsListOpen] = useState(false)
    const students = props.students
    return (
        <>
            <Space align="center">
                <Title level={5} style={{ marginTop: 30, cursor: 'pointer' }}
                    onClick={() => setIsListOpen(!isListOpen)}
                >
                    Студенты
                    {
                        isListOpen
                        ? <DownOutlined style={{ marginLeft: 5}}/>
                        : <UpOutlined style={{ marginLeft: 5}}/>
                    }
                </Title>
            </Space>
            {
                isListOpen &&
                <List
                        itemLayout="horizontal"
                        header={
                            <div style={{ paddingInline: 50, paddingBlock: 15, fontWeight: 'bold', fontSize: '16px'}}>
                                ФИО
                            </div>
                        }
                        dataSource={students}
                        renderItem={(item) => (
                            <List.Item style={{ paddingInline: 50, justifyContent: 'space-between', cursor: 'pointer'  }}>
                                {item.lastName} {item.firstName} {item?.patronym}
                            </List.Item>
                        )}
                />
            }
        </>
    )

}

export default StudentsOnPracticePeriodList