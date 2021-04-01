import React from 'react';
import NumberFormat from 'react-number-format';
import { Text } from 'react-native';

const FormattedBRL: React.FC<{ value?: number }> = ({ value }) => {
    return (
        <NumberFormat
            value={value}
            displayType={'text'}
            thousandSeparator={'.'}
            decimalSeparator={','}
            decimalScale={2}
            fixedDecimalScale={true}
            prefix={'R$ '}
            renderText={(value) => <Text>{value}</Text>}
        />
    );
};

export default FormattedBRL;
