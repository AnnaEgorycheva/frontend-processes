import { AppStateType, InferActionsTypes } from 'Store/store';
import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import { Layout, Spin } from 'antd';
import { createNewPracticePeriod, getAllPracticePeriods, practicePeriodsReducerActions } from 'Store/reducers/PracticePeriodsReducer';
import PracticePeriodsList from './PracticePeriodsList';
import AddingNewPracticePeriodButton from './AddingNewPracticePeriodButton';

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    getAllPracticePeriods: () => Promise<any>,
    createNewPracticePeriod: () => Promise<any>
}

type PropsType = MapPropsType & any & DispatchPropsType;

class PracticePeriodsListContainer extends React.Component<PropsType> {
    componentDidMount(): void {
        this.props.getAllPracticePeriods()   
    }

    render() {
        return (
            <>
                <Layout style={{ marginInline: 50, marginTop: 25 }}>
                    <AddingNewPracticePeriodButton
                        onChangeValues={this.props.setNewPracticePeriodData}
                        createNewPracticePeriod={this.props.createNewPracticePeriod}
                    />
                    <Spin spinning={this.props.isFetching}>
                        <PracticePeriodsList practicePeriods={this.props.practicePeriods}/>
                    </Spin>
                </Layout>
            </>
        )
    }
}

let mapStateToProps = (state: AppStateType) => {
    return {
        practicePeriods: state.practicePeriods.practicePeriods,
        isFetching: state.practicePeriods.isPracticePeriodsFetching
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, {...practicePeriodsReducerActions, getAllPracticePeriods, createNewPracticePeriod})
)(PracticePeriodsListContainer)