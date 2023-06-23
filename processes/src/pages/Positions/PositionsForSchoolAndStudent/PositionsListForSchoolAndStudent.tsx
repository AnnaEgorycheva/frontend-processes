import { PositionType, IntershipPositionType } from 'Types/types';
import { Col, Layout, List, Row } from 'antd';
import React from 'react';
import { NavLink } from 'react-router-dom';

type PropsType = {
    positions: Array<IntershipPositionType>
}

const PositionsListForSchoolAndStudent: React.FC<PropsType> = (props) => {
    let positions = props.positions
    return (
        <>
        <Layout style={{ marginInline: 50, marginTop: 50 }}>
            <List
                    itemLayout="horizontal"
                    header={
                        <div style={{ display: 'flex', justifyContent: 'space-between', paddingInline: 50, paddingBlock: 15, fontWeight: 'bold', fontSize: '18px'}}>
                            <Col span={4} style={{ fontSize: '18px'}}>Позиция</Col>
                            <Col span={4} style={{ fontSize: '18px'}}>Компания</Col>
                            <Col span={4} style={{ textAlign: 'end', fontSize: '18px'}}>Количество мест</Col>
                        </div>
                }
                    dataSource={positions}
                    renderItem={(item) => (
                        <NavLink to={'/positions/' + item.intershipPositionId}>
                            <List.Item style={{ paddingInline: 50, justifyContent: 'space-between', cursor: 'pointer'  }} onClick={() => {}}>
                                <Col span={4}>{item.intershipPositionName}</Col>
                                <Col span={4}>{item.companyName}</Col>
                                <Col span={4} style={{ textAlign: 'end'}}>{item.intershipPositionCount}</Col>
                            </List.Item>
                        </NavLink>
                    )}
                />
            </Layout>
        </>
    )
}

export default PositionsListForSchoolAndStudent;