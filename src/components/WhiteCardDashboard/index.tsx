import React from 'react';
import { ContainerCard } from './styles';

interface WhiteCardGenericLoginRegisterProps {
    _Padding?: string;
    _MarginBottom?: string;
    _MarginTop?: string;
}

const WhiteCardDashboard: React.FC<WhiteCardGenericLoginRegisterProps> = ({
    _Padding,
    _MarginBottom,
    _MarginTop,

    children,
}) => {
    return (
        <ContainerCard
            _Padding={_Padding}
            _MarginBottom={_MarginBottom}
            _MarginTop={_MarginTop}
        >
            {children}
        </ContainerCard>
    );
};

export default WhiteCardDashboard;
