import { AppStateType, InferActionsTypes } from 'Store/store';
import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import { Layout } from 'antd';
import { applicationsReducerActions } from 'Store/reducers/ApplicationsReducer';
import ApplicationsForStudent from './ApplicationsForStudent';

class ApplicationsForStudentContainer extends React.Component<PropsType> {
    render() {
        return (
            <>
                <Layout style={{ marginInline: 50, marginTop: 50 }}>
                    <ApplicationsForStudent applications={this.props.applications}/>
                </Layout>
            </>
        )
    }
}

let mapStateToProps = (state: AppStateType) => {
    return {
        applications: state.applications.applications
    }
}

type MapPropsType = ReturnType<typeof mapStateToProps>
type ActionsType = InferActionsTypes<typeof applicationsReducerActions>

type PropsType = MapPropsType & any;

export default compose<React.ComponentType>(
    connect(mapStateToProps, {...applicationsReducerActions}),
)(ApplicationsForStudentContainer)