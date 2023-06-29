import React, { useCallback, useState } from 'react';
import {StudentType, UserDtoType} from '../../../Types/types'
import Title from 'antd/es/typography/Title';
import { Card, Col, List, Row } from 'antd';
import { DownOutlined, UpOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

type PropsType = {
    studentsOnPosition : Array<UserDtoType>
}

const StudentsOnPositionList: React.FC<PropsType> = (props) => {
    const navigate = useNavigate()
    const [isListOpened, setIsListOpened] = useState(false)
    const onListClick = () => {
        setIsListOpened(!isListOpened);
    };
    const onItemClick = useCallback((studentId: string) => {
        navigate(`/students/${studentId}`);
    }, []);
    return (
        <>
            <Card style={{ margin: 20 }}>
                <Title level={5} style={{ marginTop: 20, cursor: 'pointer'}} onClick={() => {onListClick()}}>
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
                        header={
                            <div style={{ paddingInline: 50, paddingBlock: 15, fontWeight: 'bold', fontSize: '16px'}}>
                                ФИО
                            </div>
                        }
                        dataSource={props.studentsOnPosition}
                        renderItem={(item) => (
                            <List.Item style={{ paddingInline: 30, cursor: 'pointer'}} 
                                       onClick={() => {onItemClick(item.userId)}}>
                                <Row>
                                    <Col span={24}>{item.lastName} {item.firstName} {item.patronym === '' ? '' : item.patronym}</Col>
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