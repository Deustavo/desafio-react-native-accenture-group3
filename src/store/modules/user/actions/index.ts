import { IAuthDetails } from '../../../../services/auth';
import { IAction, LOGIN_USER, LOGOUT_USER } from '../types';

export function logInUser(user: IAuthDetails): IAction {
    return {
        type: LOGIN_USER,
        payload: user,
    };
}

export function logOutUser(): IAction {
    return {
        type: LOGOUT_USER,
    };
}
