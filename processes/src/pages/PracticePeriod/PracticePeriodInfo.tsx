import Title from "antd/es/typography/Title";
import React from "react";
import {PracticePeriod} from '../../Types/types'

type PropsType = {
    practicePeriod: PracticePeriod,
}

const PracticePeriodInfo: React.FC<PropsType> = (props) => {
    const practicePeriod = props.practicePeriod

    let groupsArray: Array<string> | null = practicePeriod.groups === null ? null : []
    let groupsString = ''
    if (practicePeriod.groups !== null && practicePeriod.groups !== undefined && groupsArray !== null) {
        practicePeriod.groups.map(group => {
            groupsArray?.push(group.groupNumber)
        })
        groupsString = groupsArray.join(', ')
    }
    return (
        <>
            <Title level={3} style={{ marginTop: 0, marginBottom: 30 }}>
                {practicePeriod.practicePeriodName}
            </Title>
            <Title level={5} style={{ marginTop: 0, marginBottom: 8, color: '#666666' }}>Приказ:</Title>
            <Title level={5} style={{ marginTop: 0, marginBottom: 30 }}>{practicePeriod.practiceOrder}</Title>
            <Title level={5} style={{ marginTop: 0, marginBottom: 30 }}>
                Группы: {
                    practicePeriod.groups === null
                    ? 'на текущий момент группы студентов данного периода практики не указаны' 
                    :  groupsString
                }
            </Title>
        </>
    )
}

export default PracticePeriodInfo