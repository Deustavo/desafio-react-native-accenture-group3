import React from 'react';
import { SeparatorBorder } from './styles';
import {
    DrawerContentComponentProps,
    DrawerContentOptions,
    DrawerContentScrollView,
} from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DrawerContentView from '../DrawerContentView';
import DrawerContentInformation from '../DrawerContentInformation';
import ButtonPrimary from '../ButtonPrimary';
import { useDispatch, useSelector } from 'react-redux';
import { logOutUser } from '../../store/modules/user/actions';
import { IRootState } from '../../store';
import { formatCPF } from '../../utils/helpers';

export type DrawerProps = DrawerContentComponentProps<DrawerContentOptions>;

const DrawerInfoUser: React.FC<DrawerProps> = (props) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state: IRootState) => state.user);
    const { transactionTypes } = useSelector(
        (state: IRootState) => state.accounts
    );

    let numberOfPlans: number = 0;
    if (transactionTypes?.['R']) {
        numberOfPlans =
            transactionTypes!['R'].length +
            transactionTypes!['D'].length +
            transactionTypes!['TU'].length +
            transactionTypes!['TC'].length;
    }

    async function removeAuth() {
        await AsyncStorage.multiRemove([
            '@tokenApp',
            '@loginApp',
            '@userNameApp',
            '@cpfApp',
        ]);
        dispatch(logOutUser());
    }

    return (
        <DrawerContentScrollView>
            {user?.login && (
                <DrawerContentView {...props}>
                    <DrawerContentInformation
                        title="Seu nome:"
                        description={user!.userName!}
                    />
                    <DrawerContentInformation
                        title="E-mail:"
                        description={`${user!.login!}@gmail.com`}
                    />
                    <DrawerContentInformation
                        title="Username:"
                        description={user!.login!}
                    />
                    <DrawerContentInformation
                        title="CPF:"
                        description={user!.cpf ? formatCPF(user!.cpf!) : ''}
                    />
                    <SeparatorBorder />
                    <DrawerContentInformation
                        title="Você tem"
                        description={`${numberOfPlans} planos de conta`}
                    />
                    <ButtonPrimary
                        title="Sair"
                        iconName="x"
                        iconSize={33}
                        iconColor="#FFFFFF"
                        bgColor="#8C52E5"
                        padding="5px 20px"
                        marginTop="40px"
                        onPress={removeAuth}
                    />
                </DrawerContentView>
            )}
        </DrawerContentScrollView>
    );
};

export default DrawerInfoUser;
