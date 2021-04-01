import React, { useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather';
import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
//
import ButtonPrimary from '../../components/ButtonPrimary';
import { LinksBottom, LoginForm } from './styles';
import WhiteCardLoginRegister from '../../components/WhiteCardLoginRegister';
import ContainerViewLoginRegister from '../../components/ContainerViewLoginRegister';
import ContainerScroll from '../../components/ContainerScrollView';
import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';
import Input from '../../components/Input';
import { logInUser } from '../../store/modules/user/actions';
import ContainerLogoGama from '../../components/LogoGama';
import { KeyboardAvoidingView, Platform, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ILoginForm {
    login: string;
    passwd: string;
}

export default function Login() {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const formRef = useRef<FormHandles>(null);
    const passwordInputRef = useRef<TextInput>(null);

    async function loginSysGama(data: ILoginForm) {
        const { login, passwd } = data;

        try {
            // Start by cleaning errors
            formRef.current?.setErrors({});

            const schema = Yup.object({
                login: Yup.string().trim().min(5).required('Cpf obrigatório.'),
                passwd: Yup.string().trim().required('Campo obrigatório'),
            });

            await schema.validate(data, { abortEarly: false });

            setLoading(true);

            const postData = {
                usuario: login,
                senha: passwd,
            };

            api.defaults.headers.Authorization = null;

            await api.post(`login`, postData).then(async ({ data }) => {
                await AsyncStorage.multiRemove([
                    '@tokenApp',
                    '@loginApp',
                    '@userNameApp',
                    '@cpfApp',
                ]);
                const token = ['@tokenApp', data.token];
                const login = ['@loginApp', data.usuario.login];
                const cpf = ['@cpfApp', data.usuario.cpf];
                const userName = [
                    '@userNameApp',
                    data.usuario.nome.split(' ')[0],
                ];
                await AsyncStorage.multiSet([token, login, userName, cpf]);
                api.defaults.headers.Authorization = data.token;
                dispatch(
                    logInUser({
                        token: token[1],
                        userName: userName[1],
                        login: login[1],
                        cpf: cpf[1],
                    })
                );
            });
        } catch (err) {
            setLoading(false);
            if (err instanceof Yup.ValidationError) {
                const errors = getValidationErrors(err);
                formRef.current?.setErrors(errors);
                return;
            }
            console.log(err);
        }
    }

    function navForgetPassword() {
        navigation.navigate('ForgotPasswd');
    }

    function navCreateAccount() {
        navigation.navigate('CreateAccount');
    }

    const submitFormButton = () => {
        formRef.current?.submitForm();
    };

    return (
        <KeyboardAvoidingView
            style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
            }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            enabled
            keyboardVerticalOffset={10}
        >
            <ContainerScroll>
                <SafeAreaView/>
                    <ContainerLogoGama mTop="50px" mBottom="20px" />
                    <ContainerViewLoginRegister>
                        <WhiteCardLoginRegister title="Seja bem vindo, informe seus dados para logar.">
                            <LoginForm ref={formRef} onSubmit={loginSysGama}>
                                <Input
                                    name="login"
                                    placeholder="Digite seu usuário"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    returnKeyType="next"
                                    onSubmitEditing={() => {
                                        passwordInputRef.current?.focus();
                                    }}
                                />
                                <Input
                                    ref={passwordInputRef}
                                    name="passwd"
                                    placeholder="Digite sua Senha"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    secureTextEntry
                                    returnKeyType="send"
                                    onSubmitEditing={submitFormButton}
                                />
                                <ButtonPrimary
                                    title="Continuar"
                                    iconName="arrow-right"
                                    iconColor="#fff"
                                    iconSize={25}
                                    marginTop="20px"
                                    marginBottom="30px"
                                    bgColor="#63dc3f"
                                    color="#fff"
                                    onPress={submitFormButton}
                                    _loading={loading}
                                />
                                <LinksBottom onPress={navForgetPassword}>
                                    Esqueci minha senha{' '}
                                    <Feather
                                        name="chevron-right"
                                        size={13}
                                        color="#8C52E5"
                                    />
                                </LinksBottom>
                                <LinksBottom onPress={navCreateAccount}>
                                    Ainda não sou cliente{' '}
                                    <Feather
                                        name="chevron-right"
                                        size={13}
                                        color="#8C52E5"
                                    />
                                </LinksBottom>
                            </LoginForm>
                        </WhiteCardLoginRegister>
                    </ContainerViewLoginRegister>
            </ContainerScroll>
        </KeyboardAvoidingView>
    );
}
