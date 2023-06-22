import { initializeApp } from 'Store/reducers/AppReducer';
import { AppStateType } from 'Store/store';
import MainLayout from 'pages/MainLayout';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

// const App: React.FC = () => {
//   return (
//     <MainLayout/>
//   )
// };

// export default App;

type MapPropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    initializeApp: () => void
}

class App extends Component<MapPropsType & DispatchPropsType> {
    componentDidMount() {
        this.props.initializeApp()
    }

    componentDidUpdate(prevProps: Readonly<{ initialized: boolean; } & DispatchPropsType>, prevState: Readonly<{}>, snapshot?: any): void {
        this.props.initializeApp()
    }

    render() {
        return (
          <MainLayout/>
        )
    }
}

const mapStateToProps = (state: AppStateType) => ({
    initialized: state.app.initialized
})

let AppContainer = compose<React.ComponentType>(
    connect(mapStateToProps, {initializeApp}))(App)

export default AppContainer

