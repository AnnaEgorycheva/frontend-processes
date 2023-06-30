import React from 'react';
import { selectUserRole } from 'Store/selectors/AuthSelector';
import { connect, useSelector } from 'react-redux';
import { AppStateType } from 'Store/store';
import { logout } from 'Store/reducers/AuthReducer';
import { compose } from 'redux';
import { Navigate } from 'react-router-dom';

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    logout: () => void
}
type PropsType = MapPropsType & DispatchPropsType

class LogoutPageContainer extends React.Component<PropsType> {
    componentDidMount(): void {
        this.props.logout()
    }
    
    render() {
        return (
            <>
                {
                    this.props.isLogoutSuccess && <Navigate to='/login'/>
                }
            </>
        )
    }
}

let mapStateToProps = (state: AppStateType) => {
    return {
        isLogoutSuccess: state.auth.isLogoutSuccess
    }
}

export default compose<React.ComponentType>(
    connect(mapStateToProps, {logout})
)(LogoutPageContainer)