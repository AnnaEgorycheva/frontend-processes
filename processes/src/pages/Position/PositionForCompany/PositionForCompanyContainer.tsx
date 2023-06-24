import { getPositionInfo, deletePosition, positionReducerActions, updatePositionInfo } from 'Store/reducers/PositionReducer';
import { AppStateType, InferActionsTypes } from 'Store/store';
import { Card, Layout, Spin } from 'antd';
import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import PositionInfoForCompany from './PositionInfoForCompany';
import PositionControlButtons from './PositionControlButtons';
import withRouter from 'HOC/withRouter';
import { companyAPI } from 'API/company-api';
import { ResultCodesEnum } from 'API/api';

class PositionForCompanyContainer extends React.Component<PropsType> {
    componentDidMount(): void {
        this.props.getPositionInfo(this.props.router.params.id)
    }

    onDeletePositionBtnClick = () => {
        companyAPI.deleteIntershipPosition(this.props.router.params.id)
            .then(responseStatus => {
                if (responseStatus === ResultCodesEnum.OK) {
                    this.props.router.navigate("/positions")
                }
            })
        // this.props.deletePosition(this.props.router.params.id)
    }

    render() {
        return (
            <>
                <Layout style={{ marginInline: 50, marginTop: 50 }}>
                    <Card style={{ margin: 20 }}>
                        <Spin spinning={this.props.positionInfoIsFetching}>
                            <PositionInfoForCompany positionInfo={this.props.positionInfo}/>
                        </Spin>
                        <PositionControlButtons 
                            currentPosition={this.props.positionInfo}
                            onChangeValues={this.props.setUpdatedPositionInfo}
                            onDeletePositionBtnClick={this.onDeletePositionBtnClick}
                            updatePosition={this.props.updatePositionInfo}
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
        updatedPosition: state.position.updatedPositionInfo
    }
}

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchType = {
    getPositionInfo: (positionId: string | null) => Promise<any>,
    deletePosition: (positionId: string) => Promise<any>,
    updatePositionInfo: (positionId: string) => Promise<any>
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

type PropsType = MapPropsType & any & DispatchType & OwnPropsType;

export default compose<React.ComponentType>(
    connect(mapStateToProps, 
        {...positionReducerActions, getPositionInfo, deletePosition, updatePositionInfo}), withRouter
)(PositionForCompanyContainer)