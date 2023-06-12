import Title from 'antd/es/typography/Title';
import React from 'react';
import { PositionType } from 'Types/types';


type PropsType = {
    positionInfo: PositionType
}

const PositionInfo: React.FC<PropsType> = (props) => {
    let positionInfo = props.positionInfo
    return (
        <>
            <Title level={3} style={{ marginTop: 0, marginBottom: '0.15em' }}>{positionInfo.name}</Title>
            <Title level={5} type="secondary" style={{ marginTop: 0 }}>{positionInfo.companyName}</Title>
            <Title level={5} style={{ marginTop: 0 }}>
                {
                    positionInfo.description === '' 
                    ?  positionInfo.description
                    : 'У позиции пока нет описания.'
                } 
            </Title>
            <Title level={5} style={{ marginTop: 0 }}>
                {
                    positionInfo.skills === '' 
                    ?  positionInfo.skills
                    : 'Компания пока не указала требуемые навыки.'
                } 
            </Title>
            <Title level={5} style={{ marginTop: 0 }}>
                Количество мест: {positionInfo.places ?? 'У позиции нет фиксированного количества досутпных мест.'} 
            </Title>
        </>
    )
}

export default PositionInfo;