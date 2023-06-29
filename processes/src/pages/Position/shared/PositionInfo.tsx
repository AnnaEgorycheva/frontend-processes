import Title from 'antd/es/typography/Title';
import React from 'react';
import { IntershipPositionType } from 'Types/types';


type PropsType = {
    positionInfo: IntershipPositionType
}

const PositionInfo: React.FC<PropsType> = (props) => {
    let positionInfo = props.positionInfo
    return (
        <>
            <Title level={3} style={{ marginTop: 0, marginBottom: '0.15em' }}>{positionInfo.intershipPositionName}</Title>
            <Title level={5} type="secondary" style={{ marginTop: 0 }}>{positionInfo.companyName}</Title>
            <Title level={5} style={{ marginTop: 0 }}>
                {
                    positionInfo.intershipPositionDescription === '' 
                    ? 'На текущий момент у позиции нет описания.'
                    : positionInfo.intershipPositionDescription
                } 
            </Title>
            {/* <Title level={5} style={{ marginTop: 0 }}>
                {
                    positionInfo.skills === '' 
                    ?  positionInfo.skills
                    : 'Компания пока не указала требуемые навыки.'
                } 
            </Title> */}
            <Title level={5} style={{ marginTop: 0 }}>
                Количество мест: {positionInfo.intershipPositionCount ?? 'У позиции нет фиксированного количества досутпных мест.'} 
            </Title>
        </>
    )
}

export default PositionInfo;