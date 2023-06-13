import { Col, Layout, List, Row } from 'antd';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { user } from '../user';
import { PositionType } from 'Types/types';

type PropsType = {
    positions: Array<PositionType>
}

const PositionsForCompany: React.FC<PropsType> = (props) => {
    let positions = props.positions.filter(position => position.companyName === user.name)
    return (
        <>
            <List
                    itemLayout="horizontal"
                    header={
                        <div style={{ display: 'flex', justifyContent: 'space-between', paddingInline: 50, paddingBlock: 15, fontWeight: 'bold', fontSize: '18px'}}>
                            <Col span={4} style={{ fontSize: '18px'}}>Позиция</Col>
                            <Col span={4} style={{ fontSize: '18px'}}>Количество мест</Col>
                            <Col span={4} style={{ textAlign: 'end', fontSize: '18px'}}>Количество заявок</Col>
                        </div>
                }
                    dataSource={positions}
                    renderItem={(item) => (
                        <NavLink to={'/positions/' + item.id}>
                            <List.Item style={{ paddingInline: 50, justifyContent: 'space-between', cursor: 'pointer'  }} onClick={() => {}}>
                                <Col span={4}>{item.name}</Col>
                                <Col span={4}>{item.places}</Col>
                                <Col span={4} style={{ textAlign: 'end'}}>{item.applicationsNumber}</Col>
                            </List.Item>
                        </NavLink>
                    )}
                />
        </>
    )
}

export default PositionsForCompany;