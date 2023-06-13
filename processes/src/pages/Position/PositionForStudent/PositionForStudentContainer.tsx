import { positionReducerActions } from 'Store/reducers/PositionReducer';
import { AppStateType, InferActionsTypes } from 'Store/store';
import { Card, Layout } from 'antd';
import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import PositionInfo from '../shared/PositionInfo';
import SubmitApplicationModal from './SubmitApplicationModal';

class PositionForStudentContainer extends React.Component<PropsType> {
    componentDidMount(): void {
        console.log(this.props)
    }

    render() {
        return (
            <>
                <Layout style={{ marginInline: 50, marginTop: 50 }}>
                    <Card style={{ margin: 20 }}>
                        <PositionInfo positionInfo={this.props.positionInfo}/>
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
        isStudentApplyed: state.position.isStudentAppliedAnApplication
    }
}

type MapPropsType = ReturnType<typeof mapStateToProps>
type ActionsType = InferActionsTypes<typeof positionReducerActions>

type PropsType = MapPropsType & ActionsType;

export default compose<React.ComponentType>(
    connect(mapStateToProps, {...positionReducerActions}),
)(PositionForStudentContainer)

