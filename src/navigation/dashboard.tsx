import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//
import Transfers from '../screens/Transfers';
import Deposit from '../screens/Deposit';
import Plans from '../screens/Plans';
import DrawerNavigator from './drawer';
import { Platform } from 'react-native';
import { Ionicons, FontAwesome, MaterialCommunityIcons  } from '@expo/vector-icons';

const { Navigator, Screen } = createBottomTabNavigator();

export default function DashboardTabNavigator() {
    const isIos = Platform.OS === 'ios';
    return (
        <Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: () => {
                    type Routes = {
                        [key: string]: JSX.Element;
                    };
                    const routes: Routes = {
                        Home: (
                            <Ionicons name="home-outline" size={24} color="#ffffff" />
                        ),
                        Transfers: (
                            <FontAwesome name="exchange" size={24} color="#ffffff" />
                        ),
                        Deposit: (
                            <FontAwesome name="money" size={24} color="#ffffff" />
                        ),
                        Plans: (
                            <MaterialCommunityIcons name="currency-usd-circle-outline" size={28} color="#ffffff" />
                        ),
                    };
                    return routes[route.name];
                },
            })}
            tabBarOptions={{
                activeTintColor: 'white',
                inactiveTintColor: '#777',
                showLabel: true,
                style: {
                    borderTopWidth: 0,
                    position: 'absolute',
                    backgroundColor: '#474898',
                    borderTopColor: 'transparent',
                    height: isIos ? 90 : 70,
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                tabStyle: {
                    backgroundColor: 'transparent',
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                labelStyle: {
                    paddingBottom: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: 12,
                    fontWeight: '600',
                    textAlign: 'center',
                },
            }}
        >
            <Screen name="Home" component={DrawerNavigator} options={{title: 'Início'}} />
            <Screen name="Transfers" component={Transfers} options={{title: 'Transferências'}} />
            <Screen name="Deposit" component={Deposit} options={{title: 'Depósitos'}} />
            <Screen name="Plans" component={Plans} options={{title: 'Planos'}} />
        </Navigator>
    );
}
