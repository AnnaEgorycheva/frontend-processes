import React, { useState } from 'react';
import {StudentType} from '../../../Types/types'
import Title from 'antd/es/typography/Title';
import { Card, Col, List, Row } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';

type PropsType = {
    studentsOnPosition : Array<StudentType>
}

const StudentsOnPositionList: React.FC<PropsType> = (props) => {
    const [isListOpened, setIsListOpened] = useState(false)
    const onListClick = () => {
        setIsListOpened(!isListOpened);
    };
    return (
        <>
            <Card style={{ margin: 20 }}>
                <Title level={5} style={{ marginTop: 20}} onClick={() => {onListClick()}}>
                    Студенты подавшие заявку
                    {
                    isListOpened
                        ? <DownOutlined style={{ marginLeft: 5}}/>
                        : <UpOutlined style={{ marginLeft: 5}}/>
                    }
                    
                </Title>
                {
                    isListOpened &&
                    <List
                        dataSource={props.studentsOnPosition}
                        renderItem={(item) => (
                            <List.Item style={{ paddingInline: 30}}>
                                <Row>
                                    <Col span={24}>{item.lastName} {item.firstName} {item.patronym === '' ? '' :item.patronym}</Col>
                                </Row>
                            </List.Item>
                        )}
                    />
                }
            </Card>
        </>
        
    )
}

export default StudentsOnPositionList;