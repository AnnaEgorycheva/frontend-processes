import Title from 'antd/es/typography/Title';
import React from 'react';
import { IntershipPositionType } from '../../../Types/types';

type PropsType = {
    positionInfo: IntershipPositionType
}

const PositionInfoForCompany: React.FC<PropsType> = (props) => {
    let positionInfo = props.positionInfo
    return (
        <>
            <Title level={3} style={{ marginTop: 0, marginBottom: 25 }}>{positionInfo.intershipPositionName}</Title>
            <Title level={5} style={{ marginTop: 0 }}>
                {
                    positionInfo.intershipPositionDescription === "" 
                    ? 'У позиции пока нет описания.'
                    : positionInfo.intershipPositionDescription
                } 
            </Title>
            {/* <Title level={5} style={{ marginTop: 0 }}>
                {
                    positionInfo.skills === '' 
                    ?  positionInfo.skills
                    : 'У позиции пока не указаны требуемые навыки.'
                } 
            </Title> */}
            <Title level={5} style={{ marginTop: 0 }}>
                Количество мест: {positionInfo.intershipPositionCount ?? 'У позиции нет фиксированного количества досутпных мест.'} 
            </Title>
        </>
    )
}

export default PositionInfoForCompany;