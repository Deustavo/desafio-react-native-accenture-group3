import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
//
import DashboardTabNavigator from './dashboard';

export type AuthRoutesParamList = {
    DashboardTabNavigator: undefined;
};

const { Navigator, Screen } = createStackNavigator<AuthRoutesParamList>();

export default function AuthRoutes() {
    return (
        <Navigator headerMode="none">
            <Screen
                name="DashboardTabNavigator"
                component={DashboardTabNavigator}
            />
        </Navigator>
    );
}
