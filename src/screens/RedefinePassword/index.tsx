import React, {useRef, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Form} from '@unform/mobile';
import {FormHandles} from '@unform/core';
import * as Yup from 'yup';
import {KeyboardAvoidingView, Platform, TextInput} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
//
import ButtonPrimary from '../../components/ButtonPrimary';
import {LinksBottom} from './styles';
import WhiteCardLoginRegister from '../../components/WhiteCardLoginRegister';
import ContainerScroll from '../../components/ContainerScrollView';
import ContainerViewLoginRegister from '../../components/ContainerViewLoginRegister';
import ContainerLogoGama from '../../components/LogoGama';
import Input from '../../components/Input';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';

//  criar interfaces

export default function RedefinePassword() {
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const route = useRoute();
    const params = route.params as IParams;
    const formRef = useRef<FormHandles>(null);
    const passwdConfirmInputRef = useRef<TextInput>(null);

    function navLogin() {
        navigation.navigate('Login');
    }

    const submitFormButton = () => {
        formRef.current?.submitForm();
    };

    async function resetPasswd({passwd, confirmPasswd}: IResetPasswdForm) {
        try {
            // Start by cleaning errors
            formRef.current?.setErrors({});
            console.log(passwd);
            console.log(confirmPasswd);

            const schema = Yup.object({
                passwd: Yup.string().trim().required('Senha obrigatória'),
                confirmPasswd: Yup.string()
                    .trim()
                    .oneOf([Yup.ref('passwd'), null], 'Senhas diferentes'),
            });

            await schema.validate(
                {passwd, confirmPasswd},
                {abortEarly: false}
            );

            setLoading(true);

            const postData = {
                senha: passwd,
                usuario: params.login,
            };

            await api.post(`altera-senha`, postData, {
                params: {senhaTemporaria: params.senhaTemporaria},
            });

            navLogin();
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

    return (
        <KeyboardAvoidingView style={{flex: 1, flexDirection: 'column', justifyContent: 'center',}}
                              behavior={Platform.OS === "ios" ? "padding" : "height"} enabled
                              keyboardVerticalOffset={10}>
            <ContainerScroll>
                <ContainerLogoGama mTop="50px" mBottom="20px"/>
                <ContainerViewLoginRegister>
                    <WhiteCardLoginRegister title="Redefinir senha">
                        <Form
                            ref={formRef}
                            style={{width: '100%'}}
                            onSubmit={resetPasswd}
                        >
                            <Input
                                name="passwd"
                                placeholder="Nova Senha"
                                secureTextEntry
                                returnKeyType="next"
                                onSubmitEditing={() => {
                                    passwdConfirmInputRef.current?.focus();
                                }}
                            />
                            <Input
                                ref={passwdConfirmInputRef}
                                name="confirmPasswd"
                                placeholder="Confirmar Nova Senha"
                                secureTextEntry
                                returnKeyType="send"
                                onSubmitEditing={submitFormButton}
                            />
                            <ButtonPrimary
                                title="Continuar"
                                iconName="arrow-right"
                                iconColor="#FFF"
                                iconSize={25}
                                marginTop="60px"
                                marginBottom="30px"
                                onPress={submitFormButton}
                                _loading={loading}
                            />
                        </Form>
                        <LinksBottom onPress={navLogin}>
                            Ir para Login{' '}
                            <Feather
                                name="chevron-right"
                                size={13}
                                color="#8C52E5"
                            />
                        </LinksBottom>
                    </WhiteCardLoginRegister>
                </ContainerViewLoginRegister>
            </ContainerScroll>
        </KeyboardAvoidingView>
    );
}
