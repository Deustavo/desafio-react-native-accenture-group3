import { IAuthDetails } from '../../../../services/auth';

export const LOGOUT_USER: string = 'LOGOUT_USER';
export const LOGIN_USER: string = 'LOGIN_USER';

export interface IUserState {
    isLogged: boolean;
    user: IAuthDetails | null;
}

export interface IAction {
    type: typeof LOGIN_USER | typeof LOGOUT_USER;
    payload?: any;
}
