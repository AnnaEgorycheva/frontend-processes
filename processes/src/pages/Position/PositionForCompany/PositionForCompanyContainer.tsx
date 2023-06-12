import { positionReducerActions } from 'Store/reducers/PositionReducer';
import { AppStateType, InferActionsTypes } from 'Store/store';
import { Card, Layout } from 'antd';
import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import PositionInfoForCompany from './PositionInfoForCompany';
import PositionControlButtons from './PositionControlButtons';

class PositionForCompanyContainer extends React.Component<PropsType> {
    componentDidMount(): void {
        console.log(this.props)
    }

    render() {
        return (
            <>
                <Layout style={{ marginInline: 50, marginTop: 50 }}>
                    <Card style={{ margin: 20 }}>
                        <PositionInfoForCompany positionInfo={this.props.positionInfo}/>
                        <PositionControlButtons 
                            position={this.props.positionInfo}
                            onChangeValues={this.props.setUpdatedPositionInfo}
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
        updatedPosition: state.position.updatedPositionInfo
    }
}

type MapPropsType = ReturnType<typeof mapStateToProps>
type ActionsType = InferActionsTypes<typeof positionReducerActions>

type PropsType = MapPropsType & any;

export default compose<React.ComponentType>(
    connect(mapStateToProps, {...positionReducerActions}),
)(PositionForCompanyContainer)