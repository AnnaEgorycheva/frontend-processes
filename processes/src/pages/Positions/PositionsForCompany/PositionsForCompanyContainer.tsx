import { getAllCompanyPositions } from 'Store/reducers/PositionsReducer';
import { createNewCompanyPosition, creatingNewPositionReducerActions } from 'Store/reducers/CreatingNewPositionReducer';
import { AppStateType, InferActionsTypes } from 'Store/store';
import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import PositionsForCompany from './PositionsForCompany';
import AddingNewPositionButton from './AddingNewPositionButton';
import { Layout, Spin } from 'antd';

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    getAllCompanyPositions: () => Promise<any>
    createNewCompanyPosition: () => Promise<any>
}

type creatingNewPositionActions = typeof creatingNewPositionReducerActions
type ActionsType = InferActionsTypes<creatingNewPositionActions>

type PropsType = MapPropsType & DispatchPropsType & any;

class PositionsForCompanyContainer extends React.Component<PropsType> {
    componentDidMount(): void {
        this.props.getAllCompanyPositions(this.props.companyId)
    }

    render() {
        return (
            <>
                <Layout style={{ marginInline: 50, marginTop: 50 }}>
                    <Spin spinning={this.props.isPositionsFetching}>
                        <PositionsForCompany 
                            positions={this.props.positions.positions} 
                        />
                    </Spin>
                    <AddingNewPositionButton
                        newPosition={this.props.newPosition}
                        onChangeValues={this.props.setNewPosition} 
                        clearForm={this.props.clearNewPositionData} 
                        createNewCompanyPosition={this.props.createNewCompanyPosition} 
                        companyId={this.props.companyId}
                    />
                </Layout>
            </>
        )
    }
}

let mapStateToProps = (state: AppStateType) => {
    return {
        positions: state.positions,
        newPosition : state.creatingNewPosition.newPosition,
        isPositionsFetching: state.positions.isPositionsFetching,
        companyId: state.auth.user.companyId
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, {getAllCompanyPositions, createNewCompanyPosition, ...creatingNewPositionReducerActions})
)(PositionsForCompanyContainer)