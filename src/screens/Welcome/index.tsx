import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useDispatch } from 'react-redux';
import AppLoading from 'expo-app-loading';
import { SafeAreaProvider } from 'react-native-safe-area-context';
//
// import Navigation from '../../navigation';
// import { isAuth } from '../../services/auth';
// import { logInUser } from '../../store/modules/user/actions';

export default function Welcome() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const dispatch = useDispatch();

    async function checkUser() {
        const user = await isAuth();
        if (user?.token) {
            dispatch(logInUser(user));
            setLoading(false);
        }
    }

    return loading ? (
        <AppLoading
            startAsync={checkUser}
            onFinish={() => setLoading(false)}
            onError={() => setError(true)}
        />
    ) : (
        <SafeAreaProvider>
            <Navigation />
            <StatusBar style="light" />
        </SafeAreaProvider>
    );
}
