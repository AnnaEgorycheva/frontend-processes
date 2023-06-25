import { Col, List} from 'antd';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { ApplicationType } from '../../../Types/types';

type PropsType = {
    applications: Array<ApplicationType>
}

const ApplicationsForCompany: React.FC<PropsType> = (props) => {
    let applications = props.applications.filter(application => application.companyName === 'НТР')
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
                        <NavLink to={'/applications/' + item.applicationId}>
                            <List.Item style={{ paddingInline: 50, justifyContent: 'space-between', cursor: 'pointer'  }}>
                                <Col span={4}>{item.user.lastName} {item.user.firstName} {item.user.patronym}</Col>
                                <Col span={4}>{item.positionName}</Col>
                                <Col span={4} style={{ textAlign: 'end'}}>{item.status}</Col>
                            </List.Item>
                        </NavLink>
                    )}
                />
        </>
    )
}

export default ApplicationsForCompany;