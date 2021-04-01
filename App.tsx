import React from 'react';
import { Provider } from 'react-redux';
//
import Welcome from './src/screens/Welcome';
import store from './src/store';

export default function App() {
    return (
        <Provider store={store}>
            <Welcome />
        </Provider>
    );
}
