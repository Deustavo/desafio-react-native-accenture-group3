import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
//
import Login from '../screens/Login';
import CreateAccount from '../screens/CreateAccount';
import ForgotPasswd from '../screens/ForgotPasswd';
import RedefinePassword from '../screens/RedefinePassword';
import ConfirmAccountCreate from '../screens/ConfirmAccountCreate';

export type PublicRoutesParamList = {
    Login: undefined;
    ForgotPasswd: undefined;
    CreateAccount: undefined;
    RedefinePassword: { senhaTemporaria: string; login: string };
    ConfirmAccountCreate: undefined;
};

const { Navigator, Screen } = createStackNavigator<PublicRoutesParamList>();

export default function PublicRoutes() {
    return (
        <Navigator headerMode="none">
            <Screen name="Login" component={Login} />
            <Screen name="ForgotPasswd" component={ForgotPasswd} />
            <Screen name="CreateAccount" component={CreateAccount} />
            <Screen name="RedefinePassword" component={RedefinePassword} />
            <Screen
                name="ConfirmAccountCreate"
                component={ConfirmAccountCreate}
            />
        </Navigator>
    );
}
