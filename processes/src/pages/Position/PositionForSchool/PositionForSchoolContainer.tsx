import { positionReducerActions } from 'Store/reducers/PositionReducer';
import { AppStateType, InferActionsTypes } from 'Store/store';
import { Card, Layout } from 'antd';
import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import PositionInfo from '../shared/PositionInfo';
import StudentsOnPositionList from './StudentsOnPositionList';

class PositionForSchoolContainer extends React.Component<PropsType> {
    componentDidMount(): void {
        console.log(this.props)
    }

    render() {
        return (
            <>
                <Layout style={{ marginInline: 50, marginTop: 50 }}>
                    <Card style={{ margin: 20 }}>
                        <PositionInfo positionInfo={this.props.positionInfo}/>
                    </Card>
                    <StudentsOnPositionList studentsOnPosition={this.props.studentsOnPosition}/>
                </Layout>
            </>
        )
    }
}

let mapStateToProps = (state: AppStateType)  => {
    return {
        positionInfo: state.position.positionInfo,
        studentsOnPosition: state.position.studentsOnPosition
    }
}

type MapPropsType = ReturnType<typeof mapStateToProps>
type ActionsType = InferActionsTypes<typeof positionReducerActions>
type OwnPropsType = {
    positionId: number | string
}

type PropsType = MapPropsType & ActionsType & OwnPropsType;

export default compose<React.ComponentType>(
    connect(mapStateToProps, {...positionReducerActions}),
)(PositionForSchoolContainer)


