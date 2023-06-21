import { positionsReducerActions } from 'Store/reducers/PositionsReducer';
import { AppStateType, InferActionsTypes } from 'Store/store';
import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import PositionsListForSchoolAndStudent from './PositionsListForSchoolAndStudent';
import { withAuthRedirect } from 'HOC/withAuthRedirect';

type MapPropsType = ReturnType<typeof mapStateToProps>
type ActionsType = InferActionsTypes<typeof positionsReducerActions>

type PropsType = MapPropsType & ActionsType;

class PositionsListForSchoolAndStudentContainer extends React.Component<PropsType> {
    render() {
        return (
            <>
                <PositionsListForSchoolAndStudent positions={this.props.positions.positions}/>
            </>
        )
    }
}

let mapStateToProps = (state: AppStateType) => {
    return {
        positions: state.positions
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, {...positionsReducerActions}), withAuthRedirect
)(PositionsListForSchoolAndStudentContainer)