import { getDateInfo } from '../../../../utils/helpers';
import {
    IConta,
    ILancamento,
    IDashboardState,
    IAction,
    IPlanoConta,
    ILancamentoRedux,
    ITransactionTypes,
    ACCOUNT_DATA_SUCCESS,
    TRANSACTION_TYPES_SUCCESS,
    DEBIT_TRANSACTION_SUCCESS,
    CREDIT_TRANSACTION_SUCCESS,
    TOGGLE_TRANSACTION_VISIBILITY,
    SET_ACTIVE_MONTH,
    ADD_TRANSACTION_TYPE,
} from '../types';

function calculaSaldo(
    lancamento: ILancamentoRedux,
    saldo: number,
    isDebit?: boolean
): number {
    switch (lancamento.planoConta.tipoMovimento) {
        case 'R':
            // Deposit my account
            return saldo + lancamento.valor;
        case 'TU':
            // Transfer to other user
            return saldo - lancamento.valor;
        case 'TC':
            // Transfer from my bank to credit
            if (isDebit) {
                return saldo - lancamento.valor;
            }
            return saldo + lancamento.valor;
        default:
            return saldo + lancamento.valor;
    }
}

function checkDebitNegativeValue(lancamento: ILancamentoRedux): number {
    const isNegative =
        lancamento.planoConta.tipoMovimento === 'TC' ||
        lancamento.planoConta.tipoMovimento === 'TU';

    if (isNegative) return lancamento.valor * -1;
    return lancamento.valor;
}

function checkCreditNegativeValue(lancamento: ILancamentoRedux): number {
    const isNegative = lancamento.planoConta.tipoMovimento === 'TU';

    if (isNegative) return lancamento.valor * -1;
    return lancamento.valor;
}

function orderTransactions(
    base: ILancamento[],
    credit?: ILancamento[]
): ILancamento[] {
    if (!credit) {
        return base.sort((a, b) => {
            return a.data < b.data ? 1 : -1;
        });
    }

    const updatedCredit = credit.map((cr) => ({
        ...cr,
        isCredit: true,
    }));

    let allTransactions = [...base, ...updatedCredit];

    allTransactions = allTransactions.sort((a, b) => {
        return a.data < b.data ? 1 : -1;
    });

    return allTransactions;
}

const [currentMonth, previousMonth] = getDateInfo();

const initialState: IDashboardState = {
    fetchAccountsError: false,
    transactionError: false,
    loading: true,
    currentMonth,
    previousMonth,
    activeMonth: currentMonth.month,
    debitAccount: null,
    creditAccount: null,
    transactions: null,
    transactionTypes: null,
    hideInfo: false,
};

export default function reducer(
    state = initialState,
    { type, payload }: IAction
): IDashboardState {
    const inActiveMonth = payload?.data?.slice(5, 7) === state.activeMonth;
    switch (type) {
        case ACCOUNT_DATA_SUCCESS:
            const { contaBanco, contaCredito } = payload;
            return {
                ...state,
                debitAccount: {
                    id: contaBanco.id,
                    saldo: contaBanco.saldo,
                },
                creditAccount: {
                    id: contaCredito.id,
                    saldo: contaCredito.saldo,
                },
                transactions: orderTransactions(
                    contaBanco.lancamentos,
                    contaCredito.lancamentos
                ),
                loading: false,
                currentMonth,
                previousMonth,
            };

        case TRANSACTION_TYPES_SUCCESS:
            const tTypes: ITransactionTypes = {};
            payload.forEach(
                (type: IPlanoConta) =>
                    (tTypes[type.tipoMovimento] = tTypes[
                        type.tipoMovimento
                    ]?.concat(type) || [type])
            );
            return {
                ...state,
                transactionTypes: tTypes,
            };

        case ADD_TRANSACTION_TYPE:
            return {
                ...state,
                transactionTypes: {
                    ...state.transactionTypes,
                    [payload.tipoMovimento]: state.transactionTypes?.[
                        payload.tipoMovimento
                    ].concat(payload),
                },
            };

        case SET_ACTIVE_MONTH:
            return { ...state, activeMonth: payload };

        case DEBIT_TRANSACTION_SUCCESS:
            return {
                ...state,
                transactionError: false,
                debitAccount: {
                    ...state.debitAccount,
                    saldo: calculaSaldo(
                        payload,
                        state.debitAccount!.saldo,
                        true
                    ),
                } as IConta,
                transactions: inActiveMonth
                    ? orderTransactions([
                          ...state.transactions!,
                          {
                              ...payload,
                              valor: checkDebitNegativeValue(payload),
                              tipo: payload.planoConta.tipoMovimento,
                          },
                      ])
                    : state.transactions,
            };

        case CREDIT_TRANSACTION_SUCCESS:
            return {
                ...state,
                transactionError: false,
                creditAccount: {
                    ...state.creditAccount,
                    saldo: calculaSaldo(payload, state.creditAccount!.saldo),
                } as IConta,
                transactions: inActiveMonth
                    ? orderTransactions([
                          ...state.transactions!,
                          {
                              ...payload,
                              id: payload.id + 'c',
                              conta: state.creditAccount!.id,
                              valor: checkCreditNegativeValue(payload),
                              tipo: payload.planoConta.tipoMovimento,
                              isCredit: true,
                          },
                      ])
                    : state.transactions,
            };

        case TOGGLE_TRANSACTION_VISIBILITY:
            return { ...state, hideInfo: !state.hideInfo };

        default:
            return state;
    }
}
