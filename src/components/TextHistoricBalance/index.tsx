import React from "react";
import {TextHistoric} from "./styles";

interface TextBalanceProps {
    _mTop?: string;
}

const TextHistoricBalance: React.FC<TextBalanceProps> = ({
    _mTop,
    children,
    }) => {

    return (
        <TextHistoric _mTop={_mTop}>{children}</TextHistoric>
    );
};

export default TextHistoricBalance;
