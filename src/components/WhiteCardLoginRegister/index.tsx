import React from 'react';
import { ContainerCard, TitleCard } from './styles';

interface WhiteCardGenericLoginRegisterProps {
    title?: string;
    pdHorizontal?: string;
}

const WhiteCardLoginRegister: React.FC<WhiteCardGenericLoginRegisterProps> = ({
    title,
    pdHorizontal,
    children,
}) => {
    return (
        <ContainerCard pdHorizontal={pdHorizontal}>
            {title ? <TitleCard>{title}</TitleCard> : null}
            {children}
        </ContainerCard>
    );
};

export default WhiteCardLoginRegister;
