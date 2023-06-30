import { initializeApp } from 'Store/reducers/AppReducer';
import { AppStateType } from 'Store/store';
import MainLayout from 'pages/MainLayout';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    initializeApp: () => void
}

class App extends Component<MapPropsType & DispatchPropsType> {
    componentDidMount() {
        this.props.initializeApp()
    }
    
    render() {
        return (
            <>
                {
                    this.props.initialized && <MainLayout/>
                }
            </>
        )
    }
}

const mapStateToProps = (state: AppStateType) => ({
    initialized: state.app.initialized,
    isMainPathname: state.app.isMainPathname
})

let AppContainer = compose<React.ComponentType>(
    connect(mapStateToProps, {initializeApp}))(App)

export default AppContainer

