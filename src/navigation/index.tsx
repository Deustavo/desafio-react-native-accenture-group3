import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { IRootState } from '../store';
//
import AuthRoutes from './authRoutes';
import PublicRoutes from './publicRoutes';

export default function Navigation() {
    const { isLogged } = useSelector((state: IRootState) => state.user);
    return (
        <NavigationContainer>
            {isLogged ? <AuthRoutes /> : <PublicRoutes />}
        </NavigationContainer>
    );
}
