import { getPositionInfo, positionReducerActions } from 'Store/reducers/PositionReducer';
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
    }

    render() {
        return (
            <>
                <Layout style={{ marginInline: 50, marginTop: 50 }}>
                    <Card style={{ margin: 20 }}>
                        <Spin spinning={this.props.positionInfoIsFetching}>
                            <PositionInfo positionInfo={this.props.positionInfo}/>
                        </Spin>
                        <SubmitApplicationModal isStudentApplyedAnApplication={this.props.isStudentApplyed}/>
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
        isStudentApplyed: state.position.isStudentAppliedAnApplication
    }
}

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchType = {
    getPositionInfo: (positionId: string | null) => Promise<any>
}
type ActionsType = InferActionsTypes<typeof positionReducerActions>
type OwnPropsType = {
    router: {
        location: {},
        navigate: Function,
        params: {
            id: string | null
        }
    },
}

type PropsType = MapPropsType & ActionsType & DispatchType & OwnPropsType;

export default compose<React.ComponentType>(
    connect(mapStateToProps, {...positionReducerActions, getPositionInfo}), withRouter
)(PositionForStudentContainer)


