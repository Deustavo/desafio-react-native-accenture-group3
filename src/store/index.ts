import { createStore, compose, combineReducers } from 'redux';
//
import accounts from './modules/accounts/reducers';
import { IAction, IDashboardState } from './modules/accounts/types';
import user from './modules/user/reducers';
import { IUserState } from './modules/user/types';

const composeEnhancers =
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export interface IRootState {
    user: IUserState;
    accounts: IDashboardState;
}

const store = createStore<IRootState, IAction, unknown, unknown>(
    combineReducers({ user, accounts }),
    composeEnhancers()
);

export default store;
