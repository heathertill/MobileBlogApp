import * as React from 'react';
import AppContainer from './AppContainer';

export interface AppProps { }
export interface AppState { }

export default class App extends React.Component<AppProps, AppState> {
    render() {
        return <AppContainer />
    }
}

