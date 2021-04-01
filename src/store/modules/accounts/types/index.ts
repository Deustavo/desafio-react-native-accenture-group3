export const ACCOUNT_DATA_SUCCESS: string = "ACCOUNT_DATA_SUCCESS";
export const TRANSACTION_TYPES_SUCCESS: string = "TRANSACTION_TYPES_SUCCESS";
export const ADD_TRANSACTION_TYPE: string = "ADD_TRANSACTION_TYPE";
export const SET_ACTIVE_MONTH: string = "SET_ACTIVE_MONTH";
export const DEBIT_TRANSACTION_SUCCESS: string = "DEBIT_TRANSACTION_SUCCESS";
export const CREDIT_TRANSACTION_SUCCESS: string = "CREDIT_TRANSACTION_SUCCESS";
export const TOGGLE_TRANSACTION_VISIBILITY: string =
    "TOGGLE_TRANSACTION_VISIBILITY";

export interface IPlanoConta {
    id: number;
    login: string;
    descricao: string;
    padrao: boolean;
    tipoMovimento: string;
}

export interface ILancamento {
    id: number;
    conta: number;
    data: string;
    descricao: string;
    tipo: string;
    valor: number;
    planoConta: IPlanoConta;
    isCredit?: boolean;
}

export interface ILancamentoRedux {
    id: string;
    conta: number;
    contaDestino?: string;
    data: string;
    descricao: string;
    login: string;
    planoConta: IPlanoConta;
    valor: number;
}

export interface IConta {
    id: number;
    saldo: number;
}

export interface IAccounts {
    contaBanco: IConta | null;
    contaCredito: IConta | null;
}

export interface ITransactionTypes {
    [key: string]: IPlanoConta[];
}

export type DateInfo = {
    month: string;
    year: number;
    lastDay: number;
};

export interface IDashboardState {
    fetchAccountsError: boolean;
    transactionError: boolean;
    loading: boolean;
    currentMonth: DateInfo | null;
    previousMonth: DateInfo | null;
    activeMonth: string;
    debitAccount: IConta | null;
    creditAccount: IConta | null;
    transactions: ILancamento[] | null;
    transactionTypes: ITransactionTypes | null;
    hideInfo: boolean;
}

export interface IAction {
    type:
        | typeof ACCOUNT_DATA_SUCCESS
        | typeof TRANSACTION_TYPES_SUCCESS
        | typeof ADD_TRANSACTION_TYPE
        | typeof SET_ACTIVE_MONTH
        | typeof DEBIT_TRANSACTION_SUCCESS
        | typeof CREDIT_TRANSACTION_SUCCESS
        | typeof TOGGLE_TRANSACTION_VISIBILITY;
    payload?: any;
}
