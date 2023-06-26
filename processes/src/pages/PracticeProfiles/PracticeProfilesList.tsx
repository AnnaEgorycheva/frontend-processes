import { Col, List, Row } from 'antd';
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { PracticePeriodAndStudentPracticeProfile } from '../../Types/types'

type PropsType = {
    studentPracticePeriods: Array<PracticePeriodAndStudentPracticeProfile>
}

const PracticeProfilesList: React.FC<PropsType> = (props) => {
    const navigate = useNavigate();
    const onItemClick = useCallback((practiceProfileId: string | null) => {
        navigate(`/practiceProfiles/${practiceProfileId}`);
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
                dataSource={props.studentPracticePeriods}
                renderItem={(item) => (
                    <List.Item style={{ paddingInline: 50, justifyContent: 'space-between', cursor: 'pointer'  }} 
                                onClick={() => {onItemClick(item.practiceProfileId)}}>
                        {item.practicePeriodName}
                    </List.Item>
                )}
            />
        </>
    )
}

export default PracticeProfilesList;