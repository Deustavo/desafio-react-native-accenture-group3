import { IAction, IUserState, LOGIN_USER, LOGOUT_USER } from '../types';

const initialState: IUserState = {
    isLogged: false,
    user: null,
};

export default function reducer(
    state = initialState,
    { type, payload }: IAction
): IUserState {
    switch (type) {
        case LOGIN_USER:
            return {
                isLogged: true,
                user: payload,
            };

        case LOGOUT_USER:
            return {
                isLogged: false,
                user: null,
            };

        default:
            return state;
    }
}
