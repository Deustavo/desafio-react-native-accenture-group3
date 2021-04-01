import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
//
import DashboardHome from '../screens/DashboardHome';
import DrawerInfoUser from '../components/DrawerInfoUser';

export type DrawerParamList = {
    DashboardHome: undefined;
    Login: undefined;
};

const { Navigator, Screen } = createDrawerNavigator<DrawerParamList>();

export default function DrawerNavigator() {
    return (
        <Navigator
            drawerContent={(props) => <DrawerInfoUser {...props} />}
            drawerPosition="right"
            drawerType="slide"
        >
            <Screen name="DashboardHome" component={DashboardHome} />
        </Navigator>
    );
}
