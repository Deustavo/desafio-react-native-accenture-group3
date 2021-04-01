import React from "react";
import {TextBalanceComponent} from "./styles";

interface TextBalanceProps {
    _Color?: string;
    _mTop?: string;
}

const TextBalance: React.FC<TextBalanceProps> = ({
    _Color,
    _mTop,
    children,
    }) => {

    return (
        <TextBalanceComponent _Color={_Color} _mTop={_mTop}>{children}</TextBalanceComponent>
    );
};

export default TextBalance;
