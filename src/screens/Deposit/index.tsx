import React, {useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import * as Yup from 'yup';
import {FormHandles} from '@unform/core';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {useNavigation} from '@react-navigation/native';
import {Dimensions, Image, KeyboardAvoidingView, Platform, TextInput} from 'react-native';
import shortid from 'shortid';
//
import ButtonPrimary from '../../components/ButtonPrimary';
import ContainerScroll from '../../components/ContainerScrollView';
import * as S from './styles';
import Input from '../../components/Input';
import WhiteCardDashboard from '../../components/WhiteCardDashboard';
import ContainerViewDashboard from '../../components/ContainerDashboard';
import {createFloat} from '../../utils/helpers';
import api from '../../services/api';
import {debitTransactionSuccess} from '../../store/modules/accounts/actions';
import getValidationErrors from '../../utils/getValidationErrors';
import {IRootState} from '../../store';
import InputMasked from '../../components/InputMasked';
import {Feather} from "@expo/vector-icons";

interface IDepositForm {
    descricao: string;
    valor: number | string;
}

export default function Deposit() {
    const formRef = useRef<FormHandles>(null);
    const valueInputRef = useRef<TextInput>(null);
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [date, setDate] = useState('');
    const [missingDate, setMissingDate] = useState(false);
    const [loading, setLoading] = useState(false);

    const {debitAccount, transactionTypes} = useSelector(
        (state: IRootState) => state.accounts
    );

    const {user} = useSelector((state: IRootState) => state.user);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (chosenDate: Date) => {
        setDate(chosenDate.toISOString().substring(0, 10));
        setMissingDate(false);
        hideDatePicker();
    };

    const navDashboard = () => {
        //  setar loading como falso
        //  redirecionar para screen da home
    };

    const submitFormButton = () => {
        formRef.current?.submitForm();
    };

    async function handleSubmit({descricao, valor}: IDepositForm) {
        try {
            valor = valor && createFloat(valor);

            formRef.current?.setErrors({});

            const schema = Yup.object({
                descricao: Yup.string()
                    .trim()
                    .required('Campo obrigatório')
                    .min(2)
                    .max(10),
                valor: Yup.number()
                    .max(9999.99, 'Valor máximo de R$ 9.999,99')
                    .required('Campo obrigatório'),
            });

            await schema.validate({descricao, valor}, {abortEarly: false});

            if (!date) {
                setMissingDate(true);
                return;
            }

            setLoading(true);

            const planoConta = transactionTypes!['R'][0];

            const postData = {
                conta: debitAccount!.id,
                data: date,
                descricao,
                login: user!.login!,
                valor,
                planoConta: planoConta.id,
            };

            const headers = {Authorization: user!.token!};

            await api.post(`lancamentos`, postData, {headers});

            dispatch(
                debitTransactionSuccess({
                    ...postData,
                    // Id must be created here since the API don't return it
                    id: shortid(),
                    valor: Number(valor),
                    planoConta,
                })
            );

            navDashboard();
        } catch (err) {
            setLoading(false);
            if (err instanceof Yup.ValidationError) {
                const errors = getValidationErrors(err);
                formRef.current?.setErrors(errors);
                return;
            }
        }
    }

    return (
        <KeyboardAvoidingView style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start'}}
                              behavior={Platform.OS === "ios" ? "padding" : "height"} enabled keyboardVerticalOffset={20}>
        <ContainerScroll _bgColor="#e6e6e6">
            <S.HeaderDashboard>
                <S.TextHeaderDashboard>Olá, {user?.userName}</S.TextHeaderDashboard>
                <S.CloseButton onPress={() => navigation.goBack()}>
                    <Feather name="x" size={33} color="#8C52E5" />
                </S.CloseButton>
            </S.HeaderDashboard>

            <ContainerViewDashboard>
                <WhiteCardDashboard
                    _MarginBottom="130px"
                    _Padding="20px 20px 40px"
                >
                    <S.HeaderCard>
                        <S.IconHeaderCard
                            source={require('../../assets/icon-money.png')}
                        />
                        <S.TextHeaderCard>Depositos</S.TextHeaderCard>
                    </S.HeaderCard>
                    <S.DepositForm ref={formRef} onSubmit={handleSubmit}>
                        <Input
                            name="descricao"
                            placeholder="Descrição"
                            autoCorrect={false}
                            returnKeyType="next"
                            onSubmitEditing={() => {
                                // Check out Input comp to details on this custom focus method
                                valueInputRef.current?.focus();
                            }}
                        />

                        <InputMasked
                            mask="BRL"
                            name="valor"
                            placeholder="Valor de depósito"
                            autoCapitalize="none"
                            keyboardType="number-pad"
                            autoCorrect={false}
                            ref={valueInputRef}
                        />

                        <ButtonPrimary
                            onPress={showDatePicker}
                            title="Selecione uma data"
                            iconName="calendar"
                            iconColor="#fff"
                            iconSize={25}
                            marginTop="40px"
                            marginBottom="20px"
                            bgColor={missingDate ? '#e6505c' : '#8c52e5'}
                            color="#fff"
                        />

                        {missingDate && (
                            <S.DateError>
                                Por favor selecione uma data
                            </S.DateError>
                        )}

                        <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode="date"
                            onConfirm={handleConfirm}
                            onCancel={hideDatePicker}
                        />

                        <ButtonPrimary
                            title="Realizar depósito"
                            iconName="arrow-right"
                            iconColor="#fff"
                            iconSize={25}
                            onPress={submitFormButton}
                            marginTop="20px"
                            marginBottom="30px"
                            bgColor="#63dc3f"
                            color="#fff"
                            _loading={loading}
                        />
                    </S.DepositForm>
                </WhiteCardDashboard>
            </ContainerViewDashboard>
        </ContainerScroll>
        </KeyboardAvoidingView>
    );
}
