import { AppStateType } from 'Store/store';
import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import { Layout, Spin } from 'antd';
import { getStudentApplications } from 'Store/reducers/ApplicationsReducer';
import ApplicationsForStudent from './ApplicationsForStudent';

class ApplicationsForStudentContainer extends React.Component<PropsType> {
    componentDidMount(): void {
        this.props.getStudentApplications()
    }
    render() {
        return (
            <>
                <Layout style={{ marginInline: 50, marginTop: 50 }}>
                    <Spin spinning={this.props.isFetching}>
                        <ApplicationsForStudent applications={this.props.applications}/>
                    </Spin>
                </Layout>
            </>
        )
    }
}

let mapStateToProps = (state: AppStateType) => {
    return {
        applications: state.applications.applications,
        isFetching: state.applications.isApplicationsFetching
    }
}
type DispatchPropsType = {
    getStudentApplications: () => Promise<any>
}

type MapPropsType = ReturnType<typeof mapStateToProps>

type PropsType = MapPropsType &  DispatchPropsType;

export default compose<React.ComponentType>(
    connect(mapStateToProps, {getStudentApplications}),
)(ApplicationsForStudentContainer)