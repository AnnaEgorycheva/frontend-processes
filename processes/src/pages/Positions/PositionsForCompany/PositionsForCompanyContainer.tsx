import { positionsReducerActions } from 'Store/reducers/PositionsReducer';
import { creatingNewPositionReducerActions } from 'Store/reducers/CreatingNewPositionReducer';
import { AppStateType, InferActionsTypes } from 'Store/store';
import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import PositionsForCompany from './PositionsForCompany';
import AddingNewPositionButton from './AddingNewPositionButton';
import { Layout } from 'antd';
import { withAuthRedirect } from 'HOC/withAuthRedirect';

type MapPropsType = ReturnType<typeof mapStateToProps>
type positionsActions = typeof positionsReducerActions
type creatingNewPositionActions = typeof creatingNewPositionReducerActions
type ActionsType = InferActionsTypes<positionsActions & creatingNewPositionActions>

type PropsType = MapPropsType & any;

class PositionsForCompanyContainer extends React.Component<PropsType> {
    render() {
        return (
            <>
                <Layout style={{ marginInline: 50, marginTop: 50 }}>
                    <PositionsForCompany 
                        positions={this.props.positions.positions} 
                    />
                    <AddingNewPositionButton
                        newPosition={this.props.newPosition}
                        onChangeValues={this.props.setNewPosition} 
                        clearForm={this.props.clearNewPositionData}  
                    />
                </Layout>
            </>
        )
    }
}

let mapStateToProps = (state: AppStateType) => {
    return {
        positions: state.positions,
        newPosition : state.creatingNewPosition.newPosition
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, {...positionsReducerActions, ...creatingNewPositionReducerActions}), withAuthRedirect
)(PositionsForCompanyContainer)