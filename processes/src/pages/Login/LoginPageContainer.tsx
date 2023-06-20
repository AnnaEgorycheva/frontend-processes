import React from 'react';
import { AppStateType} from 'Store/store';
import {connect} from 'react-redux';
import {compose} from 'redux';
import {LoginDataFormType, clearLoginFormData, login, setLoginFormData} from '../../Store/reducers/AuthReducer';
import LoginPage from './LoginPage';

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    onChangeValues: (loginData: LoginDataFormType) => void
    clearForm: () => void,
    login: (loginData: LoginDataFormType) => void
}
type PropsType = MapPropsType & DispatchPropsType

class LoginPageContainer extends React.Component<PropsType> {
    constructor(props: PropsType) {
        super(props);
    }
    render() {
        return (
            <>
              <LoginPage loginFormData={this.props.loginFormData}
                         onChangeFormValues={this.props.onChangeValues}
                         clearForm={this.props.clearForm}
                         login={this.props.login}/> 
            </>
        )
    }
}

let mapStateToProps = (state: AppStateType) => {
    return {
        loginFormData: state.auth.loginFormData
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, {onChangeValues: setLoginFormData, 
                              clearForm:clearLoginFormData, login}),
)(LoginPageContainer)