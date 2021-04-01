import React from 'react';
//
import * as S from './styles';
import TextBalance from '../TextBalance';
import { formatDate } from '../../utils/helpers';
import FormattedBRL from '../FormattedBRL';

interface TransactionItemProps {
    valor: number;
    data: string;
}

const TransactionItem: React.FC<TransactionItemProps> = ({ valor, data }) => {
    const formattedDate = formatDate(data);
    return (
        <S.RowLastHistoric>
            <S.LineRowSeparatorHistoric>|</S.LineRowSeparatorHistoric>
            <TextBalance
                _Color={valor < 0 ? '#F45F5F' : undefined}
                _mTop="10px"
            >
                <FormattedBRL value={valor} />
            </TextBalance>
            <S.TextDataHistoric>{formattedDate}</S.TextDataHistoric>
        </S.RowLastHistoric>
    );
};

export default TransactionItem;
