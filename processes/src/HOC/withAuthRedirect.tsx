import React from "react";
import {Navigate} from "react-router-dom";
import {connect} from "react-redux";
import {AppStateType} from '../Store/store';

interface InjectedProps {
    isAuth: boolean
}

export const withAuthRedirect = <BaseProps extends InjectedProps>(BaseComponent: React.ComponentType<BaseProps>) => {
    const mapStateToProps = (state: AppStateType) => ({
        isAuth: state.auth.isAuth
    })
    const dispatchProps = {}
    type RedirectComponentProps = ReturnType<typeof mapStateToProps> & typeof dispatchProps
    
    class RedirectComponent extends React.Component<RedirectComponentProps> {
        render() {
            const {isAuth, ...restProps} = this.props

            if (this.props.isAuth) {
                return (
                    <BaseComponent
                      {...(restProps as BaseProps)}
                    />
                );
            }
            else {
                return <Navigate to={'/login'}/>
            } 
        }
    }
    
    const ConnectedAuthRedirectComponent = connect<ReturnType<typeof mapStateToProps>, 
                                                   typeof dispatchProps, BaseProps, AppStateType>(
            mapStateToProps, dispatchProps)
    (RedirectComponent)

    return ConnectedAuthRedirectComponent;
}


// let mapStateToPropsForRedirect = (state: AppStateType) => ({
//     isAuth: state.auth.isAuth
// } as MapPropsType);

// type MapPropsType = {
//     isAuth: boolean
// }
// type DispatchPropsType = {
// }

// export function withAuthRedirect<WCP>(WrappedComponent: React.ComponentType<WCP>) {

//     const RedirectComponent: React.FC<MapPropsType & DispatchPropsType> = (props) => {
//         let {isAuth, ...restProps} = props

//         if (!isAuth) return <Navigate to='/login'/>

//         return <WrappedComponent {...restProps as WCP}/>
//     }

//     let ConnectedAuthRedirectComponent = connect<MapPropsType, DispatchPropsType, WCP, AppStateType>(
//         mapStateToPropsForRedirect, {})
//     (RedirectComponent)

//     return ConnectedAuthRedirectComponent;
// }