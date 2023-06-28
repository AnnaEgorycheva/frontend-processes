import { getPositionInfo, positionReducerActions, 
    findOutIsStudentAppliedAnApplication,
    createApplicationForPosition,
     } from 'Store/reducers/PositionReducer';
import { AppStateType, InferActionsTypes } from 'Store/store';
import { Card, Layout, Spin } from 'antd';
import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import PositionInfo from '../shared/PositionInfo';
import SubmitApplicationModal from './SubmitApplicationModal';
import withRouter from 'HOC/withRouter';

class PositionForStudentContainer extends React.Component<PropsType> {
    componentDidMount(): void {
        this.props.getPositionInfo(this.props.router.params.id)
        this.props.findOutIsStudentAppliedAnApplication(this.props.router.params.id)
    }

    applyApplication = () => {
        console.log('trying to create application')
        // this.props.createApplicationForPosition(this.props.router.params.id)
    }

    render() {
        return (
            <>
                <Layout style={{ marginInline: 50, marginTop: 50 }}>
                    <Card style={{ margin: 20 }}>
                        <Spin spinning={this.props.positionInfoIsFetching}>
                            <PositionInfo positionInfo={this.props.positionInfo}/>
                        </Spin>
                        <SubmitApplicationModal 
                            isStudentApplyedAnApplication={this.props.isStudentApplied}
                            createApplication={this.applyApplication}
                        />
                    </Card>
                </Layout>
            </>
        )
    }
}

let mapStateToProps = (state: AppStateType)  => {
    return {
        positionInfo: state.position.positionInfo,
        positionInfoIsFetching: state.position.positionInfoIsFetching,
        isStudentApplied: state.position.isStudentAppliedAnApplication
    }
}

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchType = {
    getPositionInfo: (positionId: string) => Promise<any>,
    findOutIsStudentAppliedAnApplication: (positionId: string) => Promise<any>,
    createApplicationForPosition: (positionId: string) => Promise<any>
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
    connect(mapStateToProps, {...positionReducerActions, 
        getPositionInfo, findOutIsStudentAppliedAnApplication,
        createApplicationForPosition}), withRouter
)(PositionForStudentContainer)


