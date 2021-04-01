import React, { useEffect } from 'react';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
//
import * as S from './styles';
import { DrawerParamList } from '../../navigation/drawer';
import { getDateInfo } from '../../utils/helpers';
import api from '../../services/api';
import { IRootState } from '../../store';
import { logOutUser } from '../../store/modules/user/actions';
import {
    accountDataSuccess,
    toggleTransactionVisibility,
    transactionTypesSuccess,
} from '../../store/modules/accounts/actions';
import ContainerScroll from '../../components/ContainerScrollView';
import ContainerViewDashboard from '../../components/ContainerDashboard';
import WhiteCardDashboard from '../../components/WhiteCardDashboard';
import TextBalance from '../../components/TextBalance';
import TextHistoricBalance from '../../components/TextHistoricBalance';
import MoneyLoader from '../../components/MoneyLoader';
import TransactionItem from '../../components/TransactionItem';
import HidableValue from '../../components/HidableValue';
import FormattedBRL from '../../components/FormattedBRL';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

type DashboardHomeNavigationProp = DrawerNavigationProp<
    DrawerParamList,
    'DashboardHome'
>;

type Props = {
    navigation: DashboardHomeNavigationProp;
};

const DashboardHome: React.FC<Props> = ({ navigation }) => {
    const dispatch = useDispatch();
    const { user } = useSelector((state: IRootState) => state.user);
    const { loading, debitAccount, transactions, hideInfo } = useSelector(
        (state: IRootState) => state.accounts
    );

    async function removeAuthData() {
        await AsyncStorage.multiRemove([
            '@tokenApp',
            '@loginApp',
            '@userNameApp',
            '@cpfApp',
        ]);
        dispatch(logOutUser());
    }

    useEffect(() => {
        const [currentMonth] = getDateInfo();

        const params = {
            inicio: `${currentMonth!.year}-${currentMonth!.month}-01`,
            fim: `${currentMonth!.year}-${currentMonth!.month}-${
                currentMonth!.lastDay
            }`,
            login: user!.login,
        };

        const headers = {
            Authorization: user!.token,
        };

        async function getApiInfo() {
            try {
                const [
                    { data: accounts },
                    { data: tTypes },
                ] = await Promise.all([
                    api.get(`/dashboard`, {
                        params,
                        headers,
                    }),

                    api.get('/lancamentos/planos-conta', {
                        params,
                        headers,
                    }),
                ]);
                dispatch(accountDataSuccess(accounts));
                dispatch(transactionTypesSuccess(tTypes));
            } catch (err) {
                if (err.response?.data.error === 'ExpiredJwtException') {
                    removeAuthData();
                    return;
                }
            }
        }

        getApiInfo();
    }, [dispatch]);

    // let debitBalance;
    // let debitTransactions;
    // let debitTransactionsSum;
    // let income;
    // let outcome;
    // let incomeSum;
    // let outcomeSum;

    if (!loading) {
        debitBalance = debitAccount!.saldo;
        debitTransactions = transactions?.filter((tr) => !tr.isCredit);
        debitTransactionsSum = debitTransactions!.reduce(
            (acc, item) => acc + item.valor,
            0
        );

        income = transactions?.filter((tr) => tr.valor > 0);
        outcome = transactions?.filter((tr) => tr.valor < 0);
        incomeSum = income!.reduce((acc, item) => acc + item.valor, 0);
        outcomeSum = outcome!.reduce((acc, item) => acc + item.valor, 0);
    }

    const toggleHideInfo = () => dispatch(toggleTransactionVisibility());

    return (
        <ContainerScroll>
            <ContainerViewDashboard>
                <S.HeaderDashboard>
                    <S.TextHeaderDashboard>
                        Olá, {user?.userName}
                    </S.TextHeaderDashboard>
                    <S.ContainerIcon>
                        <S.IconEye onPress={toggleHideInfo}>
                            <Ionicons
                                name="ios-eye-outline"
                                size={33}
                                color="#FFFFFF"
                            />
                        </S.IconEye>
                        <S.IconHeaderDashboard
                            onPress={() => navigation.openDrawer()}
                        >
                            <Ionicons
                                name="md-person-outline"
                                size={33}
                                color="#FFFFFF"
                            />
                        </S.IconHeaderDashboard>
                    </S.ContainerIcon>
                </S.HeaderDashboard>

                {loading ? (
                    <MoneyLoader />
                ) : (
                    <>
                        <WhiteCardDashboard
                            _MarginBottom="30px"
                            _Padding="20px"
                        >
                            <S.HeaderCard>
                                <MaterialCommunityIcons
                                    name="currency-usd-circle-outline"
                                    size={30}
                                    color="#9b9b9b"
                                />
                                <S.TextHeaderCard>
                                    Saldo da conta
                                </S.TextHeaderCard>
                            </S.HeaderCard>
                            <S.ContentCard>
                                <TextBalance>
                                    <HidableValue
                                        condition={hideInfo}
                                        value={
                                            <FormattedBRL
                                                value={debitBalance}
                                            />
                                        }
                                    />
                                </TextBalance>
                                <TextHistoricBalance>
                                    {!hideInfo && (
                                        <>
                                            Lançamentos no mês:{' '}
                                            <FormattedBRL
                                                value={debitTransactionsSum}
                                            />
                                        </>
                                    )}
                                </TextHistoricBalance>
                            </S.ContentCard>
                        </WhiteCardDashboard>
                        <WhiteCardDashboard
                            _MarginBottom="30px"
                            _Padding="20px"
                        >
                            <S.HeaderCard>
                                <MaterialCommunityIcons
                                    name="currency-usd-circle-outline"
                                    size={30}
                                    color="#9b9b9b"
                                />
                                <S.TextHeaderCard>
                                    Planos de conta
                                </S.TextHeaderCard>
                            </S.HeaderCard>
                            <HidableValue
                                condition={hideInfo}
                                value={
                                    <>
                                        <S.PlanAccountContentCard>
                                            <TextHistoricBalance>
                                                Tipo do plano: Entradas
                                            </TextHistoricBalance>
                                            <TextBalance>
                                                <FormattedBRL
                                                    value={incomeSum}
                                                />
                                            </TextBalance>
                                        </S.PlanAccountContentCard>
                                        <S.PlanAccountCard>
                                            <S.TextExpense>
                                                Tipo do plano: Saídas
                                            </S.TextExpense>
                                            <TextBalance _Color="#F45F5F">
                                                <FormattedBRL
                                                    value={outcomeSum}
                                                />
                                            </TextBalance>
                                        </S.PlanAccountCard>
                                    </>
                                }
                            />
                        </WhiteCardDashboard>
                        <WhiteCardDashboard
                            _MarginBottom="150px"
                            _Padding="20px 20px 60px"
                        >
                            <S.HeaderCard>
                                <MaterialCommunityIcons
                                    name="currency-usd-circle-outline"
                                    size={30}
                                    color="#9b9b9b"
                                />
                                <S.TextHeaderCard>
                                    Últimos Lançamentos
                                </S.TextHeaderCard>
                            </S.HeaderCard>

                            {hideInfo ? (
                                <HidableValue condition={hideInfo} />
                            ) : (
                                <>
                                    {transactions && transactions![0] ? (
                                        transactions!.map((tr) => (
                                            <TransactionItem
                                                key={tr.id}
                                                valor={tr.valor}
                                                data={tr.data}
                                            />
                                        ))
                                    ) : (
                                        <S.TextHeaderCard _mTop="20px">
                                            Não existem lançamentos.
                                        </S.TextHeaderCard>
                                    )}
                                </>
                            )}
                        </WhiteCardDashboard>
                    </>
                )}
            </ContainerViewDashboard>
        </ContainerScroll>
    );
};

export default DashboardHome;
