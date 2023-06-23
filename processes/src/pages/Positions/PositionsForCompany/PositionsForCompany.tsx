import { Col, List } from 'antd';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { PositionType, IntershipPositionType } from 'Types/types';

type PropsType = {
    positions: Array<IntershipPositionType>
}

const PositionsForCompany: React.FC<PropsType> = (props) => {
    let positions = props.positions
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
                        <NavLink to={'/positions/' + item.intershipPositionId}>
                            <List.Item style={{ paddingInline: 50, justifyContent: 'space-between', cursor: 'pointer'  }} onClick={() => {}}>
                                <Col span={4}>{item.intershipPositionName}</Col>
                                <Col span={4}>{item.intershipPositionCount}</Col>
                                <Col span={4} style={{ textAlign: 'end'}}>0</Col>
                            </List.Item>
                        </NavLink>
                    )}
                />
        </>
    )
}

export default PositionsForCompany;