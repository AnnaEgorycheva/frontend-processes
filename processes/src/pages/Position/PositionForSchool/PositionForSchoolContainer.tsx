import { getPositionInfo, positionReducerActions, getStudentsFromPositionApplications} from 'Store/reducers/PositionReducer';
import { AppStateType, InferActionsTypes } from 'Store/store';
import { Card, Layout, Spin } from 'antd';
import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import PositionInfo from '../shared/PositionInfo';
import StudentsOnPositionList from './StudentsOnPositionList';
import withRouter from 'HOC/withRouter';

class PositionForSchoolContainer extends React.Component<PropsType> {
    componentDidMount(): void {
        this.props.getPositionInfo(this.props.router.params.id)
        this.props.getStudentsFromPositionApplications(this.props.router.params.id)
    }

    render() {
        return (
            <>
                <Layout style={{ marginInline: 50, marginTop: 50 }}>
                    <Card style={{ margin: 20 }}>
                        <Spin spinning={this.props.positionInfoIsFetching}>
                            <PositionInfo positionInfo={this.props.positionInfo}/>
                        </Spin>
                    </Card>
                    <Spin spinning={this.props.studentsOnPositionIsFetching}>
                        <StudentsOnPositionList studentsOnPosition={this.props.studentsOnPosition}/>
                    </Spin>
                </Layout>
            </>
        )
    }
}

let mapStateToProps = (state: AppStateType)  => {
    return {
        positionInfo: state.position.positionInfo,
        positionInfoIsFetching: state.position.positionInfoIsFetching,
        studentsOnPosition: state.position.studentsOnPosition,
        studentsOnPositionIsFetching: state.position.studentsOnPositionIsFetching
    }
}

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchType = {
    getPositionInfo: (positionId: string) => Promise<any>,
    getStudentsFromPositionApplications: (positionId: string) => Promise<any>
}
type ActionsType = InferActionsTypes<typeof positionReducerActions>
type OwnPropsType = {
    router: {
        location: {},
        navigate: Function,
        params: {
            id: string 
        }
    },
}

type PropsType = MapPropsType & ActionsType & DispatchType & OwnPropsType;

export default compose<React.ComponentType>(
    connect(mapStateToProps, {...positionReducerActions, getPositionInfo, getStudentsFromPositionApplications}), withRouter
)(PositionForSchoolContainer)


