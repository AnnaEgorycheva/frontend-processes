import { Card, Layout, Spin } from 'antd';
import withRouter from 'HOC/withRouter';
import React from 'react';
import { connect} from 'react-redux';
import { compose } from 'redux';
import { getPracticePeriodInfo, getStudentsOnPracticePeriod, 
  updatePracticePeriod, setUpdatedPracticePeriodInfo, getGroupSelectOptions} from 'Store/reducers/PracticePeriodReducer';
import { AppStateType } from 'Store/store';
import PracticePeriodInfo from './PracticePeriodInfo';
import StudentsOnPracticePeriodList from './StudentsOnPracticePeriodList';
import UpdatingPracticePeriodBtn from './UpdatingPracticePeriodBtn';
import { PracticePeriodCreateUpdate } from 'Types/types';

class PracticePeriodPageContainer extends React.Component<PropsType> {
  componentDidMount(): void {
    this.props.getPracticePeriodInfo(this.props.router.params.id)
    this.props.getStudentsOnPracticePeriod(this.props.router.params.id)
    this.props.getGroupSelectOptions()
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
                    <UpdatingPracticePeriodBtn
                      currentInfo={this.props.practicePeriod}
                      onChangeValues={this.props.setUpdatedPracticePeriodInfo}
                      updatePracticePeriod={this.props.updatePracticePeriod}
                      options={this.props.options}
                    />
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
      isStudentsFetching: state.practicePeriod.isStudentListFetching,
      options: state.practicePeriod.groupsOptions
  }
}

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchType = {
  getPracticePeriodInfo: (practicePeriodId: string) => Promise<any>,
  getStudentsOnPracticePeriod: (practicePeriodId: string) => Promise<any>,
  updatePracticePeriod: (practicePeriodId: string) => Promise<any>,
  setUpdatedPracticePeriodInfo: (updatedPracticePeriodInfo: PracticePeriodCreateUpdate) => void,
  getGroupSelectOptions: () => Promise<any>
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
    connect(mapStateToProps, {getPracticePeriodInfo, getStudentsOnPracticePeriod, 
      updatePracticePeriod, setUpdatedPracticePeriodInfo, getGroupSelectOptions}), withRouter
)(PracticePeriodPageContainer)


