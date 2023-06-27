import Title from "antd/es/typography/Title";
import React from "react";
import {PracticePeriod} from '../../Types/types'

type PropsType = {
    practicePeriod: PracticePeriod,
}

const PracticePeriodInfo: React.FC<PropsType> = (props) => {
    const practicePeriod = props.practicePeriod
    return (
        <>
            <Title level={3} style={{ marginTop: 0, marginBottom: 30 }}>
                {practicePeriod.practicePeriodName}
            </Title>
            <Title level={5} style={{ marginTop: 0, marginBottom: 8, color: '#666666' }}>Приказ:</Title>
            <Title level={5} style={{ marginTop: 0, marginBottom: 30 }}>{practicePeriod.practiceOrder}</Title>
        </>
    )
}

export default PracticePeriodInfo