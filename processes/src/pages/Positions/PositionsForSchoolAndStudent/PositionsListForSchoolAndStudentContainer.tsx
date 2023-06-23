import { getAllPositions, positionsReducerActions } from 'Store/reducers/PositionsReducer';
import { AppStateType, InferActionsTypes } from 'Store/store';
import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import PositionsListForSchoolAndStudent from './PositionsListForSchoolAndStudent';
import { withAuthRedirect } from 'HOC/withAuthRedirect';
import { Spin } from 'antd';

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    getAllPositions: () => Promise<any>
}

type PropsType = MapPropsType & DispatchPropsType;

class PositionsListForSchoolAndStudentContainer extends React.Component<PropsType> {
    componentDidMount(): void {
        this.props.getAllPositions()   
    }

    render() {
        return (
            <>
                <Spin spinning={this.props.positions === undefined}>
                    <PositionsListForSchoolAndStudent positions={this.props.positions.positions}/>
                </Spin>
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
    connect(mapStateToProps, {getAllPositions})
)(PositionsListForSchoolAndStudentContainer)