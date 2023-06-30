import { Col, List, Row } from 'antd';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { PracticePeriodInfo, SelectOptionType} from '../../Types/types'

type PropsType = {
    practicePeriods: Array<PracticePeriodInfo>
}

const PracticePeriodsList: React.FC<PropsType> = (props) => {
    const navigate = useNavigate();
    const onItemClick = useCallback((practicePeriod: string) => {
        navigate(`/practicePeriods/${practicePeriod}`);
    }, []);
    return (
        <>
            <List
                itemLayout="horizontal"
                header={
                    <div style={{ paddingInline: 50, paddingBlock: 15, fontWeight: 'bold', fontSize: '18px'}}>
                        Период практики
                    </div>
                }
                dataSource={props.practicePeriods}
                renderItem={(item) => (
                    <List.Item style={{ paddingInline: 50, justifyContent: 'space-between', cursor: 'pointer'  }} 
                                onClick={() => {onItemClick(item.id)}}>
                        {item.practicePeriodName}
                    </List.Item>
                )}
            />
        </>
    )
}

export default PracticePeriodsList;