import { AppStateType, InferActionsTypes } from 'Store/store';
import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import { Layout, Spin } from 'antd';
import { getAllStudentPracticePeriods } from 'Store/reducers/PracticeProfilesReducer';
import PracticeProfilesList from './PracticeProfilesList';

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    getAllStudentPracticePeriods: (studentId: string) => Promise<any>
}

type PropsType = MapPropsType & DispatchPropsType;

class PracticeProfilesListContainer extends React.Component<PropsType> {
    componentDidMount(): void {
        this.props.getAllStudentPracticePeriods(this.props.studentId)   
    }

    render() {
        return (
            <>
                <Layout style={{ marginInline: 50, marginTop: 50 }}>
                    <Spin spinning={this.props.isFetching}>
                        <PracticeProfilesList studentPracticePeriods={this.props.studentPracticePeriods}/>
                    </Spin>
                </Layout>
            </>
        )
    }
}

let mapStateToProps = (state: AppStateType) => {
    return {
        studentPracticePeriods: state.practiceProfiles.practicePeriodsAndStudentPracticeProfiles,
        isFetching: state.practiceProfiles.isDataFetching,
        studentId: state.auth.user.userId
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, {getAllStudentPracticePeriods})
)(PracticeProfilesListContainer)