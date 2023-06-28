import { AppStateType } from 'Store/store';
import React from 'react';
import {connect} from 'react-redux';
import {compose} from 'redux';
import { Layout, Spin } from 'antd';
import {getCompanyApplications } from 'Store/reducers/ApplicationsReducer';
import ApplicationsForCompany from './ApplicationsForCompany';

class ApplicationsForCompanyContainer extends React.Component<PropsType> {
    componentDidMount(): void {
        this.props.getCompanyApplications()
    }
    render() {
        return (
            <>
                <Layout style={{ marginInline: 50, marginTop: 50 }}>
                    <Spin spinning={this.props.isFetching}>
                        <ApplicationsForCompany applications={this.props.applications}/>
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

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    getCompanyApplications: () => Promise<any>
}
type PropsType = MapPropsType & DispatchPropsType;

export default compose<React.ComponentType>(
    connect(mapStateToProps, {getCompanyApplications}),
)(ApplicationsForCompanyContainer)