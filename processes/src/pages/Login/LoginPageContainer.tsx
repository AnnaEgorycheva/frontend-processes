import React from 'react';
import { AppStateType} from 'Store/store';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {LoginDataFormType, clearLoginFormData, login, setLoginFormData} from '../../Store/reducers/AuthReducer';
import LoginPage from './LoginPage';
import withRouter from 'HOC/withRouter';
import NavigationAfterLogin from './NavigationAfterLogin';
import { Spin } from 'antd';

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    onChangeValues: (loginData: LoginDataFormType) => void
    clearForm: () => void,
    login: (loginData: LoginDataFormType) => Promise<any>
}
type OwnPropsType = {
    router: {
        location: {},
        navigate: Function,
        params: {
            id: string | null
        }
    },
}
type PropsType = MapPropsType & DispatchPropsType & OwnPropsType

class LoginPageContainer extends React.Component<PropsType> {
    render() {
        return (
            <>
              {
                this.props.isAuthSuccess
                ?   <NavigationAfterLogin/>
                : 
                    <>
                        <Spin spinning={this.props.isUserTryingToLogin}
                              tip='Выполняется вход...'
                        >
                            <LoginPage loginFormData={this.props.loginFormData}
                                    onChangeFormValues={this.props.onChangeValues}
                                    clearForm={this.props.clearForm}
                                    login={this.props.login}/> 
                        </Spin>
                    </>
              }
            </>
        )
    }
}

let mapStateToProps = (state: AppStateType) => {
    return {
        user: state.auth.user,
        loginFormData: state.auth.loginFormData,
        isAuthSuccess: state.auth.isAuthSuccess,
        isUserTryingToLogin: state.auth.isUserTryingToLogin
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, {onChangeValues: setLoginFormData, 
                              clearForm:clearLoginFormData, login}), withRouter
)(LoginPageContainer)