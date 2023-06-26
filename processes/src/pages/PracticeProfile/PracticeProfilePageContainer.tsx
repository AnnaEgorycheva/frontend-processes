import { Card, Layout, Spin } from 'antd';
import withRouter from 'HOC/withRouter';
import React from 'react';
import { connect} from 'react-redux';
import { compose } from 'redux';
import { editStudentPracticeProfileInfo, getStudentPracticeProfileInfo } from 'Store/reducers/PracticeProfileReducer';
import { AppStateType } from 'Store/store';
import PracticeProfilePage from './PracticeProfilePage';

class PracticeProfilePageContainer extends React.Component<PropsType> {
  componentDidMount(): void {
    this.props.getStudentPracticeProfileInfo(this.props.router.params.id)
  }
  render() {
    return (
        <>
            <Layout style={{ marginInline: 50, marginTop: 50 }}>
                <Card style={{ margin: 20 }}>
                    <Spin spinning={this.props.isFetching}>
                        <PracticeProfilePage 
                          studentPracticeProfile={this.props.studentPracticeProfile}
                          editProfile={this.props.editStudentPracticeProfileInfo}
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
      studentPracticeProfile: state.practiceProfile.studentPracticeProfile,
      isFetching: state.practiceProfile.isDataFetching
  }
}

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchType = {
  getStudentPracticeProfileInfo: (practiceProfileId: string) => Promise<any>,
  editStudentPracticeProfileInfo: (practiceProfileId: string, practiceDiary: string | null) => Promise<any>
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
    connect(mapStateToProps, {getStudentPracticeProfileInfo, editStudentPracticeProfileInfo}), withRouter
)(PracticeProfilePageContainer)






