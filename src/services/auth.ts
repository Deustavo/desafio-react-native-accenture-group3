import AsyncStorage from '@react-native-async-storage/async-storage';

export interface IAuthDetails {
    token: string | null;
    login: string | null;
    userName: string | null;
    cpf: string | null;
}

export const isAuth = async (): Promise<IAuthDetails | undefined> => {
    try {
        const token = await AsyncStorage.getItem('@tokenApp');
        const login = await AsyncStorage.getItem('@loginApp');
        const userName = await AsyncStorage.getItem('@userNameApp');
        const cpf = await AsyncStorage.getItem('@cpfApp');
        if (token && login) {
            return {
                login,
                token,
                userName,
                cpf,
            };
        }
        return {
            login: null,
            token: null,
            userName: null,
            cpf: null,
        };
    } catch (e) {
        console.log(e);
    }
};
