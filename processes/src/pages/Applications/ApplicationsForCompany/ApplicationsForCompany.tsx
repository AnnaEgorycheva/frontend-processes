import { Col, List} from 'antd';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { ApplicationDtoType } from '../../../Types/types';

type PropsType = {
    applications: Array<ApplicationDtoType>
}

const ApplicationsForCompany: React.FC<PropsType> = (props) => {
    let applications = props.applications
    return (
        <>
            <List
                    itemLayout="horizontal"
                    header={
                        <div style={{ display: 'flex', justifyContent: 'space-between', paddingInline: 50, paddingBlock: 15, fontWeight: 'bold', fontSize: '18px'}}>
                            <Col span={4} style={{ fontSize: '18px'}}>ФИО</Col>
                            <Col span={4} style={{ fontSize: '18px'}}>Позиция</Col>
                            <Col span={4} style={{ textAlign: 'end', fontSize: '18px'}}>Статус</Col>
                        </div>
                }
                    dataSource={applications}
                    renderItem={(item) => (
                        <NavLink to={'/applications/' + item.id}>
                            <List.Item style={{ paddingInline: 50, justifyContent: 'space-between', cursor: 'pointer'  }}>
                                <Col span={4}>{item.lastName} {item.firstName} {item?.patronym}</Col>
                                <Col span={4}>{item.intershipPositionName}</Col>
                                <Col span={4} style={{ textAlign: 'end'}}>{item.status[item.status.length - 1]}</Col>
                            </List.Item>
                        </NavLink>
                    )}
                />
        </>
    )
}

export default ApplicationsForCompany;