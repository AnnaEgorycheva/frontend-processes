import { Card, Layout, Spin } from 'antd';
import withRouter from 'HOC/withRouter';
import React from 'react';
import { connect} from 'react-redux';
import { compose } from 'redux';
import { getPracticePeriodInfo } from 'Store/reducers/PracticePeriodReducer';
import { AppStateType } from 'Store/store';
import PracticePeriodInfo from './PracticePeriodInfo';
import StudentsOnPracticePeriodList from './StudentsOnPracticePeriodList';

class PracticePeriodPageContainer extends React.Component<PropsType> {
  componentDidMount(): void {
    this.props.getPracticePeriodInfo(this.props.router.params.id)
  }
  render() {
    return (
        <>
            <Layout style={{ marginInline: 50, marginTop: 50 }}>
                <Card style={{ margin: 20 }}>
                    <Spin spinning={this.props.isPeriodDataFetching}>
                        <PracticePeriodInfo 
                          practicePeriod={this.props.practicePeriod}
                        />
                    </Spin>
                    <Spin spinning={this.props.isStudentsFetching}>
                      <StudentsOnPracticePeriodList
                        students={this.props.studentsOnPracticePeriod}
                      />
                    </Spin>
                </Card>
            </Layout>
        </>
    )
  }
}

let mapStateToProps = (state: AppStateType)  => {
  return {
      practicePeriod: state.practicePeriod.practicePeriod,
      studentsOnPracticePeriod: state.practicePeriod.studentsOnPracticePeriod,
      isPeriodDataFetching: state.practicePeriod.isPracticePeriodDataFetching,
      isStudentsFetching: state.practicePeriod.isStudentListFetching
  }
}

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchType = {
  getPracticePeriodInfo: (practicePeriodId: string) => Promise<any>
}
type OwnPropsType = {
  router: {
      location: {},
      navigate: Function,
      params: {
          id: string 
      }
  },
}
type PropsType = MapPropsType & DispatchType & OwnPropsType;

export default compose<React.ComponentType>(
    connect(mapStateToProps, {getPracticePeriodInfo}), withRouter
)(PracticePeriodPageContainer)


